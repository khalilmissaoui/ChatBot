import React, { useEffect ,useRef } from 'react'
import styled from 'styled-components'
import Botmessage from '../messages/Botmessage'
import UserMessage from '../messages/UserMessage'


import {addmessage,selectMessages} from '../../Redux/chatSlice'
import {selectScenario} from '../../Redux/stepsSlice'

import { useDispatch , useSelector} from 'react-redux'
import Suggests from '../Suggests'


function ChatMessage() {
  const hope = useRef(null)

useEffect(() => {

  console.log('messages.length',messages);
  document.getElementById("msg").scrollTo({
   top:hope.current.offsetTop,
   behavior:'smooth'
 })


hope.current.scrollIntoView({ behavior:'smooth' })


}, [messages])

    const scenario =  useSelector(selectScenario);      

    const messages =  useSelector(selectMessages)

    return (
        <Container id="msg" > 
        {console.log(scenario)}
        {(scenario) ? 
         messages.map( (message,index) =>{
          return message.source==='bot'?
          <Botmessage  key={index} message={message}/> :
            <UserMessage key={index} message={message}/>
        } ) : <Suggests /> 
      }
            <div ref={hope}></div>
        </Container>
    )
}

export default ChatMessage

const Container = styled.div`
padding : 10px;
width: 100%;
height: 100%;
padding :20px;
overflow-y:auto;

overflow-y : auto;
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
`

