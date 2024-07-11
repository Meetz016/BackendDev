import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import {uploader} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js";
const registerUser=asyncHandler( async(req,res)=>{
  const {username,email,fullname,password}=req.body
  if ([username, email, fullname, password].some((data) => data?.trim() === "")) {
    throw new ApiError(400, "All fields must not be empty");
  }
    const isExist=await User.findOne({
        $or:[{username},{email}]
    })

    if(isExist)
        {
        throw new ApiError(409,"user already exists")
    }

    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coverImageLocalPath=req.files?.coverImage[0]?.path;


    if(!avatarLocalPath){
        throw new ApiError(400,"avatar is required local")
    }

    const avatar=await uploader(avatarLocalPath)
    const coverImage=await uploader(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"avatar is required")
    }

    const user=await User.create({
        fullname,
        username:username.toLowerCase(),
        avatar: avatar?.url ||"",
        email,
        password
    })

    //used when you dont wanna send any private info in the response just use -field_name 
    const createdUser=await User.find(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(400,"something went wrong while creating user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"user registered successfully")
    )

} )


export {registerUser}
