import { useBlockProps } from '@wordpress/block-editor';

const cfg = {"fallback":"2 openings"};

const getText = (j) => (j?.vacancies > 1 ? `${j.vacancies} openings` : '');

export default ( { context } ) => {
	const blockProps = useBlockProps();
	const job = context?.job;
	const text = getText( job ) || cfg.fallback;

	return <div {...blockProps}>{ text }</div>;
};
