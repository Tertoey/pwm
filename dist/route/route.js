import express from "express";
import rateLimit from "express-rate-limit";
import { station1_r, station1_w } from "../controller/pwm.js";
import { weather_r, weather_w } from "../controller/weather.js";
import authenticateToken from "../middleware/middleware.js";
export const router = express.Router();
const limiter = rateLimit({
    windowMs: 60 * 1000, // 10 minutes
    max: 1,
    handler: (req, res) => {
        res.status(429).json({
            message: "Too many requests. Please try again in 1 minute.",
        });
    },
});
router.get("/", (req, res) => {
    res.send("Server is Running V2");
});
router.post("/weather", limiter, authenticateToken, weather_w);
router.get("/weather", weather_r);
router.post("/pwmdata", limiter, station1_w);
router.get("/pwmdata", station1_r);
// export default router;
