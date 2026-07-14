from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)

# Load the trained model
model = joblib.load("models/bike_demand_model.pkl")

'''@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    features = pd.DataFrame({
        "season": [data["season"]],
        "yr": [data["yr"]],
        "mnth": [data["mnth"]],
        "hr": [data["hr"]],
        "holiday": [data["holiday"]],
        "weekday": [data["weekday"]],
        "workingday": [data["workingday"]],
        "weathersit": [data["weathersit"]],
        "temp": [data["temp"]],
        "atemp": [data["atemp"]],
        "hum": [data["hum"]],
        "windspeed": [data["windspeed"]]
    })

    prediction = model.predict(features)

    return jsonify({
        "prediction": int(prediction[0])
    })'''

@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()
    print("Received Data:", data)

    features = pd.DataFrame({
        "season": [data["season"]],
        "yr": [data["yr"]],
        "mnth": [data["mnth"]],
        "hr": [data["hr"]],
        "holiday": [data["holiday"]],
        "weekday": [data["weekday"]],
        "workingday": [data["workingday"]],
        "weathersit": [data["weathersit"]],
        "temp": [data["temp"]],
        "atemp": [data["atemp"]],
        "hum": [data["hum"]],
        "windspeed": [data["windspeed"]]
    })

    print(features)

    prediction = model.predict(features)

    print("Prediction:", prediction)

    return jsonify({
        "prediction": int(prediction[0])
    })

if __name__ == "__main__":
    app.run(debug=True)