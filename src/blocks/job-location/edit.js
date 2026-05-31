import { useBlockProps } from '@wordpress/block-editor';

const cfg = {"fallback":"Remote"};

const getText = (j) => j?.is_remote ? (j?.location ? `${j.location} (Remote)` : 'Remote') : (j?.location || 'Remote');

export default ( { context } ) => {
	const blockProps = useBlockProps();
	const job = context?.job;
	const text = getText( job ) || cfg.fallback;

	return <div {...blockProps}>{ text }</div>;
};
