function TradeModal({ showModal, setShowModal, formData, editId, error, handleChange, handleSubmit, submitLoading }) {
    if (!showModal) return null

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-lg">
                <h3 className="text-white font-bold text-xl mb-6">
                    {editId ? 'Edit Trade' : 'Add Trade'}
                </h3>
                {error && (
                    <p className="bg-red-500/10 text-red-400 text-sm p-2 rounded-lg mb-4">{error}</p>
                )}

                <div className="flex flex-col gap-4">
                    <input name="pair" placeholder="Pair (e.g. USD/JPY)" value={formData.pair} onChange={handleChange}
                        className="bg-gray-800 text-white placeholder-gray-500 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
                    <select name="position" value={formData.position} onChange={handleChange}
                        className="bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="buy">Buy</option>
                        <option value="sell">Sell</option>
                    </select>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            name="entryPrice"
                            type="number"
                            placeholder="Entry Price"
                            value={formData.entryPrice}
                            onChange={handleChange}
                            className="bg-gray-800 text-white placeholder-gray-500 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            name="exitPrice"
                            type="number"
                            placeholder="Exit Price"
                            value={formData.exitPrice}
                            onChange={handleChange}
                            className="bg-gray-800 text-white placeholder-gray-500 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            name="quantity"
                            type="number"
                            placeholder="Quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="bg-gray-800 text-white placeholder-gray-500 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            name="profitLoss"
                            type="number"
                            placeholder="Profit / Loss"
                            value={formData.profitLoss}
                            onChange={handleChange}
                            className="bg-gray-800 text-white placeholder-gray-500 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <input name="strategy" placeholder="Strategy (optional)" value={formData.strategy} onChange={handleChange}
                        className="bg-gray-800 text-white placeholder-gray-500 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea name="notes" placeholder="Notes (optional)" value={formData.notes} onChange={handleChange} rows={3} 
                    className="bg-gray-800 text-white placeholder-gray-500 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 resize-none"/>
                </div>

                <div className="flex gap-3 mt-6">
                    <button onClick={handleSubmit}
                    disabled={submitLoading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition cursor-pointer">
                        {submitLoading ? (
                            <div className="w-5 h-2 border-4 border-white rounded-full animate-ping mx-auto"></div>
                        ) : editId ? 'Update' : 'Add Trade'}
                    </button>
                    <button onClick={() => setShowModal(false)}
                        className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold transition cursor-pointer">
                            Cancel
                        </button>
                </div>
            </div>
        </div>
    )
}

export default TradeModal