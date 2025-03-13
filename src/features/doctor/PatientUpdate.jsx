import {useContext, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { PatientContext } from '../../app/api/PatientContext'
import API from '../../app/api/api'

const PatientUpdate = () => {
  const { id } = useParams()
  const [updatingPatient, setUpdatingPatient] = useState(false)
  const navigate = useNavigate()
  const {patients, setSearchValue, setUpdatedPatient, updatedPatient} = useContext(PatientContext)
  const patient = patients.find(patient => patient.id === id)
  const [formData, setFormData] = useState({
    id,
    diagnosis: patient.diagnosis,
    current_medications: patient.current_medications,
    medical_history: patient.medical_history,
    prescription: patient.prescription,
    treatment_plan: patient.treatment_plan,
    appointment: patient.appointment
  })

  const updateFormData = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value.split(',')})
  }
  const updateStringData = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const updatePatient = async (e) => {
    e.preventDefault()
    //Update Logic
    try{
      setUpdatingPatient(true)
      const response = await API.patch('/patients', formData)
      if(response.status === 200){
      setUpdatingPatient(false)
        setSearchValue(id);
        setUpdatedPatient(!updatedPatient);
        navigate(`/doctor`)
      }
    } catch (e) {
      console.log(e)
      setUpdatingPatient(false)
    }
  }

  return (
    <>
      <Header />
      <main className='w-full min-h-[100vh] flex flex-col items-center justify-center px-10 pt-[4.5rem] pb-16'>
        <form className='w-full max-w-md flex flex-col gap-2 bg-[#193920ae] text-[#fff] p-10 pt-8 rounded-lg'>

          <h2 className='font-extrabold text-xl text-center'>Update Patient Details</h2>

          <label htmlFor="diagnosis" className='font-bold'>Diagnosis:</label>
          <input type='text' name='diagnosis' className='border border-[#25D162] px-2 py-2 w-full rounded-md outline-none text-[1rem]' autoFocus value={formData.diagnosis.map(diagnosis => diagnosis)} onChange={(e) => updateFormData(e)}/>

          <label htmlFor="current_medications" className='font-bold'>Current Medications:</label>
          <input type='text' name='current_medications' className='border border-[#25D162] px-2 py-2 w-full rounded-md outline-none text-[1rem]' value={formData.current_medications.map(medication => medication)} onChange={(e) => updateFormData(e)}/>

          <label htmlFor="medical_history" className='font-bold'>Medical History:</label>
          <input type='text' name='medical_history' className='border border-[#25D162] px-2 py-2 w-full rounded-md outline-none text-[1rem]' value={formData.medical_history.map(history => history)} onChange={(e) => updateFormData(e)}/>

          <label htmlFor="prescription" className='font-bold'>Prescription:</label>
          <input type='text' name='prescription' className='border border-[#25D162] px-2 py-2 w-full rounded-md outline-none text-[1rem]' value={formData.prescription.map(medication => medication)} onChange={(e) => updateFormData(e)}/>

          <label htmlFor="treatment_plan" className='font-bold'>Treatment Plan:</label>
          <input type='text' name='treatment_plan' className='border border-[#25D162] px-2 py-2 w-full rounded-md outline-none text-[1rem]' value={formData.treatment_plan} onChange={(e) => updateStringData(e)}/>

          <label htmlFor="appointment" className='font-bold'>Appointment:</label>
          <input type='datetime-local' name='appointment' className='border border-[#25D162] px-2 py-2 w-full rounded-md outline-none text-[1rem]' onChange={(e) => updateStringData(e)}/>

          {updatingPatient ? <button className='bg-[#fff] text-[#193920] font-black text-xl px-6 pt-2 pb-3 rounded-md cursor-pointer hover:opacity-90 active:opacity-80 flex items-center justify-center' onClick={(e) => updatePatient(e)}><svg className="mr-2 h-5 w-5 animate-spin text-[#193920]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8h-4l3 3 3-3h-4a8 8 0 01-8 8v-4l-3 3 3 3v-4a8 8 0 01-8-8z"/></svg>Updating...</button> : <button className='bg-[#fff] text-[#193920] font-black text-xl px-6 pt-2 pb-3 rounded-md cursor-pointer hover:opacity-90 active:opacity-80' onClick={(e) => updatePatient(e)}>Update</button>}
        </form>
      </main>
      <Footer />
    </>
  )
}

export default PatientUpdate