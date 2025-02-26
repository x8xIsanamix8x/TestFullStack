README

Fullstack Test

📌 Descripción

Este proyecto es una aplicación web para realizar evaluaciones 360 grados de empleados remotos en una empresa de desarrollo de software.

Incluye:

Frontend: React

Backend: Node.js + Express

Base de datos: MongoDB (usando Mongoose)

Autenticación: JWT con roles de usuario (Admin, Manager, Employee)

🚀 Tecnologías Utilizadas

Frontend: React, React Router, Context API/Redux, Axios

Backend: Node.js, Express.js, Mongoose, JWT, bcryptjs

Base de datos: MongoDB

Estilos: Material UI o Tailwind CSS

📂 Estructura del Proyecto

└── 📁frontend
    └── 📁public
        └── vite.svg
    └── 📁src
        └── 📁api
            └── frontApi.ts
        └── App.css
        └── App.tsx
        └── 📁assets
            └── 📁Home
                └── login.webp
                └── register.webp
            └── react.svg
        └── 📁components
            └── header.tsx
            └── 📁modals
                └── AddUserModal.tsx
                └── CreateEvaluationModal.tsx
                └── GenerateReportModal.tsx
                └── ManageUsersModal.tsx
                └── SendReminderModal.tsx
                └── ViewEvaluationsModal.tsx
                └── ViewTeamModal.tsx
            └── SummaryCard.tsx
        └── 📁helpers
            └── getEnvVariables.ts
        └── 📁hooks
            └── useAuthStore.ts
            └── useModal.ts
        └── index.css
        └── input.css
        └── 📁layout
            └── homeLayout.tsx
        └── main.tsx
        └── output.css
        └── 📁pages
            └── AdminDashboard.tsx
            └── Dashboard.tsx
            └── EmployeesDashboard.tsx
            └── Home.tsx
            └── MainPage.tsx
            └── ManagerDashboard.tsx
            └── NotFound.tsx
        └── router.tsx
        └── 📁services
            └── authService.ts
            └── employeesService.ts
            └── evaluationService.ts
        └── 📁store
            └── 📁auth
                └── authSlice.ts
            └── store.ts
        └── 📁types
            └── types.d.ts
        └── vite-env.d.ts
    └── .DS_Store
    └── .env
    └── .gitignore
    └── eslint.config.js
    └── index.html
    └── package-lock.json
    └── package.json
    └── README.md
    └── tsconfig.app.json
    └── tsconfig.json
    └── tsconfig.node.json
    └── vite.config.ts

    📌 Endpoints Principales (Backend)

Autenticación

POST /api/auth/register - Registrar usuario
POST /api/auth/login - Iniciar sesión (devuelve JWT)

Evaluaciones

GET /api/employees - Listar empleados
POST /api/evaluations - Crear evaluación
GET /api/evaluations/evaluationslist - Obtener todas las evaluaciones
GET /api/evaluations/:id - Obtener evaluación
PUT /api/evaluations/:id - Editar evaluación
GET /api/evaluations/employee/:id - Evaluaciones de un empleado

Reportes y Feedback

POST /api/feedback - Enviar feedback
GET /api/reports/employee/:id - Generar reporte

nstalación y Configuración

1️⃣ Clonar el Repositorio

git clone https://github.com/x8xIsanamix8x/TestFullStack.git
cd TestFullStack

2️⃣ Configurar el Backend

cd backend
npm install

Crear un archivo .env basado en .env.example y configurar:

DB_CNN="LINK_DB"
PORT="4000"
SECRET_JWT="clave-s3creta"

Ejecutar el servidor:

npm run dev

3️⃣ Configurar el Frontend

cd ../frontend
npm install

Crear un archivo .env basado en .env.example:

VITE_API_URL="http://localhost:4000"

Ejecutar el cliente:

npm run dev
