import { useBlockProps } from '@wordpress/block-editor';

const cfg = {"fallback":"Acme Corp"};

const getText = (j) => j?.company?.name;

export default ( { context } ) => {
	const blockProps = useBlockProps();
	const job = context?.job;
	const text = getText( job ) || cfg.fallback;

	return <div {...blockProps}>{ text }</div>;
};
