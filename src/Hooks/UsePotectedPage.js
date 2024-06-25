import { useEffect } from 'react';
import { getToken } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';

export const UseProtectedPage = () => {
    
    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken()
        if (!token) {
            navigate("/")
        }
    }, [navigate])
}

