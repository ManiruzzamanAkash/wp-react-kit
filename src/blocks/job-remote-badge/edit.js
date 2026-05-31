import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default ( { attributes, setAttributes, context } ) => {
	const { label } = attributes;
	const blockProps = useBlockProps( {
		className: 'jobplace-job-badge jobplace-job-badge--remote',
	} );
	const job = context?.job;
	const visible = job ? !! job.is_remote : true;

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Badge settings', 'jobplace' ) }>
					<TextControl
						label={ __( 'Label', 'jobplace' ) }
						value={ label }
						onChange={ ( value ) => setAttributes( { label: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<span
				{ ...blockProps }
				style={ { opacity: visible ? 1 : 0.35 } }
				aria-hidden={ ! visible }
			>
				{ label || __( 'Remote', 'jobplace' ) }
			</span>
		</>
	);
};
