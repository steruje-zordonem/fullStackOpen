import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => {
    setGood(good + 1)
  }
  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
  }
  const handleClickBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <div>
        <h2>give feedback</h2>
        <Button text="good" handleClick={handleClickGood} />
        <Button text="neutral" handleClick={handleClickNeutral} />
        <Button text="bad" handleClick={handleClickBad} />
        <br />
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}


const Button = (props) => {
  const { text, handleClick } = props
  return (
    <button onClick={handleClick}>{text}</button>
  )
}


const Statistics = (props) => {
  const { good, neutral, bad } = props

  // Statistics functions:
  const all = () => good + neutral + bad

  const average = () => {
    // If there is no elements element should be empty
    if (all() === 0) {
      return null
    }
    const sum = good + (-1 * bad)
    return sum / all()
  }

  const positive = () => {
    if (all() === 0) {
      return null
    }
    return (good / all()) * 100 + " %"
  }

  // RENDER:
  // if there was no input, display just message
  if (all() === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }
  // if there is input, display full statistics
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={all()} />
          <Statistic text="average" value={average()} />
          <Statistic text="positive" value={positive()} />
        </tbody>
      </table>
    </div>
  )
}

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}


ReactDOM.render(<App />, document.getElementById('root'));

