import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const RoleBasedSidebar = ({ userRole = 'parent', isCollapsed = false, onToggleCollapse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const parentNavItems = [
    {
      label: 'Dashboard',
      path: '/parent-dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'View pickup status'
    },
    {
      label: 'History & Profile',
      path: '/parent-history-profile',
      icon: 'History',
      tooltip: 'View pickup history and manage profile'
    },
    {
      label: 'Notifications',
      path: '/parent-notifications',
      icon: 'Bell',
      tooltip: 'Manage notification preferences',
      badge: 3
    }
  ];

  const adminNavItems = [
    {
      label: 'Live Queue',
      path: '/admin-dashboard-queue',
      icon: 'ListOrdered',
      tooltip: 'Manage pickup queue'
    },
    {
      label: 'Management',
      path: '/admin-management-system',
      icon: 'Settings',
      tooltip: 'System administration'
    }
  ];

  const navItems = userRole === 'parent' ? parentNavItems : adminNavItems;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      navigate('/authentication-portal');
    }
  };

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileOpen]);

  const isActive = (path) => location?.pathname === path;

  return (
    <>
      <button
        className="mobile-menu-button"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle navigation menu"
      >
        <Icon name={isMobileOpen ? 'X' : 'Menu'} size={20} />
      </button>
      {isMobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside
        className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img src="public/assets/images/icons8-university-64.png" alt="" />
          </div>
          <span className="sidebar-logo-text">Smart Pickup</span>
        </div>

        <div className="navigation-header">
          <div className="navigation-user-info">
            <div className="navigation-user-avatar">
              <Icon name="User" size={16} />
            </div>
            <div className="navigation-user-details">
              <div className="navigation-user-name">
                {userRole === 'parent' ? 'Parent User' : 'Admin User'}
              </div>
              <div className="navigation-user-role">
                {userRole === 'parent' ? 'Parent' : 'Administrator'}
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
            aria-label="Logout"
            title="Logout"
          >
            <Icon name="LogOut" size={18} color="var(--color-muted-foreground)" />
          </button>
        </div>

        <nav className="sidebar-nav" role="navigation" aria-label="Main navigation">
          {navItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`nav-item ${isActive(item?.path) ? 'active' : ''}`}
              title={isCollapsed ? item?.tooltip : ''}
              aria-label={item?.label}
              aria-current={isActive(item?.path) ? 'page' : undefined}
            >
              <span className="nav-item-icon">
                <Icon
                  name={item?.icon}
                  size={20}
                  color={isActive(item?.path) ? 'currentColor' : 'var(--color-muted-foreground)'}
                />
              </span>
              <span className="nav-item-label">{item?.label}</span>
              {item?.badge && !isCollapsed && (
                <span className="nav-item-badge">{item?.badge}</span>
              )}
            </button>
          ))}
        </nav>
      </aside>
      {userRole === 'parent' && (
        <div className="mobile-tab-bar">
          {parentNavItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`mobile-tab-item ${isActive(item?.path) ? 'active' : ''}`}
              aria-label={item?.label}
              aria-current={isActive(item?.path) ? 'page' : undefined}
            >
              <Icon
                name={item?.icon}
                size={20}
                color={isActive(item?.path) ? 'var(--color-primary)' : 'currentColor'}
              />
              <span className="mobile-tab-label">{item?.label}</span>
              {item?.badge && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              )}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default RoleBasedSidebar;