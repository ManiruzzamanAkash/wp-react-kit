import { createReduxStore } from '@wordpress/data';
import reducer from './reducer';
import actions from './actions';
import selectors from './selectors';
import controls from './controls';
import resolvers from './resolvers';

const companiesStore = createReduxStore( 'wp-react/companies', {
    reducer,
    actions,
    selectors,
    controls,
    resolvers,
} );

export default companiesStore;
