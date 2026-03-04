
---

# 📁 README – BACKEND (Node + Express + PostgreSQL)

```markdown
# 🧠 Decision App – Backend API

API REST desarrollada con Node.js y Express que permite gestionar usuarios, decisiones y factores evaluables.

Incluye autenticación segura con JWT y base de datos PostgreSQL en la nube.

---

## 🌍 API en producción

👉 https://decision-app-backend-wgq0.onrender.com

---

## 🚀 Funcionalidades

- Registro de usuarios
- Login con autenticación JWT
- Encriptación de contraseñas con bcrypt
- Middleware de protección de rutas
- CRUD de decisiones
- CRUD de factores asociados a decisiones
- Relación entre tablas con claves foráneas

---

## 🛠 Tecnologías utilizadas

- Node.js
- Express
- PostgreSQL
- JWT (jsonwebtoken)
- bcrypt
- CORS
- dotenv
- Render (Deploy)

---

## 🗄 Base de Datos

Estructura principal:

### Users
- id (PK)
- email
- password (hashed)

### Decisions
- id (PK)
- title
- user_id (FK)

### Factors
- id (PK)
- description
- value
- decision_id (FK)

Relaciones:
- Un usuario puede tener múltiples decisiones
- Una decisión puede tener múltiples factores

---

## 🔐 Seguridad

- Passwords hasheados con bcrypt
- Tokens JWT con expiración
- Middleware de verificación de token
- Variables de entorno para credenciales sensibles

---

## 📦 Instalación local

```bash
git clone https://github.com/Fraank-00/decision-app-backend
cd decision-app-backend
npm install

## Crear archivo .env:

```bash
DATABASE_URL=tu_url_de_postgres
JWT_SECRET=tu_clave_secreta
PORT=3000

##Ejecutar:


```bash
npm start
