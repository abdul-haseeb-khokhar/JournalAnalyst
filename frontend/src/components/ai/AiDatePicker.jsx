function AiDatePicker({ from, to, setFrom, setTo, handleAnalyze, loading }) {
    return (
        <div className="bg-gray-900 rounded-2xl p-6 mb-6">
            <h3 className="text-white font-semibold text-lg mb-4">Select Date Range</h3>
            <div className="flex flex-wrap gap-4 items-end">
                <div className="flex flex-col gap-1">
                    <label className="text-gray-400 text-sm">From</label>
                    <input type="date" value={from} onChange={(e) => setFrom(e.target.value)}
                        className="bg-gray-800 text-white px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-gray-400 text-sm">To</label>
                    <input
                        type="date"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="bg-gray-800 text-white px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button onClick={handleAnalyze} disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2 rounded-xl transition">
                    {loading ? 'Analyzing...' : 'Analyze'}
                </button>
            </div>
        </div>
    )
}

export default AiDatePicker;