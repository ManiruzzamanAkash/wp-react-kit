<?php
/**
 * Example block markup
 *
 * @var array    $attributes         Block attributes.
 * @var string   $content            Block content.
 * @var WP_Block $block              Block instance.
 * @var array    $context            Block context.
 */

?>
<div <?php echo get_block_wrapper_attributes(); // phpcs:ignore ?>>
    <h2 class="wp-block-wp-react-kit-header_title">
        <?php echo wp_kses_post( $attributes['title'] ); ?>
    </h2>

    <div class="wp-block-wp-react-kit-header_description">
        <?php echo wp_kses_post( $attributes['description'] ); ?>
    </div>
</div>