import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../../hooks/useGetMessages'
import MessageSkeleton from '../../skeletons/MessageSkeleton';
import useListenMessage from '../../../hooks/useListenMessage';

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessage();
  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100)
  }, [messages])
  return (
    <div className='px-4 py-2 flex-1 min-h-0 overflow-y-auto space-y-1'>

      {!loading && messages.length > 0 && messages.map((message) => (
        <div key={message._id} ref={lastMessageRef}>
          <Message message={message} />
        </div>
      ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <div className='flex items-center justify-center h-full'>
          <p className='text-center text-gray-500 text-sm'>Send a message to start the conversation</p>
        </div>
      )}
    </div>
  )
}

export default Messages