# 🐾 API de Prueba Técnica - Gestión de Razas de Gatos

Este proyecto es una API RESTful construida con **Node.js**, **Express**, **MongoDB** y **TypeScript**, diseñada para gestionar usuarios y razas de gatos. Incluye autenticación JWT, pruebas con Jest y configuración con Docker.

---

## 🚀 Tecnologías

- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT para autenticación
- Jest + Supertest para testing
- Docker + Docker Compose
- Dotenv para variables de entorno

---

## 📦 Instalación

### ✅ Requisitos previos

- Node.js (v18+)
- Docker y Docker Compose
- MongoDB (local o Docker)

### 🧪 Clonar el repositorio

```
bash
```
git clone https://github.com/tu-usuario/nombre-repo.git
cd nombre-repo

## npm install

1. Instalar paquetes necesarios.

```
npm install
```


2. Clonar el archivo `.env.template` y renombrarlo a `.env`.

3. Cambiar las variables de entorno.

4. Levantar la base de datos.

```
docker-compose up -d o docker-compose up --build -d si hay cambios en el dockerfile
```

5. Levantar el modo desarollo.

```
npm run dev
```