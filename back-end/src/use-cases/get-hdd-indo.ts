import si from "systeminformation";

interface Disk {
  device: string | undefined; // /dev/sda
  type: string | undefined; // hd
  vendor: string | undefined;
  size: number | undefined;
  temperature: number | undefined;
  smartStatus: string | undefined;
  interfaceType: string | undefined;
  name: string | undefined;
  modelFamily: string | undefined;
  trim: boolean | undefined;
  powerCycleCount: number | undefined;
  powerOnTime: number | undefined;
  completeName: string;
  particions: Particion[];
}

interface Particion {
  name: string;
  uuid: string;
  fsType: string;
  size: number;
  mount: string;
  label: string;
}

const detectOSOnParticions = async () => {
  // cat /etc/os-release      // detect linux distribution
  //lsb_release -a     //detect linux distro
  // hostnamectl
  // cat /etc/issue
  //cat /etc/*-release
  //WINDOWS
  // C:\Windows\System32\version.dll
};

const getHddInfoUseCase = async () => {
  const diskLayout = await si.diskLayout();
  const blockDevices = await si.blockDevices();

  const disks: Disk[] = diskLayout.map((device) => ({
    completeName: `${device.type} ${device.interfaceType} ${device.vendor} ${device.name} `,
    device: device.device,
    name: device.name,
    type: device.type,
    vendor: device.vendor,
    size: device.size,
    smartStatus: device.smartStatus,
    interfaceType: device.interfaceType,
    modelFamily: device.smartData?.model_family,
    trim: device.smartData?.trim?.supported,
    temperature: device.smartData?.temperature.current,
    powerCycleCount: device.smartData?.power_cycle_count,
    powerOnTime: device.smartData?.power_on_time.hours,
    particions: blockDevices
      .filter(
        (block) =>
          block.type === "part" &&
          block.name.includes(device.device.split("/")[2])
      )
      .map((block) => ({
        name: block.name,
        uuid: block.uuid,
        fsType: block.fsType,
        size: block.size,
        mount: block.mount,
        label: block.label,
      })),
  }));

  return disks;
};

export { getHddInfoUseCase };
