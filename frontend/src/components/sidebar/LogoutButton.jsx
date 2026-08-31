import { BiLogOut } from 'react-icons/bi'

import React from 'react'
import useLogout from '../../hooks/useLogout'

const LogoutButton = () => {
  const { loading, logout } = useLogout();
  return (
    <div className='mt-auto pt-3 border-t border-white/10 shrink-0'>
      {!loading ? (
        <button
          onClick={logout}
          className='w-full flex items-center gap-2 text-gray-400 hover:text-red-400 text-sm transition-colors'
        >
          <BiLogOut className="w-5 h-5" />
          Log out
        </button>
      ) : (
        <span className='loading loading-spinner loading-sm mx-auto block'></span>
      )}
    </div>
  )
}

export default LogoutButton