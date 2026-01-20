FROM node:18-alpine

WORKDIR /app

# Copiamos package.json e instalamos las dependencias reales
COPY package.json .
RUN npm install

# Copiamos el código del servidor
COPY . .

EXPOSE 3000

# Arrancamos el servidor
CMD ["npm", "start"]