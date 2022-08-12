export default function SettingsSectionLoading() {
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
            <div className="flex flex-wrap relative overflow-visible">
                <div className="basis-1/5 sticky top-10">
                    <h2 className="bg-gray h-5 w-36 mt-8 mb-8"></h2>
                    <h2 className="bg-gray h-5 w-36 mt-8 mb-8"></h2>
                </div>
                <div className="basis-4/5">
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
            </div>
        </div>
    );
}
