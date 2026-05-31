export const JOBPLACE_ADMIN_PAGE = 'jobplace';

export function jobplaceAdminUrl( route = '/' ) {
	const hash = route.startsWith( '/' ) ? route : `/${ route }`;

	return `/wp-admin/admin.php?page=${ JOBPLACE_ADMIN_PAGE }#${ hash }`;
}
