<?php

namespace Akash\JobPlace\User;

/**
 * User related hooks.
 *
 * @since 0.3.0
 */
class Hooks {

    /**
     * Constructor.
     *
     * @since 0.3.0
     */
    public function __construct() {
        // Add user type meta.
        add_action( 'show_user_profile', [ $this, 'add_user_type_field' ] );
        add_action( 'user_new_form', [ $this, 'add_user_type_field' ] );
        add_action( 'edit_user_profile', [ $this, 'add_user_type_field' ] );

        // Save user type field.
        add_action( 'user_register', [ $this, 'save_user_type_field' ] );
        add_action( 'profile_update', [ $this, 'save_user_type_field' ] );
    }

    /**
     * Add user type field.
     *
     * @since 0.3.0
     *
     * @param \WP_User $user
     *
     * @return void
     */
    public function add_user_type_field( $user ): void {
        if ( ! empty( $user->ID ) ) {
            $user_type = get_user_meta( $user->ID, 'user_type', true );
        } else {
            $user_type = '';
        }
        ?>
        <table class="form-table">
            <tr>
                <th><label for="user_type"><?php esc_html_e( 'User type', 'jobplace' ); ?></label></th>
                <td>
                    <select name="user_type" id="user_type">
                        <option value=""><?php esc_html_e( '-- Select user type --', 'jobplace' ); ?></option>
                        <option value="company" <?php selected( $user_type, 'company' ); ?>><?php esc_html_e( 'Company', 'jobplace' ); ?></option>
                        <option value="candidate" <?php selected( $user_type, 'candidate' ); ?>><?php esc_html_e( 'Candidate', 'jobplace' ); ?></option>
                    </select>
                    <!-- Create hidden nonce field -->
                    <input type="hidden" name="user_type_nonce" value="<?php echo wp_create_nonce( 'user_type_nonce' ); ?>" />
                </td>
            </tr>
        </table>
        <?php
    }

    /**
     * Save user type field.
     *
     * @since 0.3.0
     *
     * @param \WP_User $user
     *
     * @return void
     */
    public function save_user_type_field( $user ): void {
        // Verify nonce
        if ( ! isset( $_POST['user_type_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['user_type_nonce'] ) ), 'user_type_nonce' ) ) {
            return;
        }

        // Check if user type is set.
        if ( ! isset( $_POST['user_type'] ) ) {
            return;
        }

        update_user_meta( $user, 'user_type', sanitize_text_field( wp_unslash( $_POST['user_type'] ) ) );
    }
}
