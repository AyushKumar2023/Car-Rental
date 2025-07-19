import { Router } from "express";
import { addCar, changeRoleToOwner } from "../controllers/ownerController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const ownerRouter=Router()

ownerRouter.post('/change-role', protect, changeRoleToOwner)
ownerRouter.post('/add-car', upload.single("image"), protect, addCar)

export default ownerRouter