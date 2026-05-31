/**
 * External dependencies.
 */
import { useEffect, useState } from '@wordpress/element';

const getInitials = ( name: string ): string => {
	const parts = name.trim().split( /\s+/ ).filter( Boolean );

	if ( ! parts.length ) {
		return '?';
	}

	if ( parts.length === 1 ) {
		return parts[ 0 ].slice( 0, 2 ).toUpperCase();
	}

	return `${ parts[ 0 ][ 0 ] }${ parts[ parts.length - 1 ][ 0 ] }`.toUpperCase();
};

const isUsableAvatarUrl = ( url?: string ): boolean => {
	if ( ! url?.trim() ) {
		return false;
	}

	try {
		const parsed = new URL( url, window.location.origin );
		return [ 'http:', 'https:' ].includes( parsed.protocol );
	} catch {
		return false;
	}
};

type CompanyAvatarProps = {
	name?: string;
	avatarUrl?: string;
	size?: number;
};

export default function CompanyAvatar( {
	name = '',
	avatarUrl = '',
	size = 28,
}: CompanyAvatarProps ) {
	const canLoadImage = isUsableAvatarUrl( avatarUrl );
	const [ imageVisible, setImageVisible ] = useState( canLoadImage );

	useEffect( () => {
		setImageVisible( isUsableAvatarUrl( avatarUrl ) );
	}, [ avatarUrl ] );

	const initials = getInitials( name );
	const dimension = `${ size }px`;
	const sharedStyle = {
		width: dimension,
		height: dimension,
		flexShrink: 0,
	};

	if ( canLoadImage && imageVisible ) {
		return (
			<img
				className="jobplace-company-avatar jobplace-company-avatar--image"
				src={ avatarUrl }
				alt=""
				style={ sharedStyle }
				onError={ () => setImageVisible( false ) }
			/>
		);
	}

	return (
		<span
			className="jobplace-company-avatar jobplace-company-avatar--placeholder"
			style={ sharedStyle }
			aria-hidden="true"
			title={ name || undefined }
		>
			{ initials }
		</span>
	);
}
