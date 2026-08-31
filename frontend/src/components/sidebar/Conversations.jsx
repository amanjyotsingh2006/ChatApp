import React from 'react'
import Conversation from './Conversation'
import useGetConversation from '../../hooks/useGetConversation'
import { getRandomEmoji } from '../../utils/emojis';

const Conversations = () => {
  const { loading, conversations } = useGetConversation();

  return (
    <div className='flex-1 min-h-0 py-2 flex flex-col gap-1 overflow-y-auto'>
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length}
        />
      ))}

      {loading ? <span className='loading loading-spinner mx-auto mt-4'></span> : null}

      {!loading && conversations.length === 0 && (
        <p className='text-center text-sm text-gray-500 mt-6'>No conversations yet</p>
      )}
    </div>
  )
}

export default Conversations