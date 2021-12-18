import React from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Grid from '@mui/material/Grid';

import { VscDebugRestart } from 'react-icons/vsc';
import SuccessAnimation from '../components/SuccessAnimation';

const Finish = (): JSX.Element => {
  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      <Grid container item xs={12} justifyContent="center" alignItems="center">
        <Grid item>
          <Typography variant="h4">All Done!</Typography>
        </Grid>
      </Grid>

      <Grid container item xs={12} justifyContent="center" alignItems="center">
        <Grid item>
          <SuccessAnimation />
        </Grid>
      </Grid>

      <Grid container item xs={12} justifyContent="center" alignItems="center">
        <Grid item>
          <Typography variant="h5">
            Now Arch Linux is installed on your computer!
          </Typography>
        </Grid>
      </Grid>

      <Grid container item xs={12} justifyContent="center" alignItems="center">
        <Grid item>
          <Typography variant="h6">
            Restart your system to use your new installation.
          </Typography>
        </Grid>
      </Grid>

      <Grid container item xs={12} justifyContent="center" alignItems="center">
        <Grid item>
          <Button
            variant="contained"
            color="success"
            startIcon={<VscDebugRestart />}
          >
            Restart
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Finish;
