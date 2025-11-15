import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Map } from "./pages/Map";
import { Sales } from "./pages/Sales";
import { CreateSales } from "./pages/CreateSales";
import { PrivateRoute, Logo } from "./components/index";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Logo />}>
          <Route index element={<Login setUser={setUser} />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/sales" element={<Sales />} />
        <Route path="/create/sales" element={<CreateSales />} />
        <Route
          path="/map"
          element={
            
              <Map />
            
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;


