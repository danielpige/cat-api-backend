# Usa una imagen oficial de Node.js como base
FROM node:18

# Crea el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./
RUN npm install

# Copia el resto del código fuente
COPY . .

# Compila TypeScript (asegúrate de tener tsconfig.json)
RUN npm run build

# Expón el puerto (usa la misma variable que en docker-compose)
EXPOSE ${PORT}

# Comando para correr la app
CMD ["node", "dist/server.ts"]
