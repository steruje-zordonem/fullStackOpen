// 1. install axios - V
// 2. install json-server - V
// 3. create anecdoteService to interact with server
// 4. implement fetching the data in App component using useEffect
// 5. implement creation of the notes using noteService

import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, update }