import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import AddVehicle from "./pages/AddVehicle";
import AddItems from "./pages/AddItems";
import SelectRoutes from "./pages/SelectRoutes";
import LoadItems from "./pages/LoadItems";
import AddDrivers from "./pages/AddDrivers";

function App(){
  return(
    <Router>
      {window.location.pathname !== "/" && window.location.pathname !== "/register" && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/ownerdashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/addvehicle" element={<PrivateRoute><AddVehicle /></PrivateRoute>} />
        <Route path="/additems" element={<PrivateRoute><AddItems /></PrivateRoute>} />
        <Route path="/selectroutes" element={<PrivateRoute><SelectRoutes /></PrivateRoute>} />
        <Route path="/loaditems" element={<PrivateRoute><LoadItems /></PrivateRoute>} />
        <Route path="/adddrivers" element={<PrivateRoute><AddDrivers /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
