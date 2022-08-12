export interface IJob {
    id: number;
    title: string;
}

export interface IJobs {
    jobs: IJob[];
    loadingJobs: boolean;
}
