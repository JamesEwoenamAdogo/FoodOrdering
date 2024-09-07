import { LoginUser,RegisterUser, googleOauth } from "../controllers/userController.js";
import express from "express"


export const userRouter = express.Router()

userRouter.post("/register-user",RegisterUser)
userRouter.post("/login-user", LoginUser)
userRouter.post("/register-user-another-way",googleOauth)