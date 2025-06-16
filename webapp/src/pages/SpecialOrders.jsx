import React, { useState } from 'react';
import './SpecialOrders.css';
import Footer from '../components/Footer';

const sampleOrders = [
  { id: 1, customer: 'John Doe', item: 'Custom Cake', details: 'Chocolate flavor, 2kg' },
  { id: 2, customer: 'Jane Smith', item: 'Birthday Cookies', details: 'Vanilla, 24 pcs' },
  { id: 3, customer: 'Alice Johnson', item: 'Wedding Cake', details: '3 tiers, red velvet' },
];

function SpecialOrders() {
  const [orders, setOrders] = useState(sampleOrders);
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [rejectedOrders, setRejectedOrders] = useState([]);

  const handleConfirm = (id) => {
    const order = orders.find(o => o.id === id);
    if (order) {
      setConfirmedOrders([...confirmedOrders, order]);
      setOrders(orders.filter(order => order.id !== id));
      alert(`Order ${id} confirmed.`);
    }
  };

  const handleReject = (id) => {
    const order = orders.find(o => o.id === id);
    if (order) {
      setRejectedOrders([...rejectedOrders, order]);
      setOrders(orders.filter(order => order.id !== id));
      alert(`Order ${id} rejected.`);
    }
  };

  return (
    <>
      <div className="special-orders-container" style={{ textAlign: 'center' }}>
        <h1>Special Orders</h1>
        <div style={{ marginBottom: '20px' }}>
          {orders.length === 0 ? (
            <p> No special orders at the moment.</p>
          ) : (
            <p>Special Orders</p>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <h3>{order.customer}</h3>
              <p><strong>Item:</strong> {order.item}</p>
              <p><strong>Details:</strong> {order.details}</p>
              <div className="order-buttons">
                <button className="confirm-btn" onClick={() => handleConfirm(order.id)}>Confirm</button>
                <button className="reject-btn" onClick={() => handleReject(order.id)}>Reject</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '40px' }}>
          <h2>Confirmed Orders</h2>
          {confirmedOrders.length === 0 ? (
            <p>No confirmed orders.</p>
          ) : (
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Item</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {confirmedOrders.map(order => (
                  <tr key={order.id}>
                    <td>{order.customer}</td>
                    <td>{order.item}</td>
                    <td>{order.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div style={{ marginTop: '40px' }}>
          <h2>Rejected Orders</h2>
          {rejectedOrders.length === 0 ? (
            <p>No rejected orders.</p>
          ) : (
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Item</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {rejectedOrders.map(order => (
                  <tr key={order.id}>
                    <td>{order.customer}</td>
                    <td>{order.item}</td>
                    <td>{order.details}</td>
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
