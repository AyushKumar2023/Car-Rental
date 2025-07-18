import { Router } from "express";
import { registerUser, loginUser, getuserData } from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const userRouter=Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/data', protect, getuserData)

export default userRouter


