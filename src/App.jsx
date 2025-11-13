import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Map } from "./pages/Map";
import { PrivateRoute, Logo } from "./components/index";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Logo />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/map"
          element={
            <PrivateRoute>
              <Map />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
