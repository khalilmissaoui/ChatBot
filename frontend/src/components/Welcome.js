import React from 'react'
import LeftsideBar from "../components/sidebar/LeftsideBar";
import Chatbot from "../components/Chatbot";
import RightsideBar from "../components/sidebar/RightsideBar";
import styled from 'styled-components'
import { useDispatch , useSelector} from 'react-redux'
import {addmessage,fetchMessages} from '../Redux/chatSlice'
function Welcome({user}) {
  const dispatch = useDispatch();

React.useEffect(() => {
  dispatch(fetchMessages())
}, [])
React.useEffect(() => {
 
}, [])
    return (
        <Container>
                <LeftsideBar/>
              <Chatbot users={user}/>
              <RightsideBar/>  
        </Container>
    )
}

export default Welcome


const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns:  400px minmax(600px,1fr)  400px;
  @media (max-width: 1200px) { 
    grid-template-columns:  0% 100% 0%;
  }
  `