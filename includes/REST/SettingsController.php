<?php

namespace Akash\JobPlace\REST;

use Akash\JobPlace\Abstracts\RESTController;
use Akash\JobPlace\Common\Settings;
use WP_REST_Server;

/**
 * Plugin settings REST API.
 */
class SettingsController extends RESTController {

	/**
	 * Route base.
	 *
	 * @var string
	 */
	protected $base = 'settings';

	/**
	 * Register routes.
	 *
	 * @return void
	 */
	public function register_routes(): void {
		register_rest_route(
			$this->namespace,
			'/' . $this->base,
			[
				[
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => [ $this, 'get_item' ],
					'permission_callback' => [ $this, 'check_permission' ],
				],
				[
					'methods'             => WP_REST_Server::EDITABLE,
					'callback'            => [ $this, 'update_item' ],
					'permission_callback' => [ $this, 'check_permission' ],
					'args'                => $this->get_endpoint_args(),
				],
			]
		);
	}

	/**
	 * Permission check.
	 *
	 * @return bool
	 */
	public function check_permission(): bool {
		return current_user_can( 'manage_options' );
	}

	/**
	 * Get settings.
	 *
	 * @param \WP_REST_Request $request Request.
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function get_item( $request ) {
		return rest_ensure_response( Settings::to_array() );
	}

	/**
	 * Update settings.
	 *
	 * @param \WP_REST_Request $request Request.
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function update_item( $request ) {
		$params = $request->get_json_params();

		if ( ! is_array( $params ) ) {
			$params = $request->get_params();
		}

		Settings::update( $params );

		return rest_ensure_response( Settings::to_array() );
	}

	/**
	 * Endpoint args for updates.
	 *
	 * @return array<string, array>
	 */
	protected function get_endpoint_args(): array {
		return [
			'job_detail_pattern' => [
				'type' => 'string',
			],
			'jobs_per_page' => [
				'type'    => 'integer',
				'minimum' => 1,
				'maximum' => 50,
			],
			'default_apply_button_text' => [
				'type' => 'string',
			],
			'jobs_page_id' => [
				'type' => 'integer',
			],
		];
	}
}
