import { ICompaniesState } from '../../interfaces/companies';

const selectors = {
    getCompanies( state: ICompaniesState ) {
        return state.companies;
    },

    getLoading( state: ICompaniesState ) {
        return state.loading;
    },

    getSaving( state: ICompaniesState ) {
        return state.saving;
    },

    getDeleting( state: ICompaniesState ) {
        return state.deleting;
    },

    getTotal( state: ICompaniesState ) {
        return state.total;
    },

    getTotalPage( state: ICompaniesState ) {
        return state.totalPage;
    },

    getFilter( state: ICompaniesState ) {
        return state.filters;
    },

    getCompanyStats( state: ICompaniesState ) {
        return state.stats;
    },
};

export default selectors;
