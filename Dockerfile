# Imagen base de Node.js para construir la aplicación
FROM node:20.12.2-alpine AS build

# Crear el directorio de trabajo
WORKDIR /app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de la aplicación Angular
COPY . .

# Ejecutar el build de producción
RUN npm run build --prod

# Imagen base de Nginx para servir la aplicación
FROM nginx:1.19-alpine

# Copiar los archivos construidos de Angular al servidor Nginx
COPY --from=build /app/dist/academia-front /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80
