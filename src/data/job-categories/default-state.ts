import { IJobCategoriesState } from '../../interfaces/job-categories';

export const categoryDefaultFormData = {
    id: 0,
    name: '',
    slug: '',
    description: '',
};

export const jobCategoriesDefaultState: IJobCategoriesState = {
    categories: [],
    loading: false,
    saving: false,
    deleting: false,
    total: 0,
    totalPage: 0,
    filters: {},
};
