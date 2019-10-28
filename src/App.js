import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  }
  render() {
    return (
      <div data-test="comp-app">
        <h1 data-test="count-display">
          The counter is currently {this.state.counter}
        </h1>
        <button
          onClick={() => this.setState({ counter: this.state.counter + 1 })}
          data-test="btn-inc"
        >
          Increment
        </button>
        <button
          onClick={() => this.setState({ counter: this.state.counter - 1 })}
          data-test="btn-dec"
        >
          Decrement
        </button>
      </div>
    );
  }
}

export default App;
