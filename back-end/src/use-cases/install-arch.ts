import { execPromise } from "../utils/index";

interface Props {
  folderToInstall: string;
}

const installArchUseCase = async (props: Props) => {
  const { folderToInstall = "/mnt" } = props;

  const commands = [
    `pacstrap ${folderToInstall} base base-devel linux linux-firmware vim nano sudo archlinux-keyring wget libnewt --noconfirm --needed`,
    `genfstab -U ${folderToInstall} >> /mnt/etc/fstab`,
    `cp /etc/pacman.d/mirrorlist ${folderToInstall}/etc/pacman.d/mirrorlist`,
  ];

  for (const command of commands) {
    await execPromise(command);
    console.log(command);
  }

  return {
    done: "ok",
  };
};

export { installArchUseCase };
