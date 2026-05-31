export const TEMPLATE = [
	[
		'core/group',
		{
			className: 'jobplace-jobs-toolbar',
			layout: {
				type: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'space-between',
			},
		},
		[ [ 'wrc/jobs-count' ], [ 'wrc/jobs-search' ] ],
	],
	[
		'wrc/jobs-template',
		{
			style: {
				spacing: {
					blockGap: '1rem',
				},
			},
			layout: {
				type: 'default',
			},
		},
	],
	[ 'wrc/jobs-no-results' ],
	[ 'wrc/jobs-pagination' ],
];
