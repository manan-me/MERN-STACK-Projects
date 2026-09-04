import {createSlice} from "@reduxjs/toolkit"
import { REHYDRATE } from "redux-persist"
const initialState={
    currentUser:null,
    loading:false,
    error:false
}
const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true
        },
        signInSuccess:(state,action)=>{
            state.loading=false,
            state.currentUser=action.payload,
            state.error=false
        },
        signInFailure:(state,action)=>{
            state.loading=false,
            state.error=action.payload
        }
    },
     extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state) => {
      state.error = null  
      state.loading = false
    })
  }
})

export const {signInStart,signInSuccess,signInFailure}=userSlice.actions
export default userSlice.reducer