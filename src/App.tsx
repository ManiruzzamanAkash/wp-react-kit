/**
 * External dependencies
 */
import { HashRouter, Routes, Route } from 'react-router-dom';

/**
 * Internal dependencies
 */
import Header from './components/layout/Header';
import routes from './routes';

const App = () => {
    return (
        <HashRouter>
            <div>
                <Header />
                <hr className="wp-header-end" />
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
