/**
 * WordPress dependencies
 */
import { useState, useMemo } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { Modal, SearchControl } from '@wordpress/components';
import { useAsyncList } from '@wordpress/compose';
import {
	BlockContextProvider,
	store as blockEditorStore,
	__experimentalBlockPatternsList as BlockPatternsList,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	getTransformedBlocksFromPattern,
	usePatterns,
	searchPatterns,
} from './pattern-utils';

export default function PatternSelectionModal( {
	clientId,
	attributes,
	setIsPatternSelectionModalOpen,
	name,
} ) {
	const [ searchValue, setSearchValue ] = useState( '' );
	const { replaceBlock, selectBlock } = useDispatch( blockEditorStore );
	const blockPatterns = usePatterns( clientId, name );

	const onBlockPatternSelect = ( _, blocks ) => {
		const { newBlocks, rootClientIds } = getTransformedBlocksFromPattern(
			blocks,
			attributes,
			name
		);

		if ( newBlocks[ 0 ] ) {
			newBlocks[ 0 ].attributes = {
				...newBlocks[ 0 ].attributes,
				...attributes,
			};
		}

		replaceBlock( clientId, newBlocks );
		if ( rootClientIds[ 0 ] ) {
			selectBlock( rootClientIds[ 0 ] );
		}
	};

	const previewJob = useMemo( () => {
		const data = window.jobPlaceBlockData || {};
		return data.previewPool?.[ 0 ] || data.placeholderJobs?.[ 0 ] || null;
	}, [] );

	const blockPreviewContext = useMemo(
		() => ( previewJob ? { job: previewJob } : {} ),
		[ previewJob ]
	);

	const filteredBlockPatterns = useMemo(
		() => searchPatterns( blockPatterns, searchValue ),
		[ blockPatterns, searchValue ]
	);
	const shownBlockPatterns = useAsyncList( filteredBlockPatterns );

	return (
		<Modal
			overlayClassName="block-library-query-pattern__selection-modal"
			title={ __( 'Choose a pattern', 'jobplace' ) }
			onRequestClose={ () => setIsPatternSelectionModalOpen( false ) }
			isFullScreen
		>
			<div className="block-library-query-pattern__selection-content">
				<div className="block-library-query-pattern__selection-search">
					<SearchControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						onChange={ setSearchValue }
						value={ searchValue }
						label={ __( 'Search for patterns', 'jobplace' ) }
						placeholder={ __( 'Search', 'jobplace' ) }
					/>
				</div>
				<BlockContextProvider value={ blockPreviewContext }>
					<BlockPatternsList
						blockPatterns={ filteredBlockPatterns }
						shownPatterns={ shownBlockPatterns }
						onClickPattern={ onBlockPatternSelect }
					/>
				</BlockContextProvider>
			</div>
		</Modal>
	);
}
