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


interface Requirement {
  name: string,
  status: boolean,
}

const requirementsData: Requirement[] = [
  {
    name: 'Internet',
    status: false
  },
  {
    name: 'Disk Space',
    status: false
  },
  {
    name: 'Root',
    status: false
  },
  {
    name: 'EFI',
    status: false
  }
]

const Welcome = (): JSX.Element => {
  const [loading, setLoading] = useState(true);

  const [requirements, setRequirements] = useState<Requirement[]>(requirementsData)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      // setRequirements()
    }, 4000);
  }, []);


  const checkRequirements = (): boolean => {
    const check = requirements.filter( requirement => requirement.status === true)
    return (check.length === requirements.length) ? false : true
  }

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

        {requirements.map( requirement => (
          <ListItem key={requirement.name}>
            <ListItemText primary={requirement.name} />
            <ListItemIcon>
              {loading ? (
                <CircularProgress />
              ) : (
                <>
                  {requirement.status ? (
                    <MdCheck color="green" size={30} />
                  ) : (
                    <MdClose color="red" size={30} />
                  )}
                </>
              )}
            </ListItemIcon>
          </ListItem>
        ))}

        </List>
      </div>

      <Button
        variant="contained"
        endIcon={<MdArrowForward />}
        component={Link}
        to="/particions"
        disabled={loading || checkRequirements()}
      >
        Next
      </Button>
    </Stack>
  );
};

export default Welcome;
