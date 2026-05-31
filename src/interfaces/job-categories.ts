export interface IJobCategory {
    id: number;
    name: string;
    slug: string;
    description: string;
    created_at?: string;
    updated_at?: string;
    _links?: Record< string, unknown >;
}

export interface IJobCategoryFormData {
    id: number;
    name: string;
    slug: string;
    description: string;
}

export interface IJobCategoryFilter {
    page?: number;
    per_page?: number;
    search?: string;
}

export interface IJobCategoriesState {
    categories: IJobCategory[];
    loading: boolean;
    saving: boolean;
    deleting: boolean;
    total: number;
    totalPage: number;
    filters: IJobCategoryFilter;
}
