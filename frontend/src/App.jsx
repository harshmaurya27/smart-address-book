import AddressForm from "./components/AddressForm";
import AddressTable from "./components/AddressTable";
import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const backendUrl = "https://smart-address-book-2q7z.onrender.com";
  const [addressList, setAddressList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const fetchAddressList = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/api/address/get?page=${currentPage}&limit=${limit}&search=${searchQuery}`
      );

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      if (data.success) {
        setAddressList(data.data);
        setTotalPages(data.totalPages);
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAddressList();
  }, [searchQuery, currentPage]);

  return (
    <main>
      <h1>Add your address</h1>
      <div className="add-address">
        <AddressForm
          backendUrl={backendUrl}
          fetchAddressList={fetchAddressList}
        />
        <AddressTable
          backendUrl={backendUrl}
          fetchAddressList={fetchAddressList}
          addressList={addressList}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </main>
  );
};

export default App;
