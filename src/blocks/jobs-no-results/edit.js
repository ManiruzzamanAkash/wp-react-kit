import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import { getEditorPreviewJobs } from '../shared/preview-jobs';

export default ( { attributes, setAttributes, context } ) => {
	const { message } = attributes;
	const blockProps = useBlockProps( { className: 'jobplace-jobs-no-results' } );
	const { jobs } = useMemo(
		() => getEditorPreviewJobs( context?.query ),
		[ context?.query ]
	);

	if ( jobs.length ) {
		return null;
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'No results settings', 'jobplace' ) }>
					<TextControl
						label={ __( 'Message', 'jobplace' ) }
						value={ message }
						onChange={ ( value ) =>
							setAttributes( { message: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				{ message || __( 'No jobs found.', 'jobplace' ) }
			</div>
		</>
	);
};
