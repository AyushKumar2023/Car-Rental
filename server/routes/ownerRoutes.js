import { Router } from "express";
import { addCar, changeRoleToOwner, deleteCar, getDashboardData, getOwnerCars, toggleCarAvailability } from "../controllers/ownerController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const ownerRouter=Router()

ownerRouter.post('/change-role', protect, changeRoleToOwner)
ownerRouter.post('/add-car', upload.single("image"), protect, addCar)
ownerRouter.get('/cars', protect, getOwnerCars)
ownerRouter.post('/toggle-car', protect, toggleCarAvailability)
ownerRouter.post('/delete-car', protect, deleteCar)

ownerRouter.get('/dashboard', protect, getDashboardData)

export default ownerRouter