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

describe("The app", () => {
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

  test("renders decrement button", () => {
    const wrapper = setup();
    const decButton = findByTestAttr(wrapper, "btn-dec");
    expect(decButton.length).toBe(1);
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
});
describe("Clicking the increment button increases the counter", () => {
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
    const counter = 417;
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

describe("Clicking the decrement button decreases the counter", () => {
  test("by 1", () => {
    const counter = 70;
    const wrapper = setup(null, { counter });
    const decBtn = findByTestAttr(wrapper, "btn-dec");

    decBtn.simulate("click");
    const countDisplay = findByTestAttr(wrapper, "count-display");
    expect(countDisplay.text()).toContain(counter - 1);
  });

  test("by 3", () => {
    const counter = 70;
    const wrapper = setup(null, { counter });
    const decBtn = findByTestAttr(wrapper, "btn-dec");

    for (let i = 0; i < 3; i++) {
      decBtn.simulate("click");
    }

    const countDisplay = findByTestAttr(wrapper, "count-display");
    expect(countDisplay.text()).toContain(counter - 3);
  });

  test("by a random amount", () => {
    const counter = 250;
    const clickCount = randomNum();

    const wrapper = setup(null, { counter });
    const decBtn = findByTestAttr(wrapper, "btn-dec");

    for (let i = 0; i < clickCount; i++) {
      decBtn.simulate("click");
    }

    const display = findByTestAttr(wrapper, "count-display");
    expect(display.text()).toContain(counter - clickCount);
  });
});

describe("The counter does not go below 0", () => {
  test("when counter is 0 & decrement is clicked", () => {
    const counter = 0;
    const wrapper = setup(null, { counter });

    const decBtn = findByTestAttr(wrapper, "btn-dec");
    decBtn.simulate("click");

    const display = findByTestAttr(wrapper, "count-display");
    expect(display.text()).toContain(0);
    expect(wrapper).toThrow(Error);
  });
});
