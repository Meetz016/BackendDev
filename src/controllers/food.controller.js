import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import dotenv from "dotenv"
import {uploader} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from 'jsonwebtoken';
dotenv.config()



const searchFood=asyncHandler(async(req,res)=>{

    console.log("control is reaching here.")
    res
    .json({
        message:"API handling is Sucessful."
    })
})



export {searchFood}