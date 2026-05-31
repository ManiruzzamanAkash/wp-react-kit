import { useBlockProps } from '@wordpress/block-editor';

const cfg = {"fallback":"$80,000 – $120,000 / year"};

const getText = (j) => {
    if (!j) return null;
    if (j.is_negotiable) return 'Negotiable';
    if (j.salary_min && j.salary_max) return `$${j.salary_min.toLocaleString()} – $${j.salary_max.toLocaleString()} / year`;
    return j.salary_min ? `From $${j.salary_min.toLocaleString()} / year` : '';
  };

export default ( { context } ) => {
	const blockProps = useBlockProps();
	const job = context?.job;
	const text = getText( job ) || cfg.fallback;

	return <div {...blockProps}>{ text }</div>;
};
