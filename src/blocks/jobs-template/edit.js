import { useMemo } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import TemplateListEdit from '../../components/TemplateListEdit';
import { getEditorJobContexts } from '../shared/preview-jobs';
import { TEMPLATE } from './template';

export default ( { clientId, context, __unstableLayoutClassNames = '' } ) => {
	const blockProps = useBlockProps( {
		className: [
			'jobplace-jobs-template',
			__unstableLayoutClassNames,
		]
			.filter( Boolean )
			.join( ' ' ),
	} );
	const blockContexts = useMemo(
		() => getEditorJobContexts( context?.query ),
		[ context?.query ]
	);

	return (
		<TemplateListEdit
			clientId={ clientId }
			blockContexts={ blockContexts }
			template={ TEMPLATE }
			blockProps={ blockProps }
			itemProps={ { className: 'jobplace-job-card' } }
		/>
	);
};
