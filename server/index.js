import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
const port = process.env.PORT || 5000;
const app = express();
import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";

//mongodb+srv://codewithfahrul:<password>@cluster0.cp0j7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRouter);
app.use("/tours", tourRouter);

const mongodb =
  "mongodb+srv://codewithfahrul:mamasayange30@cluster0.cp0j7.mongodb.net/tour_db?retryWrites=true&w=majority";

mongoose
  .connect(mongodb)
  .then(() => {
    app.listen(port, () => {
      console.log(`App is running on port: ${port}`);
    });
  })
  .catch((error) => console.log(`${error} didn't connect`));
