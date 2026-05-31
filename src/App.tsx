/**
 * External dependencies
 */
import { HashRouter, Routes, Route } from 'react-router-dom';

/**
 * Internal dependencies
 */
import useMenuFix from './hooks/useMenuFix';
import routes from './routes';

/**
 * Renders the routed pages and keeps the WordPress admin submenu in sync.
 *
 * `useMenuFix` relies on the router context, so it has to live inside
 * <HashRouter>.
 */
const AppRoutes = () => {
    useMenuFix();

    return (
        <Routes>
            { routes.map( ( route, index ) => (
                <Route
                    key={ index }
                    path={ route.path }
                    element={ <route.element /> }
                />
            ) ) }
        </Routes>
    );
};

const App = () => {
    return (
        <HashRouter>
            <AppRoutes />
        </HashRouter>
    );
};

export default App;
