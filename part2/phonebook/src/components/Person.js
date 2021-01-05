
const Person = ({ person, deleteContact }) => {
    return (
        <p>
            {person.name} {person.number}
            <button onClick={()=>deleteContact(person.id)}>delete</button>
        </p>
    )
}

export default Person;