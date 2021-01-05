
const PersonForm = (props) => {
    const {newNumber,setNewNumber,newName,setNewName, addNewNumber} = props
    return (
        <form onSubmit={addNewNumber}>
            <h1>add a new</h1>
            <div>name: <input value={newName} onChange={(e)=>setNewName(e.target.value)} /></div>
            <div>number: <input value={newNumber} onChange={(e)=>setNewNumber(e.target.value)} /></div>
            <div><button type="submit">add</button></div>
        </form>
    )
}

export default PersonForm;