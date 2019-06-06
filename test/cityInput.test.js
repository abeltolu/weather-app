import React from "react";
import renderer from 'react-test-renderer';
import { render, mount, shallow } from "enzyme";
import CityInput from "../src/components/Weather/CityInput/cityInput";

describe("<CityInput />", () => {
    
    it("should render snapshot", () => {
        const wrapper = shallow(<CityInput handleCityChange={e => console.log(e)} />);
        expect(wrapper).toMatchSnapshot();
    });
});