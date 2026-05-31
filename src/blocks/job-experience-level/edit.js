import { useBlockProps } from '@wordpress/block-editor';

const cfg = {"fallback":"Senior level"};

const getText = (j) => ({ entry: 'Entry level', mid: 'Mid level', senior: 'Senior level', lead: 'Lead' }[j?.experience_level] || j?.experience_level);

export default ( { context } ) => {
	const blockProps = useBlockProps();
	const job = context?.job;
	const text = getText( job ) || cfg.fallback;

	return <div {...blockProps}>{ text }</div>;
};
