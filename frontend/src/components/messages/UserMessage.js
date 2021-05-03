import React , {useEffect , useState , useContext} from 'react'
import styled from 'styled-components'
import { UserContext } from '../../contextProvider/contextProvider';

function UserMessage({message , user}) {
    
    return (
        <Container>
            {console.log('users.img',user)}
            <UserAvatar>
            {
                          user ?<img src={`${user.imgpic}`}/>:
                          <img src='https://media.istockphoto.com/photos/businesswoman-portrait-on-white-picture-id615279718?k=6&m=615279718&s=612x612&w=0&h=ozD8oKRFXmyyXoAcDuo09WSkmtLSYYlOBuCCNrMyW2Y='/>
            }

            </UserAvatar>

            <UserChatbox>
               {message.msg}
            </UserChatbox>
        </Container>
    )
}

export default UserMessage

const Container = styled.div`
height : 60px;
padding : 3px;
width : 100%; 
color :white ;
display : flex ;
align-items : center ;
flex-direction : row-reverse ;
`

const UserAvatar = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    display : flex ; 
    align-items : center ;
    justify-content : center ;
    overflow: hidden;
    border : 0.1px solid  #c2c2d6;
    margin-left: 8px;
    img {
        width: 100%;
    }
`
const UserChatbox = styled.div`
width : auto;
height :45px;
color : white;
background : #2e374d;

padding :  5px 10px;
margin-right : 8px;
display : flex ;
align-items : center ;
font-size: 14px;
font-family: 'Hanalei Fill', cursive;
border-radius : 15px;
font-weight: lighter;

`