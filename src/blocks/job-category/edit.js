import { useBlockProps } from '@wordpress/block-editor';

const cfg = {"fallback":"Engineering"};

const getText = (j) => j?.job_category?.name || j?.category;

export default ( { context } ) => {
	const blockProps = useBlockProps();
	const job = context?.job;
	const text = getText( job ) || cfg.fallback;

	return <div {...blockProps}>{ text }</div>;
};
