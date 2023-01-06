import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

/**
 * Get all the people from the phonebook DB
 * @returns all persons
 */
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

/**
 * Add a person to the phonebook DB
 * @param {object} newPerson - Person to add
 * @returns added person
 */
const create = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

/**
 * Delete a person from the phonebook DB
 * @param {string} delName - Name of the person to delete
 * @returns deleted person
 */
const del = ({delID}) => {
    const request = axios.delete(`${baseUrl}/${delID}`)
    return request.then(response => response.data)
}

const updateNumber = ({personOld, newNumber}) => {
    const request = axios.put(`${baseUrl}/${personOld.id}`, { name:personOld.name, id:personOld.id, number: newNumber })
    return request.then(response => response.data)
}

export default { getAll, create, del, updateNumber }