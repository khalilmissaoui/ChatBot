import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import axios from '../axios/axios'
import {fetchScenario,selectScenario} from '../Redux/stepsSlice'
import { useDispatch , useSelector} from 'react-redux'
import {addmessage,fetchMessages} from '../Redux/chatSlice'
import {fetchCourses} from '../Redux/courseSlice'


function Suggests() {
    const dispatch = useDispatch();

    const chooseSenario1 = async () =>{
        const scenario1 = {
            scenario_id : "6079b194c8963e343492bc27" ,
            int : 'finance'
        }
       await  axios.post('/scenario/selectedScenario',scenario1).then(
            (result)=>console.log(result.data)
        )
            dispatch(fetchScenario())
            dispatch(fetchCourses());
            console.log('disaptched scenario');

            const eventmsg = {
                source : 'event',
                msg : 'selectedscenario'
            }
        const BotAnswer = await axios.post('/selectedscenario',eventmsg)
            console.log(BotAnswer.data);
            dispatch(addmessage(BotAnswer.data));
            
    }
    const chooseSenario2 = async () =>{
        const scenario1 = {
            scenario_id : "6079b5d5abf55524d88bf15f" ,
            int : 'cloud'
        }
        await axios.post('/scenario/selectedScenario',scenario1).then(
            (result)=>console.log(result.data)
        )
        dispatch(fetchScenario())
        dispatch(fetchCourses());
        console.log('disaptched scenario');

        
        const eventmsg = {
            source : 'event',
            msg : 'selectedscenario'
        }
    const BotAnswer = await axios.post('/selectedscenario',eventmsg)
        console.log(BotAnswer.data);
        dispatch(addmessage(BotAnswer.data));
        
    }
    return (
        <Container>
        <UserAvatar>
        <img src="https://media.istockphoto.com/photos/businesswoman-portrait-on-white-picture-id615279718?k=6&m=615279718&s=612x612&w=0&h=ozD8oKRFXmyyXoAcDuo09WSkmtLSYYlOBuCCNrMyW2Y="/>
        </UserAvatar>
        <UserChatbox>
        <div>Please choose what fits you  :  </div>
            <Button variant="contained" color="primary" onClick={chooseSenario1}>
            Job (Finance)
            </Button>
            <Button variant="contained" color="primary" onClick={chooseSenario2}>
            Course (Cloud)
            </Button>
        </UserChatbox>
        </Container>
    )
}

export default Suggests



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
justify-content: space-around;
font-size: 14px;
font-family: Georgia, cursive;
border-radius : 15px;
font-weight: lighter;
 Button{
     margin-left : 5px;
 }

`