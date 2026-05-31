export interface IAction {
    /**
     * Action type string key name.
     */
    type: string;
}

export interface IResponseGenerator {
    config?: any;
    data?: any;
    headers?: any;
    request?: any;
    status?: number;
    statusText?: string;
}

// Select2 types
export * from './select2';

// Job types
export * from './jobs';

// Job category types
export * from './job-categories';
