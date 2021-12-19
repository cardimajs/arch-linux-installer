import { execPromise, sleep } from "../utils/index";
interface Props {
  disk: string;
  folderPath: string;
  isNvme: boolean;
}

const eraseDiskAndInstallBtrfs = async (props: Props) => {
  const { disk, folderPath, isNvme } = props;

  const bootParticion = `${disk}${isNvme ? "p1" : "1"}`;
  const rootParticion = `${disk}${isNvme ? "p2" : "2"}`;

  const commands = [
    `sgdisk -Z ${disk}`,
    `sgdisk -a 2048 -o ${disk}`,
    `sgdisk -n 1::+500M --typecode=1:ef00 --change-name=1:'EFIBOOT' ${disk}`,
    `sgdisk -n 2::-0 --typecode=2:8300 --change-name=2:'ROOT' ${disk}`,
    `sgdisk -A 1:set:2 ${disk}`,
    `mkfs.vfat -F32 -n "EFIBOOT" ${bootParticion}`,
    `mkfs.btrfs -L "ROOT" ${rootParticion} -f`,
    `mount -t btrfs ${rootParticion} ${folderPath}`,
    `ls ${folderPath} | xargs btrfs subvolume delete`,
    `btrfs subvolume create ${folderPath}/@`,
    `btrfs subvolume create ${folderPath}/@home`,
    `btrfs subvolume create ${folderPath}/@snapshots`,
    `btrfs subvolume create ${folderPath}/@var_log`,
    `umount ${folderPath}`,
    `mount -o subvol=@ ${rootParticion} -L ROOT ${folderPath}`,
    `mkdir -p ${folderPath}/{boot,home,.snapshots,var_log}`,
    `mount -o subvol=@home ${rootParticion} ${folderPath}/home`,
    `mount -o subvol=@snapshots ${rootParticion} ${folderPath}/.snapshots`,
    `mount -o subvol=@var_log ${rootParticion} ${folderPath}/var_log`,
    `mount ${bootParticion} ${folderPath}/boot`,
  ];

  for (const command of commands) {
    await execPromise(command);
    console.log(command);
    sleep(200);
  }

  return true;
};

export { eraseDiskAndInstallBtrfs };
