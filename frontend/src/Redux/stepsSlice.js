import { createSlice } from '@reduxjs/toolkit';
import  axios  from "../axios/axios";

const initialState = {
    scenario : {}
}

export const stepsSlice = createSlice({
    name:'steps',
    initialState , 
    reducers : {
    
        initialingData : (state , action)=>{
            state.scenario = action.payload;
        }
    }
})


export const selectScenario = (state) => {
    return state.steps.scenario;
    };


export const {initialingData} = stepsSlice.actions


export const fetchScenario = ()=> async (dispatch) => {
      const response = await axios.get('/scenario/selectedScenarioByuserId')
      console.log(response.data);
      dispatch(initialingData(response.data))
    }
  
  

export default stepsSlice.reducer;