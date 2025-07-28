import React, { useState, useEffect } from "react";

import Footer from "../components/Footer";
import logo from '../Img/LOGO.jpg';
import './Profile.css';

function Profile() {
  const [admin, setAdmin] = useState({
    firstname: "",
    lastname: "",
    businessname: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch admin details on mount
  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token from localStorage:", token);
        const response = await fetch("http://localhost:8000/api/auth/profile", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        console.log("Response status:", response.status);
        if (response.ok) {
          const data = await response.json();
          console.log("Profile data received:", data);
          setAdmin({
            firstname: data.firstname || "",
            lastname: data.lastname || "",
            businessname: data.businessname || "",
            email: data.email || "",
            password: ""
          });
        } else {
          const errorText = await response.text();
          console.error("Failed to load profile details:", errorText);
          setMessage("Failed to load profile details.");
        }
      } catch (error) {
        console.error("Error loading profile details:", error);
        setMessage("Error loading profile details.");
      } finally {
        setLoading(false);
      }
    };
    fetchAdminDetails();
  }, []);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(admin)
      });
      if (response.ok) {
        const data = await response.json();
        setMessage("Profile updated successfully.");
        // Clear password field after update
        setAdmin(prev => ({ ...prev, password: "" }));
      } else {
        setMessage("Failed to update profile.");
      }
    } catch (error) {
      setMessage("Error updating profile.");
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <>
      <div className="profile-page-wrapper">
        <h1>Admin Profile</h1>
        {message && <p className="message">{message}</p>}
        <div className="profile-top-cards">
          <div className="profile-logo-card">
            <img src={logo} alt="Logo" className="profile-logo" />
          </div>
          <div className="profile-details-card">
            <h2>Current Details</h2>
            <p><strong>First Name:</strong> {admin.firstname}</p>
            <p><strong>Last Name:</strong> {admin.lastname}</p>
            <p><strong>Business Name:</strong> {admin.businessname}</p>
            <p><strong>Email:</strong> {admin.email}</p>
          </div>
        </div>
        <div className="profile-form-card">
          <h2>Update Details</h2>
          <form onSubmit={handleSubmit}>
            <label>First Name: </label>
            <input type="text" name="firstname" value={admin.firstname} onChange={handleChange} required />
            <label>Last Name: </label>
            <input type="text" name="lastname" value={admin.lastname} onChange={handleChange} required />
            <label>Business Name: </label>
            <input type="text" name="businessname" value={admin.businessname} onChange={handleChange} required />
            <label>Email: </label>
            <input type="email" name="email" value={admin.email} onChange={handleChange} required />
            <label>Password: </label>
            <input type="password" name="password" value={admin.password} onChange={handleChange} placeholder="Enter new password to change" />
            <button type="submit">Update Profile</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
