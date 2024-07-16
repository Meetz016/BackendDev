import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { searchFood } from "../controllers/food.controller.js";
const router=Router()


router.route("/search").get(isLoggedIn,searchFood)



export default router