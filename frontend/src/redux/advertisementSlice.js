import { createSlice } from '@reduxjs/toolkit'
const advertisementSlice = createSlice({
    name: 'user',
    initialState: {
        advertisement: {},
        advertisementPresent: false
    },
    reducers: {
        addAdvertisement: (state, action) => {
           console.log(action.payload)
            if (Object.keys(action.payload).length!==0)
                {
                    state.advertisement = action.payload
                    state.advertisementPresent = true
                }
                
            
        },
        removeAdvertisement: (state, action) => {
            state.advertisement = []
            state.advertisementPresent = false
        }
    }
})
export default advertisementSlice.reducer
export const { addAdvertisement, removeAdvertisement } = advertisementSlice.actions