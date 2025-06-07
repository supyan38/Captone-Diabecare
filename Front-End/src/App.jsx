import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./components/Register";
import CekGulaDarah from "./pages/CekGulaDarah";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/cek-gula-darah' element={<CekGulaDarah />} />
      </Routes>
    </Router>
  );
}

export default App;