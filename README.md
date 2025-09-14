# AI Image Analyzer

Este proyecto es una aplicación web full-stack que permite a los usuarios subir una imagen y recibir un análisis detallado de su contenido, generado por el modelo de inteligencia artificial Gemini de Google.

---

## Tabla de Contenidos

- [Visión General del Proyecto](#-visión-general-del-proyecto)
- [Características](#-características)
- [Stack Tecnológico](#️-stack-tecnológico)
- [Cómo Empezar](#-cómo-empezar)
  - [Prerrequisitos](#prerrequisitos)
  - [Instalación](#instalación)
- [Ejecutar las Pruebas](#-ejecutar-las-pruebas)
- [Estructura del Proyecto](#-estructura-del-proyecto)

---

## Visión General del Proyecto

La aplicación consta de dos componentes principales orquestados con Docker:

1.  **Frontend:** Una interfaz de usuario moderna construida con React (y TypeScript) que permite seleccionar una imagen, previsualizarla y mostrar los resultados del análisis de forma clara y ordenada.
2.  **Backend:** Un servidor Node.js (Express) que expone una API para recibir la imagen. Este servidor se encarga de comunicarse de forma segura con la API de Gemini, procesar la respuesta y devolverla al frontend.

El objetivo es demostrar una arquitectura desacoplada, el manejo seguro de credenciales y la integración con servicios de IA de vanguardia.

---

## Características

- **Subida y Previsualización de Imágenes:** Interfaz intuitiva para seleccionar y ver la imagen a analizar.
- **Análisis con IA:** Integración con el modelo **Gemini 1.5 Flash** para un análisis rápido y preciso.
- **Visualización de Resultados:** Muestra las etiquetas identificadas junto con su porcentaje de confianza en una interfaz limpia.
- **Resultados Ordenados:** El backend ordena automáticamente los resultados por nivel de confianza antes de mostrarlos.
- **Manejo de Estados:** Feedback visual para el usuario durante los estados de carga y error.
- **Contenerización Completa:** Toda la aplicación (frontend y backend) se ejecuta en contenedores Docker aislados.
- **Pruebas Unitarias:** El backend cuenta con un conjunto de pruebas (Jest y Supertest) para garantizar la fiabilidad del endpoint.

---

## Stack Tecnológico

### Backend
- **Node.js**
- **Express.js**
- **Google Gemini API** (`@google/genai`)
- **Multer** (para la subida de archivos)
- **Jest & Supertest** (para pruebas)
- **Docker**

### Frontend
- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS** (para el estilizado)
- **Docker & Nginx** (para servir la aplicación en producción)

### Orquestación
- **Docker Compose**

---

## Cómo Empezar

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### Prerrequisitos

Asegúrate de tener instaladas las siguientes herramientas:
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone <URL_DE_TU_REPOSITORIO>
    cd ai-image-analyzer
    ```

2.  **Configura las variables de entorno del backend:**
    - Navega al directorio `backend`.
    - Crea un archivo llamado `.env`.
    - Añade tu clave de la API de Gemini al archivo:
      ```env
      # backend/.env
      GEMINI_API_KEY=TU_API_KEY_DE_GEMINI_AQUÍ
      ```

3.  **Construye y levanta los contenedores:**
    Desde el directorio raíz del proyecto, ejecuta:
    ```bash
    docker-compose up --build
    ```
    Este comando construirá las imágenes de Docker para el frontend y el backend y levantará ambos servicios.

4.  **Accede a la aplicación:**
    Abre tu navegador y visita [http://localhost:8080](http://localhost:8080).

---

## Ejecutar las Pruebas

El backend incluye un conjunto de pruebas para verificar la lógica del endpoint `/api/analyze`.

1.  **Navega al directorio del backend:**
    ```bash
    cd backend
    ```

2.  **Instala las dependencias (si no lo has hecho):**
    ```bash
    npm install
    ```

3.  **Ejecuta las pruebas:**
    ```bash
    npm test
    ```

---

## Estructura del Proyecto

```
ai-image-analyzer/
├── backend/
│   ├── node_modules/
│   ├── .dockerignore
│   ├── .env            # Variables de entorno (creado manualmente)
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js       # Lógica del servidor Express
│   └── server.test.js  # Pruebas unitarias y de integración
│
├── frontend/           # (Asumiendo una estructura estándar de Vite + React)
│   ├── public/
│   ├── src/
│   │   ├── components/ # Componentes reutilizables
│   │   ├── services/   # Lógica de llamada a la API
│   │   ├── types/      # Definiciones de TypeScript
│   │   ├── App.tsx     # Componente principal
│   │   └── index.css
│   ├── Dockerfile.frontend
│   ├── nginx.conf      # Configuración de Nginx para el contenedor
│   └── package.json
│
├── .gitignore
├── docker-compose.yml  # Orquestación de los servicios
└──
```
