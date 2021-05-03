import React , {useEffect , useState} from 'react'
import styled from 'styled-components'
import { useDispatch , useSelector} from 'react-redux'
import axios from '../axios/axios'


import ChatMessageRegister from './ChatRegister/ChatMessageRegister'
import MessageInputRegister from './ChatRegister/MessageInputRegister'
import Steps from './sidebar/additionalstuff/Steps'

function ChatRegister() {

    // const [AuthMessages, setAuthMessages] = useState([
    //   { msg: "null", source: "bot" },
    // ]);

 

    return (
        <div>

            <Container>
                <Steps activeStep={1} />
            <Chat>
                <ChatMessageRegister />
               <MessageInputRegister/>
            </Chat>
            </Container>

        </div>
    )
}

export default ChatRegister


const Container = styled.div`

width: 100%;
height: 100vh;
padding : 20px ;
display: grid;
grid-template-rows: minmax(0, 160px)  auto;
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