# INSTALAR XAMPP E NODE

# NODE
- Download do node WINDOWS         - https://nodejs.org/dist/v20.12.2/node-v20.12.1-x64.msi
- Download do node para MAC        - https://nodejs.org/dist/v20.12.2/node-v20.12.1.pkg
- Download do node demais sistemas - https://nodejs.org/download/release/v20.12.1

# XAMP
Download do XAMPP (Windows, MAC e Linux)​: https://www.apachefriends.org/pt_br/download.html

# SUBIR O BANCO
http://localhost:81/

# BACKEND
npm install
npx sequelize db:migrate
npx sequelize db:seed:all
npm start

# FRONTEND (rodar dentro do Git Bash)
npm install --force
export NODE_OPTIONS=--openssl-legacy-provider
npm run build
npm start