import { IJobCategoriesState } from '../../interfaces/job-categories';

const selectors = {
    getCategories( state: IJobCategoriesState ) {
        return state.categories;
    },

    getLoading( state: IJobCategoriesState ) {
        return state.loading;
    },

    getSaving( state: IJobCategoriesState ) {
        return state.saving;
    },

    getDeleting( state: IJobCategoriesState ) {
        return state.deleting;
    },

    getTotal( state: IJobCategoriesState ) {
        return state.total;
    },

    getTotalPage( state: IJobCategoriesState ) {
        return state.totalPage;
    },

    getFilter( state: IJobCategoriesState ) {
        return state.filters;
    },

    getCategoryStats( state: IJobCategoriesState ) {
        return state.stats;
    },
};

export default selectors;
