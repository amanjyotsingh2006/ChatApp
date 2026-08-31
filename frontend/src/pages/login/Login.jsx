import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const show = <img src="https://img.icons8.com/?size=100&id=NgaxRjKJKGk4&format=png&color=FFFFFF" alt="" srcset="" width={22} />
    const hide = <img src="https://img.icons8.com/?size=100&id=986&format=png&color=FFFFFF" alt="" srcset="" width={22} />

    const { loading, login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password)
    }
    return (
        <div className='relative flex flex-col items-center justify-center mx-auto w-full min-h-screen px-4 sm:px-6 overflow-hidden'>

            {/* Ambient background glow */}
            <div className="pointer-events-none absolute -top-32 -left-24 w-72 h-72 sm:w-96 sm:h-96 bg-blue-600/30 rounded-full blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-24 w-72 h-72 sm:w-96 sm:h-96 bg-purple-600/20 rounded-full blur-3xl" />

            <div className="relative w-full max-w-[440px] p-8 sm:p-11 rounded-2xl shadow-2xl bg-white/[0.07] backdrop-blur-xl border border-white/10">

                {/* Signature mark: chat-bubble avatar */}
                <div className="mx-auto mb-5 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-900/40 rotate-3">
                    <span className="text-2xl -rotate-3">💬</span>
                </div>

                <h1 className='text-3xl sm:text-[2.1rem] leading-tight text-center font-bold text-white tracking-tight'>
                    Welcome back
                </h1>
                <p className='text-center text-sm text-gray-400 mt-2 mb-8'>
                    Log in to <span className='text-blue-400 font-medium'>ChatApp</span> to keep the conversation going
                </p>

                <form onSubmit={handleSubmit} className='space-y-5'>

                    <div>
                        <label className='block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5'>
                            Username
                        </label>

                        <input
                            type="text"
                            placeholder="Enter Username"
                            className="text-white input w-full h-12 text-base bg-white/5 border-white/10 focus:border-blue-500 focus:outline-none rounded-lg placeholder:text-gray-500 transition-colors"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className='block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5'>
                            Password
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Password"
                                className="text-white input w-full h-12 text-base bg-white/5 border-white/10 focus:border-blue-500 focus:outline-none rounded-lg pr-12 placeholder:text-gray-500 transition-colors"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                            >
                                {showPassword ? show : hide}
                            </span>
                        </div>
                    </div>

                    <div className='flex justify-end -mt-1'>
                        <Link
                            to={"/signup"}
                            className='text-sm text-gray-400 hover:text-blue-400 transition-colors'
                        >
                            Don't have an account?
                        </Link>
                    </div>

                    <button
                        className="btn w-full h-12 text-base font-semibold border-none bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg shadow-lg shadow-blue-900/30 transition-all active:scale-[0.98]"
                        disabled={loading}
                    >
                        {loading
                            ? <span className='loading loading-spinner'></span>
                            : "Login"
                        }
                    </button>

                </form>
            </div>
        </div>
    )
}

export default Login