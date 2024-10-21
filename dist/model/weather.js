import mongoose from "mongoose";
// Define the schema
const dataSchema = new mongoose.Schema({
    humidity: { type: Number, required: true },
    temperature: { type: Number, required: true },
    noise: { type: Number, required: true },
    pm25: { type: Number, required: true },
    pm10: { type: Number, required: true },
    light: { type: Number, required: true },
    baroP: { type: Number, required: true },
    timestamp: { type: Date, required: true },
});
// Create the model
export const Weather = mongoose.model("weather", dataSchema);
