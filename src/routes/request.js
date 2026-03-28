const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const user = require("../models/user");


const requestRouter = express.Router();

//ConnectionRequest
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.userrr._id; // make sure middleware sets req.user
      const { toUserId, status } = req.params;

      const allowedStatus = ["ignored", "interested"];

      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type: " + status });
      }


      const toUser = await user.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res.status(400).send({ message: "Connection already exit" });
      }

      const newConnectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await newConnectionRequest.save();

      res.status(201).json({
        message: req.userrr.firstName + "is "+ status+ "in " + toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(500).send("ERROR: " + err.message);
    }
  },
);


requestRouter.post("/request/review/:status/:requestId", userAuth, async(req, res)=>{
try{
const loggedInUser = req.userrr
const {status, requestId} = req.params;

const allowedStatus = ["accepted", "rejected"];
if(!allowedStatus.includes(status)){
  return res.status(400).json({message:"Status not allowed"})
}

const connectionRequestt = await ConnectionRequest.findOne({
  _id:requestId,
  toUserId:loggedInUser._id,
  status:"interested"
})
console.log(loggedInUser._id,  'connectionRequestt')
if(!connectionRequestt){
  return res.status(404).json({message:"Connection request not found"})
}
connectionRequestt.status = status

const data = await connectionRequestt.save()

res.json({message:"Connection request " + status, data})

}catch(err){
res.status(500).send("ERROR: " + err.message);
}
})


module.exports = requestRouter;
