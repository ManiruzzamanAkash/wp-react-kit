<?php

/**
 * Plugin Name:       Job Place
 * Description:       A Job posting platform made by WordPress.
 * Requires at least: 5.8
 * Requires PHP:      7.3
 * Version:           0.3.0
 * Author:            Maniruzzaman Akash<manirujjamanakash@gmail.com>
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       jobplace
 */

// don't call the file directly
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Job_Place class.
 *
 * @class Job_Place The class that holds the entire Job_Place plugin
 */
final class Job_Place {
    /**
     * Plugin version.
     *
     * @var string
     */
    const VERSION = '0.3.0';

    /**
     * Plugin slug.
     *
     * @var string
     *
     * @since 0.2.0
     */
    const SLUG = 'jobplace';

    /**
     * Holds various class instances.
     *
     * @var array
     *
     * @since 0.2.0
     */
    private $container = [];

    /**
     * Constructor for the JobPlace class.
     *
     * Sets up all the appropriate hooks and actions within our plugin.
     *
     * @since 0.2.0
     */
    private function __construct() {
        require_once __DIR__ . '/vendor/autoload.php';

        $this->define_constants();

        register_activation_hook( __FILE__, [ $this, 'activate' ] );
        register_deactivation_hook( __FILE__, [ $this, 'deactivate' ] );

        add_action( 'wp_loaded', [ $this, 'flush_rewrite_rules' ] );
        $this->init_plugin();
    }

    /**
     * Initializes the Job_Place() class.
     *
     * Checks for an existing Job_Place() instance
     * and if it doesn't find one, creates it.
     *
     * @since 0.2.0
     *
     * @return Job_Place|bool
     */
    public static function init() {
        static $instance = false;

        if ( ! $instance ) {
            $instance = new Job_Place();
        }

        return $instance;
    }

    /**
     * Magic getter to bypass referencing plugin.
     *
     * @since 0.2.0
     *
     * @param $prop
     *
     * @return mixed
     */
    public function __get( $prop ) {
        if ( array_key_exists( $prop, $this->container ) ) {
            return $this->container[ $prop ];
        }

        return $this->{$prop};
    }

    /**
     * Magic isset to bypass referencing plugin.
     *
     * @since 0.2.0
     *
     * @param $prop
     *
     * @return mixed
     */
    public function __isset( $prop ) {
        return isset( $this->{$prop} ) || isset( $this->container[ $prop ] );
    }

    /**
     * Define the constants.
     *
     * @since 0.2.0
     *
     * @return void
     */
    public function define_constants() {
        define( 'JOB_PLACE_VERSION', self::VERSION );
        define( 'JOB_PLACE_SLUG', self::SLUG );
        define( 'JOB_PLACE_FILE', __FILE__ );
        define( 'JOB_PLACE_DIR', __DIR__ );
        define( 'JOB_PLACE_PATH', dirname( JOB_PLACE_FILE ) );
        define( 'JOB_PLACE_INCLUDES', JOB_PLACE_PATH . '/includes' );
        define( 'JOB_PLACE_TEMPLATE_PATH', JOB_PLACE_PATH . '/templates/' );
        define( 'JOB_PLACE_URL', plugins_url( '', JOB_PLACE_FILE ) );
        define( 'JOB_PLACE_BUILD', JOB_PLACE_URL . '/build' );
        define( 'JOB_PLACE_ASSETS', JOB_PLACE_URL . '/assets' );
    }

    /**
     * Load the plugin after all plugins are loaded.
     *
     * @since 0.2.0
     *
     * @return void
     */
    public function init_plugin() {
        $this->includes();
        $this->init_hooks();

        /**
         * Fires after the plugin is loaded.
         *
         * @since 0.2.0
         */
        do_action( 'job_place_loaded' );
    }

    /**
     * Activating the plugin.
     *
     * @since 0.2.0
     *
     * @return void
     */
    public function activate() {
        // Run the installer to create necessary migrations and seeders.
        $this->install();
    }

