const express = require("express");

const app = express();

// url => http://localhost:3000/user?userId=101&name=satya      query means ?
// app.get("/user", (req, res) => {
// console.log(req.query);
//   res.send({ firstName: "Satya", lastName: "Prakash" });
// });
// OUTPUT => // { userId: '101', name: 'satya' }

// url => http://localhost:3000/user/satya/testname/701/software-engineer  params means :
// app.get("/user/:name/:password/:id/:desgination", (req, res) => {
// console.log(req.params);
//   res.send({ firstName: "Satya", lastName: "Prakash" });
// });
// OUTPUT=>
// [Object: null prototype] {
//   name: 'satya',
//   password: 'testname',
//   id: '701'
// }

// app.post("/user", (req, res) => {
//   res.send("Data successfully saved to database");
// });

// app.delete("/user", (req, res) => {
//   res.send("User Deleted successfully!!");
// });

app.get("/user", (req, res, next) => {
  console.log("I am handling route 1");
  res.send("I am response");
  next();
});

app.get("/user", (req, res) => {
  console.log("I am handling route 1");
//   res.send("I am response 2");
});

app.listen(3000, () => {
  console.log("Server is successfully running on port 3000");
});
