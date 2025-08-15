# ecommerce-backend

Backend para una aplicación de ecommerce, desarrollado en Node.js con Express y MongoDB.

## Características

- Autenticación de usuarios (JWT, bcrypt)
- Gestión de productos, carritos, usuarios y tickets
- Motor de plantillas Handlebars
- Envío de emails (nodemailer)
- Paginación y filtros
- Recuperación de contraseña

## Instalación

1. Clona el repositorio:

   ```sh
   git clone https://github.com/NicolasAndretta/ecommerce-backend.git
   cd ecommerce-backend
   ```

2. Instala las dependencias:

   ```sh
   npm install
   ```

3. Configura el archivo `.env` con tus credenciales de MongoDB, JWT y correo.

## Uso

- Inicia el servidor en modo desarrollo:
  ```sh
  npm run dev
  ```
- Accede a [http://localhost:8080](http://localhost:8080)

## Scripts útiles

- Generar hash de contraseña:
  ```sh
  node hash.js
  ```

## Endpoints principales

- `/api/products` - Gestión de productos
- `/api/carts` - Gestión de carritos
- `/api/users` - Gestión de usuarios
- `/api/tickets` - Gestión de tickets
- `/api/auth` - Autenticación

## Requisitos

- Node.js >= 18
- MongoDB Atlas

## Licencia

MIT
