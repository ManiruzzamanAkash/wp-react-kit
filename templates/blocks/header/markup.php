<?php
/**
 * Example block markup
 *
 * @var array    $attributes         Block attributes.
 * @var string   $content            Block content.
 * @var WP_Block $block              Block instance.
 * @var array    $context            Block context.
 */

$padding = $attributes['padding'];
$padding_string = $padding['top'] . ' ' . $padding['right'] . ' ' . $padding['bottom'] . ' ' . $padding['left'];

?>
<div 
    <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>
    style="background-color: <?php echo esc_attr( $attributes['bgColor'] ); ?>; padding: <?php echo esc_attr( $padding_string ); ?>; "
>
    <h2 class="wp-block-wp-react-kit-header_title">
        <?php echo esc_html( $attributes['title'] ); ?>
    </h2>

    <div class="wp-block-wp-react-kit-header_description">
        <?php echo wp_kses_post( $attributes['description'] ); ?>
    </div>
</div>
