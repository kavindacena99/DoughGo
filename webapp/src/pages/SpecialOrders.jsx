import React, { useEffect, useState } from 'react';
import './SpecialOrders.css';
import Footer from '../components/Footer';
import API from '../services/api';

function SpecialOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchSpecialOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get('/specialorders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching special orders:', error);
      }
    };
    fetchSpecialOrders();
  }, []);

  const handleAccept = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.post(`/specialorders/accept/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(orders.filter(order => order._id !== id));
      alert(`Order ${id} accepted.`);
    } catch (error) {
      console.error('Error accepting order:', error);
      alert('Failed to accept order.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/specialorders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(orders.filter(order => order._id !== id));
      alert(`Order ${id} deleted.`);
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete order.');
    }
  };

  return (
    <>
      <div className="special-orders-container" style={{ textAlign: 'center' }}>
        <h1 style={{ position: 'fixed', top: '80px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000, backgroundColor: '#f8f8f8', padding: '10px 20px', borderRadius: '8px' }}>Special Orders</h1>
        <div style={{ marginTop: '140px' }}>
          {orders.length === 0 ? (
            <p>No special orders at the moment.</p>
          ) : (
            <table className="orders-table" style={{ margin: '0 auto', maxWidth: '800px' }}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Date Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>{order.orderId}</td>
                    <td>{order.itemId?.itemname || 'N/A'}</td>
                    <td>{order.quantity}</td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                    <td>
                      <button className="confirm-btn" onClick={() => handleAccept(order._id)}>Accept</button>
                      <button className="reject-btn" onClick={() => handleDelete(order._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SpecialOrders;
