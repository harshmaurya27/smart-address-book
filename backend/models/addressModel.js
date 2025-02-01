import mongoose from "mongoose";

const AddressDataSchema = new mongoose.Schema(
  {
    addressLine1: { type: String, required: true },
    city: { type: String, required: false },
    state: { type: String, required: false },
    country: { type: String, default: "India", required: true },
    pincode: {
      type: String,
      required: true,
      match: [/^\d{6}$/, "Invalid PIN Code"],
    },
  },
  { timestamps: true }
);

const Addressmodel =
  mongoose.models.Address || mongoose.model("Address", AddressDataSchema);

export default Addressmodel;
