import React from 'react'


import { FaSearch } from "react-icons/fa"; //Search Icon input

const SearchInput = () => {
    return (
        <div className='flex items-center gap-2 p-2'>
            <input type="text" name="search" id="search" placeholder='Search...' className='bg-black text-white input input-bordered rounded-full' />
            <button className='bg-sky-500 p-3 rounded-4xl'>
                <FaSearch className='w-6 h-6 outline-none' />
            </button>
        </div>
    )
}

export default SearchInput
