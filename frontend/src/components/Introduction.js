import React from 'react'
import IntroBox from './IntroBox'
import styled from 'styled-components'
import { useHistory } from "react-router-dom";
import Steps from './sidebar/additionalstuff/Steps';

function Introduction() {
  const history = useHistory();
  const gotoauth = () =>{
    history.push('/auth')
  }

  const gotoregister = () =>{
    history.push('/register')
  }
    return (
        <Container>
          <Steps activeStep={0}/>
          <HeadTitle>
            Choose your path
          </HeadTitle>
          <TwoWays>
          <Statics onClick={()=>gotoregister()}>
                <StaticBox> 
                Register phase from this way
                </StaticBox>
            </Statics>
            <Statics onClick={()=>gotoauth()}>
                <StaticBox> 
                Authentification phase
                </StaticBox>
            </Statics>
          </TwoWays>
        </Container>
    )
}

export default Introduction

const Container = styled.div`
display: grid;
grid-template-rows: minmax(0, 160px)  auto;
background : orange;
width: 100%;
height: 100vh;


`
const HeadTitle = styled.div`
display:flex;
justify-content:center ;
align-items:center;
font-family: Tahoma, sans-serif;
font-size : 35px;
`
const TwoWays = styled.div`
display:flex;
justify-content : space-around;
flex-direction:columns;
`

const Statics = styled.div`
padding : 5px 15px;
width: 300px ;
height: 300px ;
`
const StaticBox = styled.div`
padding : 15px;
width: 100%;
height: 100%;
background-color :#d4e1ff;
border-radius: 10px;
overflow : hidden;
box-shadow :0 20px 25px -5px rgba(0, 0, 0, 0.2);
display:flex;
flex-direction: column;
:hover{
  cursor :pointer;
  box-shadow :inset 0 2px 4px 0 rgba(0, 0, 0, 0.2);
}

`