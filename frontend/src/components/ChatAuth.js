import React , {useEffect , useState} from 'react'
import styled from 'styled-components'
import { useDispatch , useSelector} from 'react-redux'
import axios from '../axios/axios'

import ChatMessageAuth from './ChatAuth/ChatMessageAuth'
import MessageInputAuth from './ChatAuth/MessageInputAuth'
import Steps from './sidebar/additionalstuff/Steps'
import ForgetPasswordDialog from './sidebar/additionalstuff/ForgetPasswordDialog'

function ChatAuth() {

    // const [AuthMessages, setAuthMessages] = useState([
    //   { msg: "null", source: "bot" },
    // ]);
    const [forget, setforget] = useState(false)
    const [open, setOpen] = React.useState(false);

  

    return (
        <div>

            <Container>
            <Steps activeStep={2}/> 

            <Chat>
                <ChatMessageAuth  />
               <MessageInputAuth forget = {forget} setforget= {setforget}/>
            </Chat>
            {forget && <a style={{color:'blue',textDecoration:'underline' , textShadow:'5px 5px 10px grey'}} onClick={()=>{setOpen(true)}}>Click here to reset your password !</a>}
            <ForgetPasswordDialog open={open} setOpen={setOpen} />
            </Container>

        </div>
    )
}

export default ChatAuth


const Container = styled.div`

width: 100%;
height: 100vh;
padding : 20px ;
display: grid;
grid-template-rows: minmax(0, 160px)  auto 20px;
`

const Chat = styled.div`
width: 100%;
height: 100%;
background-color :#d4e1ff;
border-radius: 20px;
overflow : hidden;
box-shadow :0 25px 50px -12px rgba(0, 0, 0, 0.25);
display: grid;
grid-template-rows: auto minmax(0, 70px);

`