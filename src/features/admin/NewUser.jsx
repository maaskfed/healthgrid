import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom'
import API from '../../app/api/api.js'

const NewUser = () => {

  const navigate = useNavigate()
  const [error, setError ] = useState()
  const [addingUser, setAddingUser] = useState(false)

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    role: ""
  })

  const updateFormData = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const addUser = async (e) => {
    e.preventDefault()
    setError("")
    try{
      setAddingUser(true)
      const response = await API.post('/users', formData)
      if(response.status === 201){
        setAddingUser(false)
        navigate('/admin')
      }
    } catch (error) {
      if(error.response.status === 500){
        setError("Check your internet connection!")
      }else{
        setError(error.response.data.message)
      }
      setAddingUser(false)
      console.log(error)
    }
  }

  return (
    <>
      <Header />
      <main className='w-full h-[100vh] flex flex-col items-center justify-center px-8 '>
          <form className='w-full max-w-md flex flex-col gap-2 bg-[#ffffffae] p-8 rounded-lg'>
            <p className='text-2xl font-black text-[#193920] text-center'>New Staff</p>
            <label htmlFor="fullname" className='absolute -left-[10000px]'>Fullname:</label>
            <input placeholder='Full name' type='text' name='fullname' className='border text-[#193920] border-[#193920] px-2 py-2 w-full rounded-md outline-none text-[1rem]' autoFocus value={formData.fullname} onChange={(e) => updateFormData(e)}/>
            <label htmlFor="email" className='absolute -left-[10000px]'>Email:</label>
            <input placeholder='Email' type='text' name='email' className='border text-[#193920] border-[#193920] px-2 py-2 w-full rounded-md outline-none text-[1rem]' value={formData.email} onChange={(e) => updateFormData(e)}/>
            <div className='flex gap-3 justify-center font-bold text-[#193920]'>
              <div className='flex items-center'>
                <input type="radio" name="role" value="Doctor" onChange={(e) => updateFormData(e)} className='cursor-pointer'/>
                <label>Doctor</label>
              </div>
              <div className='flex items-center'>
                <input type="radio" name="role" value="Triage" onChange={(e) => updateFormData(e)} className='cursor-pointer'/>
                <label>Triage</label>
              </div>
              <div className='flex items-center'>
                <input type="radio" name="role" value="Admin" onChange={(e) => updateFormData(e)} className='cursor-pointer'/>
                <label>Admin</label>
              </div>
            </div>
            {error ? <p className='text-red-600 italic text-center'>{error}</p> : ""}
            {addingUser ? <button className='bg-[#193920] text-white font-black text-xl px-6 pt-2 pb-3 rounded-md cursor-pointer hover:opacity-90 active:opacity-80 flex items-center justify-center' onClick={(e) => addUser(e)}><svg className="mr-2 h-5 w-5 animate-spin text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8h-4l3 3 3-3h-4a8 8 0 01-8 8v-4l-3 3 3 3v-4a8 8 0 01-8-8z"/></svg>Adding...</button> : <button className='bg-[#193920] text-white font-black text-xl px-6 pt-2 pb-3 rounded-md cursor-pointer hover:opacity-90 active:opacity-80' onClick={(e) => addUser(e)}>Add</button>}
          </form>
        </main>
      <Footer />
    </>
  )
}

export default NewUser