export default function SettingsLoading() {
    const singleFormItem = (
        <div className="flex flex-row pb-4 mt-2">
            <div className="basis-1/3 text-sm font-semibold text-left mt-0">
                <h2 className="bg-gray h-2 w-24 mr-20"></h2>
            </div>
            <div className="basis-1/2 text-sm text-left">
                <h2 className="bg-gray h-2 w-48 mr-20"></h2>
            </div>
        </div>
    );

    return (
        <div className="animate-pulse">
            <div className="bg-white p-5 my-3">
                <h3 className="pb-5 font-semibold bg-gray h-2 w-32 mb-5"></h3>

                <div>
                    {singleFormItem}
                    {singleFormItem}
                    {singleFormItem}
                    {singleFormItem}
                    {singleFormItem}
                </div>
            </div>

            <div className="bg-white p-5 my-3">
                <h3 className="pb-5 font-semibold bg-gray h-2 w-32 mb-5"></h3>

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
