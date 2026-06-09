import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import ParentNotifications from './pages/parent-notifications';
import ParentDashboard from './pages/parent-dashboard';
import AuthenticationPortal from './pages/authentication-portal';
import AdminDashboardQueue from './pages/admin-dashboard-queue';
import AdminManagementSystem from './pages/admin-management-system';
import ParentHistoryProfile from './pages/parent-history-profile';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AuthenticationPortal />} />
        <Route path="/parent-notifications" element={<ParentNotifications />} />
        <Route path="/parent-dashboard" element={<ParentDashboard />} />
        <Route path="/authentication-portal" element={<AuthenticationPortal />} />
        <Route path="/admin-dashboard-queue" element={<AdminDashboardQueue />} />
        <Route path="/admin-management-system" element={<AdminManagementSystem />} />
        <Route path="/parent-history-profile" element={<ParentHistoryProfile />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
    