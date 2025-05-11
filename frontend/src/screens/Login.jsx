import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import { UserContext } from '../context/user.context';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [welcomeVisible, setWelcomeVisible] = useState(false);
    
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Show welcome message with delay for better animation effect
        const timer = setTimeout(() => {
            setWelcomeVisible(true);
        }, 300);
        
        return () => clearTimeout(timer);
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        try {
            const res = await axios.post('/users/login', { email, password });
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200">
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg w-full max-w-md relative overflow-hidden border border-gray-300">
                {/* Animated welcome message */}
                <div className={`absolute top-0 left-0 right-0 bg-blue-600 text-white p-3 text-center transform transition-all duration-700 ease-in-out ${welcomeVisible ? 'translate-y-0' : '-translate-y-full'}`}>
                    <p className="font-medium">Welcome back! We're glad to see you again</p>
                </div>
                
                <div className="mt-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>
                    
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}
                    
                    <form onSubmit={submitHandler} className="space-y-5">
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type="email"
                                id="email"
                                className="w-full p-3 rounded-lg border border-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">Password</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type="password"
                                id="password"
                                className="w-full p-3 rounded-lg border border-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 transform hover:scale-[1.02] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    <p className="text-gray-700 mt-6 text-center">
                        Don't have an account? <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition duration-200">Create one</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;