import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

function App(){
  return(
    <Router>
      {window.location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/ownerdashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;