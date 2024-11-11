FROM node:latest

WORKDIR /app

# Copiar package.json primero
COPY package*.json ./

# Instalar dependencias sin ejecutar scripts post-install
RUN npm install --legacy-peer-deps --ignore-scripts

# Instalar tsx globalmente después de las dependencias principales
RUN npm install -g tsx

# Ahora copiamos todo el código fuente
COPY . .

# Ejecutar manualmente los scripts necesarios del postinstall
RUN cd src && \
    echo "Ejecutando build:icons..." && \
    tsx plugins/iconify/build-icons.js && \
    echo "Ejecutando msw:init..." && \
    npm run msw:init || \
    echo "Algunos scripts de post-install fallaron, pero continuamos..."

# Ejecutar el build
RUN npm run build

EXPOSE 40

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "40"]
