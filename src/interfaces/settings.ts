export interface IJobDetailPatternChoice {
	slug: string;
	title: string;
	description: string;
}

export interface ISelectChoice {
	value: number | string;
	label: string;
}

export interface IJobPlaceSettings {
	job_detail_pattern: string;
	jobs_per_page: number;
	default_apply_button_text: string;
	jobs_page_id: number;
	permalink_base: string;
	choices: {
		job_detail_patterns: IJobDetailPatternChoice[];
		pages: ISelectChoice[];
	};
	urls: {
		jobs_page_edit: string;
		jobs_page_view: string;
		permalinks: string;
	};
}
