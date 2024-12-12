import os
import numpy as np
import h5py
from PIL import Image
import tensorflow as tf
import logrocket
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
import base64
from io import BytesIO
import logging
import traceback

# Initialize the Flask app
app = Flask(__name__)

# Allow requests from all Cloud Run domains
CORS(app, resources={r"/predict": {"origins": "*"}})

# Enable logging to a file for debugging
logging.basicConfig(filename='error.log', level=logging.DEBUG, 
                    format='%(asctime)s - %(levelname)s - %(message)s')

# Load the trained U-Net model
MODEL_PATH = 'best_model.keras'
try:
    model = tf.keras.models.load_model(MODEL_PATH, compile=False)
    logging.info(f"Successfully loaded model from {MODEL_PATH}")
except Exception as e:
    logging.error(f"Error loading model: {str(e)}")
    print(f"Error loading model: {str(e)}")

# Configure upload folder and max file size
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def preprocess_image(image, target_size=(128, 128)):
    image = image.resize(target_size)
    image_array = np.array(image) / 255.0

    if len(image_array.shape) == 2:  # If grayscale, convert to 6 channels
        image_array = np.repeat(np.expand_dims(image_array, axis=-1), 6, axis=-1)
    elif image_array.shape[-1] == 3:  # RGB image
        image_array = np.concatenate([image_array, image_array], axis=-1)  # Duplicate to 6 channels

    if image_array.shape[-1] > 6:
        image_array = image_array[:, :, :6]  # Take only 6 channels

    return image_array

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'file' not in request.files:
            raise Exception("No file part in request")

        file = request.files['file']
        if file.filename == '':
            raise Exception("No file selected for upload")

        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        if filename.endswith('.h5'):
            with h5py.File(file_path, 'r') as h5_file:
                image_data = h5_file['img'][0]  # Select only one image
                image = Image.fromarray(image_data[:, :, :3])  # Show only 3 channels for PIL
        else:
            image = Image.open(file_path)

        preprocessed_image = preprocess_image(image)
        logging.info(f"Preprocessed image shape: {preprocessed_image.shape}")

        # Add batch dimension before prediction
        preprocessed_image = np.expand_dims(preprocessed_image, axis=0)
        logging.info(f"Shape before prediction: {preprocessed_image.shape}")

        prediction = model.predict(preprocessed_image)
        binary_mask = (prediction > 0.25).astype(np.uint8)[0, :, :, 0]

        mask_image = Image.fromarray((binary_mask * 255).astype(np.uint8))  
        buffer = BytesIO()
        mask_image.save(buffer, format="PNG")
        mask_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')

        return jsonify({"mask": f"data:image/png;base64,{mask_base64}"}), 200

    except Exception as e:
        error_message = f"Unexpected server error: {str(e)}"
        logging.error(error_message)
        logging.error(traceback.format_exc())
        return jsonify({"error": error_message}), 500

if __name__ == '__main__':
    # Get port from environment variable or default to 8080
    port = int(os.environ.get('PORT', 8080))
    # Run the app on 0.0.0.0 to accept external connections
    app.run(host='0.0.0.0', port=port)
