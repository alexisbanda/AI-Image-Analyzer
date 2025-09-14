# AI Image Analyzer 🤖📷

Una aplicación web full-stack que permite a los usuarios subir imágenes y recibir un análisis detallado de su contenido, generado por el modelo de inteligencia artificial Gemini de Google.

## 🌟 Características

- **Análisis de imágenes con IA**: Utiliza el modelo Gemini de Google para proporcionar análisis detallados
- **Interfaz web intuitiva**: Diseño moderno y responsivo con funcionalidad de arrastrar y soltar
- **Múltiples formatos**: Soporte para PNG, JPG, JPEG, GIF, BMP, y WEBP
- **Análisis completo**: Descripción, objetos, colores, composición, contexto, emociones y más
- **Seguridad**: Validación de archivos y manejo seguro de uploads

## 🚀 Instalación y Configuración

### Prerrequisitos

- Python 3.8 o superior
- Clave API de Google Gemini

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/alexisbanda/AI-Image-Analyzer.git
   cd AI-Image-Analyzer
   ```

2. **Crear entorno virtual**
   ```bash
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   ```

3. **Instalar dependencias**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   
   Edita el archivo `.env` y agrega tu clave API de Gemini:
   ```
   GEMINI_API_KEY=tu_clave_api_aqui
   ```

5. **Ejecutar la aplicación**
   ```bash
   python app.py
   ```

6. **Abrir en el navegador**
   Visita `http://localhost:5000`

## 🔑 Obtener clave API de Google Gemini

1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Inicia sesión con tu cuenta de Google
3. Crea una nueva clave API
4. Copia la clave y pégala en tu archivo `.env`

## 🎯 Uso

1. **Subir imagen**: Haz clic en el área de carga o arrastra una imagen
2. **Analizar**: Presiona el botón "Analizar Imagen"
3. **Ver resultados**: El análisis detallado aparecerá junto a la imagen

### Tipos de análisis incluidos:

- **Descripción general**: Qué se ve en la imagen
- **Objetos y elementos**: Lista de objetos identificados
- **Colores dominantes**: Paleta de colores principal
- **Composición**: Disposición y estructura visual
- **Contexto**: Escenario y ubicación estimada
- **Emociones**: Sensaciones que transmite la imagen
- **Aspectos técnicos**: Iluminación, calidad, estilo
- **Interpretación**: Historia que cuenta la imagen

## 🏗️ Estructura del Proyecto

```
AI-Image-Analyzer/
├── app.py                 # Aplicación Flask principal
├── requirements.txt       # Dependencias de Python
├── .env.example          # Plantilla de variables de entorno
├── .gitignore           # Archivos ignorados por Git
├── README.md            # Documentación
└── templates/
    └── index.html       # Interfaz de usuario
```

## 🛠️ Stack Tecnológico

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript
- **IA**: Google Gemini AI
- **Procesamiento de imágenes**: Pillow (PIL)
- **Manejo de archivos**: Werkzeug

## 🔒 Seguridad

- Validación de tipos de archivo
- Límite de tamaño de archivo (16MB)
- Sanitización de nombres de archivo
- Limpieza automática de archivos temporales

## 🚦 Estado de la aplicación

Puedes verificar el estado de la aplicación visitando `/health`:

```json
{
  "status": "OK",
  "gemini_configured": true
}
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Solución de problemas

### Error: "Gemini API key not configured"
- Verifica que el archivo `.env` existe y contiene `GEMINI_API_KEY`
- Asegúrate de que la clave API es válida

### Error: "Formato de archivo no permitido"
- Solo se permiten imágenes: PNG, JPG, JPEG, GIF, BMP, WEBP
- Verifica que el archivo no esté corrupto

### Error de conexión
- Verifica tu conexión a internet
- Comprueba que la API de Gemini esté disponible

## 📞 Soporte

Si tienes problemas o preguntas, por favor abre un issue en GitHub.

---

Desarrollado con ❤️ por [Alexis Banda](https://github.com/alexisbanda)