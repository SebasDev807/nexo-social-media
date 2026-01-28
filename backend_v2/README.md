# Nexo – Backend

Nexo es una **red social moderna** enfocada en la interacción entre usuarios mediante publicaciones, comentarios, respuestas, likes y sistema de seguidores. Este repositorio contiene el **backend** del proyecto, construido con una arquitectura escalable, tipada y mantenible.

El objetivo principal del backend es proveer una API robusta, segura y fácil de extender, pensada para crecer junto con el producto.

---

## 🚀 Stack Tecnológico

* **Framework:** NestJS
* **Lenguaje:** TypeScript
* **Base de datos:** PostgreSQL
* **ORM:** Prisma ORM
* **Autenticación:** JWT (Bearer Token)
* **Validaciones:** class-validator / class-transformer
* **Testing de API:** Postman

---

## 📐 Arquitectura

El proyecto sigue la arquitectura recomendada por NestJS:

* **Modules:** Separación por dominio (auth, users, posts, etc.)
* **Controllers:** Manejo de HTTP requests
* **Services:** Lógica de negocio
* **Guards:** Autenticación y autorización
* **DTOs:** Validación y tipado de datos de entrada
* **Prisma:** Acceso a base de datos desacoplado de los controllers

---

## 🧠 Modelo de Dominio (Resumen)

El sistema incluye:

* Usuarios
* Publicaciones
* Comentarios
* Respuestas a comentarios
* Likes (posts, comentarios y respuestas)
* Sistema de seguidores (follow / unfollow)

Todas las relaciones están normalizadas y protegidas con claves únicas para evitar duplicados.

---

## ⚙️ Requisitos Previos

Antes de iniciar, asegúrate de tener instalado:

* Node.js >= 18
* PostgreSQL
* pnpm
* Nest CLI

---

## 🛠️ Instalación

1. Clona el repositorio:

```bash
git clone <repo-url>
cd nexo-backend
```

2. Instala Nest CLI:

```bash
npm install -g @nestjs/cli
```
3. Instala dependencias:

```bash
pnpm install
```

4. Instala pnpm globalmente:

```bash
npm i -g pnpm
```

5. Configura las variables de entorno:
>
Renombra `.env.template` a `.env` en la raíz del proyecto y completa las variables de entorno:
>
```env>
DATABASE_URL=your_postgres_database_url_here
PORT=3000
JWT_SECRET=ultra_secret_key_for_jwt_token_generation
```

6. Genera el cliente de Prisma:

```bash
pnpx prisma generate
```

7. Ejecuta las migraciones:

```bash
pnpx prisma migrate dev
```

8. Inicia el servidor:

```bash
pnpm start:dev
```

El servidor estará disponible en:

```
http://localhost:3000
```

---

## 🧪 Testing con Postman o Insomnia

Se recomienda probar **todos los endpoints desde Postman** antes de conectar un frontend.

* Autenticación mediante header:

```
Authorization: Bearer <token>
```

* Validar respuestas de error (401, 403, 400)
* No depender del frontend para depurar lógica

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para hacerlo correctamente:

1. Crea una rama desde `develop`:

```bash
git checkout -b feature/nombre-feature
```

2. Sigue las convenciones de NestJS
3. No agregues lógica de negocio en los controllers
4. Asegúrate de validar DTOs
5. Escribe commits claros y descriptivos

Ejemplo de commit:

```
feat(posts): add create and list posts endpoints
```

---

## 📌 Convenciones Importantes

* No acceder a Prisma directamente desde controllers
* No exponer endpoints sin Guards
* Mantener los módulos pequeños y cohesionados
* Priorizar legibilidad sobre soluciones "ingeniosas"

---

## 📄 Licencia

Este proyecto se encuentra bajo licencia MIT.

---

## ✨ Estado del Proyecto

El backend de **Nexo** se encuentra en desarrollo activo y está diseñado para escalar tanto en funcionalidades como en carga de usuarios.

---

## Enlaces a documentacion oficial
- [NestJS Docs](https://docs.nestjs.com)
- [Prisma Docs](https://www.prisma.io/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

**Nexo** – conecta ideas, personas y conversaciones.


