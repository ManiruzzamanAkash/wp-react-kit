<?php

namespace Akash\JobPlace\Abstracts;

/**
 * Database migration class.
 *
 * Abstract class to handle database migration classes.
 */
abstract class DBMigrator {

	/**
	 * Migrate the database table.
	 *
	 * @since 0.3.0
	 *
	 * @return void
	 * */
	abstract public static function migrate();
}
