import React from "react";
import { getWeatherIcon } from '../ForecastTiles';

const DetailedInfo = ({ data, city }) => {

    const firstItem = data[0];
    const getHour = time => time ? new Date(time).getHours() : new Date().getHours();
    const getDate = date => date ? new Date(date).getDate() : new Date().getDate();

    const displayMoreInfo = (item, i) => {
        return (
            <div className="hourly-info" key={i}>
                <div className="hour-temperature">
                    {`${Math.round(item.main.temp)}°C`}
                </div>
                <div className="hour-cloud-picture">
                    <img src={getWeatherIcon(data)} />
                </div>
                <div className="hour-of-the-day">
                    {`${getHour(item.dt * 1000)}:00`}
                </div>
            </div>
        );
    };

    return (
        <div className="detailed-info">
            
            <div className="icon">
                <img src={getWeatherIcon(data)} />
            </div>

            <div className="city-info">
                <div className="temp">
                    <span className="main">
                        {`${Math.round(firstItem.main.temp)}`}
                        <span className="sub"> °C 
                            <span className="minmax">
                            {`${Math.round(firstItem.main.temp_max)}°C`}&nbsp; | &nbsp;{`${Math.round(firstItem.main.temp_min)}°C`}
                            </span> 
                        </span>
                    </span>
                </div>
                <h4 className="city-name">{`${city.name}, ${city.country}`}</h4>
            </div>

            <div className="hourly">
                {data.map((item, i) => (
                    (getHour(item.dt * 1000) > getHour() && getDate(item.dt * 1000) === getDate()) ? (
                    displayMoreInfo(item, i)
                    ) : getHour(item.dt * 1000) >= 5 && getHour(item.dt * 1000) <= 23 ? (
                        displayMoreInfo(item, i)
                    ) : null
                ))}
            </div>
        </div>
    );
};

export default DetailedInfo;
