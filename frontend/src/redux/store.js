import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import allusersSlice from "./allusersSlice";
import allMembersSlice from './teamMemberSlice'
import tripsSlice from "./tripsSlice";
import advertisementSlice from "./advertisementSlice";
import feedBackSlice from "./feedBackSlice";
const store=configureStore({
    reducer:{
        user:userSlice,
        allUsers:allusersSlice,
        allMembers:allMembersSlice,
        tripStore:tripsSlice,
        advertisementStore:advertisementSlice,
        feedBackStore:feedBackSlice
    }
})
export default store