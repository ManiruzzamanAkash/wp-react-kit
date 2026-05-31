import actions from './actions';
import { companiesEndpoint, companiesStatsEndpoint } from './endpoint';
import { ICompanyFilter, IResponseGenerator } from '../../interfaces';

const resolvers = {
    *getCompanies( filters: ICompanyFilter = {} ) {
        yield actions.setLoading( true );

        const queryParam = new URLSearchParams(
            filters as URLSearchParams
        ).toString();

        const response: IResponseGenerator = yield actions.fetchFromAPIUnparsed(
            `${ companiesEndpoint }?${ queryParam }`
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

        yield actions.setCompanies( response.data );
        yield actions.setTotalPage( totalPage );
        yield actions.setTotal( totalCount );
        return actions.setLoading( false );
    },

    *getCompanyStats() {
        const response: IResponseGenerator = yield actions.fetchFromAPI(
            companiesStatsEndpoint
        );

        yield actions.setCompanyStats( response );
    },
};

export default resolvers;
