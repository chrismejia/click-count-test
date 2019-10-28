import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial state for setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @function findByTestAttr
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};

/**
 * Returns a random number for use in testing
 * @function randomNum
 * @returns {randomNum}
 */
const randomNum = () => {
  return Math.floor(Math.random() * 100);
};

test("renders without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "comp-app");
  expect(appComponent.length).toBe(1);
});

test("renders increment button", () => {
  const wrapper = setup();
  const incButton = findByTestAttr(wrapper, "btn-inc");
  expect(incButton.length).toBe(1);
});

test("renders counter display", () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, "count-display");
  expect(counterDisplay.length).toBe(1);
});

/**
 * Uses Enzyme's .state() function to grab the value from the state
 */
test("counter starts at 0", () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state("counter");
  expect(initialCounterState).toBe(0);
});

describe("clicking the button increments the counter", () => {
  test("by 1", () => {
    const counter = 7;
    const wrapper = setup(null, { counter });

    // Find the button and click it
    const incButton = findByTestAttr(wrapper, "btn-inc");
    incButton.simulate("click");

    // Find display and value
    const countDisplay = findByTestAttr(wrapper, "count-display");
    expect(countDisplay.text()).toContain(counter + 1);
  });

  test("by 3", () => {
    const counter = 2;
    const wrapper = setup(null, { counter });

    // Find the button and click it 3 times
    const incButton = findByTestAttr(wrapper, "btn-inc");
    for (let i = 0; i < 3; i++) {
      incButton.simulate("click");
    }

    // Find display and value
    const countDisplay = findByTestAttr(wrapper, "count-display");
    expect(countDisplay.text()).toContain(counter + 3);
  });

  test("by a random amount", () => {
    const counter = randomNum();
    const numOfClicks = randomNum();

    const wrapper = setup(null, { counter });

    // Find the button and click it a random # of times
    const incButton = findByTestAttr(wrapper, "btn-inc");
    for (let i = 0; i < numOfClicks; i++) {
      incButton.simulate("click");
    }

    // Find display and value
    const countDisplay = findByTestAttr(wrapper, "count-display");
    expect(countDisplay.text()).toContain(counter + numOfClicks);
  });
});
