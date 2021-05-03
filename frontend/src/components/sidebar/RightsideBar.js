import React from 'react'
import styled from 'styled-components'
import DialogStats from './additionalstuff/DialogStats'
import DialogForm from './additionalstuff/DialogForm'

import './CSS/UserProfile.css'
import StaticProgress from './CSS/RightComponents/StaticProgress';
import Days from './Days';
import ProfileNotif from '../ProfileNotif';
import './CSS/UserProfile.css';
import Button from '@material-ui/core/Button';

import {fetchScenario,selectScenario} from '../../Redux/stepsSlice'
import { useDispatch , useSelector} from 'react-redux'


function RightsideBar() {
  const [openReport, setOpenReport] = React.useState(false);
  const dispatch = useDispatch();
  const handleClickOpenReport = () => {
    setOpenReport(true);
  };

  const [open, setOpen] = React.useState(false);
      
    const handleClickOpen = () => {
      setOpen(true);
    };
    React.useEffect(() => {
      dispatch(fetchScenario());
      console.log('disaptched scenario');
    }, [])

    return (
       
              <Container>
            <Profile>
                <ProfileBox>
                   <ProfileNotif/>
                </ProfileBox>
            </Profile>
            <Statics onClick={()=>handleClickOpen()}>
                <StaticBox> 
                <StaticProgress/>
                <Days/>     
                </StaticBox>
            </Statics>
            <Report>
                <ReportBox>
                <Reportflag>
                <img src="/paper-rocket.png"/>
                </Reportflag>
                <TalktoUs>
                <DialogStats setOpen={setOpen} open={open}/>
                <DialogForm setOpenReport={setOpenReport} openReport={openReport} />  
                  <div><span style={{fontFamily:"Dosis",marginTop:"10px" ,fontWeight:"bold",fontStyle:"italic",fontSize:"20px"}} >Talk to Us !</span></div>  
                   <div style={{marginTop:"10px"}}>
                    <Button color='primary' variant='outlined' onClick={ ()=>handleClickOpenReport() } >Express </Button>
                   </div>
                </TalktoUs>
                </ReportBox>
            </Report>
        </Container>
    
    )
}

export default RightsideBar
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 27% auto 23% ;
  `

const TalktoUs = styled.div`
display:flex;
align-items:center;
flex-direction:column;
`

const Reportflag = styled.div`
 width:70px;
 height:50px;
 margin-top:-38px;
 margin-left:200px;
  img{
      position : relative;
      height:100%;
      width:100%;
  }

`
const Profile = styled.div`
padding : 15px;
width: 100%;
height: 100%;

`
const ProfileBox= styled.div`
padding : 15px;
width: 100%;
height: 100%;
background-color :#e5edfc;
border-radius: 20px;
overflow : hidden;
box-shadow :0 4px 6px -2px rgba(0, 0, 0, 0.55);
div {
    white-space: nowrap;
    margin : 2px 10 px;
    font-size : 20px;
    font-weight: bold;
    font-family: 'Dosis', sans-serif;
  }
  
`

const StaticBox = styled.div`
padding : 15px;
width: 100%;
height: 100%;
background-color :#e5edfc;
border-radius: 20px;
overflow : hidden;
box-shadow :0 20px 25px -5px rgba(0, 0, 0, 0.1);
display:flex;
flex-direction: column;
:hover{
  cursor :pointer;
}

`
const Report = styled.div`
padding : 15px;
width: 100%;
height: 100%;
`

const ReportBox = styled.div`
padding : 15px;
width: 100%;
height: 100%;
background-color :#e5edfc;
border-radius: 20px;
box-shadow :inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
`
const Statics = styled.div`
padding : 5px 15px;
width: 100%;
height: 100%;
`

