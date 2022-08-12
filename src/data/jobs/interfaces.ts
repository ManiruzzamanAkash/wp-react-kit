export interface IJob {
    id: number;
    title: string;
}

export interface IJobs {
    jobs: IJob[];
    loadingJobs: boolean;
    totalPage: number;
    total: number;
    filters: object;
}
