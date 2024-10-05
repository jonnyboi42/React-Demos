import React from 'react';
import { useQuery } from 'react-query';
import weatherConfig from '../../config/weatherConfig';
import getWeatherIcon from './WeatherIconLogic';
import WindIcon from './icons/wind.svg';
import Temperature from './icons/temperature.svg';
import axios from 'axios';


const fetchWeather = async () => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${weatherConfig.location}&appid=${weatherConfig.apiKey}`);
        const data = response.data;
        console.log(data);

        if(!data || !data.weather || !data.weather[0]){
            throw new Error('Incomplete weather data');
        }

        return data;

  
    } catch (error) {
        console.log('Error Fetching Data', error);
        throw new Error('Error Fetching Data'); // Trigger error state
    }
};

const WeatherAPI = () => {
    // Run the useQuery Hook
    const { data, error, isLoading } = useQuery({ queryKey: ['weatherkey'], queryFn: fetchWeather });
  
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
  
    // Extract weather description
    const weatherDescription = data.weather[0].main; // e.g., 'Clouds', 'Clear', etc.
    
    // Get the correct icon based on the weather description
    const WeatherIcon = getWeatherIcon(weatherDescription);
  
    return (
      <div className="weather-container-content">
        <div className="weather-content">
          <h1>Weather</h1>
          <div className="weather-location">
            <svg stroke="currentColor" fill="black" stroke-width="0" viewBox="0 0 512 512" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M253.47 17.406C123.76 17.406 18.437 122.76 18.437 252.47c0 129.707 105.324 235.06 235.03 235.06 129.707 0 235.063-105.353 235.063-235.06 0-129.71-105.355-235.064-235.06-235.064zM367.874 68.75c61.246 38.19 101.97 106.14 101.97 183.72 0 17.143-1.993 33.823-5.75 49.81l-34.25-18.06 22 54.874c-9.454 21.647-22.362 41.432-38 58.687l-43.158-30.936-64.625 47.72-61.656 6.967-13.906-41.78-49.72 26.844-68.093-18.938 9.157 36.594c-28.41-21.793-51.23-50.466-66-83.563L81.25 304.47l32.25 17.124 59.22-9.875 2.843-40.908-37.344-1.718 4.905-17.844 30.78-25.313-25.093-15.625 67.22-38.593-45.345-29.657-66.625 40.187-49.437-15.28c13.812-32.14 35.21-60.22 61.906-82.064l-3.75 44.375 43.376-34.124 72 22.22-22.5-27.407L233 75.562l26.813 28.468 71 9.845-3.5-34.47 41.468 12.657-.905-23.312zm1.156 120.03L278 199.47l28.906 43.218 3.156 64.468L339.25 321l11.438-28.375 62.656 48.656L395.78 294l6.408-48.344-43.75-22.72 10.593-34.155zM221 192.438l-31.594 21.188 36.47 14.78 16.686-14.78L221 192.437zm22.188 144.688l18.687 52.594 19.78-42.564-38.467-10.03z"></path></svg>
            <p>{weatherConfig.location.charAt(0).toUpperCase() + weatherConfig.location.slice(1)}</p>
          </div>
          
          <div className="temperature-description">
            <img src={Temperature} />
            <p>{((data.main.temp - 273.15) * 9/5 + 32).toFixed(2)}°F</p>
          </div>
         
          <div className="weather-description">
            <img src={WeatherIcon} alt={weatherDescription} />
            <p>{data.weather[0].description}</p>
            
          </div>
          <div className="wind-description">
            <p><img src={WindIcon} /></p>
            <p>{data.wind.speed}km/hr</p> 
          </div>
          
        </div>
      </div>
    );
  };
  

export default WeatherAPI;