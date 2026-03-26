import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/userApi";

function Register() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' })
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await registerUser(formData)
            navigate('/login')

        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed')
        }
    }

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
            <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Create Account</h2>

                {error && (
                    <p className="bg-red-500/10 text-red-400 text-sm text-center p-2 rounded-lg mb-4">
                        {error}
                    </p>
                )}
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
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="bg-gray-800 text-white placeholder-gray-500 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-200">
                        Register
                    </button>
                </form>

                <p className="text-gray-500 text-sm text-center mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Register