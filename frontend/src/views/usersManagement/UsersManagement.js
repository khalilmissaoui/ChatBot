import React, { useState, useEffect } from 'react'

import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CRow,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Axios from 'axios'

function UsersManagement() {
    const [danger, setDanger] = useState(false);
    const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/user').then((response) => {
        setUsersList(response.data)
    })
  }, [])

    return (
        <>

            <CModal
                show={danger}
                onClose={() => setDanger(!danger)}
                color="danger"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Modal title</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    Do you really want to delete this user?
              </CModalBody>
                <CModalFooter>
                    <CButton color="danger" onClick={() => setDanger(!danger)}>Delete</CButton>{' '}
                    <CButton color="secondary" onClick={() => setDanger(!danger)}>Cancel</CButton>
                </CModalFooter>
            </CModal>
            <CRow>
                <CCard style={{ width: '100%' }}>
                    <CCardHeader>
                        Learners
            </CCardHeader>
                    <CCardBody>
                        <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                            <thead className="thead-light">
                                <tr>
                                    <th className="text-center"><CIcon name="cil-people" /></th>
                                    <th>User</th>
                                    <th className="text-center">Country</th>
                                    <th className="text-center">Delete user</th>
                                </tr>
                            </thead>
                            <tbody>
                                <>
                                {usersList.map(({ id, name, country,role }) => (
                                    <>
                        {role === 'user' ? <tr>
                    
                            <td className="text-center">
                                
                                                  <div className="c-avatar">
                                                      <img src={'avatars/1.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                                                      <span className="c-avatar-status bg-success"></span>
                                                  </div>
                                              </td>
                                              <td>
                                                  <div>{name}</div>
                                              </td>
                                              <td className="text-center">
                                                  <div>{country}</div>
                                              </td>
                                              
                                              <td>
          
                                                  <CButton color="danger" onClick={() => setDanger(!danger)} className="mr-1">Delete</CButton>
          
                                              </td>
                          </tr>:null}        
                          </>    
	            
	          ))}
</>








                                    
                                
                                
                            </tbody>
                        </table> 
                        <CButton color="secondary">Cancel</CButton>
                    </CCardBody>
                   
                </CCard>
            </CRow>
            
        </>
    )
}
export default UsersManagement;
