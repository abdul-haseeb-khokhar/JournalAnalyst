function TradeTable({ trades, openEditModal, handleDelete }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead>
                    <tr className="text-gray-400 border-b border-gray-800">
                        <th className="pb-3">Pair</th>
                        <th className="pb-3">Position</th>
                        <th className="pb-3">Entry</th>
                        <th className="pb-3">Exit</th>
                        <th className="pb-3">Qty</th>
                        <th className="pb-3">P&L</th>
                        <th className="pb-3">Strategy</th>
                        <th className="pb-3">Date</th>
                        <th className="pb-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {trades.map((trade) =>
                        <tr key={trade._id} className="border-b border-gray-800 text-gray-300 hover:bg-gray-800/50 transition">
                            <td className="py-3 font-semibold text-white">{trade.pair}</td>
                            <td className="py-3">
                                <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${trade.position === 'buy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {trade.position.toUpperCase()}
                                </span>
                            </td>
                            <td className="py-3">{trade.entryPrice}</td>
                            <td className="py-3">{trade.exitPrice ?? '-'}</td>
                            <td className="py-3">{trade.quantity}</td>
                            <td className={`py-3 font-semibold ${trade.profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {trade.profitLoss >= 0 ? '+' : ''}${trade.profitLoss.toFixed(2) ?? '-'}
                            </td>
                            <td className="py-3">{trade.strategy ?? '-'}</td>
                            <td className="py-3">{new Date(trade.createdAt).toLocaleDateString()}</td>
                            <td className="py-3">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => openEditModal(trade)}
                                        className="bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 text-xs px-3 py-1 rounded-lg transition cursor-pointer"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(trade._id)}
                                        className="bg-red-500/20 hover:bg-red-500/40 text-red-400 text-xs px-3 py-1 rounded-lg transition cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default TradeTable