import React, {useState} from 'react';
import ReactDOM from 'react-dom';


const App = (props) => {
  const {anecdotes} = props
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  
  const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

  const handleClickNext = () => {
    setSelected(getRandomInt(anecdotes.length))
  }

  const handleClickVote = () => {
    // make copy of the array
    const copy = [...votes]
    // add 1 vote to the 'selected' anecdote
    copy[selected] += 1
    // setVotes with new array which is modified copy of the original one
    setVotes(copy)
  }

  // Get the index of the highest value in the array
  const index = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <br/>
      <Button text="vote" handleClick={handleClickVote}/>
      <Button text="next anecdote" handleClick={handleClickNext}/>
      
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[index]}</p>
    </div>
  ) 
}

const Button = props => <button onClick={props.handleClick}>{props.text}</button>

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));