    /**
     * Placeholder for deactivation function.
     *
     * @since 0.2.0
     *
     * @return void
     */
    public function deactivate() {
        //
    }

    /**
     * Flush rewrite rules after plugin is activated.
     *
     * Nothing being added here yet.
     *
     * @since 0.2.0
     */
    public function flush_rewrite_rules() {
        // fix rewrite rules
    }

    /**
     * Run the installer to create necessary migrations and seeders.
     *
     * @since 0.3.0
     *
     * @return void
     */
    private function install() {
        $installer = new \Akash\JobPlace\Setup\Installer();
        $installer->run();
    }

    /**
     * Include the required files.
     *
     * @since 0.2.0
     *
     * @return void
     */
    public function includes() {
        if ( $this->is_request( 'admin' ) ) {
            $this->container['admin_menu'] = new Akash\JobPlace\Admin\Menu();
        }
    }

    /**
     * Initialize the hooks.
     *
     * @since 0.2.0
     *
     * @return void
     */
    public function init_hooks() {
        // Init classes
        add_action( 'init', [ $this, 'init_classes' ] );

        // Localize our plugin
        add_action( 'init', [ $this, 'localization_setup' ] );

        // Add the plugin page links
        add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), [ $this, 'plugin_action_links' ] );
    }

    /**
     * Instantiate the required classes.
     *
     * @since 0.2.0
     *
     * @return void
     */
    public function init_classes() {
        // Init necessary hooks
        new Akash\JobPlace\User\Hooks();

        // Common classes
        $this->container['assets']   = new Akash\JobPlace\Assets\Manager();
        $this->container['rest_api'] = new Akash\JobPlace\REST\Manager();
        $this->container['jobs']     = new Akash\JobPlace\Jobs\Manager();
    }

    /**
     * Initialize plugin for localization.
     *
     * @uses load_plugin_textdomain()
     *
     * @since 0.2.0
     *
     * @return void
     */
    public function localization_setup() {
        load_plugin_textdomain( 'jobplace', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );

        // Load the React-pages translations.
        if ( is_admin() ) {
            // Check if handle is registered in wp-script
            $this->container['assets']->register_all_scripts();

            // Load wp-script translation for job-place-app
            wp_set_script_translations( 'job-place-app', 'jobplace', plugin_dir_path( __FILE__ ) . 'languages/' );
        }
    }

    /**
     * What type of request is this.
     *
     * @since 0.2.0
     *
     * @param string $type admin, ajax, cron or frontend
     *
     * @return bool
     */
    private function is_request( $type ) {
        switch ( $type ) {
            case 'admin':
                return is_admin();

            case 'ajax':
                return defined( 'DOING_AJAX' );

            case 'rest':
                return defined( 'REST_REQUEST' );

            case 'cron':
                return defined( 'DOING_CRON' );

            case 'frontend':
                return ( ! is_admin() || defined( 'DOING_AJAX' ) ) && ! defined( 'DOING_CRON' );
        }
    }

    /**
     * Plugin action links
     *
     * @param array $links
     *
     * @since 0.2.0
     *
     * @return array
     */
    public function plugin_action_links( $links ) {
        $links[] = '<a href="' . admin_url( 'admin.php?page=jobplace#/settings' ) . '">' . __( 'Settings', 'jobplace' ) . '</a>';
        $links[] = '<a href="https://github.com/ManiruzzamanAkash/wp-react-kit#quick-start" target="_blank">' . __( 'Documentation', 'jobplace' ) . '</a>';

        return $links;
    }
}

/**
 * Initialize the main plugin.
 *
 * @since 0.2.0
 *
 * @return \Job_Place|bool
 */
function job_place() {
    return Job_Place::init();
}

/*
 * Kick-off the plugin.
 *
 * @since 0.2.0
 */
job_place();
