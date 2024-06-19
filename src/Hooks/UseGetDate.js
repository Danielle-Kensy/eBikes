import { useState, useEffect } from "react"
import axios from "axios"

const UseGetData = (endpoint, initialState) => {
    const [data, setData] = useState(initialState)

    const getData = () => {
        axios.get(`http://localhost:3003${endpoint}`, {
        })
        .then((res) => setData(res.data))
        .catch((err) => alert(err.response.data.message))
    }

    useEffect(() => {
        getData()
    }, [endpoint])

    return [data, getData]
}

export default UseGetData 