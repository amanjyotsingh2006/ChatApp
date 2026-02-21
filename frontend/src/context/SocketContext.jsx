import { Children, createContext, useContext, useEffect, useState } from "react";
import { AuthContext, useAuthContext } from "./AuthContext";
import io from 'socket.io-client'

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {

    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {authUser} = useAuthContext();

    useEffect(() => {
        if(authUser) {
            const socket = io("https://chatapp-h49b.onrender.com", {
                query: {
                    userId: authUser._id
                }
            });
            setSocket(socket);

            socket.on("getOnlineUser", (users) => {
                setOnlineUsers(users);
            })

            return () => socket.close();
        }
        else{
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser])

    return<SocketContext.Provider value={{socket, onlineUsers}}>{children}</SocketContext.Provider>
}