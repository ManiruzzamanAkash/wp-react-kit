import { useBlockProps } from '@wordpress/block-editor';
import { useMemo } from '@wordpress/element';
import { getEditorJobsCountLabel } from '../shared/preview-jobs';

export default ( { context } ) => {
	const blockProps = useBlockProps();
	const label = useMemo(
		() => getEditorJobsCountLabel( context?.query ),
		[ context?.query ]
	);

	return <div { ...blockProps }>{ label }</div>;
};
