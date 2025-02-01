import Addressmodel from "../models/addressModel.js";

// Save form data
export const AddFormData = async (req, res) => {
  console.log(req.body);
  try {
    const { addressLine1, city, state, country, pincode } = req.body;
    if (!addressLine1 || !pincode) {
      return res.status(400).json({
        success: false,
        message: "Address Line 1 and Pincode are required.",
      });
    }
    const newFormData = new Addressmodel({
      addressLine1,
      city,
      state,
      country,
      pincode,
    });
    await newFormData.save();
    res.status(201).json({ success: true, data: newFormData });
  } catch (error) {
    console.error("Error saving address:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
