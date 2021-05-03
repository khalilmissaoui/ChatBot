import { createSlice } from '@reduxjs/toolkit';
import  axios  from "../axios/axios";
const initialState = {
    messages : []
}

export const chatSlice = createSlice({
    name:'chat',
    initialState , 
    reducers : {
        
        addmessage : (state , action) => {
            const message = action.payload ;
            state.messages.push(message)
        },
        initialingData : (state , action)=>{
            state.messages = action.payload;
        }
    }
})


export const selectMessages = (state) => {
    return state.chat.messages;
    };


export const {addmessage,initialingData} = chatSlice.actions


export const fetchMessages = ()=> async (dispatch) => {
      const response = await axios.get('/getcurrentuser')
      console.log(response.data.messages);
      dispatch(initialingData(response.data.messages))
    }
  
  

export default chatSlice.reducer;