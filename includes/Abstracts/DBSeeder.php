<?php

namespace Akash\JobPlace\Abstracts;

/**
 * Abstract class to handle the seeder classes.
 *
 * @since 0.3.0
 */
abstract class DBSeeder {

    /**
     * Run the seeders of the database.
     *
     * @since 0.3.0
     *
     * @return void
     */
    abstract public function run();
}
