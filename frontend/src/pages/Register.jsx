import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, googleAuthUrl } from "../api/userApi";
import { Eye, EyeOff } from "lucide-react";

function Register() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
    const [error, setError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showCoPassword, setShowCoPassword] = useState(false)
    const [reg_loading, setReg_loading] = useState(false)

    const navigate = useNavigate()


    const handleChange = (e) => {
        setError('')
        const updated = { ...formData, [e.target.name]: e.target.value }
        setFormData(updated)
        if (e.target.name === 'password' || e.target.name === 'confirmPassword') {
            const pw = e.target.name === 'password' ? e.target.value : updated.password
            const cpw = e.target.name === 'confirmPassword' ? e.target.value : updated.confirmPassword
            setPasswordError(cpw && pw !== cpw ? 'Passwords do not match' : '')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            setPasswordError('Passwords do not match')
            return
        }
        try {
            setReg_loading(true)
            await registerUser(formData)
            setReg_loading(false)
            navigate('/login')
        } catch (error) {
            setReg_loading(false)
            setError(error.response?.data?.message || '! Registration failed')
        }
    }
    const handleGoogleLogin = async () => {
        try {
            const res = await googleAuthUrl()
            window.location.href = res.data.url
        } catch (error) {
            console.log(error)
            setError('! Google registration failed')
        }
    }
    return (
        <div className="relative min-h-screen bg-gray-950 flex items-center justify-center">
            {error && (
                <p className="absolute top-3 right-3 bg-red-500/10 text-red-400 text-sm text-center p-2 rounded-lg mb-4">
                    {error}
                </p>
            )}
            <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Create Account</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input type="text" name="name" placeholder="Full Name" onChange={handleChange}
                        className="bg-gray-800 text-white placeholder-gray-500 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 " />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="bg-gray-800 text-white placeholder-gray-500 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="relative">
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            onChange={handleChange}
                            className="w-full bg-gray-800 text-white placeholder-gray-500 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition cursor-pointer">
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    <div className="relative">
                        <input
                            name="confirmPassword"
                            type={showCoPassword ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            onChange={handleChange}
                            className="w-full bg-gray-800 text-white placeholder-gray-500 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                        />
                        <button type="button" onClick={() => setShowCoPassword(!showCoPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition cursor-pointer">
                            {showCoPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {passwordError && (
                        <p className="text-red-400 text-sm -mt-2">
                            {passwordError}
                        </p>
                    )
                    }
                    <button type="submit"
                        className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition duration-200 cursor-pointer">
                        {reg_loading ? (
                            <div className="flex items-center justify-center">
                                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <p>Register</p>
                        )}
                    </button>
                </form>
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="mt-4 flex items-center justify-center  gap-3 w-full py-2.5 px-4 bg-white text-[#3c4043] text-sm font-medium border border-[#dadce0] rounded-lg hover:bg-gray-300 hover:shadow-sm transition-all duration-200 cursor-pointer">
                    <svg width="18" height="18" viewBox="0 0 48 48">
                        <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.85l6.09-6.09C34.46 3.05 29.5 1 24 1 14.82 1 7.07 6.48 3.58 14.18l7.1 5.51C12.4 13.61 17.73 9.5 24 9.5z" />
                        <path fill="#4285F4" d="M46.52 24.5c0-1.64-.15-3.22-.42-4.74H24v8.98h12.7c-.55 2.96-2.2 5.47-4.68 7.15l7.18 5.57C43.44 37.44 46.52 31.4 46.52 24.5z" />
                        <path fill="#FBBC05" d="M10.68 28.31A14.6 14.6 0 0 1 9.5 24c0-1.5.26-2.95.68-4.31l-7.1-5.51A23.93 23.93 0 0 0 0 24c0 3.86.92 7.5 2.56 10.72l8.12-6.41z" />
                        <path fill="#34A853" d="M24 47c5.5 0 10.12-1.82 13.5-4.96l-7.18-5.57C28.6 37.84 26.42 38.5 24 38.5c-6.27 0-11.6-4.11-13.32-9.69l-8.12 6.41C6.07 43.52 14.46 47 24 47z" />
                    </svg>
                    Continue with Google
                </button>

                <p className="text-gray-500 text-sm text-center mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Register