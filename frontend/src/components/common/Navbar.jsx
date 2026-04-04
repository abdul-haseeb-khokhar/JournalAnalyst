import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { TrendingUp, Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
            <div className="flex items-center justify-between">
                <h1 className="text-white font-bold text-xl flex items-center gap-2">
                    <TrendingUp className="text-green-400" size={22} />
                    Journal Analyst
                </h1>
                <div className="hidden sm:flex items-center gap-6">
                    <Link to="/dashboard" className="text-gray-400 hover:text-white transition">Dashboard</Link>
                    <Link to="/trades" className="text-gray-400 hover:text-white transition">Trades</Link>
                    <Link to="/ai-insights" className="text-gray-400 hover:text-white transition">AI Insights</Link>
                    <button onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-xl transition">Logout</button>
                </div>

                <button className="sm:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} />: <Menu size={24} />}
                </button>
            </div>

            {isOpen && (
                <div className="sm:hidden flex flex-col gap-4 mt-4 pb-2">
                    <Link to="/dashboard" className="text-gray-400 hover:text-white transition">Dashboard</Link>
                    <Link to="/trades" className="text-gray-400 hover:text-white transition">Trades</Link>
                    <Link to="/ai-insights" className="text-gray-400 hover:text-white transition">AI Insights</Link>
                    <button onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-xl transition w-full">Logout</button>
                </div>
            )}
        </nav>
    )
}
export default Navbar