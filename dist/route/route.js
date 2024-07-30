import express from "express";
import rateLimit from "express-rate-limit";
import { station1_r, station1_w } from "../controller/pwm.js";
export const router = express.Router();
const limiter = rateLimit({
    windowMs: 9 * 60 * 1000, // 10 minutes
    max: 1,
    handler: (req, res) => {
        res.status(429).json({
            message: "Too many requests. Please try again in 1 minute.",
        });
    },
});
router.get("/", (req, res) => {
    res.send("Server is Running");
});
router.post("/pwmdata", limiter, station1_w);
router.get("/pwmdata", station1_r);
// export default router;
