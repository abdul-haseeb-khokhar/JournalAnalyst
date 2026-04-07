import { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import { useAuth } from "../context/AuthContext";
import { getAllTrades, getTradesByDate } from '../api/tradeApi'

function Dashboard() {
    const { token } = useAuth()
    const [trades, setTrades] = useState([])
    const [loading, setLoading] = useState(true)
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [filtered, setFiltered] = useState(false)

    useEffect(() => {
        fetchAllTrades()
    }, [])

    const fetchAllTrades = async () => {
        setLoading(true)
        setFiltered(false)
        try {
            const res = await getAllTrades(token)
            setTrades(res.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    const fetchByDate = async () => {
        if (!from || !to) return
        setLoading(true)
        setFiltered(true)
        try {
            const res = await getTradesByDate(token, from, to)
            setTrades(res.data)
        } catch (error) {
            console.error(error)
        }
        finally {
            setLoading(false)
        }
    }

    const safeTrades = Array.isArray(trades)? trades : []
    const totalTrades = safeTrades.length
    const wins = safeTrades.filter(t => t.profitLoss > 0).length
    const losses = safeTrades.filter(t => t.profitLoss < 0).length
    const totalProfitLoss = safeTrades.reduce((acc, t) => acc + (t.profitLoss || 0), 0)

    return (
        <div className="min-h-screen bg-gray-950">
            <Navbar />
            <div className="max-w-6xl mx-auto px-6 py-8">
                <h2 className="text-2xl font-bold text-white mb-6">Dashboard</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-900 rounded-2xl p-6">
                        <p className="text-gray-400 text-sm">Total Trades</p>
                        <p className="text-white text-3xl font-bold mt-1">{totalTrades}</p>
                    </div>
                    <div className="bg-gray-900 rounded-2xl p-6">
                        <p className="text-gray-400 text-sm">Wins</p>
                        <p className="text-green-400 text-3xl font-bold mt-1">{wins}</p>
                    </div>
                    <div className="bg-gray-900 rounded-2xl p-6">
                        <p className="text-gray-400 text-sm">Losses</p>
                        <p className="text-red-400 text-3xl font-bold mt-1">{losses}</p>
                    </div>
                    <div className="bg-gray-900 rounded-2xl p-6">
                        <p className="text-gray-400 text-sm">Total P&L</p>
                        <p className={`text-3xl font-bold mt-1 ${totalProfitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            ${totalProfitLoss.toFixed(2)}
                        </p>
                    </div>
                </div>
                <div className="bg-gray-900 rounded-2xl p-6 mb-6">
                    <h3 className="text-white font-semibold text-lg mb-4">Filter by Date</h3>
                    <div className="flex flex-wrap gap-4 items-end">
                        <div className="flex flex-col gap-1">
                            <label className="text-gray-400 text-sm">From</label>
                            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)}
                                className="bg-gray-800 text-white px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-blue-50" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-gray-400 text-sm">To</label>
                            <input type="date" value={to} onChange={(e) => setTo(e.target.value)}
                                className="bg-gray-800 text-white px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-blue-50" />
                        </div>
                        <button onClick={fetchByDate}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition">
                            Apply
                        </button>
                        {filtered && (
                            <button onClick={fetchAllTrades}
                                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-xl transition">
                                Reset
                            </button>
                        )}
                    </div>
                </div>
                <div className="bg-gray-900 rounded-2xl p-6">
                    <h3 className="text-white font-semibold text-lg mb-4">
                        {filtered ? 'Filtered Trades' : 'All Trades'}
                    </h3>
                    {loading ? (
                        <p className="text-gray-500">Loading...</p>
                    ) : trades.length === 0 ? (
                        <p className="text-gray-500">No trades found.</p>
                    ) : (
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {trades.map((trade) =>
                                        <tr key={trade._id} className="border-b border-r-gray-800 text-gray-300 hover:bg-gray-800/50 transition">
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
                                                {trade.profitLoss >= 0 ? '+' : ''}${trade.profitLoss.toFixed(2)}
                                            </td>
                                            <td className="py-3">{trade.strategy ?? '-'}</td>
                                            <td className="py-3">{new Date(trade.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard