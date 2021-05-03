import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CForm,
    CFormGroup,
    CInputFile,
    CLabel,
    CRow,
  } from '@coreui/react'
  import React, { Component }  from 'react';
  import CIcon from '@coreui/icons-react'
function BotConfig(){
    return(
        <>
        <CRow>
        <CCol xs="12" md="8">
          <CCard>
            <CCardHeader>
              Training The Chat Bot
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                <CFormGroup row>
                  <CLabel col md={3}>Insert your data:</CLabel>
                  <CCol xs="12" md="8">
                    <CInputFile custom id="custom-file-input"/>
                    <CLabel htmlFor="custom-file-input" variant="custom-file">
                      Choose file...
                    </CLabel>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
          </CCol>
          </CRow>
        </>
    )
}

export default BotConfig;