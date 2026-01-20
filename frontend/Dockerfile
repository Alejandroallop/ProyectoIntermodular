# Etapa 1: Construcción (Build)
FROM node:18-alpine as build

WORKDIR /app

# Copiamos archivos de dependencias
COPY package.json package-lock.json* ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Construimos la aplicación para producción
RUN npm run build

# Etapa 2: Servidor (Nginx)
FROM nginx:alpine

# Copiamos la configuración de Nginx (la crearemos abajo)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos los archivos construidos desde la etapa anterior a la carpeta de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]