import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import AddItem from "./pages/AddItem";
import SelectRoutes from "./pages/SelectRoutes";
import LoadItems from "./pages/LoadItems";
import AddDrivers from "./pages/AddDrivers";
import SpecialOrders from "./pages/SpecialOrders";
import ComplainsMessages from "./pages/ComplainsMessages";

function App(){
  return(
    <Router>
      {window.location.pathname !== "/" && window.location.pathname !== "/register" && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/ownerdashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/additems" element={<PrivateRoute><AddItem /></PrivateRoute>} />
        <Route path="/selectroutes" element={<PrivateRoute><SelectRoutes /></PrivateRoute>} />
        <Route path="/loaditems" element={<PrivateRoute><LoadItems /></PrivateRoute>} />
        <Route path="/adddrivers" element={<PrivateRoute><AddDrivers /></PrivateRoute>} />
        <Route path="/specialorders" element={<PrivateRoute><SpecialOrders /></PrivateRoute>} />
        <Route path="/complainsmessages" element={<PrivateRoute><ComplainsMessages /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
