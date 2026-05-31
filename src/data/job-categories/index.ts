import { createReduxStore } from '@wordpress/data';
import reducer from './reducer';
import actions from './actions';
import selectors from './selectors';
import controls from './controls';
import resolvers from './resolvers';

const jobCategoriesStore = createReduxStore( 'wp-react/job-categories', {
    reducer,
    actions,
    selectors,
    controls,
    resolvers,
} );

export default jobCategoriesStore;
