import React, { useEffect } from 'react'
import axios from '../axios/axios';

function Logout() {
    useEffect(() => {
        axios.get('/getcurrentuser').then( (result)=>{
    
            console.log('result.data',result.data)
        })
    }, [])
    return (
        <div>
            logout page
        </div>
    )
}

export default Logout
