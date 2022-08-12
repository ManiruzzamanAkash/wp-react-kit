/**
 * External dependencies
 */

export default function Loading() {
    return (
        <div className="bg-white shadow-xs rounded-sm border border-gray px-5 py-5 mb-6">
            <div className="animate-pulse flex">
                <div className="w-8 h-8 rounded-full mr-3 bg-gray"></div>

                <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-gray rounded w-1/2"></div>
                    <div className="h-4 bg-gray rounded w-1/3"></div>

                    <div className="space-y-2">
                        <div className="h-4 bg-gray rounded"></div>
                        <div className="h-4 bg-gray rounded w-5/6"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
