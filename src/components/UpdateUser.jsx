import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../app/api/UserContext'
import Header from './Header'
import Footer from './Footer'
import API from '../app/api/api.js'

const UpdateUser = () => {

  const {currentUser} = useContext(UserContext)
  const [updatingUser, setUpdatingUser] = useState(false)

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    id:currentUser.id,
    email: currentUser.email,
    old_password: "",
    new_password: ""
  })
  const updateFormData = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const updatePatient = async (e) => {
    e.preventDefault();
    try{
      setUpdatingUser(true)
      const response = await API.patch('/users', formData)
      if(response.status === 200){
        setUpdatingUser(false)
        navigate('/sign-in')
      }
    }catch (e) {
      setUpdatingUser(false)
      console.log(e)
    }
  }

  return (
    <>
    <Header />
    <main className='pt-[4.5rem] pb-16 font-montserrat min-h-[100vh] max-w-3xl mx-auto flex items-center justify-center px-10'>
      {/* {userUpdated ? <div className='fixed top-0 w-[100vw] h-[100vh] bg-[#000000be] flex items-center justify-center px-10'>
        <div className='w-full max-w-[500px] px-5 py-4 min-h-[250px] bg-white text-[#193920] flex flex-col items-center justify-center rounded-lg'>
          <p className='font-extrabold text-xl'>User created successfully!</p>
          <p className='text-sm'><span className='font-bold'>ID:</span>{userUpdated.id}</p>
          <p className='text-sm'><span className='font-bold'>Fullname:</span>{userUpdated.fullname}</p>
          <p className='text-sm'><span className='font-bold'>D.O.B:</span>{userUpdated.dob}</p>
          <button onClick={() => navigate('/triage')} className='bg-[#193920] text-white px-9 py-2 mt-1 rounded-md hover:opacity-95 active:opacity-90 cursor-pointer'>OK</button>
        </div>
      </div> : ""} */}
      <form action="" className='bg-[#193920ae] flex flex-col items-center justify-center gap-2 text-white p-10 rounded-xl w-full'>
        <div className='flex items-center justify-center w-full'>
          <h2 className='font-extrabold text-xl md:text-2xl -mt-3 -mb-1'>User Details</h2>
        </div>
        <div className='w-full'>
          <label htmlFor="email">Email:</label>
          <input type="email" name='email' className='border border-[#25D162] p-2 rounded-md text-white outline-none w-full' value={formData.email} onChange={(e) => updateFormData(e)}/>
        </div>
        <div className='w-full'>
          <label htmlFor="old_password" className='absolute -left-[10000px]'>Old Password:</label>
          <input type="password" name='old_password' placeholder='Enter old password' className='border border-[#25D162] p-2 rounded-md text-white outline-none w-full' value={formData.old_password} onChange={(e) => updateFormData(e)}/>
        </div>
        <div className='w-full'>
          <label htmlFor="new_password" className='absolute -left-[10000px]'>New Password:</label>
          <input type="password" name='new_password' placeholder='Enter new password' value={formData.new_password} onChange={(e) => updateFormData(e)} className='border border-[#25D162] p-2 rounded-md text-white outline-none w-full'/>
        </div>
        {updatingUser ? <button onClick={(e) => updatePatient(e)} className='bg-white w-full p-2 text-xl rounded-md text-[#193920] font-black cursor-pointer hover:opacity-90 active:opacity-80 flex items-center justify-center'><svg className="mr-2 h-5 w-5 animate-spin text-[#193920]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8h-4l3 3 3-3h-4a8 8 0 01-8 8v-4l-3 3 3 3v-4a8 8 0 01-8-8z"/></svg>Updating...</button> : <button onClick={(e) => updatePatient(e)} className='bg-white w-full p-2 text-xl rounded-md text-[#193920] font-black cursor-pointer hover:opacity-90 active:opacity-80'>Update</button>}
      </form>
    </main>
    <Footer />
    </>
  )
}

export default UpdateUser