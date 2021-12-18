// const ipcRenderer  = require('electron').ipcRenderer;
import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { MdArrowForward, MdCheck, MdClose } from 'react-icons/md';

import { Link } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemIcon,
  Typography,
  ListItemText,
  CircularProgress,
} from '@mui/material';

const Welcome = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [internet, setInternet] = useState(false);
  const [diskSpace, setDiskSpace] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setInternet(true);
      setDiskSpace(true);
    }, 4000);
  }, []);

  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      sx={{ height: '100%' }}
    >
      <div>
        <h1>Welcome to Arch Linux Installer</h1>

        <h2>The easyer and faster way to clean install Arch Linux</h2>

        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Requirements:
        </Typography>

        <List>
        <ListItem>
            <ListItemText primary="Root user" />
            <ListItemIcon>
              {loading ? (
                <CircularProgress />
              ) : (
                <>
                  {internet ? (
                    <MdCheck color="green" size={30} />
                  ) : (
                    <MdClose color="red" size={30} />
                  )}
                </>
              )}
            </ListItemIcon>
          </ListItem>

          <ListItem>
            <ListItemText primary="Internet" />
            <ListItemIcon>
              {loading ? (
                <CircularProgress />
              ) : (
                <>
                  {internet ? (
                    <MdCheck color="green" size={30} />
                  ) : (
                    <MdClose color="red" size={30} />
                  )}
                </>
              )}
            </ListItemIcon>
          </ListItem>
          <ListItem>
            <ListItemText primary="Disk Space" />
            <ListItemIcon>
              {loading ? (
                <CircularProgress />
              ) : (
                <>
                  {diskSpace ? (
                    <MdCheck color="green" size={30} />
                  ) : (
                    <MdClose color="red" size={30} />
                  )}
                </>
              )}
            </ListItemIcon>
          </ListItem>
        </List>
      </div>

      <Button
        variant="contained"
        endIcon={<MdArrowForward />}
        component={Link}
        to="/particions"
        disabled={loading ? true : !internet && !diskSpace}
      >
        Next
      </Button>
    </Stack>
  );
};

export default Welcome;
