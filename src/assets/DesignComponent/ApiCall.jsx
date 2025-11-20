import axios from 'axios'
import React, { useState } from 'react'

const ApiCall = () => {

    const [data, setData] = useState([])
    const BASEURL = 'http://localhost:3000'

    const triggerAPI = async(ENDPOINT, METHOD, BODY={})=> {
        const API_URL = BASEURL + ENDPOINT
        const response = await axios[METHOD](API_URL, BODY)
        setData(response.data)
    }
    return { data, triggerAPI}
}

export default ApiCall