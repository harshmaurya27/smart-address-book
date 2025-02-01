import express from "express";
import { AddFormData } from "../controllers/addAddressController.js";
import { DeleteAddress } from "../controllers/deleteAddressController.js";
import { EditAddress } from "../controllers/updateAddressController.js";
import { GetDataList } from "../controllers/getAddressListController.js";
const router = express.Router();

router.get("/get", GetDataList);
router.post("/add", AddFormData);
router.put("/edit/:id", EditAddress);

router.delete("/delete/:id", DeleteAddress);

export default router;
