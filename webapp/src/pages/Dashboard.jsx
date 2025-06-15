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

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1>Bakery Owner Dashboard</h1>
        <div className="cards-container">
          <div className="dashboard-card" onClick={handleAddVehicle}>Add Vehicle</div>
          <div className="dashboard-card" onClick={handleAddItems}>Add Items</div>
          <div className="dashboard-card" onClick={handleSelectRoutes}>Select Routes</div>
          <div className="dashboard-card" onClick={handleLoadItems}>Load Items</div>
        </div>
        <LogoutButton />
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
