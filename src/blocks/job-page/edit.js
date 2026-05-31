import { __ } from '@wordpress/i18n';
import { useMemo, useState } from '@wordpress/element';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	BlockControls,
	BlockContextProvider,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { getEditorPreviewJob } from '../shared/preview-jobs';
import PatternsToolbar from '../shared/patterns-toolbar';
import PatternSelectionModal from '../shared/pattern-selection-modal';
import { TEMPLATE } from './template';

export default ( { attributes, setAttributes, clientId, name } ) => {
	const [ isPatternSelectionModalOpen, setIsPatternSelectionModalOpen ] =
		useState( false );
	const blockProps = useBlockProps( { className: 'jobplace-job-page' } );
	const previewJob = useMemo(
		() => getEditorPreviewJob( attributes.jobId ),
		[ attributes.jobId ]
	);
	const { jobs } = useMemo(
		() => ( {
			jobs: window.jobPlaceBlockData?.previewPool ||
				window.jobPlaceBlockData?.placeholderJobs ||
				[],
		} ),
		[]
	);
	const options = [
		{ label: __( 'Use front-end job', 'jobplace' ), value: 0 },
		...jobs.map( ( job ) => ( {
			label: job.title,
			value: job.id,
		} ) ),
	];

	return (
		<>
			<BlockControls>
				<PatternsToolbar
					name={ name }
					clientId={ clientId }
					openPatternSelectionModal={ () =>
						setIsPatternSelectionModalOpen( true )
					}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Preview job', 'jobplace' ) }>
					<SelectControl
						label={ __( 'Job', 'jobplace' ) }
						value={ attributes.jobId || 0 }
						options={ options }
						onChange={ ( jobId ) =>
							setAttributes( { jobId: parseInt( jobId, 10 ) || 0 } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<BlockContextProvider value={ { job: previewJob } }>
				<div { ...blockProps }>
					<InnerBlocks template={ TEMPLATE } templateLock={ false } />
				</div>
			</BlockContextProvider>
			{ isPatternSelectionModalOpen && (
				<PatternSelectionModal
					clientId={ clientId }
					attributes={ attributes }
					setIsPatternSelectionModalOpen={
						setIsPatternSelectionModalOpen
					}
					name={ name }
				/>
			) }
		</>
	);
};
