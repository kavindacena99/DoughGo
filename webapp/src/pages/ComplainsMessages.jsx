import React, { useEffect, useState } from 'react';
import './ComplainsMessages.css';
import API from '../services/api';
import Footer from '../components/Footer';

function ComplainsMessages() {
  const [complaints, setComplaints] = useState([]);
  const [messages, setMessages] = useState([]);
  const [expandedComplaintId, setExpandedComplaintId] = useState(null);
  const [expandedMessageId, setExpandedMessageId] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get('/messages/complaints', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get('/messages/messages', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchComplaints();
    fetchMessages();
  }, []);

  const toggleComplaint = (id) => {
    setExpandedComplaintId(expandedComplaintId === id ? null : id);
  };

  const toggleMessage = (id) => {
    setExpandedMessageId(expandedMessageId === id ? null : id);
  };

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.post(`/messages/read/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Update local state to mark as read
      setComplaints(complaints.filter(c => c._id !== id));
      setMessages(messages.filter(m => m._id !== id));
    } catch (error) {
      console.error('Error marking message as read:', error);
      alert('Failed to mark message as read.');
    }
  };

  return (
    <div className="complains-messages-container">
      <h1>Complaints</h1>
      {complaints.length === 0 ? (
        <p>No complaints at the moment.</p>
      ) : (
        <div className="accordion">
          {complaints.map(complaint => (
            <div key={complaint._id} className="accordion-item">
              <div className="accordion-header" onClick={() => toggleComplaint(complaint._id)}>
                <span className="warning-icon">⚠️</span> Complaint from Customer {complaint.customerId.username || complaint.customerId.email || complaint.customerId}
                <button onClick={(e) => { e.stopPropagation(); markAsRead(complaint._id); }}>Mark as Read</button>
              </div>
              {expandedComplaintId === complaint._id && (
                <div className="accordion-content">
                  <p>{complaint.message}</p>
                  <p><small>Created at: {new Date(complaint.createdAt).toLocaleString()}</small></p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <h1>Messages</h1>
      {messages.length === 0 ? (
        <p>No messages at the moment.</p>
      ) : (
        <div className="accordion">
          {messages.map(message => (
            <div key={message._id} className="accordion-item">
              <div className="accordion-header" onClick={() => toggleMessage(message._id)}>
                Message from Customer {message.customerId.username || message.customerId.email || message.customerId}
                <button onClick={(e) => { e.stopPropagation(); markAsRead(message._id); }}>Mark as Read</button>
              </div>
              {expandedMessageId === message._id && (
                <div className="accordion-content">
                  <p>{message.message}</p>
                  <p><small>Created at: {new Date(message.createdAt).toLocaleString()}</small></p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default ComplainsMessages;
