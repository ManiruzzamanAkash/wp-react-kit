import { __ } from '@wordpress/i18n';
import { useMemo, useState } from '@wordpress/element';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	BlockControls,
} from '@wordpress/block-editor';
import { BlockContextProvider } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	Notice,
} from '@wordpress/components';
import { getEditorPreviewJobs } from '../shared/preview-jobs';
import PatternsToolbar from '../shared/patterns-toolbar';
import PatternSelectionModal from '../shared/pattern-selection-modal';
import { TEMPLATE } from './template';

const ANY = '';

const triStateOptions = ( anyLabel ) => [
	{ label: anyLabel, value: ANY },
	{ label: __( 'Yes', 'jobplace' ), value: '1' },
	{ label: __( 'No', 'jobplace' ), value: '0' },
];

export default ( { attributes, setAttributes, clientId, name } ) => {
	const [ isPatternSelectionModalOpen, setIsPatternSelectionModalOpen ] =
		useState( false );
	const { query } = attributes;
	const blockProps = useBlockProps( { className: 'jobplace-jobs-board' } );
	const blockData = window.jobPlaceBlockData || {};
	const { usingPlaceholders } = useMemo(
		() => getEditorPreviewJobs( query ),
		[ query ]
	);

	const updateQuery = ( patch ) => {
		setAttributes( { query: { ...query, ...patch } } );
	};

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
				<PanelBody title={ __( 'Query', 'jobplace' ) } initialOpen>
					<RangeControl
						label={ __( 'Jobs per page', 'jobplace' ) }
						value={ query.perPage }
						onChange={ ( perPage ) => updateQuery( { perPage } ) }
						min={ 1 }
						max={ 50 }
					/>
					<SelectControl
						label={ __( 'Order by', 'jobplace' ) }
						value={ query.orderby }
						options={ [
							{ label: __( 'Latest', 'jobplace' ), value: 'id' },
							{ label: __( 'Title', 'jobplace' ), value: 'title' },
						] }
						onChange={ ( orderby ) => updateQuery( { orderby } ) }
					/>
					<SelectControl
						label={ __( 'Order', 'jobplace' ) }
						value={ query.order || 'desc' }
						options={ [
							{ label: __( 'Descending', 'jobplace' ), value: 'desc' },
							{ label: __( 'Ascending', 'jobplace' ), value: 'asc' },
						] }
						onChange={ ( order ) => updateQuery( { order } ) }
					/>
					<SelectControl
						label={ __( 'Status', 'jobplace' ) }
						value={ query.status }
						options={ [
							{
								label: __( 'Published', 'jobplace' ),
								value: 'published',
							},
							{
								label: __( 'Draft', 'jobplace' ),
								value: 'draft',
							},
						] }
						onChange={ ( status ) => updateQuery( { status } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Filters', 'jobplace' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Featured', 'jobplace' ) }
						value={
							undefined === query.is_featured || null === query.is_featured
								? ANY
								: String( query.is_featured )
						}
						options={ triStateOptions( __( 'Any featured status', 'jobplace' ) ) }
						onChange={ ( value ) =>
							updateQuery( {
								is_featured: ANY === value ? undefined : parseInt( value, 10 ),
							} )
						}
					/>
					<SelectControl
						label={ __( 'Remote', 'jobplace' ) }
						value={
							undefined === query.is_remote || null === query.is_remote
								? ANY
								: String( query.is_remote )
						}
						options={ triStateOptions( __( 'Any remote status', 'jobplace' ) ) }
						onChange={ ( value ) =>
							updateQuery( {
								is_remote: ANY === value ? undefined : parseInt( value, 10 ),
							} )
						}
					/>
					<SelectControl
						label={ __( 'Negotiable salary', 'jobplace' ) }
						value={
							undefined === query.is_negotiable || null === query.is_negotiable
								? ANY
								: String( query.is_negotiable )
						}
						options={ triStateOptions( __( 'Any negotiable status', 'jobplace' ) ) }
						onChange={ ( value ) =>
							updateQuery( {
								is_negotiable:
									ANY === value ? undefined : parseInt( value, 10 ),
							} )
						}
					/>
					<SelectControl
						label={ __( 'Experience level', 'jobplace' ) }
						value={ query.experience_level || ANY }
						options={ [
							{ label: __( 'Any experience', 'jobplace' ), value: ANY },
							...( blockData.experienceLevels || [] ),
						] }
						onChange={ ( value ) =>
							updateQuery( {
								experience_level: ANY === value ? '' : value,
							} )
						}
					/>
					<SelectControl
						label={ __( 'Job type', 'jobplace' ) }
						value={ String( query.job_type_id || ANY ) }
						options={ [
							{ label: __( 'Any job type', 'jobplace' ), value: ANY },
							...( blockData.jobTypes || [] ),
						] }
						onChange={ ( value ) =>
							updateQuery( {
								job_type_id: ANY === value ? 0 : parseInt( value, 10 ),
							} )
						}
					/>
					<SelectControl
						label={ __( 'Category', 'jobplace' ) }
						value={ String( query.job_category_id || ANY ) }
						options={ [
							{ label: __( 'Any category', 'jobplace' ), value: ANY },
							...( blockData.jobCategories || [] ),
						] }
						onChange={ ( value ) =>
							updateQuery( {
								job_category_id: ANY === value ? 0 : parseInt( value, 10 ),
							} )
						}
					/>
					<SelectControl
						label={ __( 'Company', 'jobplace' ) }
						value={ String( query.company_id || ANY ) }
						options={ [
							{ label: __( 'Any company', 'jobplace' ), value: ANY },
							...( blockData.companies || [] ),
						] }
						onChange={ ( value ) =>
							updateQuery( {
								company_id: ANY === value ? 0 : parseInt( value, 10 ),
							} )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				{ usingPlaceholders && (
					<Notice status="info" isDismissible={ false }>
						{ __(
							'Showing sample jobs in the editor. Published jobs from your database will appear on the front end.',
							'jobplace'
						) }
					</Notice>
				) }
				<InnerBlocks template={ TEMPLATE } templateLock={ false } />
			</div>
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
