<?php

namespace Akash\JobPlace\Setup;

use Akash\JobPlace\WordPress\Pages\PageService;

/**
 * Seed default front-end pages on install.
 */
class PageSeeder {

	/**
	 * @var PageService
	 */
	private PageService $pages;

	/**
	 * Constructor.
	 *
	 * @param PageService|null $pages Page service.
	 */
	public function __construct( ?PageService $pages = null ) {
		$this->pages = $pages ?? new PageService();
	}

	/**
	 * Seed plugin pages.
	 *
	 * @return void
	 */
	public function seed(): void {
		if ( ! apply_filters( 'jobplace/seed/pages', true ) ) {
			return;
		}

		$this->create_jobs_page();
	}

	/**
	 * Create the default jobs board page (like SureCart shop page).
	 *
	 * @return void
	 */
	public function create_jobs_page(): void {
		$pattern_file = JOB_PLACE_PATH . '/templates/patterns/jobs-board-default.php';

		if ( ! is_readable( $pattern_file ) ) {
			return;
		}

		$pattern = require $pattern_file;

		if ( empty( $pattern['content'] ) ) {
			return;
		}

		$page = apply_filters(
			'jobplace/create_jobs_page',
			[
				'slug'    => _x( 'jobs', 'Jobs board page slug', 'jobplace' ),
				'title'   => _x( 'Jobs', 'Jobs board page title', 'jobplace' ),
				'content' => $pattern['content'],
			]
		);

		$this->pages->find_or_create(
			$page['slug'],
			'jobs',
			$page['title'],
			$page['content']
		);
	}
}
