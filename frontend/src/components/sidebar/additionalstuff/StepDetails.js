import React from 'react'
import styled from 'styled-components'
import Rating from '@material-ui/lab/Rating';
import LanguageIcon from '@material-ui/icons/Language';
import PublishIcon from '@material-ui/icons/Publish';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ProgressBarSavedCourse from './ProgressBarSavedCourse';
import ProgressBarSteps from './ProgressBarSteps';

function StepDetails({course}) {
    return (
        <Container>
        <FirstPart>

        <h1>{course.title}</h1>
        <h6>{course.description}</h6>
        <Ratingdiv>
        <div className="rakah" style={{fontWeight:"bold"}}>{course.rating}</div> <div><Rating value={course.rating}/></div> 
          </Ratingdiv> 
        <div>Created by <span style={{color:"#00CED1" ,textDecoration: "underline",marginTop:"10px"}}>{course.author}</span></div>
        <div style={{display:'flex' , justifyContent:"space-between",whiteSpace:'nowrap' , width:"100px",marginTop:"10px"}}>
          <LanguageIcon style={{ marginRight:"5px"}}/> {course.language?`${course.language}`:'EN-US'} <PublishIcon style={{ marginLeft:"10px", marginRight:"5px"}}/> {course.date?`${course.date}`.substr(0,10):'NaN'}  <AccessTimeIcon style={{ marginLeft:"10px" , marginRight:"5px"}}/>{course.duration?`${course.duration}`:'NaN'} </div>
          
        </FirstPart>
     <ProgressBarSteps Coursename="angular"  percentage={30}/>
          </Container>
    )
}

export default StepDetails



const Container = styled.div`
width:450px;
margin-bottom :20px;
`
const Ratingdiv =styled.div`
display : flex ; 
align-items : baseline;
.MuiRating-label{
  padding : 0;
}
.rakah {
  height:100%;
  font-size : 27px;
  margin-right : 9px;
  color : gold;
}

`


const FirstPart = styled.div`
padding-bottom :10px;
border-bottom : 1px solid black;
margin-bottom : 10px;
`