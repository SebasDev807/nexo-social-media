## 📚 Documentación Técnica

Esta sección resume cómo se usan **NestJS**, **PostgreSQL** y **Prisma ORM** dentro del proyecto, con el objetivo de que cualquier desarrollador pueda entender rápidamente el stack y la forma correcta de trabajar.

---

### 🧱 NestJS

NestJS es el framework principal del backend. Se utiliza por su enfoque modular, tipado fuerte y buenas prácticas por defecto.

**Principios clave usados en el proyecto:**

* Arquitectura basada en módulos
* Separación clara de responsabilidades
* Inyección de dependencias
* Uso de Guards para autenticación/autorización
* DTOs para validación de datos

**Estructura típica de un módulo:**

* `module.ts`: definición del módulo
* `controller.ts`: endpoints HTTP
* `service.ts`: lógica de negocio
* `dto/`: objetos de transferencia y validación

**Buenas prácticas obligatorias:**

* Los controllers no contienen lógica de negocio
* Los services no dependen de HTTP
* Todo endpoint protegido usa Guards
* Todas las entradas se validan con DTOs

👉 [NestJS Docs](https://docs.nestjs.com)
---

### 🗄️ PostgreSQL

PostgreSQL es la base de datos relacional del proyecto. Se eligió por su robustez, consistencia y soporte avanzado de relaciones.

**Características utilizadas:**

* Relaciones uno a muchos y muchos a muchos
* Índices y claves únicas
* Integridad referencial
* Transacciones (vía Prisma)

**Reglas importantes:**

* Nunca acceder a la base de datos fuera de Prisma
* No usar consultas raw sin una razón justificada
* Mantener las migraciones versionadas
👉 [PostgreSQL Docs](https://www.postgresql.org/docs/)
---

### 🔷 Prisma ORM

Prisma es el ORM que conecta NestJS con PostgreSQL. Actúa como la única capa de acceso a datos.

**Uso dentro del proyecto:**

* Definición del esquema en `schema.prisma`
* Generación automática del cliente
* Migraciones controladas
* Tipado fuerte en tiempo de compilación

**Flujo de trabajo con Prisma:**

1. Modificar `schema.prisma`
2. Ejecutar migración:

```bash
npx prisma migrate dev
```

3. Generar cliente:

```bash
npx prisma generate
```

**Buenas prácticas:**

* Prisma solo se usa dentro de services
* No exponer modelos directamente al exterior
* Manejar errores de Prisma explícitamente
* Usar relaciones en lugar de IDs manuales

👉 [Prisma Docs](https://www.prisma.io/docs)
---

### 🔐 Autenticación y Seguridad

* Autenticación basada en JWT
* Tokens enviados mediante header `Authorization`
* Guards controlan el acceso a endpoints protegidos
* El usuario autenticado se inyecta en la request

---

### 🧪 Testing y Desarrollo

* Postman es la herramienta principal de prueba
* Todos los endpoints deben probarse sin frontend
* Se validan respuestas correctas y de error

---

Esta documentación define **la forma oficial de trabajar el backend de Nexo**. Cualquier cambio en el stack o arquitectura debe reflejarse aquí.
