import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./component/Navbar.jsx";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp.jsx";
import AboutUs from "./pages/AboutUs.jsx";

import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";

export default function App() {
  const { authUser, checkAuth } = useAuthStore();
  const { theme } = useThemeStore(); // Destructure the theme from `useThemeStore`

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    // Apply the selected theme dynamically using `data-theme`
    <div data-theme={theme} className="min-h-screen bg-base text-base-content">
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/aboutus" element={ <AboutUs /> } />

      </Routes>
    </div>
  );
}
