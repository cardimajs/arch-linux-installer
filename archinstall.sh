sudo pacman -S nodejs npm
cd front-end
npm install
npm run build
cd ..
cd back-end
npm install
npm run build
sudo node ./dist/index.js