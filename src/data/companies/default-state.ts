import { ICompaniesState } from '../../interfaces/companies';

export const companyDefaultFormData = {
    id: 0,
    name: '',
    slug: '',
    email: '',
    website: '',
    description: '',
    avatar_url: '',
};

export const companiesDefaultState: ICompaniesState = {
    companies: [],
    loading: false,
    saving: false,
    deleting: false,
    total: 0,
    totalPage: 0,
    filters: {},
    stats: null,
};
