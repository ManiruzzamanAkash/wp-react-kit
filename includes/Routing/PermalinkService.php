<?php

namespace Akash\JobPlace\Routing;

/**
 * Register job detail rewrite rules and build permalinks.
 */
class PermalinkService {

	/**
	 * Query var for job detail pages.
	 */
	public const QUERY_VAR = 'jobplace_job';

	/**
	 * Constructor.
	 */
	public function __construct() {
		\add_action( 'init', [ $this, 'register_rewrites' ] );
		\add_filter( 'query_vars', [ $this, 'register_query_vars' ] );
		\add_action( 'admin_init', [ $this, 'register_permalink_settings' ] );
		\add_action( 'admin_init', [ $this, 'maybe_save_permalink_settings' ] );
		\add_action( 'init', [ $this, 'maybe_flush_rewrite_rules' ], 99 );
	}

	/**
	 * Register rewrite rules for job detail URLs.
	 *
	 * @return void
	 */
	public function register_rewrites(): void {
		$base = PermalinksSettings::get_job_base();

		\add_rewrite_rule(
			'^' . preg_quote( $base, '/' ) . '/([^/]+)/?$',
			'index.php?' . self::QUERY_VAR . '=$matches[1]',
			'top'
		);
	}

	/**
	 * Register public query vars.
	 *
	 * @param array $vars Query vars.
	 * @return array
	 */
	public function register_query_vars( array $vars ): array {
		$vars[] = self::QUERY_VAR;

		return $vars;
	}

	/**
	 * Add permalink fields to Settings → Permalinks.
	 *
	 * @return void
	 */
	public function register_permalink_settings(): void {
		\add_settings_section(
			'jobplace_permalinks',
			\__( 'Job Board Permalinks', 'jobplace' ),
			static function () {
				echo '<p>' . \esc_html__(
					'Customize the URL structure for individual job detail pages.',
					'jobplace'
				) . '</p>';
			},
			'permalink'
		);

		\add_settings_field(
			'jobplace_job_page_base',
			\__( 'Job detail base', 'jobplace' ),
			[ $this, 'render_job_base_field' ],
			'permalink',
			'jobplace_permalinks'
		);
	}

	/**
	 * Render job base input on permalinks screen.
	 *
	 * @return void
	 */
	public function render_job_base_field(): void {
		$base = PermalinksSettings::get_job_base();
		?>
		<input
			name="jobplace_job_page_base"
			type="text"
			class="regular-text code"
			value="<?php echo \esc_attr( $base ); ?>"
		/>
		<p class="description">
			<?php
			printf(
				/* translators: %s: example job URL */
				\esc_html__( 'Example: %s', 'jobplace' ),
				'<code>' . \esc_html( \home_url( '/' . $base . '/sample-job/' ) ) . '</code>'
			);
			?>
		</p>
		<?php
	}

	/**
	 * Save permalink settings from the permalinks screen.
	 *
	 * @return void
	 */
	public function maybe_save_permalink_settings(): void {
		if ( ! isset( $_POST['permalink_structure'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Missing
			return;
		}

		if ( ! \current_user_can( 'manage_options' ) ) {
			return;
		}

		\check_admin_referer( 'update-permalink' );

		if ( isset( $_POST['jobplace_job_page_base'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Missing
			PermalinksSettings::update(
				[
					'job_page' => \sanitize_title( \wp_unslash( $_POST['jobplace_job_page_base'] ) ), // phpcs:ignore WordPress.Security.NonceVerification.Missing
				]
			);
			\update_option( 'jobplace_flush_rewrite_rules', 1 );
		}
	}

	/**
	 * Flush rewrite rules after permalink or plugin changes.
	 *
	 * @return void
	 */
	public function maybe_flush_rewrite_rules(): void {
		$stored_version = \get_option( 'jobplace_rewrite_version', '' );

		if ( \JOB_PLACE_VERSION === $stored_version && ! \get_option( 'jobplace_flush_rewrite_rules' ) ) {
			return;
		}

		\flush_rewrite_rules( false );
		\update_option( 'jobplace_rewrite_version', \JOB_PLACE_VERSION );
		\delete_option( 'jobplace_flush_rewrite_rules' );
	}

	/**
	 * Build a job detail URL from slug.
	 *
	 * @param string $slug Job slug.
	 * @return string
	 */
	public static function get_job_url( string $slug ): string {
		if ( empty( $slug ) ) {
			return \home_url( '/' );
		}

		return \home_url( \user_trailingslashit( PermalinksSettings::get_job_base() . '/' . $slug ) );
	}
}
