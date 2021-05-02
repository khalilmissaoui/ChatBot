import { configureStore } from '@reduxjs/toolkit'
import chatSliceReducer from './chatSlice'
import courseSliceReducer from './courseSlice'
import savedcourseSliceReducer from './savedcourseSlice'
import chatAuthReducer from './chatAuthSlice'
import chatRegisterReducer from './chatRegisterSlice'
import stepsReducer from './stepsSlice'
import quizReducer from './quizslice'





export default configureStore({
  reducer: {
      chat : chatSliceReducer,
      course : courseSliceReducer,
      savedcourse :savedcourseSliceReducer,
      chatAuth : chatAuthReducer,
      chatRegister: chatRegisterReducer,
      steps: stepsReducer,
      quizScore : quizReducer
  }
})