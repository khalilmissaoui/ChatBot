import React from 'react'
import styled from 'styled-components'

function Botmessage( {message}) {
    
    return (
        <Container>
        <UserAvatar>
        <img  src="https://i.pinimg.com/originals/0c/67/5a/0c675a8e1061478d2b7b21b330093444.gif"/>
        </UserAvatar>

        <UserChatbox>
            {message.msg}
        </UserChatbox>
    </Container>
    )
}

export default Botmessage



const Container = styled.div`
height : 60px;
padding : 3px;
width : 100%; 
color :white ;
display : flex ;
align-items : center ;
`

const UserAvatar = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    display : flex ; 
    align-items : center ;
    justify-content : center ;
    overflow: hidden;
    margin-right: 8px;
    border : 0.1px solid  #c2c2d6;
    img {
        width: 100%;
          height: 100%;
        
        box-shadow :0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
`
const UserChatbox = styled.div`
width : auto;
height :45px;
color : #2e374d;
background : white;
box-shadow :0 25px 50px -12px rgba(0, 0, 0, 0.35);
padding :  5px 10px;
margin-left : 7px;
display : flex ;
align-items : center ;
font-size: 14px;
font-family: Georgia, cursive;
border-radius : 15px;
font-weight: lighter;

`