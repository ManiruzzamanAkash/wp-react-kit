/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { cloneBlock } from '@wordpress/blocks';
import { store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Clone pattern blocks and preserve root block attributes (query, jobId).
 *
 * @param {import('@wordpress/blocks').WPBlock[]} blocks
 * @param {Record<string,*>}                      rootAttributes
 * @param {string}                                blockName
 * @return {{ newBlocks: import('@wordpress/blocks').WPBlock[], rootClientIds: string[] }}
 */
export const getTransformedBlocksFromPattern = (
	blocks,
	rootAttributes,
	blockName
) => {
	const clonedBlocks = blocks.map( ( block ) => cloneBlock( block ) );
	const rootClientIds = [];
	const blocksQueue = [ ...clonedBlocks ];

	while ( blocksQueue.length > 0 ) {
		const block = blocksQueue.shift();

		if ( block.name === blockName ) {
			if ( rootAttributes.query ) {
				block.attributes.query = {
					...block.attributes.query,
					...rootAttributes.query,
				};
			}
			if ( rootAttributes.jobId ) {
				block.attributes.jobId = rootAttributes.jobId;
			}
			rootClientIds.push( block.clientId );
		}

		block.innerBlocks?.forEach( ( innerBlock ) => {
			blocksQueue.push( innerBlock );
		} );
	}

	return { newBlocks: clonedBlocks, rootClientIds };
};

/**
 * Patterns registered for a block type.
 *
 * @param {string} clientId
 * @param {string} blockName
 * @return {Object[]}
 */
export const usePatterns = ( clientId, blockName ) => {
	return useSelect(
		( select ) => {
			const { getBlockRootClientId, getPatternsByBlockTypes } =
				select( blockEditorStore );
			const rootClientId = getBlockRootClientId( clientId );
			return getPatternsByBlockTypes( blockName, rootClientId );
		},
		[ blockName, clientId ]
	);
};

/**
 * Filter patterns by search term.
 *
 * @param {Object[]} patterns
 * @param {string}   searchValue
 * @return {Object[]}
 */
export function searchPatterns( patterns = [], searchValue = '' ) {
	if ( ! searchValue ) {
		return patterns;
	}

	const term = searchValue.toLowerCase();

	return patterns.filter( ( pattern ) => {
		const title = ( pattern.title || '' ).toLowerCase();
		const description = ( pattern.description || '' ).toLowerCase();
		return title.includes( term ) || description.includes( term );
	} );
}
