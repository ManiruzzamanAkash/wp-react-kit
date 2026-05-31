/**
 * WordPress dependencies
 */
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { usePatterns } from './pattern-utils';

export default function PatternsToolbar( {
	openPatternSelectionModal,
	name,
	clientId,
} ) {
	const hasPatterns = !! usePatterns( clientId, name ).length;

	if ( ! hasPatterns ) {
		return null;
	}

	return (
		<ToolbarGroup className="wp-block-template-part__block-control-group">
			<ToolbarButton onClick={ openPatternSelectionModal }>
				{ __( 'Replace', 'jobplace' ) }
			</ToolbarButton>
		</ToolbarGroup>
	);
}
