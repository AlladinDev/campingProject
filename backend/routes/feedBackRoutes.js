const express=require('express')
const router=express.Router()
const {addFeedBack,deleteFeedBack,getAllFeedBacks}=require('../controller/feedBackController')
router.post('/addfeedback',addFeedBack)
router.get('/getallfeedbacks',getAllFeedBacks)
router.delete('/deletefeedback',deleteFeedBack)
module.exports=router