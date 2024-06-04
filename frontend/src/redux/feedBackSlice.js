import { createSlice } from '@reduxjs/toolkit'
const feedBackSlice = createSlice({
    name: "user",
    initialState: {
        feedBacks: [],
        rejected: false,
        pending: false,
        empty: false,
        feedBacksPresent: false
    },
    reducers: {
        addFeedbacks: (state, action) => {
            if (!action.payload || action.payload.length == 0) {
                state.feedBacks = []
                feedBacksPresent = false
            }
            if (action.payload && action.payload.length !== 0) {
                console.log('action payload is', action.payload)
                state.feedBacksPresent = true
                state.feedBacks = action.payload
            }
        },
        deleteFeedback: (state, action) => {
            state.feedBacks = state.feedBacks.filter((feedback) => feedback._id !== action.payload)
            if (state.feedBacks.length == 0)//if feedbacks deleted and no feedback left set flag to flag
                state.feedBacksPresent = false
        },


    },

})
export const { addFeedbacks, deleteFeedback } = feedBackSlice.actions
export default feedBackSlice.reducer

