import { createSlice } from '@reduxjs/toolkit';
import  axios  from "../axios/axios";

const initialState = {
    score : '0'
}

export const quizScoreSlice = createSlice({
    name:'quizScore',
    initialState , 
    reducers : {
    
        initialingData : (state , action)=>{
            state.score = action.payload;
        }
    }
})


export const selectquizScore = (state) => {
    return state.quizScore.score;
    };


export const {initialingData} = quizScoreSlice.actions


  

export default quizScoreSlice.reducer;