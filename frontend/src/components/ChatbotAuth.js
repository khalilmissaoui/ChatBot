import React , {useState , useEffect} from 'react'
import ChatAuth from './ChatAuth';
import './sidebar/CSS/fadein.css';
import styled from 'styled-components'
function ChatbotAuth() {
    const [fadein, setfadein] = useState(true)
    const [loading, setloading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setloading(false)
        }, 6000);
        setTimeout(() => {
            setfadein(false)
        }, 4000);
    }, [])

    return (
        <Container>
            {loading? fadein?
                <div className='fade-in pic piczoom'>
                <img src='authpic2.png' alt='e-learning assitant' />
            </div>
            :
            <div className='pic fade-out piczoom'>
            <img src='authpic2.png' alt='virtual learning chatbot' />
            </div>           
            :
            <div className='fade-inchat container'>
                <div></div>
                <ChatAuth/>
                <div></div>
            </div>}
                
                
        </Container>
    )
}

export default ChatbotAuth

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position:absolute;
  overflow: hidden;
  `