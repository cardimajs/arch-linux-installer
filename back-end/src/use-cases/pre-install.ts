import { isRoot, isOnline, execPromise } from "../utils";
import ArchInstallerCore from "../ArchInstallerCore";

const preInstallUseCase = async () => {
  const root = await isRoot();
  const online = await isOnline();
  if (!root || !online) {
    throw new Error("You need root access and internet connection!");
  }

  const countryCode = (await ArchInstallerCore.getIPInfo()).country;

  const step1Commands = [
    "sed -i 's/^#Para/Para/' /etc/pacman.conf",
    "timedatectl set-ntp true",
    "cp /etc/pacman.d/mirrorlist /etc/pacman.d/mirrorlist.backup",
    "pacman -S --noconfirm reflector rsync grub gptfdisk btrfs-progs",
  ];
  const step1Promises = step1Commands.map((command) => execPromise(command));
  await Promise.all(step1Promises);

  const step2Commands = [
    `reflector -a 48 -c ${countryCode} -f 5 -l 20 --sort rate --save /etc/pacman.d/mirrorlist`,
  ];
  const step2Promises = step2Commands.map((command) => execPromise(command));
  await Promise.all(step2Promises);

  ArchInstallerCore.preInstall = true;
  return {
    status: "done",
  };
};

export { preInstallUseCase };
