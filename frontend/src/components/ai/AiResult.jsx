function AiResult({analysis, loading, error}){
    if(loading){
        return (
            <div className="bg-gray-900 rounded-2xl p-6 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin">
                    </div>
                        <p className="text-gray-400 text-sm">
                            AI is analyzing your trades...
                        </p>
                </div>
            </div>
        )
    }
    if(error){
        return(
            <div className="bg-gray-900 rounded-2xl p-6">
                <p className="bg-red-500/10 text-red-400 text-sm p-3 rounded-lg">{error}</p>
            </div>
        )
    }
    if(!analysis){
        return(
            <div className="bg-gray-900 rounded-2xl p-6 flex items-center justify-center">
                <p className="text-gray-500">Select a date and click Analyze</p>
            </div>
        )
    }

    return(
        <div className="bg-gray-900 rounded-2xl p-6">
            <h3 className="text-white font-semibold text-lg mb-4">AI Analysis</h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{analysis}</p>
        </div>
    )
}

export default AiResult;