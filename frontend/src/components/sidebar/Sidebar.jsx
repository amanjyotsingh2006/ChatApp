import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogoutButton from './LogoutButton'
import useConversation from '../../zustand/userConversation'
import { useAuthContext } from '../../context/AuthContext'

const Sidebar = () => {
  const { selectedConversation } = useConversation();
  const { authUser } = useAuthContext();

  return (
    <div className={`w-full sm:w-[370px] sm:min-h-screen shrink-0 h-full overflow-hidden border-r border-white/10 p-4 flex-col
        ${selectedConversation ? 'hidden sm:flex' : 'flex'}`}>

      {/* Logged-in-as profile header */}
      <div className='flex items-center gap-3 mb-3 pb-3 border-b border-white/10 shrink-0'>
        <div className='relative shrink-0'>
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${authUser.username}`}
            alt={authUser.fullName}
            className='w-11 h-11 rounded-full ring-2 ring-blue-500/50'
          />
          <span className='absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-[#0f172a]' />
        </div>

        <div className='flex flex-col min-w-0'>
          <span className='text-white font-semibold truncate leading-tight'>
            {authUser.fullName}
          </span>
        </div>
      </div>

      <SearchInput />
      <div className='divider px-3 opacity-20 shrink-0'></div>
      <Conversations />
      <LogoutButton />
    </div>
  )
}

export default Sidebar