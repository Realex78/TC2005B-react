import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import './App.css'
import Initial from "./views/Initial";
import Profile from "./views/Profile";
import Login from "./views/Login";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Footer from "./components/Footer";
import { useState } from 'react'

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const login = async (user) => {
    const data = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });
    const datos = await data.json();
    setIsLogin(datos.isLogin);
    return datos.isLogin;
  };
  const logout = () => {
    setIsLogin(false);
  };
  return (
    <BrowserRouter>
      {isLogin && <ResponsiveAppBar logout={logout} />}
      <Routes>
        <Route path="/" element={<Login login={login} />} />
        <Route
          path="/home"
          element={isLogin ? <Initial /> : <Navigate to={"/"} />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
