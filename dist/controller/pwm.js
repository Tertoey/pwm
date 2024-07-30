var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import { Station1 } from "../model/pwm.js";
//convert 16bit to 32bit
const buffer = Buffer.alloc(4);
function packInt16ToInt32(high, low) {
    buffer.writeInt16LE(low, 0);
    buffer.writeInt16LE(high, 2);
    const a = buffer.readInt32LE(0) / 1000;
    return a.toFixed(1);
}
export const station1_w = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === process.env.TOKEN) {
        try {
            const data = req.body.input1.data.split(",");
            const st1 = new Station1({
                _id: new mongoose.Types.ObjectId(),
                voltage: data[0] / 100,
                current: parseInt(data[10]),
                power: parseInt(data[13]),
                frequency: data[3] / 10,
                totalPower: parseFloat(packInt16ToInt32(data[8], data[9])),
                timestamp: new Date(req.body.input1.ts * 1000),
            });
            const savedData = yield st1.save();
            console.log("Data saved:", savedData);
            res.send("ok");
        }
        catch (err) {
            console.error("Error saving data:", err);
            res.send("something went wrong");
        }
    }
    else {
        res.status(401).json({ result: "Unauthorized" });
    }
});
export const station1_r = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === process.env.TOKEN) {
        try {
            const qty = req.query.qty || 10;
            const data = yield Station1.find()
                .select("-__v -_id")
                .sort({ timestamp: -1 })
                .limit(qty)
                .exec();
            res.json({ result: data });
        }
        catch (err) {
            console.error("Error reading data:", err);
            res.json({ result: "something went wrong" });
        }
    }
    else {
        res.status(401).json({ result: "Unauthorized" });
    }
});
