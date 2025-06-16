import React, { useEffect, useState } from "react";
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

  const [ drivers, setDrivers ] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get("/driver/getdrivers", { headers: { Authorization: `Bearer ${token}` } });
        setDrivers(response.data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    }

    fetchDrivers();
  },[]);

  return (
    <div>
      <div className="additem-container">
          <h1>Add a driver</h1>
          <form className="additem-form" onSubmit={addDriver}>
              <input type="text" placeholder="Enter driver name" value={drivername} onChange={(e) => setDriverName(e.target.value)} required />
              <input type="text" placeholder="Enter vehicle number" value={vehiclenumber} onChange={(e) => setVehicleNumber(e.target.value)} required />
              <input type="text" placeholder="Enter an access code" value={accesscode} onChange={(e) => setAccessCode(e.target.value)} required />
              <button type="submit">Add Driver</button>
          </form>

          <h2>Drivers List</h2>
          <table className="items-table">
            <thead>
              <tr>
                <th>Driver Name</th>
                <th>Vehicle Number</th>
                <th>Access Code</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map(driver => (
                <tr key={driver._id}>
                  <td>{driver.drivername}</td>
                  <td>{driver.vehiclenumber}</td>
                  <td>{driver.accesscode}</td>
                  <td>
                    <button className="edit-btn" onClick={() => alert(`Edit driver ${driver.id}`)}>Edit</button>
                    <button className="delete-btn" onClick={() => alert(`Delete driver ${driver.id}`)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
      <Footer />
    </div>
  );
}

export default AddDrivers;
