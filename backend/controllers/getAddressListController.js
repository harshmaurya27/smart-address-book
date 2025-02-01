// Get all address data
import Addressmodel from "../models/addressModel.js";
export const GetDataList = async (req, res) => {
  try {
    const { page = 1, limit = 5, search = "" } = req.query;

    let query = {};
    if (search) {
      query = {
        $or: [
          { city: { $regex: search, $options: "i" } },
          { state: { $regex: search, $options: "i" } },
        ],
      };
    }

    const totalAddresses = await Addressmodel.countDocuments(query);
    const addresses = await Addressmodel.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      success: true,
      totalPages: Math.ceil(totalAddresses / limit),
      currentPage: Number(page),
      data: addresses,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
