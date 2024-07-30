import express, { urlencoded, json } from "express";
import cors from "cors";
import { router } from "./route/route.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 8000;
const app = express();
const mongoConnect =
  `mongodb+srv://klo123645:` +
  process.env.MONGO_PASS +
  `@cluster0.9djy9xz.mongodb.net/PowerMeter?retryWrites=true&w=majority`;

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cors());

mongoose.connect(mongoConnect);

mongoose.connection.on("connected", () => {
  console.log(`Connectedd to MongoDB successfully!`);
});

mongoose.connection.on("error", (err) => {
  console.error(`MongoDBd connection error`, err);
});

app.use(router);

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
