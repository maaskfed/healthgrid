import {useContext, useState} from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useParams, useNavigate } from 'react-router-dom'
import { PatientContext } from '../../app/api/PatientContext.jsx'
import API from '../../app/api/api.js'

const TriageUpdatePatient = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [updatingPatient, setUpdatingPatient] = useState(false)
  const [error, setError] = useState("");
  const { patients, updatedPatient, setUpdatedPatient, setSearchValue } = useContext(PatientContext)
  const patient = patients.find(patient => patient.id === id)
  const [formData, setFormData] = useState({
    id: patient.id,
    fullname: patient.fullname,
    dob: patient.dob,
    gender: patient.gender,
    phone: patient.phone,
    address: patient.address,
    medical_history: patient.medical_history,
    triage_notes: patient.triage_notes
  })
  const updateFormData = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value.split(',')})
  }
  const updateString = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const updatePatient = async (e) => {
    e.preventDefault()
    setError("")
    try{
      setUpdatingPatient(true)
      const response = await API.patch('/patients', formData)
      if(response.status === 200){
        setUpdatingPatient(false)
        setSearchValue(formData.id)
        setUpdatedPatient(!updatedPatient)
        navigate("/triage")
      }
    } catch (error) {
      if(error.response.status === 500){
        setError("Check your internet connection!")
      }else{
        setError(error.response.data.message)
      }
      setUpdatingPatient(false)
    }
  }

  return (
    <>
    <Header />
    {patient ? <main className='pt-[4.5rem] pb-16 font-montserrat min-h-[100vh] max-w-3xl mx-auto flex items-center justify-center px-10'>
      <form action="" className='bg-[#193920ae] flex flex-col items-center justify-center gap-2 text-white p-10 pt-8 rounded-xl w-full'>
        <div className='flex items-center justify-center w-full'>
          <h2 className='font-extrabold text-xl md:text-2xl'>Update Patient Details</h2>
        </div>
        <div className='w-full text-sm'>
          <label className='font-semibold' htmlFor="fullname">Full name:</label>
          <input type="text" name='fullname' placeholder='Mohamed Kamara' className='border border-[#25D162] p-2 rounded-md text-white outline-none w-full mt-1' value={formData.fullname} onChange={(e) => updateString(e)}/>
        </div>
        <div className='w-full text-sm'>
          <label className='font-semibold' htmlFor="dob">Date of Birth:</label>
          <input type="date" name='dob' className='border border-[#25D162] p-2 rounded-md text-white outline-none w-full mt-1' value={formData.dob} onChange={(e) => updateString(e)}/>
        </div>
        <div className='w-full text-sm'>
          <label className='font-semibold' htmlFor="gender">Gender:</label>
          <select name="gender" id="" className='border border-[#25D162] p-2 rounded-md text-white outline-none w-full mt-1' value={formData.gender} onChange={(e) => updateString(e)}>
            <option className='text-[#193920]'>Select your Gender</option>
            <option className='text-[#193920]' value="Male">Male</option>
            <option className='text-[#193920]' value="Female">Female</option>
          </select>
        </div>
        <div className='w-full text-sm'>
          <label className='font-semibold' htmlFor="phone">Phone:</label>
          <input type="tel" name='phone' placeholder='+23200123456' value={formData.phone} onChange={(e) => updateString(e)} className='border border-[#25D162] p-2 rounded-md text-white outline-none w-full mt-1'/>
        </div>
        <div className='w-full text-sm'>
          <label className='font-semibold' htmlFor="address">Address:</label>
          <input type="text" name='address' placeholder='14 Koroma Drive, Goderich' value={formData.address} onChange={(e) => updateString(e)} className='border border-[#25D162] p-2 rounded-md text-white outline-none w-full mt-1'/>
        </div>
        <div className='w-full text-sm'>
          <label className='font-semibold' htmlFor="medical_history">Medical History:</label>
          <input type="text" name='medical_history' placeholder='Ulcer, Syphilis' value={formData.medical_history.map(history => history)} onChange={(e) => updateFormData(e)} className='border border-[#25D162] p-2 rounded-md text-white outline-none w-full mt-1'/>
        </div>
        <div className='w-full text-sm'>
          <label className='font-semibold' htmlFor="triage_notes">Triage notes:</label>
          <textarea name='triage_notes' rows="5" placeholder="Patient's triage response" value={formData.triage_notes} onChange={(e) => updateString(e)} className='border border-[#25D162] p-2 rounded-md text-white outline-none w-full mt-1'/>
        </div>
        {error ? <p className='text-red-600 italic text-center'>{error}</p> : ""}
        { updatingPatient ? <button onClick={(e) => updatePatient(e)} className='bg-white w-full p-2 text-xl rounded-md text-[#193920] font-black cursor-pointer hover:opacity-90 active:opacity-80 flex items-center justify-center'><svg className="mr-2 h-5 w-5 animate-spin text-[#193920]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8h-4l3 3 3-3h-4a8 8 0 01-8 8v-4l-3 3 3 3v-4a8 8 0 01-8-8z"/></svg>Updating...</button> : <button onClick={(e) => updatePatient(e)} className='bg-white w-full p-2 text-xl rounded-md text-[#193920] font-black cursor-pointer hover:opacity-90 active:opacity-80'>Update</button>}
      </form>
    </main> : <p>Loading</p> }
    <Footer />
    </>
  )
}

export default TriageUpdatePatient