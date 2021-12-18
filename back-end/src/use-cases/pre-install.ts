import { isRoot, isOnline, execPromise } from "../utils";

//install state
// country iso
//

const preInstallUseCase = async () => {
  const root = await isRoot();
  const online = await isOnline();
  if (!root || !online) {
    throw new Error("You need root access and internet connection!");
  }

  // get country iso
  // put country iso on install state
  // load and parse harddrive data and put on install state
  //

  const step1Commands = [
    "timedatectl set-ntp true",
    "cp /etc/pacman.d/mirrorlist /etc/pacman.d/mirrorlist.backup",
    "sed -i 's/^#Para/Para/' /etc/pacman.conf",
    "pacman -S --noconfirm reflector rsync grub",
  ];
  const step1Promises = step1Commands.map((command) => execPromise(command));
  await Promise.all(step1Promises);
};

export { preInstallUseCase };
