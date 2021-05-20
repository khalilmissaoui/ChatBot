import React, {useState}from 'react'
import IntroBox from './IntroBox'
import styled from 'styled-components'
import { Link, useHistory } from "react-router-dom";
import Steps from './sidebar/additionalstuff/Steps';
import {dispatchLogin} from '../Redux/actions/authAction'
import {useDispatch} from 'react-redux'
import axios from '../axios/axios'
import { GoogleLogin } from 'react-google-login';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const initialState = {
  email: '',
  password: '',
  err: '',
  success: ''
}
function Introduction() {
  const [user, setUser] = useState(initialState)
  const dispatch = useDispatch()
  const history = useHistory();


  
  const gotoauth = () =>{
    history.push('/auth')
  }

  const gotoregister = () =>{
    history.push('/register')
  }
  const responseGoogle = async (response) => {
    try {
        const res = await axios.post('/login/google_login', {tokenId: response.tokenId})

        setUser({...user, error:'', success: res.data.msg})
        localStorage.setItem('firstLogin', true)
        
        dispatch(dispatchLogin())
        history.push('/')
    } catch (err) {
        err.response.data.msg && 
        setUser({...user, err: err.response.data.msg, success: ''})
    }
}

    return (
        <Container>
          <Steps activeStep={0}/>
          <div style={{marginTop:'-60px' , height:'60px' , display:'flex' , justifyContent:'flex-end', marginRight:'150px'}}>
          <GoogleButton>

          <Link to='/whoami' style={{marginLeft:'5px' , textDecoration:'none'}} >WHO AM I <HelpOutlineIcon/></Link> 
          </GoogleButton>
          </div>
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

const GoogleButton =styled.button`
width: 120px;
height: 60px;
border-radius: 5px;
display : flex ; 
align-items : center ;
justify-content : center ;
overflow: hidden;

font-family: 'Roboto', sans-serif;
color: #000;
background-color: #fff;
border: none;

box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
transition: all 0.3s ease 0s;
cursor: pointer;
outline: none;

:hover{
  box-shadow: 0px 15px 20px grey;
  transform: translateY(-7px);
}

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