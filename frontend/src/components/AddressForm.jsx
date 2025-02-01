import { useState } from "react";

const AddressForm = ({
  addressList,
  setAddressList,
  fetchAddressList,
  backendUrl,
}) => {
  const [formData, setFormData] = useState({
    addressLine1: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
  });

  const [errors, setErrors] = useState({});
  //...............form validation setup......................
  const validateConfig = {
    addressLine1: [
      { required: true, message: "Please enter AddressLine1" },
      { minLength: 1, message: "addressLine should be at least 5 charactor" },
    ],
    pincode: [
      { required: true, message: "Please enter pincode" },
      { length: 6, message: "pincode should be of 6 digit" },
    ],
    country: [{ required: true, message: "Please enter country" }],
  };
  //..............function for stting validation error.........
  const validate = (formData) => {
    const errorMessage = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (!validateConfig[key]) return;

      validateConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorMessage[key] = rule.message;
          return true;
        }
        if (rule.length && value.length !== rule.length) {
          errorMessage[key] = rule.message;
          return true;
        }
        if (rule.minLength && value.length < rule.minLength) {
          errorMessage[key] = rule.message;
          return true;
        }
      });
    });

    setErrors(errorMessage);
    return errorMessage;
  };

  // setup for autofill state and country
  const fetchCityState = async (pincode) => {
    if (pincode.length === 6) {
      try {
        const response = await fetch(
          `https://api.postalpincode.in/pincode/${pincode}`
        );
        const data = await response.json();

        if (data[0].Status === "Success") {
          setFormData((prevState) => ({
            ...prevState,
            city: data[0].PostOffice[0].District,
            state: data[0].PostOffice[0].State,
            pincode, // Ensure pincode is preserved
          }));
        } else {
          console.log("Invalid PIN Code");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  // Handle form submission
  const handleAdd = async (e) => {
    e.preventDefault();
    // before seding data to backend calling validate function
    const validateResult = validate(formData);
    if (Object.keys(validateResult).length) return;

    // Send data to backend
    try {
      const response = await fetch(`${backendUrl}/api/address/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success) {
        console.log("Form data saved successfully:", data);
        setFormData({
          addressLine1: "",
          city: "",
          state: "",
          country: "india",
          pincode: "",
        });
        fetchAddressList();
      } else {
        console.log("Error saving data:", data.message);
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "pincode" && value.length === 6) {
      fetchCityState(value);
    }
  };

  return (
    <form className="address-form" onSubmit={handleAdd}>
      <div className="input-container">
        <label htmlFor="addressLine1">Address line1</label>
        <input
          id="addressLine1"
          type="text"
          placeholder="Enter plot No or street name ..."
          name="addressLine1"
          value={formData.addressLine1}
          onChange={inputHandler}
        />
        <p className="error">{errors.addressLine1}</p>
      </div>
      <div className="input-container">
        <label htmlFor="addressLine1">pincode</label>
        <input
          id="pincode"
          type="text"
          placeholder="Enter your pincode here"
          name="pincode"
          value={formData.pincode}
          onChange={inputHandler}
        />
        <p className="error">{errors.pincode}</p>
      </div>
      <div className="input-container">
        <label htmlFor="country">Country</label>
        <select
          id="country"
          name="country"
          value="India"
          onChange={inputHandler}
          disabled
        >
          <option value="India">India</option>
        </select>
        <p className="error">{errors.country}</p>
      </div>
      <div className="input-container">
        <label htmlFor="state">State</label>
        <input
          id="state"
          type="text"
          name="state"
          value={formData.state}
          onChange={inputHandler}
        />
      </div>
      <div className="input-container">
        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          name="city"
          value={formData.city}
          onChange={inputHandler}
        />
      </div>

      <button id="add-btn" type="submit">
        Add
      </button>
    </form>
  );
};

export default AddressForm;
