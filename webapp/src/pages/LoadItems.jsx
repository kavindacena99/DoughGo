import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./LoadItems.css";
import Footer from "../components/Footer";

function LoadItems() {
  const [drivers, setDrivers] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedCount, setSelectedCount] = useState('');
  const [customCount, setCustomCount] = useState('');
  const [loadedItems, setLoadedItems] = useState([]);
  const [orders, setOrders] = useState([]);

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
        // Merge loads by driverId and aggregate quantities for same items
        const mergedLoads = {};
        response.data.forEach(load => {
          const driverId = load.driverId._id;
          if (!mergedLoads[driverId]) {
            mergedLoads[driverId] = {
              ...load,
              items: [...load.items]
            };
          } else {
            load.items.forEach(newItem => {
              const existingItemIndex = mergedLoads[driverId].items.findIndex(
                item => item.itemId._id === newItem.itemId._id
              );
              if (existingItemIndex === -1) {
                mergedLoads[driverId].items.push(newItem);
              } else {
                mergedLoads[driverId].items[existingItemIndex].quantity += newItem.quantity;
              }
            });
          }
        });
        setLoadedItems(Object.values(mergedLoads));
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // No loads found, set empty array
          setLoadedItems([]);
        } else {
          console.error("Error fetching loaded items:", error);
        }
      }
    };
    fetchLoadedItems();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get("/order/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched orders:", response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleConfirm = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      await API.post(`/order/orders/${orderId}/confirm`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, status: "confirmed" } : order
        )
      );
    } catch (error) {
      console.error("Error confirming order:", error);
      alert("Failed to confirm order");
    }
  };

  const handleReject = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      await API.post(`/order/orders/${orderId}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, status: "rejected" } : order
        )
      );
    } catch (error) {
      console.error("Error rejecting order:", error);
      alert("Failed to reject order");
    }
  };

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
      // Merge loads by driverId and aggregate quantities for same items
      const mergedLoads = {};
      response.data.forEach(load => {
        const driverId = load.driverId._id;
        if (!mergedLoads[driverId]) {
          mergedLoads[driverId] = {
            ...load,
            items: [...load.items]
          };
        } else {
          load.items.forEach(newItem => {
            const existingItemIndex = mergedLoads[driverId].items.findIndex(
              item => item.itemId._id === newItem.itemId._id
            );
            if (existingItemIndex === -1) {
              mergedLoads[driverId].items.push(newItem);
            } else {
              mergedLoads[driverId].items[existingItemIndex].quantity += newItem.quantity;
            }
          });
        }
      });
      setLoadedItems(Object.values(mergedLoads));
    } catch (err) {
      console.error("Error loading items:", err);
      alert("Failed to load items to vehicle");
    }
  };
  const handleReset = async () => {
    try {
      const token = localStorage.getItem("token");
      // Delete confirmed orders
      await API.delete("/order/orders/deleteByStatus?status=confirmed", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Delete rejected orders
      await API.delete("/order/orders/deleteByStatus?status=rejected", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Delete loaded items
      const response = await API.delete("/item/resetloads", {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Confirmed and rejected orders deleted. " + response.data.message);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting loads or orders:", error);
      alert("Failed to delete loads or orders");
    }
  }

  return (
    <div>
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

        <button onClick={handleReset} style={{ marginTop: '20px', backgroundColor: '#FFBF00', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
          Reset Loads
        </button>

        {/* New Customer Orders Section */}
        <h2>Customer Orders</h2>
        {orders.length === 0 ? (
          <p>No customer orders found.</p>
        ) : (
          <table className="orders-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Customer Name</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Seller Name</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Items</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Total</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.customerId?.name || 'N/A'}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.sellerId?.name || 'N/A'}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                      {order.items.map((item, index) => (
                        <li key={index}>{item.id?.itemname || 'N/A'} - Quantity: {item.quantity}</li>
                      ))}
                    </ul>
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.total}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textTransform: 'capitalize' }}>{order.status || 'pending'}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    {order.status === 'confirmed' ? (
                      <span style={{ color: 'green', fontWeight: 'bold' }}>Confirmed</span>
                    ) : order.status === 'rejected' ? (
                      <span style={{ color: 'red', fontWeight: 'bold' }}>Rejected</span>
                    ) : (
                      <>
                        <button
                          onClick={() => handleConfirm(order._id)}
                          style={{ marginRight: '8px', padding: '5px 10px', cursor: 'pointer' }}
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleReject(order._id)}
                          style={{ padding: '5px 10px', cursor: 'pointer' }}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

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
      <Footer />
    </div>
  );
}

export default LoadItems;
