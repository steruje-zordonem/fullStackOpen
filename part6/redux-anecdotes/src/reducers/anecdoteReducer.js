import anecdoteService from '../services/anecdotes'

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const voteOn = (id, anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(id, anecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes,
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ANECDOTE':
      return state.concat(action.data)
    case 'VOTE':
      const updatedAnecdote = action.data
      return state.map(anecdote =>
        anecdote.id !== updatedAnecdote.id
          ? anecdote
          : updatedAnecdote
      )
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export default reducer