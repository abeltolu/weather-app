import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {
    InputContainer,
    Input,
    Button
} from '../../App/common';

export default class CityInput extends React.Component {

    constructor(){
        super();
    }

    componentDidMount(){
    }

    render() {
        const { city, handleCityChange } = this.props;
    
        return (
            <Fragment>
                <InputContainer>

                    <Input 
                        name="city" 
                        placeholder="Enter your City"
                        ref={input => {
                            this.cityInput = input;
                            return this.cityInput;
                        }} />

                    <Button onClick={(e) => {
                        const city = this.cityInput.value;
                        city.length > 0 && handleCityChange(city);
                    }}>Search</Button>
                </InputContainer>
            </Fragment>
        );
    }
}

CityInput.propTypes = {
    city: PropTypes.string,
    handleCityChange: PropTypes.func.isRequired,
}