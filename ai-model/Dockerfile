FROM python:3.9-slim
WORKDIR /app
COPY best_model.keras .
RUN pip install tensorflow
CMD ["python", "-c", "import tensorflow as tf; model = tf.keras.models.load_model('best_model.keras')"]
