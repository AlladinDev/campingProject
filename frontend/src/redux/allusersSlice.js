import { createSlice } from '@reduxjs/toolkit'
const allUserSlice = createSlice({
    name: 'user',
    initialState: {
        userData: [],
    },
    reducers: {
        addUsers:(state, action) =>{
            state.userData =action.payload
        }
    }
})
export default allUserSlice.reducer
export const {addUsers} = allUserSlice.actions