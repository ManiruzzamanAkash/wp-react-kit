import { useMemo } from '@wordpress/element';
import {
	useBlockProps,
	__experimentalGetColorClassesAndStyles as getColorClassesAndStyles,
	__experimentalGetBorderClassesAndStyles as getBorderClassesAndStyles,
} from '@wordpress/block-editor';
import TemplateListEdit from '../../components/TemplateListEdit';
import { getEditorJobContexts } from '../shared/preview-jobs';
import {
	stripCardClassesFromWrapper,
	stripCardStylesFromWrapper,
} from '../shared/template-item-styles';
import { TEMPLATE } from './template';

function getCardPaddingStyle( attributes ) {
	const padding = attributes?.style?.spacing?.padding;

	if ( ! padding ) {
		return undefined;
	}

	return { padding };
}

export default function Edit( {
	attributes,
	clientId,
	context,
	__unstableLayoutClassNames = '',
} ) {
	const rawBlockProps = useBlockProps( {
		className: [
			'jobplace-jobs-template',
			__unstableLayoutClassNames,
		]
			.filter( Boolean )
			.join( ' ' ),
	} );

	const blockProps = useMemo(
		() => ( {
			...rawBlockProps,
			className: stripCardClassesFromWrapper( rawBlockProps.className ),
			style: stripCardStylesFromWrapper( rawBlockProps.style ),
		} ),
		[ rawBlockProps ]
	);

	const itemProps = useMemo( () => {
		const colorProps = getColorClassesAndStyles( attributes );
		const borderProps = getBorderClassesAndStyles( attributes );
		const paddingStyle = getCardPaddingStyle( attributes );

		return {
			className: [
				'jobplace-job-card',
				colorProps.className,
				borderProps.className,
			]
				.filter( Boolean )
				.join( ' ' ),
			style: {
				...colorProps.style,
				...borderProps.style,
				...paddingStyle,
			},
		};
	}, [ attributes ] );

	const blockContexts = useMemo(
		() => getEditorJobContexts( context?.query ),
		[ context?.query ]
	);

	return (
		<TemplateListEdit
			clientId={ clientId }
			blockContexts={ blockContexts }
			template={ TEMPLATE }
			blockProps={ blockProps }
			itemProps={ itemProps }
		/>
	);
}
