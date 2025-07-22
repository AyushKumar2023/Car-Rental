import { Router } from "express";
import { registerUser, loginUser, getuserData, getCars } from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const userRouter=Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/data', protect, getuserData)
userRouter.get('/cars', getCars)

export default userRouter


