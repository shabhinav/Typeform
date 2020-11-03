import React, { useState } from "react";
import { connect } from "react-redux";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import "./Questionnaire.scss";

function Questionnaire(props) {
  const [ans, setAns] = useState([]);

  const onChangeHandler = (e, index, ques) => {
    let quesAns = [...ans];
    let obj = {};
    let quesno = quesAns.findIndex((id) => id.quesno === index);
    obj.quesno = index;
    obj.question = ques;
    obj.ans = e.target.value;
    if (quesno >= 0) {
      quesAns.splice(quesno, 1, obj);
    } else {
      quesAns.push(obj);
    }
    setAns(quesAns);
  };
  const onSubmitHandler = () => {
    if (ans.length !== props.question.length) {
      alert("Please Fill Form");
    } else {
      alert("Thank You");
      props.history.push("/");
    }
  };

  return (
    <div className="questionnaire shadow-lg">
      <div className="questionnaire_content">
        <h2 style={{ textAlign: "center" }} className="mb-5 ">
          Sample Questions
        </h2>
        <FormControl component="fieldset">
          {props.question.map((ques, index) => (
            <div>
              <form>
                <FormLabel component="legend">
                  <span
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "bolder",
                    }}
                  >
                    Q{ques.questions.text}
                  </span>
                </FormLabel>
                <RadioGroup
                  aria-label={ques.questions.id}
                  name={ques.questions.id}
                  // value={value}
                  onChange={(e) =>
                    onChangeHandler(e, index, ques.questions.text)
                  }
                >
                  {ques.questions.Choices.map((option) => (
                    <FormControlLabel
                      value={option.text}
                      control={<Radio />}
                      label={option.text}
                    />
                  ))}
                </RadioGroup>
              </form>
            </div>
          ))}
        </FormControl>
      </div>
      <div style={{ textAlign: "center", paddingBottom: "20px" }}>
        <button className="btn btn-primary" onClick={onSubmitHandler}>
          Submit
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    question: state.ques,
  };
};

export default connect(mapStateToProps)(Questionnaire);
