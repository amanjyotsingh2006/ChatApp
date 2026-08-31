import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import { TiMessages } from "react-icons/ti"
import { IoArrowBack } from "react-icons/io5"
import useConversation from '../../../zustand/userConversation';
import { useAuthContext } from '../../../context/AuthContext';
import { useSocketContext } from '../../../context/SocketContext';

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { onlineUsers } = useSocketContext();

    useEffect(() => {
        return () => setSelectedConversation(null);
    }, [setSelectedConversation])

    const isOnline = selectedConversation && onlineUsers.includes(selectedConversation._id);

    return (
        <div className={`flex-1 min-w-0 min-h-0 h-full flex-col
            ${selectedConversation ? 'flex' : 'hidden sm:flex'}`}>
            {!selectedConversation ? (<NoChatSelected />) :
                (<>
                    {/* Chat header */}
                    <div className='flex items-center gap-3 bg-white/5 border-b border-white/10 px-4 py-3 shrink-0'>
                        <button
                            onClick={() => setSelectedConversation(null)}
                            className='sm:hidden text-gray-300 hover:text-white shrink-0'
                        >
                            <IoArrowBack className='text-xl' />
                        </button>

                        <div className='relative shrink-0'>
                            <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedConversation.username}`}
                                alt={selectedConversation.fullName}
                                className='w-10 h-10 rounded-full ring-1 ring-white/10'
                            />
                            <span
                                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#0f172a]
                                    ${isOnline ? 'bg-green-500' : 'bg-gray-500'}`}
                            />
                        </div>

                        <div className='flex flex-col min-w-0'>
                            <span className='text-white font-semibold truncate leading-tight'>
                                {selectedConversation.fullName}
                            </span>
                            <span className={`text-xs leading-tight ${isOnline ? 'text-green-400' : 'text-gray-500'}`}>
                                {isOnline ? 'Online' : 'Offline'}
                            </span>
                        </div>
                    </div>

                    <Messages />
                    <MessageInput />
                </>
                )}
        </div>
    );
};

export default MessageContainer

const NoChatSelected = () => {
    const { authUser } = useAuthContext()
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome 👋 {authUser.fullName} ❄️</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center' />
            </div>
        </div>
    )
}