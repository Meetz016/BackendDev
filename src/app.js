import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app=express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({
    limit:"20kb"
}))

app.use(express.urlencoded({limit:"20kb"}))

app.use(express.static("public"))
app.use(cookieParser())

//for routing standard practice is to use import here
import userRoute from "./routes/user.routes.js"
import foodRoute from "./routes/food.routes.js"
app.use("/api/v1/user",userRoute)
app.use("/api/v2",foodRoute)
export {app}