import { useBlockProps } from '@wordpress/block-editor';

const cfg = {"fallback":"Full-time"};

const getText = (j) => j?.job_type?.name;

export default ( { context } ) => {
	const blockProps = useBlockProps();
	const job = context?.job;
	const text = getText( job ) || cfg.fallback;

	return <div {...blockProps}>{ text }</div>;
};
