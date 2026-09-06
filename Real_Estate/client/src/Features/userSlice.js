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
        },
        signOut:(state)=>{
            state.currentUser=null
        }
    },
     extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state,action) => {
      state.error = null  
      state.loading = false
       if (action.payload?.user?.currentUser) {
      state.currentUser = action.payload.user.currentUser
    }
    })
  }
})

export const {signInStart,signInSuccess,signInFailure,signOut}=userSlice.actions
export default userSlice.reducer