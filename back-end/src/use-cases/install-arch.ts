import { execPromise } from "../utils/index";

interface Props {
  folderToInstall?: string;
}

const installArchUseCase = async (props: Props) => {
  const { folderToInstall = "/mnt" } = props;

  console.log(`FOLDER => `, folderToInstall);

  const commands = [
    `pacstrap ${folderToInstall} base base-devel linux linux-firmware vim nano sudo archlinux-keyring wget libnewt --noconfirm --needed`,
    `genfstab -U ${folderToInstall} >> /mnt/etc/fstab`,
    `cp /etc/pacman.d/mirrorlist ${folderToInstall}/etc/pacman.d/mirrorlist`,
  ];

  for (const command of commands) {
    await execPromise(command);
    console.log(command);
  }

  // Install inside arch
  const commands2 = [
    "pacman -S grub efibootmgr networkmanager dialog mtools dosfstools git reflector snapper xdg-utils xdg-user-dirs inetutils base-devel linux-headers dhcp dhcpcd os-prober",
    "ln -sf /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime",
    "locale-gen",
    "echo bim > /etc/hostname",
    "mkinitcpio -p linux",
    "grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB",
    "grub-mkconfig -o /boot/grub/grub.cfg",
    "systemctl enable NetworkManager",
  ];

  for (const command of commands2) {
    const chRootCommand = `arch-chroot ${folderToInstall} ${command}`;
    await execPromise(chRootCommand);
    console.log(command);
  }

  return {
    done: "ok",
  };
};

export { installArchUseCase };
