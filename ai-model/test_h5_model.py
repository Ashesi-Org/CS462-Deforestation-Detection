import tensorflow as tf
import numpy as np

def test_model():
    # Load your actual .h5 model
    model = tf.keras.models.load_model('ai-model/best_model.h5')

    # Create dummy input data
    # Update the shape (e.g., (1, 5)) to match the input dimensions of your model
    input_shape = model.input_shape[1:]  # Get input shape from the model
    dummy_input = np.random.rand(1, *input_shape)  # Create dummy input with the correct shape

    # Predict with the model
    prediction = model.predict(dummy_input)

    # Validate the output
    # Check if the output shape matches the expected shape
    output_shape = model.output_shape[1:]  # Get output shape from the model
    assert prediction.shape[1:] == output_shape, f"Expected output shape {output_shape}, but got {prediction.shape[1:]}"

    # Check if the prediction contains valid values
    # For example, if it's a classification model, outputs should be probabilities
    assert np.all(prediction >= 0) and np.all(prediction <= 1), "Predicted values are not valid probabilities."

    print("Model test passed!")

if __name__ == "__main__":
    test_model()
