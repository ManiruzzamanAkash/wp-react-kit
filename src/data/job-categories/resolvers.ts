import actions from './actions';
import { jobCategoriesEndpoint, jobCategoriesStatsEndpoint } from './endpoint';
import { IJobCategoryFilter, IResponseGenerator } from '../../interfaces';

const resolvers = {
    *getCategories( filters: IJobCategoryFilter = {} ) {
        yield actions.setLoading( true );

        const queryParam = new URLSearchParams(
            filters as URLSearchParams
        ).toString();

        const response: IResponseGenerator = yield actions.fetchFromAPIUnparsed(
            `${ jobCategoriesEndpoint }?${ queryParam }`
        );

        let totalPage = 0;
        let totalCount = 0;

        if ( response.headers !== undefined ) {
            totalPage = parseInt(
                response.headers.get( 'X-WP-TotalPages' ) || '0',
                10
            );
            totalCount = parseInt(
                response.headers.get( 'X-WP-Total' ) || '0',
                10
            );
        }

        yield actions.setCategories( response.data );
        yield actions.setTotalPage( totalPage );
        yield actions.setTotal( totalCount );
        return actions.setLoading( false );
    },

    *getCategoryStats() {
        const response: IResponseGenerator = yield actions.fetchFromAPI(
            jobCategoriesStatsEndpoint
        );

        yield actions.setCategoryStats( response );
    },
};

export default resolvers;
