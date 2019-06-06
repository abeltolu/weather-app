import { connect } from 'react-redux';
import CityInput from './cityInput';

//import the actions that need to be dispatched here
import { fetchData } from '../../../actions/weather';

function mapStateToProps(state){
    return {
        city: state.weather.city
    };
}

function mapDispatchToProps(dispatch){
    return {
        handleCityChange: (city) => {
            dispatch(fetchData(city));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CityInput);