import React from 'react'
import styled from 'styled-components'

function ProgressBar({Coursename ,percentage }) {

   // <CourseName>{Coursename} :</CourseName>  
    return (
        <Container>
           
        <Progress>
            <div style={{width:`${percentage}%`}}>
             <span>{percentage}%</span> 
            </div>
        </Progress>
        </Container>
    )
}

export default ProgressBar

const Progress = styled.div`
background : #D9D9D9;
border-radius : 10px; 
height : 10px ;
width : 170px;
div {
    background-image: linear-gradient(to right, gold, #FFFF99);
border-radius : 10px;
display:flex ;
align-items : center ;
justify-content:center ; 
height:100%;
width: 60%;
font-size:12px;
span {
    margin-left : 30px;
}

}
`
const CourseName = styled.div`
font-family: 'Dosis', sans-serif;
margin-bottom:10px;
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