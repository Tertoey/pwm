import mongoose from "mongoose";
import { Weather } from "../model/weather.js";
import { Request, Response } from "express";

export const weather_w = async (req: Request, res: Response) => {
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
    const result = await data.save();
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

export const weather_r = async (req: Request, res: Response) => {
  try {
    const qty: number = parseInt(req.query.qty as string) || 5;
    const result = await Weather.find({}).sort({ timestamp: -1 }).limit(qty);
    // console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};
