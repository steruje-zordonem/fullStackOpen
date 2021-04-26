import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteOn } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'


const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ anecdotes, notification, filter}) => {
    if (filter === '') {
      return anecdotes
    }
    return anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
  })
  
  const anecdotesToShow = anecdotes.slice().sort((a, b) => {
    return b.votes - a.votes
  })

  const handleClickFunction = anecdote => {
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    dispatch(voteOn(anecdote.id, updatedAnecdote))
    dispatch(createNotification(`you voted on: '${anecdote.content}'`, 5))
  }

  return (
    <div>
      {
        anecdotesToShow.map(anecdote =>
          <Anecdote 
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => handleClickFunction(anecdote)}
          />
        )
      }
    </div>
  )
}

export default AnecdoteList