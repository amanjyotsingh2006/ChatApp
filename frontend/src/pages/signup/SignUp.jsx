import {React, useState} from 'react'

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const show = <img src="https://img.icons8.com/?size=100&id=NgaxRjKJKGk4&format=png&color=FFFFFF" alt="" srcset="" width={25} />
    const hide = <img src="https://img.icons8.com/?size=100&id=986&format=png&color=FFFFFF" alt="" srcset="" width={25} />
    return (
        <div className='flex flex-col items-center justify-center mx-auto min-w-96'>
            <div className="w-full max-w-md p-6 rounded-lg shadow-md bg-white/10 backdrop-blur-lg border border-white/20">
                <h1 className='text-3xl text-center font-semibold text-gray-300'>
                    SignUp
                    <span className='text-blue-500'> ChatApp</span>
                </h1> <br />
                <form className='flex flex-col w-full justify-center'>
                    <div className='p-2'>
                        <label className='text-xl'>Name</label>
                        <input type="text" placeholder="Enter Name" className="input" />
                    </div>
                    <div className='p-2'>
                        <label className='text-xl'>Username</label>
                        <input type="text" placeholder="Enter Username" className="input" />
                    </div>
                    <div className='p-2'>
                        <label className='text-xl'>Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Password"
                                className="input w-full pr-10"
                            />

                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-lg"
                            >
                                {showPassword ? show : hide}
                            </span>
                        </div>  
                    </div>
                    <div className='p-2'>
                        <label className='text-xl'>Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Enter Password"
                                className="input w-full pr-10"
                            />

                            <span
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-lg"
                            >
                                {showConfirmPassword ? show : hide}
                            </span>
                        </div>  
                    </div>
                    <div className='ml-4'>
                        <a href="Login" className='text-sm hover:text-blue-500 mt-2'>Already Have an account?</a>
                    </div>
                    <div className='p-4 flex text-center justify-center'>
                        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl w-full h-8 text-lg hover:bg-blue-500 hover:border-white active:border-white">SignUp</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
