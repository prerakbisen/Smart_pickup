import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const MobileTabBar = ({ navItems = [] }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => location?.pathname === path;

  return (
    <div className="mobile-tab-bar">
      {navItems?.map((item) => (
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
  );
};

export default MobileTabBar;