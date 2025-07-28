import React, { useEffect, useState } from "react";
import API from "../services/api";
import GetLoad from "../components/GetLoad";

function LoadItems() {
  const [drivers, setDrivers] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({}); 

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get("/driver/getdrivers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDrivers(response.data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };
    fetchDrivers();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get("/item/getitems", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  const handleItemQuantityChange = (driverId, itemId, quantity) => {
    setSelectedItems((prev) => ({
      ...prev,
      [driverId]: {
        ...prev[driverId],
        [itemId]: Number(quantity),
      },
    }));
  };

  const handleSubmit = async (e, driverId) => {
    e.preventDefault();

    const itemsForDriver = selectedItems[driverId] || {};
    const itemsToSend = Object.entries(itemsForDriver)
      .filter(([_, qty]) => qty > 0)
      .map(([itemId, quantity]) => ({ itemId, quantity }));

    if (itemsToSend.length === 0) {
      alert("Please select at least one item.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await API.post(
        "/item/loaditems",
        {
          driverId,
          items: itemsToSend,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(`Items loaded to vehicle successfully!`);

      setSelectedItems((prev) => ({
        ...prev,
        [driverId]: {},
      }));
      window.location.reload();
    } catch (err) {
      console.error("Error loading items:", err);
      alert("Failed to load items to vehicle");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">Load Items to Vehicles</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {drivers.map((driver) => (
          <div
            key={driver._id}
            className="border rounded-lg p-4 shadow-md bg-white"
          >
            <h3 className="text-lg font-semibold mb-4">
              {driver.drivername} ({driver.vehiclenumber})
            </h3>

            <form onSubmit={(e) => handleSubmit(e, driver._id)}>
              {items.map((item) => (
                <div key={item._id} className="flex items-center mb-2">
                  <span className="mr-2 w-40">{item.itemname}</span>
                  <input
                    type="number"
                    min="0"
                    value={
                      selectedItems[driver._id]?.[item._id] ?? ""
                    }
                    onChange={(e) =>
                      handleItemQuantityChange(
                        driver._id,
                        item._id,
                        e.target.value
                      )
                    }
                    className="w-20 border px-2 py-1"
                    placeholder="Qty"
                  />
                </div>
              ))}

              <button
                type="submit"
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Submit Load
              </button>
            </form>
          </div>
        ))}
      </div>

      <GetLoad />
    </div>
  );
}

export default LoadItems;