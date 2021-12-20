sed -i 's/^#Para/Para/' /etc/pacman.conf
sudo mount -o remount,size=1G /run/archiso/cowspace
sudo pacman -S nodejs npm electron xorg xorg-xinit --noconfirm
cd front-end
npm install
npm run build
cd ..
cd back-end
npm install
npm run build
sudo node ./dist/index.js
xinit /usr/bin/electron --no-sandbox http://localhost:3000