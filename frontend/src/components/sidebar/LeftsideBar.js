import React, { useEffect , useState } from 'react'
import styled from 'styled-components'
import Course from './Course'
import SavedCourse from './SavedCourse'
import SavedDialogs from './additionalstuff/Dialogs'
import {fetchCourses,selectCourses} from '../../Redux/courseSlice'
import {fetchSavedCourses,selectSavedCourses} from '../../Redux/savedcourseSlice'
import  axios  from "../../axios/axios";

import { useDispatch , useSelector} from 'react-redux'


function LeftsideBar() {
  const [open, setOpen] = React.useState(false);
      
    const handleClickOpen = () => {
      setOpen(true);
    };

    
    const courses =  useSelector(selectCourses);
    const savedCourses = useSelector(selectSavedCourses);

    const [savedIds, setsavedIds] = useState(['']);

    useEffect(() => {
      let copy = [...savedIds]
      savedCourses.map( (item)=>{
   
        copy.push(item._id)
      
      } )
      setsavedIds(copy)
    }, [savedCourses])
   
    const  dispatch = useDispatch();
    useEffect(() => {  
            dispatch(fetchCourses())
            dispatch(fetchSavedCourses())
    }, [])

    

    return (
        <Container>
        
            <Logo>
               <Head>
                <img src="/flashboticon.PNG"/>
               </Head>
               <div>
                 FlashBot 
               </div>
            </Logo>
            <SavedCourses>
              <SavedCoursesBox>
                <Header>
                <div style={{fontFamily:'cursive'}}>Find your <strong>Saved Courses  </strong>
                
                  </div>  
                  <SavedDialogs savedCourses={savedCourses}  open={open} setOpen={setOpen}/>
                  <span style={{textDecoration:'underline'}} onClick={()=>{handleClickOpen()}}>{'  _'} here</span>
                </Header>
                {/* { 
                  savedCourses.map( (course , index) =>{
                    console.log(course);
                    return <SavedCourse key={index} course={course}/>
                  } )
                  } */}
              
              </SavedCoursesBox>
            </SavedCourses>

            <RecommandedCourses>
                <RecommandedCoursesBox>
                <strong style={{fontFamily:'cursive'}}>Recommanded Courses : </strong>  
                {
                  console.log(courses , 'he is the courses ! ! ! ')
                }
                  {   courses.length != 0?
                  courses.map( (course , index) =>{
                    return <Course key={index} course={course}/>
                  } ) : <p>no Recommanded Courses yet</p>
                  }
              
                  
                   </RecommandedCoursesBox>
            </RecommandedCourses>
        </Container>
    )
}

export default LeftsideBar

// const val = savedIds.findIndex((item) => item._id === course._id);
// if (val === -1)
// { return <Course key={index} course={course}/>}
// else 
// return null;


const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 40px 160px 510px ;
  `
const Logo = styled.div`
width: 100%;
height: 100%;
display : flex ;
justify-content :flex-start ;
align-items : center ;
padding-left:10%;
div{
  margin-left:2%;
  font-family:Verdana;
}
`
const Head = styled.div`
background-color : red;
height:100%;
 img{
   height : 50px;
   width : 50px;
 }

`
const Header = styled.div`
display : flex ;
justify-content : space-around;
 span  {
   color: grey;
   font-style : italic;
   :hover{
     color :gold;
     cursor : pointer;
   }
 }
`
const SavedCourses = styled.div`
padding : 15px;
width: 100%;
height: 100%;
border-bottom : 0.8px solid grey ;
  `
const SavedCoursesBox = styled.div`
padding : 15px ;
width: 100%;
height: 100%;
background-color :white;
border-radius: 8px;
overflow : hidden;
box-shadow :0 4px 6px -2px rgba(0, 0, 0, 0.4);
display : flex;
justify-content : center;
align-items :  center;
  `
const RecommandedCourses = styled.div`
padding : 2px 15px;
width: 100%;
height: 100%;
  `
const RecommandedCoursesBox = styled.div`
padding : 5px 15px;
width: 100%;
height: 100%;
background-color :white;
display : grid ;
grid-template-rows: 23px auto ;
overflow : hidden;
border-bottom : 0.8px solid grey ;

`