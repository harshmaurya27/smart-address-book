import Addressmodel from "../models/addressModel.js";

// Delete Address by ID
export const DeleteAddress = async (req, res) => {
  const { id } = req.params; // Get address ID from URL parameter

  try {
    // Use findByIdAndDelete to remove the address
    const deletedAddress = await Addressmodel.findByIdAndDelete(id);

    if (!deletedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting address:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
