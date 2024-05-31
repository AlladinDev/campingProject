import { createSlice } from '@reduxjs/toolkit'
const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        deviceID: "",
        authStatus: false,
        username:'',
        userType:'',
    
    },
    reducers: {
        addDeviceID: (state, action) => {
            state.deviceID = action.payload//store user device id
        },
        addAuthStatus: (state, action) => {
            state.authStatus = action.payload
        },
        addUserType: (state, action) => {
            state.userType = action.payload
        },
        addUserName: (state, action) => {
            state.username = action.payload
        },
        addUser:(state, action) =>{
           
            state.user =action.payload
        }
    }
})
export default userSlice.reducer
export const { addDeviceID, addAuthStatus ,addUserType,addUserName,addUser} = userSlice.actions