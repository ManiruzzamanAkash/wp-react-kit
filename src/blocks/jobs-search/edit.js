import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default ( { attributes, setAttributes } ) => {
	const { placeholder, buttonText } = attributes;
	const blockProps = useBlockProps( { className: 'jobplace-jobs-search' } );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Search settings', 'jobplace' ) }>
					<TextControl
						label={ __( 'Placeholder', 'jobplace' ) }
						value={ placeholder }
						onChange={ ( value ) =>
							setAttributes( { placeholder: value } )
						}
					/>
					<TextControl
						label={ __( 'Button text', 'jobplace' ) }
						value={ buttonText }
						onChange={ ( value ) =>
							setAttributes( { buttonText: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<form { ...blockProps }>
				<input
					className="jobplace-jobs-search__input"
					type="search"
					placeholder={ placeholder }
					disabled
				/>
				<div className="wp-block-buttons">
					<div className="wp-block-button is-style-fill">
						<button
							type="button"
							className="wp-block-button__link wp-element-button"
							disabled
						>
							{ buttonText }
						</button>
					</div>
				</div>
			</form>
		</>
	);
};
