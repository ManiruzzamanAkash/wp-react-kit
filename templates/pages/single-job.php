<?php
/**
 * Job detail page template.
 *
 * @package JobPlace
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>
<main id="primary" class="site-main jobplace-single-job">
	<?php do_action( 'jobplace_single_job_content' ); ?>
</main>
<?php
get_footer();
