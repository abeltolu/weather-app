import React, { Component } from "react";

import { ForecastTiles } from '../ForecastTiles';

const WeatherForecast = ({ forecast }) => {

    const { list, city } = forecast;
  
    return (
        <div className="weather__app__container">
            <ForecastTiles forecasts={list} city={city} />
        </div>
    );
};

export default WeatherForecast;