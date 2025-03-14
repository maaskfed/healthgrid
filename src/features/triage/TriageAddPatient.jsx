import { useContext, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom'
import API from '../../app/api/api.js'
import { PatientContext } from '../../app/api/PatientContext.jsx'

const TriageAddPatient = () => {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [addingPatient, setAddingPatient] = useState(false)
  const [userCreated, setUserCreated] = useState()
  const { updatedPatient, setUpdatedPatient, setSearchValue } = useContext(PatientContext)
  const [formData, setFormData] = useState({
    fullname: "",
    dob: "",
    gender: "",
    phone: "",
    address: "",
    medical_history: [],
    triage_notes: ""
  })
  const updateFormData = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value.split(',')})
  }
  const updateString = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const addPatient = async (e) => {
    e.preventDefault();
    setError("")
    try{
      setAddingPatient(true)
      const response = await API.post('/patients', formData)
      if(response.status === 201){
        setAddingPatient(false)
        setUpdatedPatient(!updatedPatient)
        setSearchValue(response.data.newPatient.id)
        setUserCreated(response.data.newPatient)
      }
    }catch (error) {
      if(error.response.status === 500){
        setError("Check your internet connection!")
      }else{
        setError(error.response.data.message)
      }
      setAddingPatient(false)
    }
  }

  return (
    <>
    <Header />
    <main className='pt-[4.5rem] pb-16 font-montserrat min-h-[100vh] max-w-3xl mx-auto flex items-center justify-center px-10'>
      {userCreated ? <div className='fixed top-0 w-[100vw] h-[100vh] bg-[#000000be] flex items-center justify-center px-10'>
        <div className='w-full max-w-[500px] px-5 py-4 min-h-[250px] bg-white text-[#193920] flex flex-col items-center justify-center rounded-lg'>
          <p className='font-extrabold text-xl'>User created successfully!</p>
          <p className='text-sm'><span className='font-bold'>ID:</span>{userCreated.id}</p>
          <p className='text-sm'><span className='font-bold'>Fullname:</span>{userCreated.fullname}</p>
          <p className='text-sm'><span className='font-bold'>D.O.B:</span>{userCreated.dob}</p>
          <p className='text-sm'><span className='font-bold'>Gender:</span>{userCreated.gender}</p>
          <p className='text-sm'><span className='font-bold'>Phone:</span>{userCreated.phone}</p>
          <p className='text-sm'><span className='font-bold'>Address:</span>{userCreated.address}</p>
          <button onClick={() => navigate('/triage')} className='bg-[#193920] text-white px-9 py-2 mt-1 rounded-md hover:opacity-95 active:opacity-90 cursor-pointer'>OK</button>
        </div>
      </div> : ""}
      <form action="" className='bg-[#193920ae] flex flex-col items-center justify-center gap-2 text-white p-10 rounded-xl w-full'>
        <div className='flex items-center justify-center w-full'>
          <h2 className='font-extrabold text-xl md:text-2xl'>Patient Details</h2>
        </div>
        <div className='w-full'>
          <label htmlFor="fullname">Full name:</label>
          <input type="text" name='fullname' placeholder='Mohamed Kamara' className='border border-[#25D162] p-2 rounded-md text-white outline-none w-full' value={formData.fullname} onChange={(e) => updateString(e)}/>
        </div>
        <div className='w-full'>
          <label htmlFor="dob">Date of Birth:</label>
          <input type="date" name='dob' className='border border-[#25D162] p-2 rounded-md text-white outline-none w-full' value={formData.dob} onChange={(e) => updateString(e)}/>
        </div>
        <div className='w-full'>
          <label htmlFor="gender">Gender:</label>
          <select name="gender" id="" className='border border-[#25D162] p-2 rounded-md text-white outline-none w-full' value={formData.gender} onChange={(e) => updateString(e)}>
            <option className='text-[#193920]'>Select your Gender</option>
            <option className='text-[#193920]' value="Male">Male</option>
            <option className='text-[#193920]' value="Female">Female</option>
          </select>
        </div>
        <div className='w-full'>
          <label htmlFor="phone">Phone:</label>
          <input type="tel" name='phone' placeholder='+23200123456' value={formData.phone} onChange={(e) => updateString(e)} className='border border-[#25D162] p-2 rounded-md text-white outline-none w-full'/>
        </div>
        <div className='w-full'>
          <label htmlFor="address">Address:</label>
          <input type="text" name='address' placeholder='14 Koroma Drive, Goderich' value={formData.address} onChange={(e) => updateString(e)} className='border border-[#25D162] p-2 rounded-md text-white outline-none w-full'/>
        </div>
        <div className='w-full'>
          <label htmlFor="medical_history">Medical History:</label>
          <input type="text" name='medical_history' placeholder='Ulcer, Syphilis' value={formData.medical_history.map(history => history)} onChange={(e) => updateFormData(e)} className='border border-[#25D162] p-2 rounded-md text-white outline-none w-full'/>
        </div>
        <div className='w-full'>
          <label htmlFor="triage_notes">Triage notes:</label>
          <textarea name='triage_notes' rows="5" placeholder="Patient's triage response" value={formData.triage_notes} onChange={(e) => updateString(e)} className='border border-[#25D162] p-2 rounded-md text-white outline-none w-full'/>
        </div>
        {error ? <p className='text-red-600 italic text-center'>{error}</p> : ""}
        {addingPatient ? <button onClick={(e) => addPatient(e)} className='bg-white w-full p-2 text-xl rounded-md text-[#193920] font-black cursor-pointer hover:opacity-90 active:opacity-80 flex items-center justify-center'><svg className="mr-2 h-5 w-5 animate-spin text-[#193920]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8h-4l3 3 3-3h-4a8 8 0 01-8 8v-4l-3 3 3 3v-4a8 8 0 01-8-8z"/></svg>Adding...</button> : <button onClick={(e) => addPatient(e)} className='bg-white w-full p-2 text-xl rounded-md text-[#193920] font-black cursor-pointer hover:opacity-90 active:opacity-80'>Add Patient</button>}
      </form>
    </main>
    <Footer />
    </>
  )
}

export default TriageAddPatient