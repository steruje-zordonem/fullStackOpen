import Person from './Person'

const Persons = ({ personsToShow, deleteContact }) => {
    return (
        <div>
            {personsToShow.map(person => <Person key={person.name} person={person} deleteContact={deleteContact}/>)}
        </div>
    )
}

export default Persons;