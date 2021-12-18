import React, { useContext } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';
import { GrArchlinux } from 'react-icons/gr';
import { Icon } from '@mui/material';
import Container from '@mui/material/Container';

import { Link, useLocation } from 'react-router-dom';

import {
  MdStorage,
  MdLocationPin,
  MdKeyboard,
  MdOutlineDoneAll,
  MdPersonAddAlt1,
  MdDarkMode,
  MdLightMode,
} from 'react-icons/md';

import { VscTerminalLinux } from 'react-icons/vsc';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { MainContext } from '../contexts/MainContext';

const drawerWidth = 240;

interface LayoutProps {
  children: React.ReactChild;
}

const sideNavItems = [
  {
    name: 'Welcome',
    link: '/',
    icon: <VscTerminalLinux />,
  },
  {
    name: 'Particions',
    link: '/particions',
    icon: <MdStorage />,
  },
  {
    name: 'Location',
    link: '/location',
    icon: <MdLocationPin />,
  },
  {
    name: 'Keyboard',
    link: '/keyboard',
    icon: <MdKeyboard />,
  },
  {
    name: 'Users',
    link: '/users',
    icon: <MdPersonAddAlt1 />,
  },
  {
    name: 'Finish',
    link: '/finish',
    icon: <MdOutlineDoneAll />,
  },
];

function Layout(props: LayoutProps): JSX.Element {
  const { children } = props;

  const { theme: mainTheme, setTheme } = useContext(MainContext);

  const location = useLocation();

  return (
    <Box
      sx={{
        display: 'flex',
        height: 'calc(100vh - 60px)',
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <GrArchlinux />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Arch Linux Installer
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              if (mainTheme === 'light') {
                setTheme('dark');
              } else {
                setTheme('light');
              }
            }}
          >
            {mainTheme === 'light' ? <MdDarkMode /> : <MdLightMode />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List component="nav">
            {sideNavItems.map((item) => (
              <ListItem
                key={item.name}
                button
                component={Link}
                to={item.link}
                selected={location.pathname === item.link}
              >
                <ListItemIcon>
                  <Icon>{item.icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
