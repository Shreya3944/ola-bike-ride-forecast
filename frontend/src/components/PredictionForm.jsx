import { useState } from "react";
import "./PredictionForm.css";

import { FaBicycle } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCloudSun } from "react-icons/fa";
import { FaTemperatureHigh } from "react-icons/fa";
import { FaWind } from "react-icons/fa";
import { FaTint } from "react-icons/fa";

import {
  FaLeaf,
  FaClock,
  FaBusinessTime,
  FaBriefcase,
  FaUmbrellaBeach
} from "react-icons/fa";

import { MdEventAvailable } from "react-icons/md";


function PredictionForm() {

  const [season, setSeason] = useState(1);
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(1);
  const [hour, setHour] = useState(8);
  const [holiday, setHoliday] = useState(0);
  const [weekday, setWeekday] = useState(0);
  
  const [workingDay, setWorkingDay] = useState(1);
  const [weather, setWeather] = useState(1);
  
  const [temperature, setTemperature] = useState(0.5);
  const [feelsLike, setFeelsLike] = useState(0.5);
  const [humidity, setHumidity] = useState(0.5);
  const [windSpeed, setWindSpeed] = useState(0.2);
  const [prediction, setPrediction] = useState(null);
  const [demandLevel, setDemandLevel] = useState("");


const handlePredict = async () => {
        const response = await fetch("https://ola-bike-ride-backend.onrender.com/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      season,
      yr: year,
      mnth: month,
      hr: hour,
      holiday,
      weekday,
      workingday: workingDay,
      weathersit: weather,
      temp: temperature,
      atemp: feelsLike,
      hum: humidity,
      windspeed: windSpeed,
    }),
  });

  const result = await response.json();

  setPrediction(result.prediction);
  if (result.prediction <= 200) {
    setDemandLevel("🔴 Low Demand");
}
else if (result.prediction <= 500) {
    setDemandLevel("🟡 Moderate Demand");
}
else {
    setDemandLevel("🟢 High Demand");
}
};

  
return (
  <div className="form-container">
    <h2>Bike Ride Prediction</h2>

    <div className="form-grid">

      {/* Left Column */}

      <div className="form-group">
        <label>
            <FaBicycle className="icon" /> Season
        </label>
        <select value={season} onChange={(e) => setSeason(Number(e.target.value))}>
          <option value={1}>Spring</option>
          <option value={2}>Summer</option>
          <option value={3}>Fall</option>
          <option value={4}>Winter</option>
        </select>
      </div>

      <div className="form-group">
        <label>
            <FaBriefcase className="icon" /> Working Day
        </label>
        <select value={workingDay} onChange={(e) => setWorkingDay(Number(e.target.value))}>
          <option value={0}>No</option>
          <option value={1}>Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label>
            <FaCalendarAlt className="icon" /> Year
        </label>
        <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
          <option value={0}>2011</option>
          <option value={1}>2012</option>
        </select>
      </div>

      <div className="form-group">
        <label>
            <FaCloudSun className="icon" /> Weather
        </label>
        <select value={weather} onChange={(e) => setWeather(Number(e.target.value))}>
          <option value={1}>Clear</option>
          <option value={2}>Mist</option>
          <option value={3}>Light Snow / Rain</option>
          <option value={4}>Heavy Rain</option>
        </select>
      </div>

      <div className="form-group">
        <label>
            <FaCalendarAlt className="icon" /> Month
        </label>
        <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
          {[...Array(12)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>
            <FaTemperatureHigh className="icon" /> Temperature : {temperature.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={temperature}
          onChange={(e) => setTemperature(Number(e.target.value))}
        />
      </div>

      <div className="form-group">
        <label>
            <FaClock className="icon" /> Hour : {hour}
        </label>
        <input
          type="range"
          min="0"
          max="23"
          value={hour}
          onChange={(e) => setHour(Number(e.target.value))}
        />
      </div>

      <div className="form-group">
        <label>
            <FaTemperatureHigh className="icon" /> Feeling Temperature : {feelsLike.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={feelsLike}
          onChange={(e) => setFeelsLike(Number(e.target.value))}  
        />
      </div>

      <div className="form-group">
        <label>
            <FaUmbrellaBeach className="icon" /> Holiday
        </label>
        <select value={holiday} onChange={(e) => setHoliday(Number(e.target.value))}>
          <option value={0}>No</option>
          <option value={1}>Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label>
            <FaTint className="icon" /> Humidity : {humidity.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={humidity}
          onChange={(e) => setHumidity(Number(e.target.value))}
        />
      </div>

      <div className="form-group">
        <label>
            <MdEventAvailable className="icon" /> Weekday
        </label>
        <select value={weekday} onChange={(e) => setWeekday(Number(e.target.value))}>
          <option value={0}>Sunday</option>
          <option value={1}>Monday</option>
          <option value={2}>Tuesday</option>
          <option value={3}>Wednesday</option>
          <option value={4}>Thursday</option>
          <option value={5}>Friday</option>
          <option value={6}>Saturday</option>
        </select>
      </div>

      <div className="form-group">
        <label>
            <FaWind className="icon" /> Wind Speed : {windSpeed.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={windSpeed}
          onChange={(e) => setWindSpeed(Number(e.target.value))}
        />
      </div>

    </div>

    <button
        className="predict-btn"
        onClick={handlePredict}
    >
        Predict Bike Demand
    </button>

    {prediction !== null && (
        <div className="prediction-result">
            <div>
                <h3>Predicted Bike Ride Requests</h3>
                <h1>{prediction}</h1>
        </div>

        <div className="demand-level">
            {demandLevel}
        </div>
    </div>
)}
  </div>
);
}

export default PredictionForm;