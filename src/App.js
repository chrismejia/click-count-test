import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      error: false
    };

    this.incrementCounter = this.incrementCounter.bind(this);
    this.decrementCounter = this.decrementCounter.bind(this);
  }

  incrementCounter() {
    if (this.state.error) {
      this.setState({ error: false });
    }
    this.setState({ counter: this.state.counter + 1 });
  }

  decrementCounter() {
    if (this.state.counter === 0) {
      this.setState({ error: true });
    } else {
      this.setState({ counter: this.state.counter - 1 });
    }
  }

  render() {
    const error = new Error("The counter cannot go below zero!");
    return (
      <div data-test="comp-app">
        <h1 data-test="count-display">
          The counter is currently {this.state.counter}
        </h1>
        <div data-test="error-msg">
          {this.state.error
            ? (<h3>The counter cannot go below zero!</h3>, console.log(error))
            : ""}
        </div>
        {!this.state.negNum ? <h3>The counter cannot go below zero!</h3> : null}
        <button onClick={this.incrementCounter} data-test="btn-inc">
          Increment
        </button>
        <button onClick={this.decrementCounter} data-test="btn-dec">
          Decrement
        </button>
      </div>
    );
  }
}

export default App;
