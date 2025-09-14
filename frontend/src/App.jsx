import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AuthPage from "./components/auth";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";

function App() {
  return (
    <Routes>
      {/* Login/Register */}
      <Route path="/" element={<AuthPage />} />

      {/* Dashboard (محمي) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard view="all" />} />
        <Route path="completed" element={<Dashboard view="completed" />} />
        <Route path="pending" element={<Dashboard view="pending" />} />
        <Route path="today" element={<Dashboard view="today" />} />
      </Route>

      {/* fallback لأي مسار خارج الداشبورد/الأوث */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
