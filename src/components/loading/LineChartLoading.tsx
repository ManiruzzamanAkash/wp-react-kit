export default function LineChartLoading() {
    return (
        <div className="mb-6 h-[200px] bg-white rounded">
            <div className="animate-pulse space-x-4 bg-white ml-2 p-6 mr-5 rounded">
                <div className="flex justify-center">
                    <div className="flex-none h-6 w-24 mr-8 bg-gray"></div>
                    <div className="flex-none h-6 w-24 bg-gray"></div>
                </div>
                <div className="py-1 mt-2">
                    <div className="mt-5 place-self-end">
                        <div className="h-2 w-full bg-gray rounded col-span-2"></div>
                    </div>
                    <div className="mt-5 place-self-end">
                        <div className="h-2 w-full bg-gray rounded col-span-2"></div>
                    </div>
                    <div className="mt-5 place-self-end">
                        <div className="h-2 w-full bg-gray rounded col-span-2"></div>
                    </div>
                    <div className="mt-5 place-self-end">
                        <div className="h-2 w-full bg-gray rounded col-span-2"></div>
                    </div>
                    <div className="mt-5 place-self-end">
                        <div className="h-2 w-full bg-gray rounded col-span-2"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
