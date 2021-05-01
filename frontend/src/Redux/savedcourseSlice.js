import { createSlice } from '@reduxjs/toolkit';
import  axios  from "../axios/axios";
const initialState = {
    savedcourses : []
}

export const savedcourseSlice = createSlice({
    name:'savedcourse',
    initialState , 
    reducers : {
        
        initialingSavedCourses : (state , action)=>{
            state.savedcourses = action.payload;
        } ,
        deleteSavedCourse : (state , action)=>{
            const payload = action.payload;
            const index = state.savedcourses.findIndex((item) => item._id === payload._id);
            if (index !== -1) {
            state.savedcourses.splice(index, 1);
}
        },
        addSavedCourse : (state , action)=>{
            const payload = action.payload;
            state.savedcourses.push(payload)
        }
    }
})


export const selectSavedCourses = (state) => {
    return state.savedcourse.savedcourses;
    };


export const {initialingSavedCourses,deleteSavedCourse,addSavedCourse} = savedcourseSlice.actions


export const fetchSavedCourses = ()=> async (dispatch) => {
      const response = await axios.get('/courses/getallSavedCourses')
      console.log("inside saved courses",response.data.courses_id);
      dispatch(initialingSavedCourses(response.data.courses_id))
    }
  
  

export default savedcourseSlice.reducer;