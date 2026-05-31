import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';

const stripHtml = ( value ) => ( value || '' ).replace( /<[^>]+>/g, ' ' ).trim();

const truncate = ( text, length ) => {
	if ( ! length ) {
		return text;
	}

	return text.length > length
		? `${ text.slice( 0, Math.max( 0, length - 1 ) ) }…`
		: text;
};

export default ( { attributes, setAttributes, context } ) => {
	const { excerptLength } = attributes;
	const blockProps = useBlockProps( { className: 'jobplace-job-description' } );
	const job = context?.job;
	const fallback = __(
		'Build and maintain WordPress plugins and themes.',
		'jobplace'
	);
	const text = truncate(
		stripHtml( job?.description ) || fallback,
		excerptLength
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Description settings', 'jobplace' ) }>
					<RangeControl
						label={ __( 'Excerpt length (0 = full text)', 'jobplace' ) }
						value={ excerptLength }
						onChange={ ( value ) =>
							setAttributes( { excerptLength: value } )
						}
						min={ 0 }
						max={ 500 }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>{ text }</div>
		</>
	);
};
