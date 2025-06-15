import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";

function AddDrivers() {
  const [drivername, setDriverName] = React.useState('');
  const [vehiclenumber, setVehicleNumber] = React.useState('');
  const [accesscode, setAccessCode] = React.useState('');

  const addDriver = async (e) => {
    e.preventDefault();

    try{
      const token = localStorage.getItem("token");

      await API.post("/driver/adddriver", {drivername,vehiclenumber,accesscode},{ headers: { Authorization: `Bearer ${token}`} });
      alert("Driver added successfully!");
      setDriverName('');
      setVehicleNumber('');
      setAccessCode('');
    }catch(error){
      alert("Driver addition failed!");
    }
  }

  return (
    <div>
      <Navbar />
      <div className="additem-container">
          <h1>Add a driver</h1>
          <form className="additem-form" onSubmit={addDriver}>
              <input type="text" placeholder="Enter driver name" value={drivername} onChange={(e) => setDriverName(e.target.value)} required />
              <input type="text" placeholder="Enter vehicle number" value={vehiclenumber} onChange={(e) => setVehicleNumber(e.target.value)} required />
              <input type="text" placeholder="Enter an access code" value={accesscode} onChange={(e) => setAccessCode(e.target.value)} required />
              <button type="submit">Add Driver</button>
          </form>
      </div>
      <Footer />
    </div>
  );
}

export default AddDrivers;
