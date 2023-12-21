import {createSlice} from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "userAuth",
    initialState: {},
    reducers: {
        setUserAuth(state,action) {
            console.log("action setUserAuth",action.payload);
            return action.payload;
        }
    }
})

export const {setUserAuth} = userSlice.actions;

export const userAuthReducer = userSlice.reducer;