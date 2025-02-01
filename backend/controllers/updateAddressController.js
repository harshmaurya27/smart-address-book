import Addressmodel from "../models/addressModel.js";

export const EditAddress = async (req, res) => {
  const { id } = req.params; // Get the address ID from URL parameters
  const { addressLine1, city, state, country, pincode } = req.body;

  try {
    const updatedAddress = await Addressmodel.findByIdAndUpdate(
      id,
      { addressLine1, city, state, country, pincode }, // The fields to update
      { new: true, runValidators: true } // `new: true` returns the updated document, `runValidators: true` validates the updated fields
    );

    if (!updatedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address updated successfully.",
      data: updatedAddress,
    });
  } catch (error) {
    console.error("Error updating address:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
