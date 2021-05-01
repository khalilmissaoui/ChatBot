import { createSlice } from '@reduxjs/toolkit';
import  axios  from "../axios/axios";


export const chatRegisterSlice = createSlice({
    name:'chatRegister',
    initialState: {
        messages : [
            {source :'bot',
        msg:'good morning sir ! '},
        {source :'bot',
        msg:'here we are in the registration faze , give me your name please '}
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


export const selectRegisterMessages = (state) => {
    return state.chatRegister.messages;
    };


export const {addmessage,initialingData} = chatRegisterSlice.actions

  

export default chatRegisterSlice.reducer;