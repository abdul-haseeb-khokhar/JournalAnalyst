import { useState } from "react";
import { loginUser } from "../api/userApi";
import { Link, useNavigate } from "react-router-dom";
import  {useAuth} from '../context/AuthContext'
import {Eye, EyeOff} from "lucide-react";

function Login(){
    const {login} = useAuth()
    const navigate = useNavigate()
    
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({email: '',password: ''})
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const res = await loginUser(formData)
            login(res.data.token)
            navigate('/dashboard')
        }catch(err){
            setError(err.response?.data?.message || 'Login Failed')
        }
    }

    return(
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
            <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Welcome Back</h2>
                {error && (
                    <p className="bg-red-500/10 text-red-400 text-sm text-center p-2 rounded-lg mb-4">
                        {error}
                    </p>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input type="email" name="email" placeholder="Enter Email . . ." onChange={handleChange}
                    className="bg-gray-800 text-white placeholder-gray-500 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} name="password" placeholder="Enter Password . . ." onChange={handleChange} autoComplete="current-password"
                        className="bg-gray-800 text-white placeholder-gray-500 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition">
                            {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                        </button>
                    </div>
                    <button type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-200">
                        Login
                    </button>
                </form>
                <p className="text-gray-500 text-sm text-center mt-6">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-400 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    )
}

export default Login