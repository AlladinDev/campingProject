import { createSlice } from '@reduxjs/toolkit'
const allMembersSlice = createSlice({
    name: 'member',
    initialState: {
        memberData: [],
    },
    reducers: {
        addMembers: (state, action) => {
            state.memberData = action.payload
        },
        addAnotherMember: (state, action) => {
            state.memberData.push(action.payload)
        }
    }
})
export default allMembersSlice.reducer
export const { addMembers ,addAnotherMember} = allMembersSlice.actions