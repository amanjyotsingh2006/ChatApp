import { useSocketContext } from '../context/SocketContext'
import useConversation from '../zustand/userConversation'
import { useEffect } from 'react'

import notificationSound from '../assets/sounds/notification.mp3'

const useListenMessage = () => {
    const { socket } = useSocketContext()
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true
            const sound = new Audio(notificationSound);
            sound.play();
            setMessages((prevMessages) => [...prevMessages, newMessage])
        })

        return () => socket?.off("newMessage")
    }, [socket, setMessages])
}

export default useListenMessage
