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
    "pacman -S grub efibootmgr networkmanager dialog mtools dosfstools git reflector snapper xdg-utils xdg-user-dirs inetutils base-devel linux-headers dhcp dhcpcd os-prober --noconfirm",
    "ln -sf /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime",
    "locale-gen",
    "echo bim > /etc/hostname",
    "mkinitcpio -p linux",
    "grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB",
    "grub-mkconfig -o /boot/grub/grub.cfg",
    "systemctl enable NetworkManager",
    `sed -i 's/^# %wheel ALL=(ALL) NOPASSWD: ALL/%wheel ALL=(ALL) NOPASSWD: ALL/' /etc/sudoers`,
    `sed -i 's/^#Para/Para/' /etc/pacman.conf`,
    // `sed -i "/\[multilib\]/,/Include/"'s/^#//' /etc/pacman.conf`,
    "pacman -Sy --noconfirm",
    "useradd -mG wheel cardimac",
  ];

  for (const command of commands2) {
    const chRootCommand = `arch-chroot ${folderToInstall} ${command}`;
    console.log(command);
    await execPromise(chRootCommand);
  }

  const commands3 = [
    `echo 'root:102030' | arch-chroot ${folderToInstall} chpasswd`,
    `echo 'cardimac:102030' | arch-chroot ${folderToInstall} chpasswd`,
  ];

  for (const command of commands3) {
    console.log(command);
    await execPromise(command);
  }

  return {
    done: "ok",
  };
};

export { installArchUseCase };
