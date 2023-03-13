//import React, { Component } from "react";
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionCount: 25,
      breakcount: 5,
      minutes: 25,
      seconds: 0,
      isRunning: false,
      isBreak: false
    };
    this.intervalId = null;
  }

  start = () => {
    if (this.state.isRunning) {
      return;
    }

    this.setState({
      isRunning: true
    });

    this.intervalId = setInterval(() => {
      if (this.state.seconds > 0) {
        this.setState({
          seconds: this.state.seconds - 1
        });
      } else if (this.state.minutes > 0 && this.state.seconds === 0) {
        this.setState({
          seconds: 59,
          minutes: this.state.minutes - 1
        });
      } else {
        this.setState({
          isRunning: false,
          isBreak: !this.state.isBreak
        });

        clearInterval(this.intervalId);

        if (this.state.isBreak) {
          this.setState({
            minutes: 25,
            seconds: 0
          });
        } else {
          this.setState({
            minutes: this.state.breakcount,
            seconds: 0
          });
        }
      }
    }, 1000);
  };

  pause = () => {
    if (!this.state.isRunning) {
      return;
    }

    clearInterval(this.intervalId);

    this.setState({
      isRunning: false
    });
  };

  reset = () => {
    clearInterval(this.intervalId);

    this.setState({
      minutes: 25,
      seconds: 0,
      isRunning: false,
      isBreak: false
    });
  };

  breakIncre = () => {
    this.setState((state) => ({
      breakcount: state.breakcount + 1
    }));
  };

  breakDecre = () => {
    this.setState((state) => ({
      breakcount: state.breakcount - 1
    }));
  };

  sessionIncre = () => {
    this.setState((state) => ({
      sessionCount: state.sessionCount + 1,
      minutes: state.minutes + 1
    }));
  };

  sessionDecre = () => {
    this.setState((state) => ({
      sessionCount: state.sessionCount - 1,
      minutes: state.minutes - 1
    }));
  };

  render() {
    return (
      <div id="container">
        <div className="main-title">25 + 5 Clock</div>
        <h3>{this.state.isBreak ? "Break Time!" : "Work Time!"}</h3>
        <div id="main">
          <div className="length-control">
            <div id="break-label">Break Length</div>
            <button
              className="btn-level"
              id="break-decrement"
              value="-"
              onClick={(e) => this.breakDecre(e)}
            >
              <i className="fa fa-arrow-down fa-2x"></i>
            </button>
            <div className="btn-level" id="break-length">
              {this.state.breakcount}
            </div>
            <button
              className="btn-level"
              id="break-increment"
              value="+"
              onClick={(e) => this.breakIncre(e)}
            >
              <i className="fa fa-arrow-up fa-2x"></i>
            </button>
          </div>
          <div className="length-control">
            <div id="session-label">Session Length</div>
            <button
              className="btn-level"
              id="session-decrement"
              value="-"
              onClick={(e) => this.sessionDecre(e)}
            >
              <i className="fa fa-arrow-down fa-2x"></i>
            </button>
            <div className="btn-level" id="session-length">
              {this.state.sessionCount}
            </div>
            <button
              className="btn-level"
              id="session-increment"
              value="+"
              onClick={(e) => this.sessionIncre(e)}
            >
              <i className="fa fa-arrow-up fa-2x"></i>
            </button>
          </div>
          <div className="timer">
            <div className="timer-wrapper">
              <div id="timer-label">Session</div>
              <div id="time-left">{`${this.state.minutes
                .toString()
                .padStart(2, "0")}:${this.state.seconds
                .toString()
                .padStart(2, "0")}`}</div>
            </div>
          </div>
          <div className="timer-control">
            <button id="start_stop" onClick={(e) => this.start(e)}>
              <i className="fa fa-play fa-2x"></i>
            </button>
            <button id="start_stop" onClick={(e) => this.pause(e)}>
              <i className="fa fa-pause fa-2x"></i>
            </button>
            <button id="reset" onClick={(e) => this.reset(e)}>
              <i className="fa fa-refresh fa-2x"></i>
            </button>
          </div>
          <audio
            id="beep"
            preload="auto"
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          ></audio>
        </div>
      </div>
    );
  }
}

export default App;
