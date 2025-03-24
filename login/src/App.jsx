import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import NuevaContra from "./components/NuevaContra";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
      {/* La ruta de register es para registrar un usuario, la de nuevacontra es para mandar email de reinicio de contraseña, y la  de dashboard y / te mandaran al login o al dashboard dependiendo de si hay un usuario logueado*/}
        <Route path="/register" element={<Register />} />
        <Route path="/NuevaContra" element={<NuevaContra />} />
        <Route path="/" element={user ? <Dashboard /> : <Login />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
