/**
 * External dependencies
 */
import { HashRouter, Routes, Route } from 'react-router-dom';

/**
 * Internal dependencies
 */
import NavLinks from './components/nav/NavLinks';
import routes from './routes/index';

const App = () => {
    return (
        <HashRouter>
            <div>
                <NavLinks />
                <Routes>
                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={<route.element />}
                        />
                    ))}
                </Routes>
            </div>
        </HashRouter>
    );
};

export default App;
