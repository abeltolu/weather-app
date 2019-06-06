import React from "react";
import { getWeatherIcon } from '../ForecastTiles';

const DetailedInfo = ({ data, city }) => {

    const firstItem = data[0];
    const getHour = time => time ? new Date(time).getHours() : new Date().getHours();
    const getDate = date => date ? new Date(date).getDate() : new Date().getDate();

    const displayForecastInfo = (item, i) => {
        return (
            <div className="forecast__hourly__info" key={i}>
                <div className="hour__temperature">
                    {`${Math.round(item.main.temp)}°C`}
                </div>
                <div className="hour__cloud__picture">
                    <img src={getWeatherIcon(data)} />
                </div>
                <div className="hour__of__the__day">
                    {`${getHour(item.dt * 1000)}:00`}
                </div>
            </div>
        );
    };

    return (
        <div className="detailed__forecast__info">
            
            <div className="icon">
                <img src={getWeatherIcon(data)} />
            </div>

            {
                /** Display first item in the array as the detailed view */
            }
            <div className="city-info">
                <div className="temp">
                    <span className="main">
                        {`${Math.round(firstItem.main.temp)}`}
                        <span className="sub"> 
                            °C 
                            <span className="minmax">
                            {`${Math.round(firstItem.main.temp_max)}°C`}&nbsp; | &nbsp;{`${Math.round(firstItem.main.temp_min)}°C`}
                            </span> 
                        </span>
                    </span>
                </div>
                <h4 className="city-name">{`${city.name}, ${city.country}`}</h4>
            </div>

            {
                /**
                 * For each data/forecast, check if the time/hour and date is greater than present/now.
                 * If true, display its info using displayForecastInfo()
                 * else, 
                 * If time/hour is >= 5AM and <= 11PM, displayinfo(), else, null
                 */
            }
            <div className="forecast__hourly__view">
                {
                    data.map((item, i) => (
                        ( getHour(item.dt * 1000) > getHour() && getDate(item.dt * 1000) === getDate() ) ? 
                        ( displayForecastInfo(item, i) ) 
                        : 
                        (
                            getHour(item.dt * 1000) >= 5 && getHour(item.dt * 1000) <= 23 ? 
                            ( displayForecastInfo(item, i) ) : null
                        )
                    ))
                }
            </div>
        </div>
    );
};

export default DetailedInfo;
