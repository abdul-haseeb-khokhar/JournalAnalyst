import { useState, useEffect } from "react";
import { loginUser, googleAuthUrl } from "../api/userApi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'
import { Eye, EyeOff } from "lucide-react";
import { useSearchParams } from "react-router-dom";

function Login() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [error, setError] = useState('')

    useEffect(() => {
        const err = searchParams.get('error')
        if (err === 'email_registered') {
            setError('Email already registered, Login using password.')
        }
    },[])
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await loginUser(formData)
            login(res.data.token)
            navigate('/dashboard')
        } catch (err) {
            setError(err.response?.data?.message || 'Login Failed')
        }
    }

    const handleGoogleLogin = async () => {
        try {
            const res = await googleAuthUrl()
            window.location.href = res.data.url
        } catch (err) {
            setError('Google Login failed')
        }
    }
    return (
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
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition cursor-pointer">
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    <button type="submit"
                        className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition duration-200 cursor-pointer">
                        Login
                    </button>
                </form>
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="mt-4 flex items-center justify-center  gap-3 w-full py-2.5 px-4 bg-white text-[#3c4043] text-sm font-medium border border-[#dadce0] rounded-lg hover:bg-gray-50 hover:shadow-sm transition-all duration-200 cursor-pointer">
                    <svg width="18" height="18" viewBox="0 0 48 48">
                        <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.85l6.09-6.09C34.46 3.05 29.5 1 24 1 14.82 1 7.07 6.48 3.58 14.18l7.1 5.51C12.4 13.61 17.73 9.5 24 9.5z" />
                        <path fill="#4285F4" d="M46.52 24.5c0-1.64-.15-3.22-.42-4.74H24v8.98h12.7c-.55 2.96-2.2 5.47-4.68 7.15l7.18 5.57C43.44 37.44 46.52 31.4 46.52 24.5z" />
                        <path fill="#FBBC05" d="M10.68 28.31A14.6 14.6 0 0 1 9.5 24c0-1.5.26-2.95.68-4.31l-7.1-5.51A23.93 23.93 0 0 0 0 24c0 3.86.92 7.5 2.56 10.72l8.12-6.41z" />
                        <path fill="#34A853" d="M24 47c5.5 0 10.12-1.82 13.5-4.96l-7.18-5.57C28.6 37.84 26.42 38.5 24 38.5c-6.27 0-11.6-4.11-13.32-9.69l-8.12 6.41C6.07 43.52 14.46 47 24 47z" />
                    </svg>
                    Continue with Google
                </button>
                <p className="text-gray-500 text-sm text-center mt-6">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-400 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    )
}

export default Login