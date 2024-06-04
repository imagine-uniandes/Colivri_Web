#!/bin/bash

# Cargar variables de entorno desde el archivo .env
set -a
source .env
set +a

# Construir el proyecto
npm run build

# Verificar si el build fue exitoso
if [ $? -ne 0 ]; then
    echo "Error: La construcción del proyecto falló."
    exit 1
fi

# Ejecutar el comando scp para copiar los archivos al servidor remoto
scp -r ./dist/* ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}

# Verificar si el scp fue exitoso
if [ $? -ne 0 ]; then
    echo "Error: La copia de archivos falló."
    exit 1
fi

echo "Despliegue completado con éxito."
