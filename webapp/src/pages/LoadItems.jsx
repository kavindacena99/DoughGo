import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./LoadItems.css";

function LoadItems() {
  const [drivers, setDrivers] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedCount, setSelectedCount] = useState('');
  const [customCount, setCustomCount] = useState('');
  const [loadedItems, setLoadedItems] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get("/driver/getdrivers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDrivers(response.data);
        if (response.data.length > 0) {
          setSelectedDriver(response.data[0]._id);
        }
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
        if (response.data.length > 0) {
          setSelectedItem(response.data[0]._id);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const fetchLoadedItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get("/item/getloads", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLoadedItems(response.data);
      } catch (error) {
        console.error("Error fetching loaded items:", error);
      }
    };
    fetchLoadedItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const quantity = selectedCount === 'custom' ? Number(customCount) : Number(selectedCount);
    if (!selectedDriver) {
      alert("Please select a driver.");
      return;
    }
    if (!selectedItem) {
      alert("Please select an item.");
      return;
    }
    if (!quantity || quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await API.post(
        "/item/loaditems",
        {
          driverId: selectedDriver,
          items: [{ itemId: selectedItem, quantity }],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(`Items loaded to vehicle successfully!`);
      setCustomCount('');
      setSelectedCount('');
      // Refresh loaded items list
      const response = await API.get("/item/getloads", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoadedItems(response.data);
    } catch (err) {
      console.error("Error loading items:", err);
      alert("Failed to load items to vehicle");
    }
  };

  return (
    <div className="loaditems-container">
      <h1>Load Items to Vehicles</h1>
      <form className="loaditems-form" onSubmit={handleSubmit}>
        <label>
          Select Driver:
          <select value={selectedDriver} onChange={(e) => setSelectedDriver(e.target.value)} required>
            {drivers.map((driver) => (
              <option key={driver._id} value={driver._id}>
                {driver.drivername} ({driver.vehiclenumber})
              </option>
            ))}
          </select>
        </label>

        <label>
          Select Item:
          <select value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)} required>
            {items.map((item) => (
              <option key={item._id} value={item._id}>
                {item.itemname}
              </option>
            ))}
          </select>
        </label>

        <label>
          Select Quantity:
          <select value={selectedCount} onChange={(e) => setSelectedCount(e.target.value)} required>
            <option value="">--Select--</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="custom">Custom</option>
          </select>
        </label>

        {selectedCount === 'custom' && (
          <label>
            Enter Custom Quantity:
            <input
              type="number"
              min="1"
              value={customCount}
              onChange={(e) => setCustomCount(e.target.value)}
              required
            />
          </label>
        )}

        <button type="submit">Submit Load</button>
      </form>

      <h2>Loaded Items</h2>
      <div className="loaded-items-cards">
        {loadedItems.length === 0 ? (
          <p>No loaded items found.</p>
        ) : (
          loadedItems.map((load) => (
            <div key={load._id} className="loaded-item-card">
              <h3>
                Vehicle: {load.driverId?.vehiclenumber} - {load.driverId?.drivername}
              </h3>
              <ul>
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
    </div>
  );
}

export default LoadItems;
