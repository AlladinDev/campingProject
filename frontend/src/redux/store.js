import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import allusersSlice from "./allusersSlice";
import allMembersSlice from './teamMemberSlice'
import tripsSlice from "./tripsSlice";
import advertisementSlice from "./advertisementSlice";
const store=configureStore({
    reducer:{
        user:userSlice,
        allUsers:allusersSlice,
        allMembers:allMembersSlice,
        tripStore:tripsSlice,
        advertisementStore:advertisementSlice
    }
})
export default store