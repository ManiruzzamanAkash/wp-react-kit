<?php

/**
 * PHPUnit bootstrap file.
 *
 * Loads the necessary setup to run the tests.
 * This file will be called first by the test runner.
 * Before running any tests.
 */

// Composer autoloader must be loaded before WP_PHPUNIT__DIR will be available
require_once dirname( __FILE__, 3 ) . '/vendor/autoload.php';
$_tests_dir = getenv( 'WP_TESTS_DIR' ) ? getenv( 'WP_TESTS_DIR' ) : getenv( 'WP_PHPUNIT__DIR' );

if ( ! $_tests_dir ) {
	$_tests_dir = rtrim( sys_get_temp_dir(), '/\\' ) . '/wordpress-tests-lib';
}

if ( ! file_exists( "{$_tests_dir}/includes/functions.php" ) ) {
	echo "Could not find {$_tests_dir}/includes/functions.php, have you run bin/install-wp-tests.sh ?" . PHP_EOL; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	exit( 1 );
}

// Give access to tests_add_filter() function.
require_once "{$_tests_dir}/includes/functions.php";

/**
 * Manually load the plugin being tested.
 *
 * @since 0.3.1
 *
 * @return void
 */
function _manually_load_plugin(): void {
	_manually_load_required_plugins();
	require_once dirname( dirname( dirname( __FILE__ ) ) ) . '/job-place.php';
}

/**
 * Load any external plugin if needs.
 *
 * @since 0.3.1
 *
 * @example for Woocommerce Installation
 *
 * @return void
 */
function _manually_load_required_plugins(): void {
	/*
	$file = dirname( dirname( dirname( dirname( __FILE__ ) ) ) ) . '/woocommerce/woocommerce.php';

	if ( file_exists( $file ) ) {
		require $file;
	} else {
		echo 'could not find woocommerce plugin ' . $file . PHP_EOL; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		exit( 1 );
	}
	*/
}

tests_add_filter( 'muplugins_loaded', '_manually_load_plugin' );

/**
 * Install database tables for this plugin.
 *
 * @since 0.3.1
 *
 * @return void
 */
function install_plugin_databases(): void {
	_manually_load_plugin();

	$installer = new \Akash\JobPlace\Setup\Installer();
	$installer->run();
}

/**
 * After setup theme install any needed plugins.
 *
 * @since 0.3.1
 *
 * @example for Woocommerce Installation
 *
 * @return void
 */
function install_necessary_plugins(): void {
	// clean existing install first
	/*
	define( 'WP_UNINSTALL_PLUGIN', true );
	define( 'WC_REMOVE_ALL_DATA', true );

	include dirname( dirname( dirname( dirname( __FILE__ ) ) ) ) . '/woocommerce/uninstall.php';

	WC_Install::install();

	// Reload capabilities after install, see https://core.trac.wordpress.org/ticket/28374.
	if ( version_compare( $GLOBALS['wp_version'], '4.7', '<' ) ) {
		$GLOBALS['wp_roles']->reinit();
	} else {
		$GLOBALS['wp_roles'] = null; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
		wp_roles();
	}

	echo esc_html( 'Installing WooCommerce...' . PHP_EOL );
	*/
}

tests_add_filter( 'setup_theme', 'install_plugin_databases' );
tests_add_filter( 'setup_theme', 'install_necessary_plugins' );

// Start up the WP testing environment.
require "{$_tests_dir}/includes/bootstrap.php";