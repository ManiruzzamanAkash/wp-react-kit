<?php

namespace Akash\JobPlace\WordPress\Pages;

/**
 * Find and create plugin pages (jobs board, etc.).
 */
class PageService {

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'display_post_states', [ $this, 'display_default_page_states' ], 10, 2 );
	}

	/**
	 * Option key for a stored page ID.
	 *
	 * @param string $slug Page slug key (e.g. jobs).
	 * @return string
	 */
	public function get_option_name( string $slug ): string {
		return 'jobplace_' . $slug . '_page_id';
	}

	/**
	 * Get a stored page by slug key.
	 *
	 * @param string $slug Page key.
	 * @return \WP_Post|null
	 */
	public function get( string $slug ): ?\WP_Post {
		$page_id = (int) get_option( $this->get_option_name( $slug ) );

		if ( $page_id <= 0 ) {
			return null;
		}

		$post = get_post( $page_id );

		if ( $post && ! in_array( $post->post_status, [ 'pending', 'trash', 'future', 'auto-draft' ], true ) ) {
			return $post;
		}

		return null;
	}

	/**
	 * Get stored page ID.
	 *
	 * @param string $slug Page key.
	 * @return int
	 */
	public function get_id( string $slug ): int {
		return (int) get_option( $this->get_option_name( $slug ) );
	}

	/**
	 * Get permalink for a stored page.
	 *
	 * @param string $slug Page key.
	 * @return string
	 */
	public function url( string $slug ): string {
		$post = $this->get( $slug );
		return $post ? (string) get_permalink( $post ) : '';
	}

	/**
	 * Get admin edit URL for a stored page.
	 *
	 * @param string $slug Page key.
	 * @return string
	 */
	public function edit_url( string $slug ): string {
		$page_id = $this->get_id( $slug );

		if ( $page_id <= 0 ) {
			return '';
		}

		return admin_url( 'post.php?post=' . $page_id . '&action=edit' );
	}

	/**
	 * Find or create a page and store its ID.
	 *
	 * @param string $slug         Post name slug.
	 * @param string $option_key   Key used in options (e.g. jobs).
	 * @param string $page_title   Page title.
	 * @param string $page_content Block markup content.
	 * @return \WP_Post|null
	 */
	public function find_or_create(
		string $slug,
		string $option_key,
		string $page_title,
		string $page_content
	): ?\WP_Post {
		$existing = $this->get( $option_key );

		if ( $existing ) {
			return $existing;
		}

		return $this->create( $slug, $option_key, $page_title, $page_content );
	}

	/**
	 * Create a page and store its ID.
	 *
	 * @param string $slug         Post name slug.
	 * @param string $option_key   Key used in options.
	 * @param string $page_title   Page title.
	 * @param string $page_content Block markup content.
	 * @return \WP_Post|null
	 */
	public function create(
		string $slug,
		string $option_key,
		string $page_title,
		string $page_content
	): ?\WP_Post {
		$page_id = wp_insert_post(
			[
				'post_status'    => 'publish',
				'post_type'      => 'page',
				'post_author'    => get_current_user_id() ?: 1,
				'post_name'      => $slug,
				'post_title'     => $page_title,
				'post_content'   => $page_content,
				'comment_status' => 'closed',
			],
			true
		);

		if ( is_wp_error( $page_id ) || ! $page_id ) {
			return null;
		}

		update_option( $this->get_option_name( $option_key ), (int) $page_id );

		/**
		 * Fires after a plugin page is created.
		 *
		 * @param int    $page_id    New page ID.
		 * @param string $option_key Page option key.
		 */
		do_action( 'jobplace/page_created', (int) $page_id, $option_key );

		return get_post( $page_id ) ?: null;
	}

	/**
	 * Label default plugin pages in the Pages list table.
	 *
	 * @param string[] $states Post states.
	 * @param \WP_Post $post   Post object.
	 * @return string[]
	 */
	public function display_default_page_states( array $states, \WP_Post $post ): array {
		if ( 'page' !== $post->post_type ) {
			return $states;
		}

		if ( $post->ID === $this->get_id( 'jobs' ) ) {
			$states[] = __( 'Jobs Board', 'jobplace' );
		}

		return $states;
	}
}
