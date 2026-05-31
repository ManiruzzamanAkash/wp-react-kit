import { useBlockProps } from '@wordpress/block-editor';

const cfg = {"fallback":"Dec 31, 2026"};

const getText = (j) => j?.application_deadline || '';

export default ( { context } ) => {
	const blockProps = useBlockProps();
	const job = context?.job;
	const text = getText( job ) || cfg.fallback;

	return <div {...blockProps}>{ text }</div>;
};
