import React from 'react';
import classes from './Sidebar.module.css'
import { List, ListItem, ListItemButton, ListItemDecorator, Typography, Link  } from '@mui/joy';
import { navigate } from './nav';

const Sidebar = () => {
  return (
    <div className={classes.sidebar}>
      <div className={classes.logo}>NoIcon</div>
      <List component="nav">
        {navigate.map((link, index) => (
            <ListItem key={index}>
              <ListItemButton component={Link}
                  href={link.href} underline="none"
                  sx={{
                  borderRadius: '0.6rem',
                  transition: 'all 0.25s cubic-bezier(0.65, 0, 0.35, 1)',
                  '&:hover': {
                    color: '#e36858 !important',
                    backgroundColor: '#e3685820  !important',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.04), 0 1px 4px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.02)'
                  }
                }}>
                { link?.icon &&
                <ListItemDecorator >
                  {React.createElement(link.icon)}
                </ListItemDecorator>}
                <Typography level="body2">{link.label}</Typography>
              </ListItemButton>
            </ListItem>
        ))}
      </List>
    </div>
  )
}

export default Sidebar