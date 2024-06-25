import { useState, useEffect } from "react"
import axios from "axios"
import { getToken } from '../utils/localStorage';

const UseGetProtectedData = (endpoint, initialState) => {
    const token = getToken()
    //if (!token) return {}
    const [data, setData] = useState(initialState)

    const getData = () => {
        axios.get(`http://localhost:3003/${endpoint}`, {
            headers: {
                Authorization: token 
            }
        })
        .then((res) => setData(res?.data))
        .catch((err) => console.log(err?.response?.data?.message))
    }

    useEffect(() => {
        getData()
    }, [endpoint, token])

    return [data, getData]
}

export default UseGetProtectedData 