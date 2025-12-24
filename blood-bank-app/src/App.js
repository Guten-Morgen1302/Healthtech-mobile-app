import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HospitalAuthProvider } from './context/HospitalAuthContext';
import { ToastProvider } from './context/ToastContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPageUltra';
import InventoryPage from './pages/InventoryPageNew';
import DonorsPage from './pages/DonorsPage';
import RecipientsPage from './pages/RecipientsPage';
import HospitalsPage from './pages/HospitalsPage';

// Hospital Portal Pages
import HospitalLoginPage from './pages/hospital/HospitalLoginPage';
import HospitalRegisterPage from './pages/hospital/HospitalRegisterPage';
import HospitalDashboard from './pages/hospital/HospitalDashboard';
import HospitalRequestsPage from './pages/hospital/HospitalRequestsPage';
import HospitalChatPage from './pages/hospital/HospitalChatPage';

// Admin Pages
import AdminChatPage from './pages/AdminChatPage';
import AdminRequestsPage from './pages/AdminRequestsPage';

// New Feature Pages
import EmergencySOSPage from './pages/EmergencySOSPageNew';
import AppointmentsPage from './pages/AppointmentsPage';
import RewardsPage from './pages/RewardsPage';
import CampsPage from './pages/CampsPage';
import BloodStockMapPage from './pages/BloodStockMapPage';
import EnhancedAnalyticsPage from './pages/EnhancedAnalyticsPage';

// Logout component
const Logout = () => {
  const { logout } = useAuth();
  React.useEffect(() => {
    logout();
  }, [logout]);
  return <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <HospitalAuthProvider>
        <ToastProvider>
          <Router>
            <Routes>
              {/* Login Route - No Layout */}
              <Route path="/login" element={<LoginPage />} />
              
              {/* Hospital Portal Routes */}
              <Route path="/hospital/login" element={<HospitalLoginPage />} />
              <Route path="/hospital/register" element={<HospitalRegisterPage />} />
              <Route path="/hospital/dashboard" element={<HospitalDashboard />} />
              <Route path="/hospital/requests" element={<HospitalRequestsPage />} />
              <Route path="/hospital/chat" element={<HospitalChatPage />} />
              
              {/* Logout Route - Clears session and redirects to login */}
              <Route path="/logout" element={<Logout />} />
              
              {/* Protected Routes - With Layout */}
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="inventory" element={<InventoryPage />} />
                <Route path="donors" element={<DonorsPage />} />
                <Route path="recipients" element={<RecipientsPage />} />
                <Route path="hospitals" element={<HospitalsPage />} />
                <Route path="chat" element={<AdminChatPage />} />
                <Route path="requests" element={<AdminRequestsPage />} />
                
                {/* New Feature Routes */}
                <Route path="emergency" element={<EmergencySOSPage />} />
                <Route path="appointments" element={<AppointmentsPage />} />
                <Route path="rewards" element={<RewardsPage />} />
                <Route path="camps" element={<CampsPage />} />
                <Route path="map" element={<BloodStockMapPage />} />
                <Route path="analytics" element={<EnhancedAnalyticsPage />} />
              </Route>
            </Routes>
          </Router>
        </ToastProvider>
      </HospitalAuthProvider>
    </AuthProvider>
  );
}

export default App;
