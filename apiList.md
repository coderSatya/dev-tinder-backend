# DivTinder APIs

### authRouter
-POST /signup
-POST /login
-POST /logout

### profileRouter
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password

### connectionRequestRouter
-POST /request/send/:status/:userId 
["interested", "ignored"]


-POST /request/review/:status/:requestId 
["accepted", "rejected"]


### userRouter
- GET /user/requests/received
- GET /user/connection

- GET /user/feed - Gets you the profiles of other users on platform

status : ignore, interested, accepted, rejected