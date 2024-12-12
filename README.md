# CS462-Deforestation-Detection
# Overview
The Landslide Detection System is a cloud-based platform designed to identify and monitor potential landslide-prone areas using advanced machine learning models. The system integrates a backend powered by AI, a frontend interface for user interaction, and cloud infrastructure for seamless deployment, monitoring, and feedback.
This project is developed as part of the CS462: Cloud Computing course to demonstrate end-to-end application development using DevOps principles.

# Features
- Machine Learning-Based Detection: Utilizes trained models to predict landslide risks based on environmental data.
- Continuous Feedback: Collects user and system feedback for iterative improvements.
- Cloud Deployment: Fully hosted on Google Cloud Run for scalability and reliability.

# Technologies Used
- Frontend: React, 
- Backend: Python, Flask, TensorFlow
- Machine Learning: Trained models in .h5 format
- DevOps Tools: Docker, GitHub Actions, PyTest, Prometheus, Grafana
- Cloud Platform: Google Cloud Run
- Monitoring & Feedback: LogRocket, Grafana

# How It Works
Data Collection: Environmental data (e.g., rainfall, soil moisture, terrain features) is fed into the system.
Model Prediction: The AI model processes the data and predicts the likelihood of landslides.
Result Visualization: Predictions are displayed on an interactive web dashboard.
System Monitoring: Continuous monitoring ensures system reliability, tracks user actions, and logs errors.

# Project Architecture
![WhatsApp Image 2024-12-11 at 22 05 29_c5291521](https://github.com/user-attachments/assets/2e9087b5-0c8f-4097-b913-af2a30fd927e)

# Continuous Development-Trello
![WhatsApp Image 2024-12-11 at 20 36 23_ee25f371](https://github.com/user-attachments/assets/307326b3-8d60-4f65-87d0-11503290075b)

![WhatsApp Image 2024-12-11 at 20 37 05_b0d1746a](https://github.com/user-attachments/assets/f0998960-a815-4a0e-aa69-f49385458f74)

# Continuous Integration, Deployment and Testing
We created a .yml file that used Github Actions for integration, Docker for containerization and pytest for testing. The workflow is triggered when a file is pushed to "main"
![WhatsApp Image 2024-12-12 at 06 57 16_7d94068d](https://github.com/user-attachments/assets/1d105bf4-63d4-4cab-a979-ca2340ab113f)
![WhatsApp Image 2024-12-12 at 06 57 46_74e892bc](https://github.com/user-attachments/assets/ccec2ec3-cac6-4124-9cd6-7e1e5d64e4bc)
![WhatsApp Image 2024-12-12 at 07 44 00_f5c44d47](https://github.com/user-attachments/assets/fbba0260-26c3-4b7f-8eb8-51132ea078d5)

# Continuous Monitoring

![WhatsApp Image 2024-12-12 at 11 07 05_fbb3e617](https://github.com/user-attachments/assets/6b353b70-6d22-4339-825f-04cff846b3dd)
![WhatsApp Image 2024-12-12 at 11 07 25_0ecea6e7](https://github.com/user-attachments/assets/cc7dc935-4b3c-4c91-ab12-c44f7b90e396)




# Continuous Feedback
![WhatsApp Image 2024-12-12 at 11 34 13_4b408464](https://github.com/user-attachments/assets/dd127171-2e86-4a6f-a1a9-66c49890c8c1)








