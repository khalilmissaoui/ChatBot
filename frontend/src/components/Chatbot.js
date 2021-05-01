import React , {useEffect , useContext} from 'react'
import styled from 'styled-components'
import ChatMessage from './Chat/ChatMessage'
import MessageInput from './Chat/MessageInput'
import { useDispatch } from 'react-redux'
import axios from '../axios/axios'
import {addmessage,fetchMessages} from '../Redux/chatSlice'
import { UserContext } from '../contextProvider/contextProvider';
function Chatbot() {
    const  dispatch = useDispatch();
    useEffect(() => {
        const event = async ()=>{
            const eventmsg = {
                source : 'event',
                msg : 'welcomeToTheParty'
            }
            dispatch(fetchMessages())
            const BotAnswer = await axios.post('/events',eventmsg)
            console.log(BotAnswer.data);
            dispatch(addmessage(BotAnswer.data));
        }

       event().then( ()=>{
           console.log('done');
       } )
    }, [])

    const {user,setuser} = useContext(UserContext)

    return (
        <div>
           
            <Container>
            <Chat>
                <ChatMessage/>
                <MessageInput/>
            </Chat>
            </Container>

        </div>
    )
}

export default Chatbot


const Container = styled.div`

width: 100%;
height: 100vh;
padding : 20px ;
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