import { useBlockProps } from '@wordpress/block-editor';

const cfg = {"fallback":"Senior WordPress Developer"};

const getText = (j) => j?.title;

export default ( { context } ) => {
	const blockProps = useBlockProps();
	const job = context?.job;
	const text = getText( job ) || cfg.fallback;

	return <div {...blockProps}>{ text }</div>;
};
