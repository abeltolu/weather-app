import React, { Component, Fragment } from "react";
import DetailedInfo from '../DetailedInfo';

// Filters the data by date and returns an Object containing a list of 5-day forecast.
export const groupDataByDays = data => {
    return (data.reduce((list, item) => {
        const forecastDate = item.dt_txt.substr(0,10);
        list[forecastDate] = list[forecastDate] || [];
        list[forecastDate].push(item);

        return list;
    }, {}));
};

// Returns week of the day
export const getWeatherDayInfo = data => {
    const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return daysOfWeek[new Date(data[0].dt * 1000).getDay()];
};

// Fetches the icon using the icon code available in the forecast data.
export const getWeatherIcon = data => `https://openweathermap.org/img/w/${data[0].weather[0].icon}.png`;

//get weather name
export const getWeatherName = data => data[0].weather[0].main;

// Gets the Minimum and Maximum temperatures of the day.
export const getWeatherInfo = (data, min=[], max=[]) => {
    data.map(item => {
        max.push(item.main.temp_max);
        min.push(item.main.temp_min);
    });

    const minMax = {
        min: Math.round(Math.min(...min)),
        max: Math.round(Math.max(...max)),
    };

    return (
        <Fragment>
            <div className="min-max">
                <strong>{`${minMax.max}°C`}</strong>
            </div>
            <div className="min-max">
                {`${minMax.min}°C`}
            </div>
        </Fragment>
    );
};

export class ForecastTiles extends Component {

    constructor(props) {
        super(props);

        //set first item in forecasts as 
        this.state = {
            detailedInfo: null
        }
    }

    /** Handle detailed info change -  This controls what data displays on the Single Top Page*/
    handleDetailedInfoChange(item){
        this.setState({detailedInfo: item})
    }

    render() {
        
        const { forecasts, city } = this.props;
        const tiles = Object.values(groupDataByDays(forecasts));

        /*
            Note:
            The OpenWeather API might return more than 5 calendar days. In order to limit the results to just 5-days, we slice the forecast data
        */
        const slicedTiles = tiles.length > 5 ? tiles.slice(0, 5) : tiles;
        const forecastTiles = slicedTiles.map((item, i) => {
            return (
                <div
                    className={`forecast__tile`}
                    key={i}
                    onClick={() => this.handleDetailedInfoChange(item)}
                >
                    <div className="tile__main__info">
                        <div className="date">
                            {getWeatherDayInfo(item)}
                        </div>
                        
                        <div className="icon">
                            <img src={getWeatherIcon(item)} />
                            {getWeatherName(item)}
                        </div>

                        { getWeatherInfo(item) }
                    </div>
                </div>
            )
        })

        return (
            <Fragment>

                
                <DetailedInfo data={this.state.detailedInfo || slicedTiles[0]} city={city} />
                
                <div className="weather__forecast__tiles">
                    {forecastTiles}
                </div>
            </Fragment>
        );
    }
}
