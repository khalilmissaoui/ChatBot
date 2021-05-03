import React from 'react'
import styled from 'styled-components'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';


function Steps({activeStep}) {
    return (
        <Container>
            <Stepper style={{background:'transparent'}} activeStep={activeStep} >
                <Step>
                    <StepLabel>Welcome</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Register phase</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Authentification phase</StepLabel>
                </Step>
            </Stepper>
        </Container>
    )
}

export default Steps
const Container = styled.div`

width: 100%;
height: 40px;
`
