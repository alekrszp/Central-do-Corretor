import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Map from "./pages/Map"; // <-- CORRETO
import { Logo } from "./components/index";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Logo />}>
          <Route index element={<Login setUser={setUser} />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/map" element={<Map user={user} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;


