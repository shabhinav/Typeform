import React, { Component } from "react";
// import axios from "axios";
import { connect } from "react-redux";
import "./Form.scss";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import Footer from "./Footer";

class Form extends Component {
  state = {
    quiz: [],
    ques: "",
    showinput: false,
    option: "",
    options: [],
    message: {
      Id: "",
      message_pic: "",
      text: "",
    },
  };

  showInputHandler = async (e) => {
    await this.setState({
      showinput: !this.state.showinput,
    });
  };

  onChangeHandler = async (e, type) => {
    if (type === "ques") {
      await this.setState({
        ques: e.target.value,
      });
    } else {
      await this.setState({
        option: e.target.value,
      });
    }
  };

  onSubmitHandler = async (e) => {
    e.preventDefault();
    let optionsList = [...this.state.options];
    optionsList.push(this.state.option);
    await this.setState({
      option: "",
    });
    let filteredOption = optionsList.filter((val) => val !== "");
    await this.setState({
      options: filteredOption,
    });
  };

  deleteHandler = async (index) => {
    let optionsList = [...this.state.options];
    optionsList.splice(index, 1);
    await this.setState({
      options: optionsList,
    });
  };

  AddnewQuesHandler = async (type) => {
    let choices = [];
    let quizQues = { questions: {} };
    quizQues.questions.id = Math.round(Math.random() * 1000);
    quizQues.questions.text = this.state.ques;
    for (var i = 0; i < this.state.options.length; i++) {
      let obj = {};
      obj.id = i;
      obj.text = this.state.options[i];
      obj.metadata = {};
      choices.push(obj);
    }
    quizQues.questions.Choices = choices;
    quizQues.questions.metadata = {};
    let quizquestion = JSON.parse(JSON.stringify(this.props.quiz));
    quizquestion.push(quizQues);
    await this.setState({
      quiz: quizquestion,
    });
    if (type === "submit") {
      let quizList = this.state.quiz.filter(
        (text) => text.questions.text !== ""
      );
      this.props.quizQues(quizList);
      alert("redirecting ...... to Form ");
      this.props.history.push("/execute/" + Math.round(Math.random() * 1000));
    } else {
      this.props.quizQues(this.state.quiz);
      await this.setState({
        options: [],
        ques: "",
        option: "",
      });
    }
  };

  render() {
    return (
      <div className="container form">
        <form onSubmit={this.onSubmitHandler}>
          <div className="form_question mt-5">
            <input
              type="text"
              placeholdert="Enter Your Question"
              className="input_ques mt-5"
              onChange={(e) => this.onChangeHandler(e, "ques")}
              value={this.state.ques}
            />
          </div>
          <div className="options mt-5">
            {this.state.options.map((option, index) => (
              <div className="option mt-1" key={index}>
                <span>{option}</span>
                <span className="delete_icon">
                  <DeleteOutlineOutlinedIcon
                    onClick={() => this.deleteHandler(index)}
                  />
                </span>
              </div>
            ))}
          </div>
          {this.state.showinput ? (
            <div className="Input_options mt-1">
              <div className="choices">
                <input
                  className="choice"
                  type="text"
                  placeholder="Enter your Choice"
                  onChange={(e) => this.onChangeHandler(e, "options")}
                  value={this.state.option}
                />
              </div>
            </div>
          ) : null}
          <div className="addoptions_section mt-1">
            {this.state.ques ? (
              <button
                className="add_options"
                onClick={(e) => this.showInputHandler(e, "input")}
              >
                <AddCircleOutlineRoundedIcon className="mr-2" />
                Add New Choice
              </button>
            ) : (
              <button
                disabled
                style={{ cursor: this.state.ques ? "pointer" : "not-allowed" }}
                className="add_options"
                onClick={(e) => this.showInputHandler(e, "input")}
              >
                <AddCircleOutlineRoundedIcon className="mr-2" />
                Add New Choice
              </button>
            )}
          </div>
          <Footer
            AddnewQuesHandler={this.AddnewQuesHandler}
            ques={this.state.ques}
            options={this.state.options}
          />
          {this.state.ques && this.state.options.length > 1 ? (
            <button
              className="btn btn-primary my-5"
              onClick={() => this.AddnewQuesHandler("submit")}
            >
              Submit
            </button>
          ) : (
            <button
              disabled
              style={{
                cursor:
                  this.state.ques && this.state.options.length > 1
                    ? "pointer"
                    : "not-allowed",
              }}
              className="btn btn-primary my-5"
              onClick={() => this.AddnewQuesHandler("submit")}
            >
              Submit
            </button>
          )}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    quiz: state.ques,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    quizQues: (quiz) => dispatch({ type: "quiz", quizques: quiz }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
