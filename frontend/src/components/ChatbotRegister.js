import React , {useState , useEffect} from 'react'
import ChatAuth from './ChatAuth';
import './sidebar/CSS/fadein.css';
import styled from 'styled-components'
import ChatRegister from './ChatRegister';
import Steps from './sidebar/additionalstuff/Steps';
function ChatbotRegister() {
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
                <div></div>
                <ChatRegister/>
                <div></div>
                
        </Container>
    )
}

export default ChatbotRegister

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position:absolute;
  overflow: hidden;
  display: grid;
  grid-template-columns: 200px auto 200px;
  `
