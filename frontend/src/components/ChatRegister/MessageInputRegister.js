import React , {useState,useEffect} from 'react'
import SendIcon from '@material-ui/icons/Send';
import styled from 'styled-components'
import axios from '../../axios/axios'
import { useHistory } from "react-router-dom";
import MicIcon from '@material-ui/icons/Mic';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import {addmessage} from '../../Redux/chatRegisterSlice'
import { useDispatch} from 'react-redux'
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

function MessageInputRegister() {
    const dispatch = useDispatch();
    const [input, setInput] = useState("");
    const history = useHistory();
    const [fields, setfields] = useState('text');
    const [Request, setRequest] = useState({source : 'user'})
    const [name, setname] = useState('username')
    const send =async (e) => {
        e.preventDefault();
        if(!input) return;
        if(!Request.email && !Request.username && !Request.password)
       { const usermsg = {
            source : 'user',
            msg : input
        }
        dispatch(addmessage(usermsg))
        setRequest({
            ...Request,[name]:input
        })
        console.log('this is ur request ',Request);
        setInput("")
        setname('email')
        setfields('email')
        const botmsgEmail = {
            source : 'bot',
            msg : 'give me your email now'
        }
        dispatch(addmessage(botmsgEmail))}
        /////////////////////////////////
        if(!Request.email && Request.username && !Request.password){
            console.log('inside mail field');
       
       
        const usermsgEmail = {
            source : 'user',
            msg : input
        }
        dispatch(addmessage(usermsgEmail))
        setRequest({
            ...Request,[name]:input
        })
        setInput("")
        setname('password')
        setfields('password')
        const botmsgpassword = {
            source : 'bot',
            msg : 'give me your password now'
        }
        dispatch(addmessage(botmsgpassword))
    
    }
        //////////////////////////////////////////////
        if(!Request.password && Request.username && Request.email){
        
        const usermsgPassword = {
            source : 'bot',
            msg : 'dont worry we wont show your password :p' ,
           
        }
        dispatch(addmessage(usermsgPassword))
        setRequest({
            ...Request,'password':input
        })
        setInput("")
        console.log('final erquest',Request);
    }
        
       
    }

    useEffect(() => {
        //change to register
        if(Request.password){
            axios.post('/register/saveUser',Request).then((res)=>{console.log('this is ur data',res.data);})
        
            setTimeout(() => {
                const botmsgEmail = {
                    source : 'bot',
                    msg : 'you are registred now sir , you still have to authentificate though , but wait'
                }
                dispatch(addmessage(botmsgEmail))
            },1700);
            setTimeout(() => {
                const botmsgEmail = {
                    source : 'bot',
                    msg : 'Dont forget to verify your email :p'
                }
                dispatch(addmessage(botmsgEmail))
            }, 4700);
            setTimeout(() => {
                history.push('/auth')
            }, 8000);
        
        }
            
        }, [Request])


        const [Notification, setNotification] = React.useState(true);

   
   
    return (
        <Container>
            <InputContainer>
                <form>
                    <input 
                        onChange={(e)=>{setInput(e.target.value)
                        console.log(fields);
                        }
                        }
                        type={`${fields}`}
                        value={input}
                        name={`${name}`}
                        placeholder="Message here..." />
                        {
                            name=='password'&& (
                            Notification ? <VisibilityOffOutlinedIcon onClick={
                                ()=>{ setfields('text') 
                                     setNotification((olddata)=>!olddata); 
                                    console.log(fields);
                                    }} /> : <VisibilityOutlinedIcon  onClick={
                                        ()=>{ setfields('text') 
                                        setfields('password')
                                             setNotification((olddata)=>!olddata);   }} />)
                        }
                    <SendButton 
                        type="submit"
                        onClick={send}>
                        <Send/>
                    </SendButton>
                </form>
            </InputContainer>
        </Container>
    )
}

export default MessageInputRegister


const Container = styled.div`
background : white;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 24px;
`

const InputContainer = styled.div`
    border: 1px solid #8D8D8E;
    border-radius: 4px;
    background-color : white;
    form {
        display: flex;
        height: 42px;
        align-items: center;
        padding-left: 10px;
        input {
            flex: 1;
            border: none;
            font-size: 13px;
        }
        input:focus {
            outline: none;
        }
    }
`

const SendButton = styled.button`
    background: #ffffb3 ;
    border-radius: 2px;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    cursor: pointer;
    border: none;
    .MuiSvgIcon-root {
        width: 18px;
    }
    :hover {
        background:#ffff01;
    }
`

const Send = styled(SendIcon)`
    color: #D9D9D9;
`
const MicIconStyled = styled(MicIcon)`
    color: red;
`