export const wpReactKitSlug = 'jobplace';

/**
 * As we are using hash based navigation, hack fix
 * to highlight the current selected menu
 *
 * Requires jQuery
 */
export function menuFix() {
    const $ = jQuery;

    const menuRoot = $('#toplevel_page_' + wpReactKitSlug);
    const currentUrl = window.location.href;
    const currentPath = currentUrl.substr(currentUrl.indexOf('admin.php'));

    $('ul.wp-submenu li', menuRoot).removeClass('current');

    menuRoot.on('click', 'a', function () {
        const self = $(this);

        $('ul.wp-submenu li', menuRoot).removeClass('current');

        if (self.hasClass('wp-has-submenu')) {
            $('li.wp-first-item', menuRoot).addClass('current');
        } else {
            self.parents('li').addClass('current');
        }
    });

    const navRoutes = currentPath.split('/');
    $('ul.wp-submenu a', menuRoot).each(function (index: number, el: any) {
        const routeName: string = typeof navRoutes[1] !== "undefined" ? navRoutes[1] : ""; // eslint-disable-line
        let isActive = false;
        // const subRoute = typeof(routeName.split('?')[0] !== 'undefined') ? routeName.split('?')[0] : ""; // eslint-disable-line

        switch ($(el).attr('href')) {
            case currentPath:
                isActive = true;
                break;

            default:
                break;
        }

        if (isActive) {
            $(el).parent().addClass('current');
        }
    });
}
