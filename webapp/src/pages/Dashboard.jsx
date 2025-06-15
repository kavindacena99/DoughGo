import React from "react";
import Navbar from "../components/Navbar";
import LogoutButton from "../components/LogoutButton";
import Footer from "../components/Footer";
import "./Dashboard.css";

import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleAddVehicle = () => {
    navigate("/addvehicle");
  };

  const handleAddItems = () => {
    navigate("/additems");
  };

  const handleSelectRoutes = () => {
    navigate("/selectroutes");
  };

  const handleLoadItems = () => {
    navigate("/loaditems");
  };

  const handleAddDrivers = () => {
    navigate("/adddrivers");
  };

  return (
    <>
      <div className="dashboard-container">
        <h1>Bakery Owner Dashboard</h1>
        <div className="cards-container">
          <div className="dashboard-card" onClick={handleAddVehicle}>
            <div className="card-image-placeholder"></div>
            Add Vehicle
          </div>
          <div className="dashboard-card" onClick={handleAddItems}>
            <div className="card-image-placeholder"></div>
            Add Items
          </div>
          <div className="dashboard-card" onClick={handleSelectRoutes}>
            <div className="card-image-placeholder"></div>
            Select Routes
          </div>
          <div className="dashboard-card" onClick={handleLoadItems}>
            <div className="card-image-placeholder"></div>
            Load Items
          </div>
          <div className="dashboard-card" onClick={handleAddDrivers}>
            <div className="card-image-placeholder"></div>
            Add Drivers
          </div>
        </div>
        
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
