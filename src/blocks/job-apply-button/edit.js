import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	__experimentalGetElementClassName as getElementClassName,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, SelectControl } from '@wordpress/components';

export default ( { attributes, setAttributes, context } ) => {
	const { text, buttonStyle, openInNewTab } = attributes;
	const blockProps = useBlockProps( {
		className: 'jobplace-job-apply-button wp-block-buttons',
	} );
	const job = context?.job;
	const label = text || __( 'Apply now', 'jobplace' );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Button settings', 'jobplace' ) }>
					<TextControl
						label={ __( 'Button text', 'jobplace' ) }
						value={ text }
						onChange={ ( value ) => setAttributes( { text: value } ) }
					/>
					<SelectControl
						label={ __( 'Button style', 'jobplace' ) }
						value={ buttonStyle }
						options={ [
							{
								label: __( 'Fill', 'jobplace' ),
								value: 'is-style-fill',
							},
							{
								label: __( 'Outline', 'jobplace' ),
								value: 'is-style-outline',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { buttonStyle: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Open in new tab', 'jobplace' ) }
						checked={ openInNewTab }
						onChange={ ( value ) =>
							setAttributes( { openInNewTab: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<div className={ `wp-block-button ${ buttonStyle }` }>
					<span className={ getElementClassName( 'button' ) }>
						{ label }
					</span>
				</div>
			</div>
		</>
	);
};
