export default function SettingsLoading() {
    const singleFormItem = (
        <div className="flex flex-row pb-4 mt-2">
            <div className="basis-1/3 text-sm font-semibold text-left mt-0">
                <div className="bg-gray h-2 w-24 mr-20"></div>
            </div>
            <div className="basis-1/2 text-sm text-left">
                <div className="bg-gray h-2 w-48 mr-20"></div>
            </div>
        </div>
    );

    return (
        <div className="animate-pulse">
            <div className="bg-white p-5 my-3">
                <div className="pb-5 font-semibold bg-gray h-2 w-32 mb-5"></div>

                <div>
                    {singleFormItem}
                    {singleFormItem}
                    {singleFormItem}
                    {singleFormItem}
                    {singleFormItem}
                </div>
            </div>

            <div className="bg-white p-5 my-3">
                <div className="pb-5 font-semibold bg-gray h-2 w-32 mb-5"></div>

                <div>
                    {singleFormItem}
                    {singleFormItem}
                    {singleFormItem}
                    {singleFormItem}
                    {singleFormItem}
                </div>
            </div>
        </div>
    );
}
