import express from "express"
import { placeOrder } from "../controllers/orderController.js"
import { authMiddleware } from "../middleware/auth.js"


export const orderRoute = express.Router()

orderRoute.post("/place-order",authMiddleware,placeOrder)
