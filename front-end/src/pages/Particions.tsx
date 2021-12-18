import React, { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

interface DiskLayoutData {
  device: string;
  type: string;
  name: string;
  vendor: string;
  size: number;
  bytesPerSector: number;
  totalCylinders: number;
  totalHeads: number;
  totalSectors: number;
  totalTracks: number;
  tracksPerCylinder: number;
  sectorsPerTrack: number;
  firmwareRevision: string;
  serialNum: string;
  interfaceType: string;
  smartStatus: string;
  // smartData?: SmartData;
}

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // eslint-disable-next-line no-restricted-properties
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

const Particions = (): JSX.Element => {
  const [drives, setDrives] = useState<DiskLayoutData[] | []>([]);

  // useEffect(() => {
  //   const loadDiskLayout = async () => {
  //     const data: DiskLayoutData[] = await window.electron.ipcRenderer.callMain(
  //       'diskLayout'
  //     );
  //     setDrives(data);
  //   };
  //   loadDiskLayout();
  // }, []);

  return (
    <>
      <h1>Particions</h1>

      <FormControl component="fieldset">
        <FormLabel component="legend">Select Disk</FormLabel>
        <RadioGroup
          aria-label="gender"
          defaultValue="female"
          name="radio-buttons-group"
        >
          {drives.map((drive) => {
            const diskString = `${drive.type} (${drive.vendor}) - ${
              drive.name
            } - (${formatBytes(drive.size)})`;
            return (
              <FormControlLabel
                value={JSON.stringify(drive)}
                control={<Radio />}
                label={diskString}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default Particions;
