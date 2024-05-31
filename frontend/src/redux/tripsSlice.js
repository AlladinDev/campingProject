import { createSlice } from '@reduxjs/toolkit'
const tripSlice = createSlice({
    name: 'member',
    initialState: {
        tripData: [],
    },
    reducers: {
        addTrip: (state, action) => {
            state.tripData = action.payload
        },
        addAnotherTrip: (state, action) => {
            state.tripData.push(action.payload)
        }
    }
})
export default tripSlice.reducer
export const { addTrip ,addAnotherTrip} = tripSlice.actions