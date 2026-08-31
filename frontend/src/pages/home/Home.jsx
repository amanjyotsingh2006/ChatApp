import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messagecontainer/messages/MessageContainer'

const Home = () => {
    return (
        <div className='flex w-[100vw] h-[95vh] max-w-[1900px] max-h-[850px] rounded-lg overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20'>
            <Sidebar />
            <MessageContainer />
        </div>
    )
}

export default Home
