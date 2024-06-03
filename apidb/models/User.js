import mongoose from "mongoose";

const userClients = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  identity: {
    type: String,
    required: true,
  },
  room: {
    type: String || Number,
    required: true,
  },
  value: {
    type: String || Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  createaAt: {
    type: Date,
    default: Date.now(),
  },
});
const Clients = mongoose.model("Clients", userClients);
export { Clients };
