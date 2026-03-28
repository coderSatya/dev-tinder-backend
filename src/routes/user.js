
const express = require("express")
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const user = require("../models/user");

const USER_SAFE_DATA = "firstName lastName about emailId photoUrl skills"

// Get all the pending connection request for the logged user
userRouter.get("/user/requests/received",userAuth, async(req, res)=>{
try{
const loggedInUser = req.userrr

const connectionRequest = await ConnectionRequest.find({
    toUserId: loggedInUser._id,
    status:"interested"}).populate("fromUserId", USER_SAFE_DATA)
// }).populate("fromUserId", ["firstName", "lastName"])

res.json({message:"Data fetched successfully", data:connectionRequest})
}catch(err){
res.status(400).send("error "+ err.message)
}
})


// connection found
userRouter.get("/user/connection", userAuth, async(req, res)=>{
try{
const loggedInUser = req.userrr

const connectionRequest = await ConnectionRequest.find({
    $or:[
        {toUserId:loggedInUser._id, status:"accepted"},
         {fromUserId:loggedInUser._id, status:"accepted"}
    ]
}).populate("fromUserId", USER_SAFE_DATA)
.populate("toUserId", USER_SAFE_DATA)

const data = connectionRequest.map((row)=>{
    if(row.fromUserId._id.toString()=== loggedInUser._id.toString()){
        return row.toUserId
    }
    return row.fromUserId
})
res.json({message:"Data fetched successfully", data})
}catch(err){
res.status(400).send("error "+ err.message)
}
})


// feed api
userRouter.get("/user/feed", userAuth, async(req, res)=>{
try{
// User should see all the user cards except  
// 0. His own card
// 1. his connection
// 2. ignored people
// 3. already send the connection request

const loggedInUser = req.userrr

const page = parseInt(req.query.page) || 1;
let limit = parseInt(req.query.limit) || 10;
limit = limit > 50 ? 50 : limit
const skip = (page -1) * limit

const connectionRequests = await ConnectionRequest.find({
    $or:[{fromUserId :loggedInUser._id}, {toUserId: loggedInUser._id}],
}).select("fromUserId toUserId")
// .populate("fromUserId", "firstName").populate("toUserId", "firstName")

const hideUsersFromFeed = new Set();

connectionRequests.forEach((req)=>{
hideUsersFromFeed.add(req.fromUserId.toString())
hideUsersFromFeed.add(req.toUserId.toString())
})

console.log(hideUsersFromFeed, "hideUsersFromFeed")

const userFeed = await user.find({
    $and :[
        {_id: {$nin: Array.from(hideUsersFromFeed)}},
        {_id : {$ne: loggedInUser._id}}
    ]
})
.select(USER_SAFE_DATA)
.skip(skip)
.limit(limit)


res.status(200).json({
  success: true,
  data: userFeed
});


}catch(err){
res.status(400).send("error "+ err.message)
}
})

//Connection request

module.exports = userRouter