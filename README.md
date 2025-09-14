# AI Image Analyzer

Este proyecto es una aplicación web full-stack que permite a los usuarios subir una imagen y recibir un análisis detallado de su contenido, generado por el modelo de inteligencia artificial Gemini de Google.

---

## Tabla de Contenidos

- [Visión General del Proyecto](#-visión-general-del-proyecto)
- [Características](#-características)
- [Stack Tecnológico](#️-stack-tecnológico)
- [Cómo Empezar](#-cómo-empezar)
- [Flujo de Desarrollo y Ramas](#-flujo-de-desarrollo-y-ramas)
- [Ejecutar las Pruebas](#-ejecutar-las-pruebas)
- [Estructura del Proyecto](#-estructura-del-proyecto)

---

## Visión General del Proyecto

La aplicación consta de dos componentes principales orquestados con Docker:

1.  **Frontend:** Una interfaz de usuario moderna construida con React (v18) y TypeScript que permite seleccionar una imagen, previsualizarla y mostrar los resultados del análisis de forma clara y ordenada.
2.  **Backend:** Un servidor Node.js (v20) con Express que expone una API para recibir la imagen. Este servidor se encarga de comunicarse de forma segura con la API de Gemini, procesar la respuesta y devolverla al frontend.

El objetivo es demostrar una arquitectura desacoplada, el manejo seguro de credenciales y la integración con servicios de IA de vanguardia.

---

## Características

- **Subida y Previsualización de Imágenes:** Interfaz intuitiva para seleccionar y ver la imagen a analizar.
- **Análisis con IA:** Integración con el modelo **Gemini 1.5 Flash** para un análisis rápido y preciso.
- **Visualización de Resultados:** Muestra las etiquetas identificadas junto con su porcentaje de confianza.
- **Resultados Ordenados:** El backend ordena automáticamente los resultados por nivel de confianza.
- **Manejo de Estados:** Feedback visual para el usuario durante los estados de carga y error.
- **Contenerización Completa:** Toda la aplicación se ejecuta en contenedores Docker aislados.
- **Pruebas Unitarias:** El backend cuenta con un conjunto de pruebas (Jest y Supertest) para garantizar la fiabilidad del endpoint.

---

## Stack Tecnológico

### Backend
- **Node.js** (v20)
- **Express.js**
- **Google Gemini API** (`@google/genai`)
- **Multer** (para la subida de archivos)
- **Jest & Supertest** (para pruebas)
- **Docker**

### Frontend
- **React** (v18)
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

### Instalación y Ejecución

1.  **Clona el repositorio:**
    ```bash
    git clone git@github.com:alexisbanda/AI-Image-Analyzer.git
    cd AI-Image-Analyzer
    ```

2.  **Configura las Variables de Entorno (API Key):**
    Este es el paso más importante para que la aplicación funcione.
    - Crea un archivo llamado `.env` en esta ubicación.
    - Añade tu clave de la API de Gemini al archivo de la siguiente manera:
      ```env
      # Ubicación: /.env
      GEMINI_API_KEY=TU_API_KEY_DE_GEMINI_AQUÍ
      ```
3.  **Construye y Levanta los Contenedores:**
    Desde el **directorio raíz** del proyecto, ejecuta el siguiente comando:
    ```bash
    docker-compose up --build
    ```
    Este comando construirá las imágenes de Docker para el frontend y el backend, instalará todas las dependencias (npm install) dentro de los contenedores y levantará ambos servicios.

4.  **Accede a la aplicación:**
    Una vez que los contenedores estén en funcionamiento, abre tu navegador y visita:
    [http://localhost:8080](http://localhost:8080)

---

## Flujo de Desarrollo y Ramas

Siguiendo las buenas prácticas, el proyecto utiliza la siguiente estrategia de ramas:

-   **`main`**: Contiene únicamente el código de producción, estable y listo para ser desplegado. Solo se fusiona a `main` a través de Pull Requests desde la rama `develop`.
-   **`develop`**: Es la rama principal de desarrollo. Integra todas las nuevas características y correcciones.
-   **Ramas de funcionalidad (`feature/...`)**: Para cualquier nueva funcionalidad, se debe crear una nueva rama a partir de `develop`. Una vez completada, se fusiona de nuevo a `develop` mediante un Pull Request.

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
AI-Image-Analyzer/
├── backend/
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js       # Lógica del servidor Express
│   └── server.test.js  # Pruebas unitarias y de integración
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/ # Componentes reutilizables
│   │   ├── services/   # Lógica de llamada a la API
│   │   ├── types/      # Definiciones de TypeScript
│   │   ├── App.tsx     # Componente principal
│   │   └── ...
│   ├── Dockerfile.frontend
│   ├── nginx.conf      # Configuración de Nginx para el contenedor
│   └── package.json
│
├── .gitignore
├── .env                # Variables de entorno (creado manualmente)
├── docker-compose.yml  # Orquestación de los servicios
└── README.md
```
