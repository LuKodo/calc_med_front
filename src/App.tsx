import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext";
import { Login } from "./pages/Login";
import { AdminPage } from "./pages/AdminPage";
import { PharmacyPage } from "./pages/PharmacyPage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/pharmacy" element={<PharmacyPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
