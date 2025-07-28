import React, { useEffect, useState } from "react";
import API from "../services/api";

function GetLoad() {
  const [loads, setLoads] = useState([]);

  useEffect(() => {
    const fetchLoads = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get("/item/getloads", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLoads(response.data);
      } catch (error) {
        console.error("Error fetching loads:", error);
      }
    };

    fetchLoads();
  }, []);


  const handleReset = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.delete("/item/resetloads", {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(response.data.message);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting loads:", error);
      alert("Failed to delete loads");
    }
  }

    

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Loaded Items</h1>
      <button onClick={handleReset}>Reset</button>
      {loads.length === 0 ? (
        <p>No loads found.</p>
      ) : (
        loads.map((load) => (
          <div
            key={load._id}
            className="border border-gray-300 rounded-lg p-4 mb-4"
          >
            <h2 className="text-lg font-semibold mb-2">
              Vehicle: {load.driverId?.vehiclenumber} -{" "}
              {load.driverId?.drivername}
            </h2>
            <ul className="list-disc pl-6">
              {load.items.map((item) => (
                <li key={item.itemId._id}>
                  {item.itemId.itemname} - Quantity: {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
export default GetLoad;