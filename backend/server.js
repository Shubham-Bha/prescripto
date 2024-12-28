import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudiNary.js'
import adminRouter from './routes/adminRourte.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouer from './routes/userRoutes.js'


// app config

const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()
// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouer)

app.get('/',(req,res)=>{
    res.send('API WORKING GREAT')
})

app.listen(port, ()=> console.log("Server Started at port :", port))