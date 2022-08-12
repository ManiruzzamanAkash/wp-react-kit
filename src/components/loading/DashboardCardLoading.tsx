export default function DashboardCardLoading() {
    const loadingElement = (
        <div className="animate-pulse flex space-x-4 bg-white ml-2 p-6 mr-5 rounded">
            <div className="rounded-full bg-gray h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
                <div className="space-y-3">
                    <div className="h-3 bg-gray rounded col-span-2 w-9"></div>
                    <div className="h-3 bg-gray rounded col-span-1 w-24"></div>
                </div>
            </div>
        </div>
    );

    const loadingRow = (
        <div className="flex flex-wrap mb-6">
            <div className="flex-1">{loadingElement}</div>
            <div className="flex-1">{loadingElement}</div>
        </div>
    );

    return (
        <>
            {loadingRow}
            {loadingRow}
            {loadingRow}
        </>
    );
}
