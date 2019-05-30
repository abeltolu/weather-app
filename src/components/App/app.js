import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner'
import { Header } from './common';
import CityInput from '../Weather/CityInput/cityInputContainer';
import WeatherForecast from '../Weather/Forecast';
import './app.scss';
import './weathericons.scss';
export default class App extends React.Component {
    render() {
        const { status, forecast, isLoading } = this.props;
        return (
            <Fragment>

                <div className="weather__app__main">

                    {/** App Header */}
                    <Header className="main__header">
                        <i className="weathericons wi-day-cloudy"></i> Weather App
                    </Header>
                    
                    {/** Input Field for city */}
                    <CityInput />

                    {
                        //Check if data is loading
                        (isLoading) ?
                        (
                            <Loader type="Ball-Triangle" color="#FFFFFF" height="50" width="50" />
                        )
                        :
                        (
                            /** Check if weather forecasts data is available */
                            (status !== null && status == "failed") ? 
                            (
                                <div className="error__container">
                                    <div className="error__msg">
                                        { (forecast && forecast.message) ? forecast.message : 'City not found' }
                                    </div>
                                </div>
                            ) : (
                                status=="success" && <WeatherForecast forecast={forecast} />
                            )
                        )
                    }
                </div>
            </Fragment>
        );
    }
}

App.propTypes = {
    status: PropTypes.string,
    forecast: PropTypes.object,
    isLoading: PropTypes.bool
}