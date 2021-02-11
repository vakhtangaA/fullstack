import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  const { good, bad, neutral, all } = props;
  const average = good + (bad * -1) / all;
  const positive = (good / all) * 100 + "%";

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={all} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={positive} />
        </tbody>
      </table>
    </div>
  );
};

const Button = (props) => <button onClick={props.onClick}>{props.name}</button>;

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  let all = bad + good + neutral;
  let checker = bad === 0 && good === 0 && neutral === 0;

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={handleGood} name="good" />
      <Button onClick={handleNeutral} name="neutral" />
      <Button onClick={handleBad} name="bad" />
      {checker ? (
        <p>No feedback given</p>
      ) : (
        <Statistics good={good} bad={bad} neutral={neutral} all={all} />
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
