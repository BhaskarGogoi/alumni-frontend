import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const logout = () => {
            localStorage.clear();
            navigate('/')
        }
        logout()
    })
}

export default Logout