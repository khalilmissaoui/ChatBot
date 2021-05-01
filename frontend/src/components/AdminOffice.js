import React from 'react'
import { UserContext } from '../contextProvider/contextProvider';
import { useHistory } from "react-router-dom";
import { TheLayout } from '../containers';
import Dashboard from '../views/dashboard/Dashboard';

function AdminOffice() {
   
   // const history = useHistory();

    // React.useEffect(() => {
        // console.log('admin user',user);
        // if(user.role=='user'){
        //     console.log('pushedd ');
        //     history.push('/')
        // }

    // }, [])

    return (
        <div>
            admin
        </div>
    )
}

export default AdminOffice
