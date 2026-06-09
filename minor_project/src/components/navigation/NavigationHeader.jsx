import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationHeader = ({
  userName = 'User',
  userRole = 'parent',
  onLogout
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      if (onLogout) {
        onLogout();
      } else {
        navigate('/authentication-portal');
      }
    }
  };

  const displayRole = userRole === 'parent' ? 'Parent' : 'Administrator';
  const initials = userName?.split(' ')?.map(n => n?.[0])?.join('')?.toUpperCase()?.slice(0, 2);

  return (
    <div className="navigation-header">
      <div className="navigation-user-info">
        <div className="navigation-user-avatar">
          {initials || <Icon name="User" size={16} />}
        </div>
        <div className="navigation-user-details">
          <div className="navigation-user-name">{userName}</div>
          <div className="navigation-user-role">{displayRole}</div>
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
  );
};

export default NavigationHeader;