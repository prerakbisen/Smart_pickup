import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationItem = ({
  label,
  path,
  icon,
  tooltip,
  badge,
  isCollapsed = false,
  onClick
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location?.pathname === path;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(path);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`nav-item ${isActive ? 'active' : ''}`}
      title={isCollapsed ? tooltip : ''}
      aria-label={label}
      aria-current={isActive ? 'page' : undefined}
    >
      <span className="nav-item-icon">
        <Icon
          name={icon}
          size={20}
          color={isActive ? 'currentColor' : 'var(--color-muted-foreground)'}
        />
      </span>
      <span className="nav-item-label">{label}</span>
      {badge && !isCollapsed && (
        <span className="nav-item-badge">{badge}</span>
      )}
    </button>
  );
};

export default NavigationItem;