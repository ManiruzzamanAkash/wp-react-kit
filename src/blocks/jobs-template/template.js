export const TEMPLATE = [
	[
		'wrc/job-title',
		{
			style: {
				typography: {
					fontSize: '1.125rem',
					fontWeight: '600',
				},
			},
		},
	],
	[
		'core/group',
		{
			className: 'jobplace-job-card__meta',
			layout: { type: 'flex', flexWrap: 'wrap' },
		},
		[
			[ 'wrc/job-company' ],
			[ 'wrc/job-location' ],
			[ 'wrc/job-type' ],
			[ 'wrc/job-category' ],
		],
	],
	[
		'core/group',
		{
			layout: { type: 'flex', flexWrap: 'wrap' },
		},
		[
			[ 'wrc/job-featured-badge' ],
			[ 'wrc/job-remote-badge' ],
		],
	],
	[ 'wrc/job-salary' ],
	[ 'wrc/job-description' ],
	[
		'core/group',
		{
			className: 'jobplace-job-card__meta',
			layout: { type: 'flex', flexWrap: 'wrap' },
		},
		[
			[ 'wrc/job-experience-level' ],
			[ 'wrc/job-deadline' ],
			[ 'wrc/job-vacancies' ],
		],
	],
	[ 'wrc/job-apply-button' ],
];
