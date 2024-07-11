import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutButton = ({ sidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout actions such as clearing localStorage or cookies
    localStorage.clear();
    // Redirect to login page
    navigate('/login');
  };

  return (
    <ListItem button onClick={handleLogout} sx={{ width: '100%' }}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      {sidebarOpen && <ListItemText primary="Logout" />}
    </ListItem>
  );
};

export default LogoutButton;
