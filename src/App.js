import {
  NavLink,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import "./App.scss";
import Form from "./Form";
import Questionnaire from "./Questionnaire";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={buttondata} />
          <Route path="/quiz/:id" component={Form} />
          <Route path="/execute/:id" component={Questionnaire} />
        </Switch>
      </div>
    </Router>
  );
}

const buttondata = () => {
  return (
    <div className="Getstarted">
      <NavLink
        className="getStarted_btn"
        to={`/quiz/` + Math.round(Math.random() * 100)}
      >
        <button className="btn btn-primary">Get Started</button>
      </NavLink>
    </div>
  );
};

export default App;
