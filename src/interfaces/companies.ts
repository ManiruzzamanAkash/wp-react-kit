export interface ICompany {
    id: number;
    name: string;
    slug: string;
    email: string;
    website: string;
    description: string;
    avatar_url: string;
    created_at?: string;
    updated_at?: string;
    _links?: Record< string, unknown >;
}

export interface ICompanyFormData {
    id: number;
    name: string;
    slug: string;
    email: string;
    website: string;
    description: string;
    avatar_url: string;
}

export interface ICompanyFilter {
    page?: number;
    per_page?: number;
    search?: string;
}

export interface ICompanyStats {
    total: number;
}

export interface ICompaniesState {
    companies: ICompany[];
    loading: boolean;
    saving: boolean;
    deleting: boolean;
    total: number;
    totalPage: number;
    filters: ICompanyFilter;
    stats: ICompanyStats | null;
}
