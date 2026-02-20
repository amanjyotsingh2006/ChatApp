import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'
import { data } from 'react-router-dom'
// import { json } from 'express'

const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()
    
    const login = async (username, password) => {
         const success = handleInputError(username, password)
        if (!success) return;

        setLoading(true)
        try {
            const res = await fetch("api/auth/login", {
                method: "POST",
                headers: {"Content-Type": "Application/json"},
                body: JSON.stringify({username, password})
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(error.message);
            }
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data)
        } catch (error) {
            toast.error(data.error);
        } finally {
            setLoading(false);
        }
    }
    return {loading, login};
}

export default useLogin


function handleInputError( username, password ) {
    if (!username || !password ) {
        toast.error("Please fill in all fields")
        return false
    }

    return true
}