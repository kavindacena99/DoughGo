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
    
         
          <div className="dashboard-card" onClick={handleAddItems}>
            <span className="card-emoji" role="img" aria-label="Add Items">📦</span>
            Add Items
          </div>
          <div className="dashboard-card" onClick={handleSelectRoutes}>
            <span className="card-emoji" role="img" aria-label="Select Routes">🗺️</span>
            Select Routes
          </div>
          <div className="dashboard-card" onClick={handleLoadItems}>
            <span className="card-emoji" role="img" aria-label="Load Items">🚚</span>
            Load Items
          </div>
          <div className="dashboard-card" onClick={handleAddDrivers}>
            <span className="card-emoji" role="img" aria-label="Add Drivers">👨‍✈️</span>
            Add Drivers
          </div>
          <div className="dashboard-card" onClick={() => navigate("/specialorders")}>
            <span className="card-emoji" role="img" aria-label="Special Orders">🛒</span>
            Special Orders
          </div>
          <div className="dashboard-card" onClick={() => navigate("/complainsmessages")}>
            <span className="card-emoji" role="img" aria-label="Complains and Messages">💬</span>
            Complains & Messages
          </div>
        </div>
        
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
