import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Presentation from "./pages/Presentation.tsx";
import PageError from "./pages/Error.tsx";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import AuthProvider from "./context/auth.tsx";
import ProtectedRoute from "./util/ProtectedRoute.tsx";
import Register from "./pages/Register.tsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Presentation />} />
          <Route path="*" element={<PageError />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/error" element={<PageError />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
