<?php

namespace Akash\JobPlace\Databases\Seeder\Data;

/**
 * Fortune Global 500 and popular brand seed data loader.
 *
 * @since 0.15.0
 */
class TopCompaniesData {

    /**
     * Data directory path.
     *
     * @since 0.15.0
     *
     * @return string
     */
    private static function get_data_dir(): string {
        return JOB_PLACE_DIR . '/includes/Databases/Seeder/Data';
    }

    /**
     * Load JSON file from the data directory.
     *
     * @since 0.15.0
     *
     * @param string $filename File name.
     *
     * @return array<int, array<string, string>>
     */
    private static function load_json( string $filename ): array {
        $path = self::get_data_dir() . '/' . $filename;

        if ( ! file_exists( $path ) ) {
            return [];
        }

        // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
        $json = file_get_contents( $path );
        $data = json_decode( $json, true );

        return is_array( $data ) ? $data : [];
    }

    /**
     * Load slug-to-domain map for Fortune 500 companies.
     *
     * @since 0.15.1
     *
     * @return array<string, string>
     */
    private static function get_domain_map(): array {
        static $map = null;

        if ( null !== $map ) {
            return $map;
        }

        $data = self::load_json( 'company-domains.json' );
        $map  = [];

        foreach ( $data as $slug => $domain ) {
            if ( is_string( $slug ) && is_string( $domain ) ) {
                $map[ $slug ] = $domain;
            }
        }

        return $map;
    }

    /**
     * Merge Fortune 500 and popular brand records.
     *
     * @since 0.15.1
     *
     * @return array<int, array<string, string>>
     */
    public static function get_seed_records(): array {
        $records = array_merge(
            self::load_json( 'top-companies.json' ),
            self::load_json( 'popular-brands.json' )
        );

        $enriched = [];

        foreach ( $records as $company ) {
            if ( ! is_array( $company ) ) {
                continue;
            }

            $enriched[] = self::enrich_company( $company );
        }

        return $enriched;
    }

    /**
     * Backwards-compatible alias.
     *
     * @since 0.15.0
     *
     * @return array<int, array<string, string>>
     */
    public static function get_all(): array {
        return self::get_seed_records();
    }

    /**
     * Fill website and logo URL from bundled metadata.
     *
     * @since 0.15.1
     *
     * @param array<string, string> $company Company record.
     *
     * @return array<string, string>
     */
    private static function enrich_company( array $company ): array {
        $slug = sanitize_title( $company['slug'] ?? $company['name'] ?? '' );

        if ( empty( $company['domain'] ) && ! empty( $slug ) ) {
            $domain_map = self::get_domain_map();

            if ( isset( $domain_map[ $slug ] ) ) {
                $company['domain'] = $domain_map[ $slug ];
            }
        }

        if ( empty( $company['website'] ) && ! empty( $company['domain'] ) ) {
            $company['website'] = 'https://' . ltrim( $company['domain'], '.' );
        }

        if ( empty( $company['avatar_url'] ) ) {
            $company['avatar_url'] = self::resolve_avatar_url( $company );
        }

        return $company;
    }

    /**
     * Build a logo URL from a known domain or website.
     *
     * @since 0.15.1
     *
     * @param array<string, string> $company Company record.
     *
     * @return string
     */
    private static function resolve_avatar_url( array $company ): string {
        $domain = $company['domain'] ?? '';

        if ( empty( $domain ) && ! empty( $company['website'] ) ) {
            $host = wp_parse_url( $company['website'], PHP_URL_HOST );
            $domain = is_string( $host ) ? $host : '';
        }

        if ( empty( $domain ) ) {
            return '';
        }

        $domain = preg_replace( '/^www\./', '', $domain );

        return 'https://logo.clearbit.com/' . rawurlencode( $domain );
    }

    /**
     * Insert seed companies, skipping slugs that already exist.
     *
     * @since 0.15.0
     *
     * @return int Number of rows inserted.
     */
    public static function seed(): int {
        global $wpdb;

        $table    = $wpdb->prefix . 'jobplace_companies';
        $now      = current_datetime()->format( 'Y-m-d H:i:s' );
        $inserted = 0;

        foreach ( self::get_seed_records() as $company ) {
            $slug = sanitize_title( $company['slug'] ?? $company['name'] ?? '' );

            if ( empty( $slug ) ) {
                continue;
            }

            // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
            $exists = $wpdb->get_var(
                $wpdb->prepare(
                    "SELECT id FROM {$table} WHERE slug = %s LIMIT 1",
                    $slug
                )
            );

            if ( $exists ) {
                continue;
            }

            $website    = ! empty( $company['website'] ) ? esc_url_raw( $company['website'] ) : '';
            $avatar_url = ! empty( $company['avatar_url'] ) ? esc_url_raw( $company['avatar_url'] ) : '';

            // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery
            $result = $wpdb->insert(
                $table,
                [
                    'name'        => sanitize_text_field( $company['name'] ?? '' ),
                    'slug'        => $slug,
                    'email'       => '',
                    'website'     => $website,
                    'description' => sanitize_text_field( $company['description'] ?? '' ),
                    'avatar_url'  => $avatar_url,
                    'created_at'  => $now,
                    'updated_at'  => $now,
                ],
                [ '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s' ]
            );

            if ( false !== $result ) {
                ++$inserted;
            }
        }

        return $inserted;
    }

    /**
     * Backfill website and logo URLs for existing seeded companies.
     *
     * @since 0.15.1
     *
     * @return int Number of rows updated.
     */
    public static function sync_metadata(): int {
        global $wpdb;

        $table = $wpdb->prefix . 'jobplace_companies';
        $now   = current_datetime()->format( 'Y-m-d H:i:s' );

        $seed_by_slug = [];

        foreach ( self::get_seed_records() as $company ) {
            $slug = sanitize_title( $company['slug'] ?? $company['name'] ?? '' );

            if ( ! empty( $slug ) ) {
                $seed_by_slug[ $slug ] = $company;
            }
        }

        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
        $rows = $wpdb->get_results(
            "SELECT id, slug, website, avatar_url FROM {$table}",
            ARRAY_A
        );

        if ( ! is_array( $rows ) ) {
            return 0;
        }

        $updated = 0;

        foreach ( $rows as $row ) {
            $seed    = $seed_by_slug[ $row['slug'] ] ?? null;
            $changes = [];

            if ( empty( $row['website'] ) ) {
                $website = $seed['website'] ?? '';

                if ( ! empty( $website ) ) {
                    $changes['website'] = esc_url_raw( $website );
                }
            }

            if ( empty( $row['avatar_url'] ) ) {
                $avatar_url = $seed['avatar_url'] ?? '';

                if ( empty( $avatar_url ) && ! empty( $changes['website'] ) ) {
                    $avatar_url = self::resolve_avatar_url( [ 'website' => $changes['website'] ] );
                } elseif ( empty( $avatar_url ) && ! empty( $row['website'] ) ) {
                    $avatar_url = self::resolve_avatar_url( [ 'website' => $row['website'] ] );
                }

                if ( ! empty( $avatar_url ) ) {
                    $changes['avatar_url'] = esc_url_raw( $avatar_url );
                }
            }

            if ( empty( $changes ) ) {
                continue;
            }

            $changes['updated_at'] = $now;

            // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
            $result = $wpdb->update(
                $table,
                $changes,
                [ 'id' => (int) $row['id'] ],
                array_fill( 0, count( $changes ), '%s' ),
                [ '%d' ]
            );

            if ( false !== $result ) {
                ++$updated;
            }
        }

        return $updated;
    }
}
