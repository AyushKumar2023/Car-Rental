import express from 'express'
import "dotenv/config"
import cors from "cors"
import connectDB from './configs/db.js'
import userRouter from './routes/userRoutes.js'
import ownerRouter from './routes/ownerRoutes.js'

const app=express()
await connectDB()

app.use(cors())
app.use(express.json())

app.get('/', (req, res)=>{
    res.send("Home Page")
})

app.use('/api/user', userRouter)
app.use('/api/owner', ownerRouter)

const port=process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})