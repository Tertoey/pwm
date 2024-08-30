import express, { urlencoded, json, Request, Response } from "express";
import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";
import { pwmtype } from "../type/datatype.js";
import { station1_r, station1_w } from "../controller/pwm.js";

export const router = express.Router();

const limiter: RateLimitRequestHandler = rateLimit({
  windowMs: 60 * 1000, // 10 minutes
  max: 1,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      message: "Too many requests. Please try again in 1 minute.",
    });
  },
});

router.get("/", (req, res) => {
  res.send("Server is Running V1");
});

router.post("/pwmdata", limiter, station1_w);

router.get("/pwmdata", station1_r);

// export default router;
