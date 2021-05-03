import React from 'react'
import styled from 'styled-components'

function ProgressBarWeek({Day ,percentage , name }) {

   // <CourseName>{Coursename} :</CourseName>  
    return (
        <Container>
           
        <Progress>
            <div style={{height:`${percentage}%`}}> 
            </div>
        </Progress>
        <CourseName>{name}</CourseName>  
        </Container>
    )
}

export default ProgressBarWeek

const Progress = styled.div`
background : #D9D9D9;
border-radius : 10px; 
height : 80px ;
width : 10px;
div {
    background-image: linear-gradient(to right, red, #FFFF99);
    border-radius : 10px;
    display:flex ;
    align-items : flex-end ;
    justify-content:center ; 
    height:60%;
    width: 100%;
    font-size:12px;
}
transform: rotate(180deg);
`
const CourseName = styled.div`
font-family: 'Dosis', sans-serif;
margin-top: 18px;
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 50% 50% ;
  `
const ProgressDone = styled.div`
background-image: linear-gradient(to right, gold, #FFFF99);
border-radius : 10px;
display:flex ;
align-items : center ;
justify-content:center ; 
height:100%;
width: 60%;
font-size:12px;
`