import express from "express"
import { addFood, listFoods, removeFood } from "../controllers/foodController.js"
import multer from "multer"

export const router = express.Router()

const storage = multer.diskStorage({
    destination:"uploads",
    filename: (req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
        // req.file.filename

    }
    
})
const upload = multer({storage:storage})

router.post("/add-food",upload.single("image"),addFood)
router.get("/food-list",listFoods)
router.post("/remove-food",removeFood)
