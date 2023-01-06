const Person = ({person}) => <>{person.name} {person.number}</>

const Persons = ({persons, newSearch, handleDeleteButton}) =>{
    return(
        <ul>
            {persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase())).map(person =>
                <li key={person.id}>
                    <Person person={person} /> <button id={person.id} name={person.name} onClick={handleDeleteButton}>delete</button>
                </li>
            )}
        </ul>
    )
  }

export default Persons