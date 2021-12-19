sudo pacman -S nodejs npm
cd front-end
npm install
npm build
cd ..
cd back-end
npm install
npm build
sudo node ./dist/index.js