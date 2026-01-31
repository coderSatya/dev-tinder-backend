const express = require("express")

const app = express()



app.get("/user", (req, res)=>{
res.send({firstName:"Satya", lastName:"Prakash"})
})


app.post("/user",(req, res)=>{
res.send("Data successfully saved to database")
})

app.delete("/user",(req, res)=>{
res.send("User Deleted successfully!!")
})

app.listen(3000, ()=>{
    console.log("Server is successfully running on port 3000")
})