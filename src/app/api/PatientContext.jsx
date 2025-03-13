import { createContext, useState, useEffect, useContext } from 'react'
import API from './api';
import { UserContext } from './UserContext';

export const PatientContext = createContext(null)

const PatientProvider = ({ children }) => {
    const [patients, setPatients] = useState()
    const [searchValue, setSearchValue] = useState('')
    const [updatedPatient, setUpdatedPatient] = useState(true)
    const {currentUser} = useContext(UserContext)
    useEffect(() => {
        const fetchPatients = async () => {
            try{
                const response = await API.get('/patients')
                setPatients(response.data)
            } catch (err) {
                console.log(err.message)
            }
        }
        fetchPatients();
    }, [updatedPatient ,setPatients, currentUser])

    return (
        <PatientContext.Provider value={{ patients, setPatients, updatedPatient, setUpdatedPatient, searchValue, setSearchValue }}>
            {children}
        </PatientContext.Provider>
    );
};

export default PatientProvider;