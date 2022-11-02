const express = require('express');
const userRouter = express.Router();
const {home,registerUser , loginUser, getUser } = require("../handlers/user");
const {auth} = require("./middlewares/auth");

userRouter.get("/getUser/:id" , getUser);
userRouter.get("/",home)

userRouter.post("/registerUser" , registerUser);
userRouter.post("/loginUser" , loginUser);


module.exports = {
      userRouter
}