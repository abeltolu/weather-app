import React from "react";
import renderer from 'react-test-renderer';
import { render, mount, shallow } from "enzyme";

import App from "../src/components/App/app";

describe("<App />", () => {
    
    it("should render snapshot", () => {
        const wrapper = shallow(<App />);
        expect(wrapper).toMatchSnapshot();
    });

    it("header should contain *Weather App*", () => {
        const wrapper = shallow(<App />);
        const header = wrapper.find('.weather__app__main');
        expect(header.text()).toContain('Weather');
    });

    it("should receive status prop", () => {
        const wrapper = shallow(<App />);
        expect(wrapper.prop('status')).toBeUndefined();
    });

    it("should return city not found", () => {
        const wrapper = shallow(<App status="failed" />);
        const errorContainer = wrapper.find('.error__msg');
        expect(errorContainer.text()).toEqual('City not found');
    });
});