import React, { Component } from "react";
import "./Footer.scss";
import Switch from "@material-ui/core/Switch";

class Footer extends Component {
  render() {
    let button = (
      <button
        className="addmore_button ml-2"
        onClick={this.props.AddnewQuesHandler}
      >
        Add Next Question
      </button>
    );
    if (!(this.props.ques && this.props.options.length > 1)) {
      button = (
        <button
          className="addmore_button ml-2"
          onClick={this.props.AddnewQuesHandler}
          disabled
          style={{
            cursor:
              this.props.ques && this.props.options.length > 1
                ? "pointer"
                : "not-allowed",
          }}
        >
          Add Next Question
        </button>
      );
    }
    return (
      <div className="footer shadow-sm">
        <div className="footer_options">
          <span className="footer_option active">Options</span>
          <div className="footer_submit">
            <input type="checkbox" value="score" className="ml-2" />
            <label>Score</label>
            <input type="checkbox" value="score" className="ml-2" />
            <label>Required</label>
            {button}
          </div>
        </div>
        <hr />
        <div className="footer_toggle">
          <div>
            <div>
              <p>Randomize</p>
              <Switch
                color="default"
                inputProps={{ "aria-label": "checkbox with default color" }}
              />
            </div>
            <div>
              <p>None of the Above</p>
              <Switch
                color="default"
                inputProps={{ "aria-label": "checkbox with default color" }}
              />
            </div>
          </div>
          <div>
            <p>Multiple Answers</p>
            <Switch
              color="default"
              inputProps={{ "aria-label": "checkbox with default color" }}
            />
          </div>
          <div>
            <p>Allow Other Option</p>
            <Switch
              color="default"
              inputProps={{ "aria-label": "checkbox with default color" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
