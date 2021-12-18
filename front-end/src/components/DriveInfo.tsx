// const ipcRenderer  = require('electron').ipcRenderer;
// import React, { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';

interface DriveInfoProps {
  size: number;
  particions: {
    size: number;
    type: string;
  }[];
}

interface ParticionProps {
  size: number;
  type: string;
  percentage: number;
  leftBorder?: boolean;
  rightBorder?: boolean;
  color: string;
}

const Particion = (props: ParticionProps): JSX.Element => {
  const { size, type, percentage, leftBorder, rightBorder, color } = props;
  return (
    <Box
      sx={{
        height: '100%',
        backgroundColor: `${color}`,
        width: `${percentage}%`,

        ...(leftBorder
          ? { borderBottomLeftRadius: '5px', borderTopLeftRadius: '5px' }
          : {}),

        ...(rightBorder
          ? { borderBottomRightRadius: '5px', borderTopRightRadius: '5px' }
          : {}),
      }}
    >
      <Box
        sx={{
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Typography>{type.toLocaleUpperCase()}</Typography>
        <Typography>({size})</Typography>
      </Box>
    </Box>
  );
};

const DriveInfo = (props: DriveInfoProps): JSX.Element => {
  const colors = {
    fat32: '#ffff99',
    ntfs: '#99ccff',
    ext4: '#99ffcc',
    btrfs: '#cc99ff',
    empty: 'gray',
  };
  return (
    <Box
      sx={{
        height: '60px',
        borderRadius: '5px',
        display: 'flex',
      }}
    >
      <Particion
        color="#ffff99"
        percentage={20}
        type="Fat32"
        size={1000}
        leftBorder
      />
      <Particion color={colors.ntfs} percentage={20} type="Ntfs" size={1000} />
      <Particion
        color={colors.btrfs}
        percentage={20}
        type="btrfs"
        size={1000}
      />
      <Particion color={colors.ext4} percentage={20} type="ext4" size={1000} />
      <Particion
        color={colors.empty}
        percentage={20}
        type="empty"
        size={1000}
        rightBorder
      />
    </Box>
  );
};

export default DriveInfo;
