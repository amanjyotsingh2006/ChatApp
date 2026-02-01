import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messagecontainer/messages/MessageContainer'

const Home = () => {
    return (
        <div className='flex rounded-lg sm:h-[450px] md:h-[550px] overflow-hidden bg-gray-400 bg-clip-padding bg-white/10 backdrop-blur-lg border border-white/20'>
            <Sidebar />
            <MessageContainer />
        </div>
    )
}

export default Home
