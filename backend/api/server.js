import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectDb } from "./config/Db.js";
import { router } from "./routes/food_route.js";
import { userRouter} from "./routes/userRoute.js";
import { cartRouter } from "./routes/cartRoute.js";
import { orderRoute } from "./routes/orderRoutes.js";
dotenv.config()


const app= express();
app.use(express.json());
app.use(cors({}));
app.use("/images", express.static("uploads"))

const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Server running at ${PORT}`)

})
connectDb()
app.use("/api/v1",router);
app.use("/api/v1",userRouter)
app.use("/api/v1",cartRouter)
app.use("/api/v1",orderRoute)


