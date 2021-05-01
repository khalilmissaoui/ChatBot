import React , {useContext} from 'react'
import styled from 'styled-components'
import SettingsIcon from '@material-ui/icons/Settings';
import Dialogs from './sidebar/additionalstuff/Dialogs';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import axios from '../axios/axios'
import {addmessage,selectMessages} from '../Redux/chatSlice'
import { useDispatch , useSelector} from 'react-redux'
import { useHistory } from "react-router-dom";
import DialogsSettings from './sidebar/additionalstuff/DialogsSettings';
import { UserContext } from '../contextProvider/contextProvider';

function ProfileNotif() {
    const [open, setOpen] = React.useState(false);
const {user,setuser} = React.useContext(UserContext)
      
    const dispatch = useDispatch()
    const handleClickOpen = () => {
      setOpen(true);
    };
    let history = useHistory();
    const logout =async () => {
        const usermsg = {
            source : 'bot',
            msg : "logout"
        }
        const BotAnswer = await axios.post('/logout',usermsg)
        const logoutmsg = {
            source : 'bot',
            msg : BotAnswer.data.msg
        }
        dispatch(addmessage(logoutmsg))
        console.log(BotAnswer.data.msg);
        
       setTimeout(() => {
        localStorage.removeItem("SavedToken");
        console.log(user);
        setuser({})
        history.push('/logout')
       }, 1000);
        
    }

const [currentuser, setcurrentuser] = React.useState({});
React.useEffect(() => {
    
   axios.get('/getcurrentuser').then( (result)=>{
    
       setcurrentuser(result.data)
   })
}, [])
    const [Notification, setNotification] = React.useState(true);
    return (
        <Container>
            <Profile>

                    <Logo>
                    <img src="https://media.istockphoto.com/photos/businesswoman-portrait-on-white-picture-id615279718?k=6&m=615279718&s=612x612&w=0&h=ozD8oKRFXmyyXoAcDuo09WSkmtLSYYlOBuCCNrMyW2Y="/>
                    </Logo>
                    <Headline>
                        <div>{currentuser.username}
                            <SettingButton onClick={()=>handleClickOpen()}>
                            <SettingsIcon className="settings"/>
                            </SettingButton>
                            <DialogsSettings open={open} setOpen={setOpen} />
                            </div> 
                    </Headline>
                    <Note>
                        <span>Beginner</span>
                    </Note>
            </Profile>
            <NotLogout>
                {
                    Notification?
                     <NotificationsActiveIcon onClick={
                         ()=>{alert('notification')
                            setNotification(false);
                        }} style={{color:"#fed22b"}} fontSize="large"/>:
                     <NotificationsNoneIcon fontSize="large"/>
                }
               
                <ExitToAppSharpIcon className='logout' onClick={()=>logout()} fontSize="large"/>
            </NotLogout>
        </Container>
    )
}
//realtime ago ; scroll ; enter shit with the mic
export default ProfileNotif
const Container = styled.div`
display: grid;
grid-template-columns:  auto 50% ;

  `

const Profile = styled.div`


`
const NotLogout = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
border-left : 1px solid #9bc1e6;
.logout{
    :focus{
        
    }
    :hover{
        cursor : pointer;
        color : red;
    }
}
`
const SettingButton = styled.button`
border : none ;
background-color : transparent;
:focus{outline: none;}
` 
const Headline = styled.div`
width : auto;
color : #2e3746;
height : 20px;
display: grid;
grid-template-columns:  auto 27% ;

.settings:hover{
    cursor : pointer; 
    color : grey;
}
`

const Note = styled.div`
 span {
    
    font-size : 16px;
    color : grey;
    
 }
`
const Logo = styled.div`
width: 80px;
height: 80px;
border-radius: 50px;
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
