import React from 'react';
import { Badge } from '@mui/material'; // or your preferred UI library
import NotificationsIcon from '@mui/icons-material/Notifications';

const NotificationIcon = ({ notifications, onClick }) => {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      <Badge badgeContent={notifications.length} color="error">
        <NotificationsIcon />
      </Badge>
    </div>
  );
};

export default NotificationIcon;