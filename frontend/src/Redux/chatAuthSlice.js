import { createSlice } from '@reduxjs/toolkit';
import  axios  from "../axios/axios";
const initialState = {
    messages : []
}

export const chatAuthSlice = createSlice({
    name:'chatAuth',
    initialState: {
        messages : [
            {source :'bot',
        msg:'good morning sir ! '},
        {source :'bot',
        msg:'can you please give me your email '}
        ]
      },
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


export const selectMessagesAuth = (state) => {
    return state.chatAuth.messages;
    };


export const {addmessage,initialingData} = chatAuthSlice.actions

  

export default chatAuthSlice.reducer;