import os
import io
import base64
from flask import Flask, request, render_template, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from PIL import Image
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
app.config['UPLOAD_FOLDER'] = 'uploads'

# Create uploads directory if it doesn't exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Configure Gemini API
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
if not GEMINI_API_KEY:
    print("Warning: GEMINI_API_KEY not found in environment variables")
else:
    genai.configure(api_key=GEMINI_API_KEY)

# Allowed file extensions
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'}

def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def analyze_image_with_gemini(image_path):
    """Analyze image using Google Gemini model"""
    try:
        if not GEMINI_API_KEY:
            return "Error: Gemini API key not configured"
        
        # Load the image
        img = Image.open(image_path)
        
        # Initialize the model
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        # Create the prompt for detailed image analysis
        prompt = """
        Analiza esta imagen de manera detallada y proporciona:
        
        1. **Descripción general**: ¿Qué se ve en la imagen?
        2. **Objetos y elementos**: Lista los objetos principales que puedes identificar
        3. **Colores dominantes**: Describe la paleta de colores
        4. **Composición**: Analiza la disposición y composición de los elementos
        5. **Contexto o escenario**: ¿Dónde parece estar tomada la foto?
        6. **Emociones o ambiente**: ¿Qué sensaciones transmite la imagen?
        7. **Detalles técnicos**: Aspectos como iluminación, calidad, estilo
        8. **Interpretación**: ¿Qué historia cuenta esta imagen?
        
        Por favor, proporciona un análisis completo y detallado.
        """
        
        # Generate content
        response = model.generate_content([prompt, img])
        return response.text
        
    except Exception as e:
        return f"Error al analizar la imagen: {str(e)}"

@app.route('/')
def index():
    """Render the main page"""
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    """Handle file upload and image analysis"""
    try:
        # Check if file was uploaded
        if 'file' not in request.files:
            return jsonify({'error': 'No se seleccionó ningún archivo'}), 400
        
        file = request.files['file']
        
        # Check if file was selected
        if file.filename == '':
            return jsonify({'error': 'No se seleccionó ningún archivo'}), 400
        
        # Check if file is allowed
        if not allowed_file(file.filename):
            return jsonify({'error': 'Formato de archivo no permitido. Use: PNG, JPG, JPEG, GIF, BMP, WEBP'}), 400
        
        # Save file
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Convert image to base64 for display
        with open(filepath, "rb") as img_file:
            img_base64 = base64.b64encode(img_file.read()).decode('utf-8')
        
        # Analyze image with Gemini
        analysis = analyze_image_with_gemini(filepath)
        
        # Clean up uploaded file
        os.remove(filepath)
        
        return jsonify({
            'success': True,
            'image_data': f"data:image/jpeg;base64,{img_base64}",
            'analysis': analysis
        })
        
    except Exception as e:
        return jsonify({'error': f'Error procesando la imagen: {str(e)}'}), 500

@app.route('/health')
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'OK', 'gemini_configured': bool(GEMINI_API_KEY)})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)