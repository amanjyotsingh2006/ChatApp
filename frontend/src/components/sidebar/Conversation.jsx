import React from 'react'
import useConversation from '../../zustand/userConversation'
import { useSocketContext } from '../../context/SocketContext';

const Conversation = ({ conversation, lastIdx, emoji }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    const isSelected = selectedConversation?._id === conversation._id;

    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id)

    return (
        <div
            className={`flex gap-3 items-center rounded-xl px-3 py-2.5 cursor-pointer transition-colors
                ${isSelected ? "bg-blue-500/15 border border-blue-500/40" : "border border-transparent hover:bg-white/5"}`}
            onClick={() => setSelectedConversation(conversation)}
        >
            <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
                <div className='w-11 rounded-full ring-1 ring-white/10'>
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${conversation.username}`} alt='user avatar' />
                </div>
            </div>

            <div className='flex flex-col flex-1 min-w-0'>
                <div className='flex gap-2 justify-between items-center'>
                    <p className={`font-medium truncate ${isSelected ? "text-white" : "text-gray-300"}`}>
                        {conversation.fullName}
                    </p>
                    <span className='text-lg shrink-0'>{emoji}</span>
                </div>
            </div>
        </div>
    )
}

export default Conversation