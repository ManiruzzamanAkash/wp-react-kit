<?php

use Akash\JobPlace\Blocks\TemplateItemAttributes;

$list_wrapper = TemplateItemAttributes::get_list_wrapper( $attributes );
$item_wrapper = TemplateItemAttributes::get( $attributes );
?>
<div
	class="<?php echo esc_attr( $list_wrapper['class'] ); ?>"
	<?php echo $list_wrapper['style'] ? 'style="' . esc_attr( $list_wrapper['style'] ) . '"' : ''; ?>
	role="list"
>
	<template
		data-wp-each--job="state.jobs"
		data-wp-each-key="context.job.id"
	>
		<article
			class="<?php echo esc_attr( $item_wrapper['class'] ); ?>"
			<?php echo $item_wrapper['style'] ? 'style="' . esc_attr( $item_wrapper['style'] ) . '"' : ''; ?>
			role="listitem"
		>
			<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</article>
	</template>
</div>
