import { useEffect } from 'react';
import { getToken } from '../utils/localStorage';
import {useHistory} from "react-router-dom"

export const UseProtectedPage = () => {
    
    const history = useHistory()

    useEffect(() => {
        const token = getToken()
        if (!token) {
            history.push("/")
        }
    }, [history])
}

