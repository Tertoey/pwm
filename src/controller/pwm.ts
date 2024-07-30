import mongoose from "mongoose";
import { Station1 } from "../model/pwm.js";
import { Request, Response } from "express";

//convert 16bit to 32bit
const buffer = Buffer.alloc(4);

function packInt16ToInt32(high: number, low: number) {
  buffer.writeInt16LE(low, 0);
  buffer.writeInt16LE(high, 2);
  const a = buffer.readInt32LE(0) / 1000;
  return a.toFixed(1);
}

export const station1_w = async (req: Request, res: Response) => {
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
      const savedData = await st1.save();
      console.log("Data saved:", savedData);
      res.send("ok");
    } catch (err) {
      console.error("Error saving data:", err);
      res.send("something went wrong");
    }
  } else {
    res.status(401).json({ result: "Unauthorized" });
  }
};

export const station1_r = async (req: Request, res: Response) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === process.env.TOKEN) {
    try {
      const qty: any = req.query.qty || 10;
      const data = await Station1.find()
        .select("-__v -_id")
        .sort({ timestamp: -1 })
        .limit(qty)
        .exec();
      res.json({ result: data });
    } catch (err) {
      console.error("Error reading data:", err);
      res.json({ result: "something went wrong" });
    }
  } else {
    res.status(401).json({ result: "Unauthorized" });
  }
};
