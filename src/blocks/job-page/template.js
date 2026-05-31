export const TEMPLATE = [
	[
		'core/group',
		{
			className: 'jobplace-job-detail__header',
			layout: {
				type: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'space-between',
			},
		},
		[
			[
				'core/group',
				{},
				[
					[
						'core/group',
						{ layout: { type: 'flex', flexWrap: 'wrap' } },
						[ [ 'wrc/job-featured-badge' ], [ 'wrc/job-remote-badge' ] ],
					],
					[ 'wrc/job-title' ],
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
				],
			],
			[ 'wrc/job-apply-button' ],
		],
	],
	[ 'core/separator', { className: 'is-style-wide' } ],
	[
		'core/group',
		{
			className: 'jobplace-job-detail__meta',
			layout: { type: 'flex', flexWrap: 'wrap' },
		},
		[
			[ 'wrc/job-salary' ],
			[ 'wrc/job-experience-level' ],
			[ 'wrc/job-deadline' ],
			[ 'wrc/job-vacancies' ],
		],
	],
	[ 'wrc/job-description', { excerptLength: 0 } ],
];
