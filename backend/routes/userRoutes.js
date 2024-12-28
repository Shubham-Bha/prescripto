import express from 'express'

import { registerUser,loginUser, getProfile,updateProfile,bookAppointment, listAppointment, cancelAppointment ,paymentRazorpay} from '../controllers/userController.js'
import authUser from '../middleware/authUser.js'
import upload from '../middleware/multer.js'

const userRouer = express.Router()

userRouer.post('/register',registerUser)
userRouer.post('/login',loginUser)
userRouer.get('/get-profile',authUser,getProfile)
userRouer.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouer.post('/book-appointment',authUser,bookAppointment)
userRouer.get('/appointments',authUser,listAppointment)
userRouer.post('/cancel-appointment',authUser,cancelAppointment)
userRouer.post('/payment-razorpay',authUser,paymentRazorpay)
export default userRouer