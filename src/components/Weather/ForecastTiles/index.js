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

// Gets the Minimum, Maximum and Avg Humidity temperatures of the day.
export const getWeatherInfo = (data, min=[], max=[], humidity=[]) => {
    data.map(item => {
        max.push(item.main.temp_max);
        min.push(item.main.temp_min);
        humidity.push(item.main.humidity);
    });

    const minMax = {
        min: Math.round(Math.min(...min)),
        max: Math.round(Math.max(...max)),
    };

    // Gets the day's average humdity
    const avgHumdity = Math.round(humidity.reduce((curr, next) => curr + next) / humidity.length);

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

    handleDetailedInfoChange(item){
        const _this = this;
        _this.setState({detailedInfo: item})
    }

    render() {
        
        const { forecasts, city } = this.props;
        const tiles = Object.values(groupDataByDays(forecasts));

        // Edge case:
        // When the webservice returns data for 6 calendar days during evenings as a result of offset,
        // this ensures that we are showing only 5-days of forecast.
        const slicedTiles = tiles.length > 5 ? tiles.slice(0, 5) : tiles;
        const forecastTiles = slicedTiles.map((item, i) => {
            return (
                <div
                    className={`forecast-tile tile-${i}`}
                    key={i}
                    ref={`div-${i}`}
                    onClick={() => this.handleDetailedInfoChange(item)}
                >
                    <div className="primary-info">
                        <div className="date">
                            {getWeatherDayInfo(item)}
                        </div>
                        <div className="icon">
                            <img src={getWeatherIcon(item)} />
                            {getWeatherName(item)}
                        </div>
                        {getWeatherInfo(item)}
                    </div>
                </div>
            )
        })

        return (
            <Fragment>

                
                <DetailedInfo data={this.state.detailedInfo || slicedTiles[0]} city={city} />
                
                <div className="forecast-tiles">
                    {forecastTiles}
                </div>
            </Fragment>
        );
    }
}
// TODO: Add defaultProps and PropType validations
