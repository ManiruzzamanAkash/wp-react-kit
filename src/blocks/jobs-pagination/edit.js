import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useMemo } from '@wordpress/element';
import { getEditorPreviewJobs } from '../shared/preview-jobs';

export default ( { context } ) => {
	const blockProps = useBlockProps( { className: 'jobplace-jobs-pagination' } );
	const { total } = useMemo(
		() => getEditorPreviewJobs( context?.query ),
		[ context?.query ]
	);
	const totalPages = Math.max( 1, Math.ceil( ( total || 3 ) / ( context?.query?.perPage || 10 ) ) );

	return (
		<nav { ...blockProps } aria-label={ __( 'Jobs pagination', 'jobplace' ) }>
			<span className="jobplace-jobs-pagination__summary">
				{ sprintf(
					/* translators: 1: current page, 2: total pages */
					__( 'Page %1$d of %2$d', 'jobplace' ),
					1,
					totalPages
				) }
			</span>
			<div className="jobplace-jobs-pagination__controls">
				<div className="wp-block-buttons">
					<div className="wp-block-button is-style-outline">
						<button
							type="button"
							className="wp-block-button__link wp-element-button"
							disabled
						>
							{ __( 'Previous', 'jobplace' ) }
						</button>
					</div>
				</div>
				<div className="jobplace-jobs-pagination__numbers">
					{ Array.from( { length: Math.min( totalPages, 5 ) }, ( _, index ) => (
						<button
							key={ index + 1 }
							type="button"
							className={ `jobplace-jobs-pagination__number${
								index === 0 ? ' is-current' : ''
							}` }
							disabled={ index === 0 }
						>
							{ index + 1 }
						</button>
					) ) }
				</div>
				<div className="wp-block-buttons">
					<div className="wp-block-button is-style-outline">
						<button
							type="button"
							className="wp-block-button__link wp-element-button"
							disabled={ totalPages <= 1 }
						>
							{ __( 'Next', 'jobplace' ) }
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
};
