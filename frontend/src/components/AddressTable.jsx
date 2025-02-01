import { useState } from "react";

const AddressTable = ({
  fetchAddressList,
  addressList,
  searchQuery,
  setSearchQuery,
  currentPage,
  setCurrentPage,
  totalPages,
  backendUrl,
}) => {
  // Edit state
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingRowAddressData, setEditingRowAddressData] = useState(null);

  const enableEdit = (id) => {
    const addressToEdit = addressList.find((item) => item._id === id);
    setEditingRowId(id);
    setEditingRowAddressData({ ...addressToEdit });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingRowAddressData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveEdit = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/api/address/edit/${editingRowAddressData._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingRowAddressData),
        }
      );

      if (response.ok) {
        fetchAddressList();
        setEditingRowId(null);
      } else {
        console.error("Failed to update address");
      }
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  const deleteAddress = async (id) => {
    try {
      const response = await fetch(`${backendUrl}/api/address/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchAddressList();
      } else {
        console.error("Failed to delete address");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <input
        id="querySerach"
        type="text"
        placeholder="Search state or city..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1);
        }}
      />
      <table className="address-table">
        <thead>
          <tr id="headingRow">
            <th>sr no.</th>
            <th>Address</th>
            <th>Pincode</th>
            <th>City</th>
            <th>State</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {addressList.map((item, index) => (
            <tr id="dataRow" key={item._id}>
              <td>{index + 1}</td>
              <td>
                {editingRowId === item._id ? (
                  <input
                    type="text"
                    name="addressLine1"
                    value={editingRowAddressData.addressLine1}
                    onChange={handleInputChange}
                  />
                ) : (
                  item.addressLine1
                )}
              </td>
              <td>
                {editingRowId === item._id ? (
                  <input
                    type="text"
                    name="pincode"
                    value={editingRowAddressData.pincode}
                    onChange={handleInputChange}
                  />
                ) : (
                  item.pincode
                )}
              </td>
              <td>
                {editingRowId === item._id ? (
                  <input
                    type="text"
                    name="city"
                    value={editingRowAddressData.city}
                    onChange={handleInputChange}
                  />
                ) : (
                  item.city
                )}
              </td>
              <td>
                {editingRowId === item._id ? (
                  <input
                    type="text"
                    name="state"
                    value={editingRowAddressData.state}
                    onChange={handleInputChange}
                  />
                ) : (
                  item.state
                )}
              </td>
              <td>
                {editingRowId === item._id ? (
                  <button onClick={saveEdit}>Save</button>
                ) : (
                  <button onClick={() => enableEdit(item._id)}>Edit</button>
                )}
                <button onClick={() => deleteAddress(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr id="bottomRow">
            <td colSpan={6}>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AddressTable;
