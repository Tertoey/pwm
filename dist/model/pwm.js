import mongoose from "mongoose";
// Define the schema
const dataSchema = new mongoose.Schema({
    voltage: { type: Number, required: true },
    current: { type: Number, required: true },
    power: { type: Number, required: true },
    frequency: { type: Number, required: true },
    totalPower: { type: Number, required: true },
    timestamp: { type: Date, required: true },
});
// Create the model
export const Station1 = mongoose.model("station1", dataSchema);
