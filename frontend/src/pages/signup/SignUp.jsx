import { React, useState } from 'react'
import { Link } from 'react-router-dom';

import GenderCheckbox from './GenderCheckbox';
import useSignup from '../../hooks/useSignup';

const SignUp = () => {
    const [inputs, setInputs] = useState({
        'fullName': '',
        'username': '',
        'password': '',
        'confirmPassword': '',
        'gender': ''
    })

    const {loading, signup} = useSignup()

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const show = <img src="https://img.icons8.com/?size=100&id=NgaxRjKJKGk4&format=png&color=FFFFFF" alt="" srcset="" width={22} />
    const hide = <img src="https://img.icons8.com/?size=100&id=986&format=png&color=FFFFFF" alt="" srcset="" width={22} />

    const handleCheckboxChange = (gender) => {
        setInputs({...inputs, gender})
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        e.preventDefault();
        await signup(inputs)
    };


    return (
        <div className='relative flex flex-col items-center justify-center mx-auto w-full min-h-screen px-4 sm:px-6 py-10 overflow-hidden'>

            {/* Ambient background glow */}
            <div className="pointer-events-none absolute -top-32 -left-24 w-72 h-72 sm:w-96 sm:h-96 bg-blue-600/30 rounded-full blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-24 w-72 h-72 sm:w-96 sm:h-96 bg-purple-600/20 rounded-full blur-3xl" />

            <div className="relative w-full max-w-[480px] p-8 sm:p-10 rounded-2xl shadow-2xl bg-white/[0.07] backdrop-blur-xl border border-white/10">

                {/* Signature mark: chat-bubble avatar */}
                <div className="mx-auto mb-5 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-900/40 rotate-3">
                    <span className="text-2xl -rotate-3">💬</span>
                </div>

                <h1 className='text-3xl sm:text-[2.1rem] leading-tight text-center font-bold text-white tracking-tight'>
                    Create account
                </h1>
                <p className='text-center text-sm text-gray-400 mt-2 mb-8'>
                    Join <span className='text-blue-400 font-medium'>ChatApp</span> and start chatting in seconds
                </p>

                <form onSubmit={handleSubmit} className='flex flex-col w-full justify-center space-y-4'>

                    <div>
                        <label className='block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5'>Name</label>
                        <input type="text" placeholder="Enter Name"
                            className="text-white input w-full h-12 text-base bg-white/5 border-white/10 focus:border-blue-500 focus:outline-none rounded-lg placeholder:text-gray-500 transition-colors"
                            value={inputs.fullName}
                            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className='block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5'>Username</label>
                        <input type="text" placeholder="Enter Username"
                            className="text-white input w-full h-12 text-base bg-white/5 border-white/10 focus:border-blue-500 focus:outline-none rounded-lg placeholder:text-gray-500 transition-colors"
                            value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className='block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5'>Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Password"
                                className="text-white input w-full h-12 text-base bg-white/5 border-white/10 focus:border-blue-500 focus:outline-none rounded-lg pr-12 placeholder:text-gray-500 transition-colors"
                                value={inputs.password}
                                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                            />

                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                            >
                                {showPassword ? show : hide}
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className='block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5'>Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Enter Password"
                                className="text-white input w-full h-12 text-base bg-white/5 border-white/10 focus:border-blue-500 focus:outline-none rounded-lg pr-12 placeholder:text-gray-500 transition-colors"
                                value={inputs.confirmPassword}
                                onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                            />

                            <span
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                            >
                                {showConfirmPassword ? show : hide}
                            </span>
                        </div>
                    </div>

                    <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

                    <div className='flex justify-end -mt-1'>
                        <Link to={"/login"} className='text-sm text-gray-400 hover:text-blue-400 transition-colors'>
                            Already have an account?
                        </Link>
                    </div>

                    <button
                        className="btn w-full h-12 text-base font-semibold border-none bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg shadow-lg shadow-blue-900/30 transition-all active:scale-[0.98]"
                        disabled={loading}
                    >
                        {loading
                            ? <span className='loading loading-spinner'></span>
                            : "SignUp"
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignUp