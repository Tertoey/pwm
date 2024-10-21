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
import { Weather } from "../model/weather.js";
export const weather_w = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stringData = req.body.weather.data.split(",");
        const data = new Weather({
            _id: new mongoose.Types.ObjectId(),
            humidity: stringData[0] / 10,
            temperature: stringData[1] / 10,
            noise: stringData[2] / 10,
            pm25: parseInt(stringData[3]),
            pm10: parseInt(stringData[4]),
            light: stringData[7],
            baroP: stringData[5] / 10,
            timestamp: new Date(req.body.weather.ts * 1000),
        });
        const result = yield data.save();
        console.log(result);
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
    }
});
export const weather_r = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const qty = parseInt(req.query.qty) || 5;
        const result = yield Weather.find({}).sort({ timestamp: -1 }).limit(qty);
        // console.log(result);
        res.json(result);
    }
    catch (error) {
        console.log(error);
    }
});
