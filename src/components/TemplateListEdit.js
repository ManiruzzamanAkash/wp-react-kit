/**
 * WordPress dependencies
 */
import { memo, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import {
	BlockContextProvider,
	__experimentalUseBlockPreview as useBlockPreview,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';

function TemplateInnerBlocks( { template, renderAppender, ...itemProps } ) {
	const innerBlocksProps = useInnerBlocksProps( itemProps, {
		template,
		__unstableDisableLayoutClassNames: true,
		renderAppender,
	} );
	return <div { ...innerBlocksProps } />;
}

function TemplateBlockPreview( {
	blocks,
	blockContextId,
	isHidden,
	setActiveBlockContextId,
	...props
} ) {
	const { style, className, ...remainingProps } = props || {};
	const blockPreviewProps = useBlockPreview( { blocks } );

	const handleOnClick = () => {
		setActiveBlockContextId( blockContextId );
	};

	return (
		<div
			{ ...blockPreviewProps }
			tabIndex={ 0 }
			role="button"
			onClick={ handleOnClick }
			onKeyDown={ ( event ) => {
				if ( event.key === 'Enter' || event.key === ' ' ) {
					handleOnClick();
				}
			} }
			style={ { ...style, display: isHidden ? 'none' : undefined } }
			className={ className }
			{ ...remainingProps }
		/>
	);
}

const MemoizedTemplateBlockPreview = memo( TemplateBlockPreview );

export default function TemplateListEdit( {
	clientId,
	blockContexts,
	blockProps,
	itemProps,
	template,
	renderAppender,
} ) {
	const [ activeBlockContextId, setActiveBlockContextId ] = useState();

	const blocks = useSelect(
		( select ) => select( blockEditorStore ).getBlocks( clientId ),
		[ clientId ]
	);

	return (
		<div { ...blockProps }>
			{ blockContexts &&
				blockContexts.map( ( blockContext ) => (
					<div
						key={ blockContext.id }
						className="jobplace-jobs-template__item"
					>
						<BlockContextProvider value={ blockContext }>
							{ blockContext.id ===
								( activeBlockContextId ||
									blockContexts[ 0 ]?.id ) && (
								<TemplateInnerBlocks
									template={ template }
									renderAppender={ renderAppender }
									{ ...itemProps }
								/>
							) }
							<MemoizedTemplateBlockPreview
								blocks={ blocks }
								blockContextId={ blockContext.id }
								setActiveBlockContextId={
									setActiveBlockContextId
								}
								isHidden={
									blockContext.id ===
									( activeBlockContextId ||
										blockContexts[ 0 ]?.id )
								}
								{ ...itemProps }
							/>
						</BlockContextProvider>
					</div>
				) ) }
		</div>
	);
}
