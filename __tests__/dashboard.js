import React from "react";
import { expect } from 'chai';
import { render, mount, shallow } from "enzyme";
import App from "../src/components/App/app";

describe("<App />", () => {
    it("should contain app heading", () => {
        const wrapper = mount(<App store={mockStore()} />);
        const heading = <header className="main__header"><i className="weathericons wi-day-cloudy"></i> Weather App</header>;
        expect(wrapper.contains(heading)).toEqual(true);
    });
});