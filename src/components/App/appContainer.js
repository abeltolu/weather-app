import { connect } from 'react-redux';
import App from './app';

function mapStateToProps(state){
    return {
        forecast: state.weather.forecast,
        status: state.weather.status,
        isLoading: state.weather.isLoading
    };
}

function mapDispatchToProps(dispatch){
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);