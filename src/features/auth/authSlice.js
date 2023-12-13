import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:'auth',
    initialState:{token:null},
    reducers:{
        setCredentials:(state,action)=>{
            const {accessToken}=action.payload
            state.token=accessToken
        },
        logOut:(state,action)=>{//this is to implement the jwt thing in front end after the backend so that you might directly login and logout through web page rather than postman or thunderclient
            state.token=null
        },
    }
})

export const {setCredentials,logOut}=authSlice.actions

export default authSlice.reducer

export const selectCurrentToken=(state)=>state.auth.token