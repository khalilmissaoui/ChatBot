import React ,{ useEffect} from 'react'
import styled from 'styled-components'
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Dialogs from './additionalstuff/CourseDialog'
import SnackSave from './additionalstuff/SnackSave'
import {fetchSavedCourses,selectSavedCourses,addSavedCourse} from '../../Redux/savedcourseSlice'
import { useDispatch , useSelector} from 'react-redux'
import axios from '../../axios/axios'
import { fetchCourses,DeleteTheSavedCourse } from '../../Redux/courseSlice';

function Course({course}) {
    const [open, setOpen] = React.useState(false);
    const  dispatch = useDispatch();
    const handleClickOpen = () => {
      setOpen(true);
    };
    const [openSlack, setOpenSlack] = React.useState(false);
    
      const handleClick = () => {
        dispatch(DeleteTheSavedCourse(course))
        axios.post('courses/addSavedCourse', {
            course_id : course._id
        }).then((save)=>{
            dispatch(addSavedCourse(course))
            dispatch(fetchSavedCourses())
        })
      
        
       
      
        setOpenSlack(true);
      };
    return (<>
        <Container>
             <CourseAvatar>
            <img src="https://cdn.auth0.com/blog/illustrations/react.png"/>
            </CourseAvatar>
            <CourseDetails>
                <div style={{fontStyle:"italic" ,fontSize: "18px" }}>{course.title}</div>
                <div style={{fontFamily: "cursive" ,fontSize: "13px"}}>{course.domain}</div>
            </CourseDetails>
            <Func>
                <div>
                <DetailButton onClick={()=>handleClickOpen()}>
                <OpenInNewIcon className="detail"/>
                </DetailButton>
                
                <SaveButton onClick={()=>handleClick()}>
                    
                <BookmarkIcon className="save"/>

                </SaveButton>
                </div>
            </Func>
        </Container>
        <Dialogs course={course} open={open} setOpen={setOpen} />
        <SnackSave  openSlack={openSlack} setOpenSlack={setOpenSlack} />
        
        </>)
}

export default Course

const Container = styled.div`
padding :2px;
  margin-top :8px;
  width: 100%;
  height:70px;
  display: grid;
  grid-template-columns: minmax(0, 80px) 60% 20%; 
  background-color : white;
  border-radius: 8px;

  :hover {
    box-shadow :0 4px 6px -2px rgba(0, 0, 0, 0.7);
    background: #dff3fe;
}
`
const CourseAvatar = styled.div`
    padding :5px;
    width: 100%;
    height: 100%;
    display : flex ; 
    align-items : center ;
    justify-content : center ;
    overflow: hidden;
    margin-left: 8px;
    img {
        margin-right : 13px;
        width: 90%;
        border-radius: 50%;
        border : 0.1px solid grey;
    }
`
const img = styled.img`
height : 10px;
width : 10px;
`


const CourseDetails = styled.div`
margin-left:10px;
padding :  5px 10px;
font-family: Times New Roman , cursive;


`

const Func = styled.div`
height:100%;
width:100%;
transition: width 0.1s, height 0.1s;
padding  : 5px;
display: grid;
grid-template-rows: 50% auto ;
    .detail:hover{
        color : #fee103;
        cursor : pointer;
    }
    .save:hover{
        color:#fee102;
        cursor : pointer;       
    }
    
    
`
const SaveButton = styled.button`
border : none ;
background-color : transparent;
    :focus{outline: none;}
    
`
const DetailButton = styled.button`
border : none ;
background-color : transparent;
   :focus{outline: none;}
` 