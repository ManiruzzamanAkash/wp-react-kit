export interface IBarChartLoading {
    /**
     * Bar chart loading height.
     */
    height?: number;
}

export default function BarChartLoading(props: IBarChartLoading) {
    const height = props.height || 240;

    const loadingElement = (
        <div className="animate-pulse flex space-x-4 bg-white ml-2 p-4 mr-5 rounded">
            <div className="flex space-y-6 py-1 mt-2">
                <div className="flex-1 ml-7 place-self-end">
                    <div className="h-32 bg-gray rounded col-span-2 w-24"></div>
                </div>
                <div className="flex-1 ml-7 place-self-end">
                    <div className="h-16 bg-gray rounded col-span-2 w-24"></div>
                </div>
                <div className="flex-1 ml-7 place-self-end">
                    <div className="h-10 bg-gray rounded col-span-2 w-24"></div>
                </div>
                <div className="flex-1 ml-7 place-self-end">
                    <div className="h-4 bg-gray rounded col-span-2 w-24"></div>
                </div>
            </div>
        </div>
    );

    return (
        <div className={`mb-6 h-[${height}px] bg-white rounded`}>
            <div className="flex justify-center">
                <div className="flex-none h-4 w-16 bg-gray"></div>
            </div>
            {loadingElement}
        </div>
    );
}
