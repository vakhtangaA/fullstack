import React, { useState } from "react";
import ReactDOM from "react-dom";

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const App = () => {
  const length = anecdotes.length;
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(length).fill(0));

  const handleClick = () => {
    let randomNum = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNum);
  };

  const handleVote = () => {
    let copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  // find most voted anecdote

  let maxVote = Math.max(...votes);
  let index = votes.indexOf(maxVote);

  return (
    <div>
      <h1>CS anecdotes</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      {!votes.every((item) => item === 0) ? <p>{anecdotes[index]}</p> : null}
    </div>
  );
};

export default App;
