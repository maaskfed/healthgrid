import { useContext, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import API from '../../app/api/api.js'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../app/api/UserContext.jsx'

const Signin = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('') 
  const [signInLoading, setSignInLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const {setCurrentUser} = useContext(UserContext)

  const signIn = async (e) => {
    e.preventDefault()
    setError("")
    if(formData.email === "" || formData.password === ""){
      return setError("Both fields are required to sign-in!")
    }

    try {
      setSignInLoading(true)
      const response = await API.post("/sign-in", formData)
  
      if (!response.data.accessToken || !response.data.user) {
        throw new Error("Missing accessToken or user data in response")
      }
      localStorage.setItem("accessToken", response.data.accessToken)
      localStorage.setItem("user", JSON.stringify(response.data.user))

      await setCurrentUser(response.data.user)
      if (response.data.user.role) {
        setSignInLoading(false)
        const url = response.data.user.role.toLowerCase()
        navigate(`/${url}`)
      }
  
      return response.data.user;
    } catch (error) {
      if(error.response.status === 500){
        setError("Check your internet connection!")
      }else{
        setError(error.response.data.message)
      }
      setSignInLoading(false)
      console.error("Signin failed", error.response)
      return null;
    }
  };
  


  return (
    <>
      <Header />
        <main className='w-full h-[100vh] flex flex-col items-center justify-center px-10'>
          <form className='w-full max-w-md flex flex-col justify-center items-center gap-2 text-[#193920] bg-[#ffffffae] md:bg-transparent p-10 rounded-lg'>
            <p className='font-black text-3xl'>Welcome!</p>
            <label htmlFor="email" className='absolute -left-[10000px]'>Email:</label>
            <input placeholder='Email' type='text' name='email' className='border border-[#25D162] md:border-[#193920] px-2 py-2 w-full rounded-md outline-none text-lg' value={formData.email} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} autoFocus/>
            <label htmlFor="password" className='absolute -left-[10000px]'>Password:</label>
            <input placeholder='Password' type='password' name='password' className='border border-[#25D162] md:border-[#193920] px-2 py-2 w-full rounded-md outline-none text-lg' value={formData.password} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}/>
            {error ? <p className='text-red-600 italic'>{error}</p> : ""}
            {!signInLoading ? <button className='bg-[#193920] text-white font-black text-xl px-6 pt-2 pb-3 rounded-md cursor-pointer hover:opacity-90 active:opacity-80 w-full' onClick={(e) => signIn(e)}>Sign in</button> : <button className='bg-[#193920] text-white font-black text-xl px-6 pt-2 pb-3 rounded-md cursor-pointer hover:opacity-90 active:opacity-80 w-full flex items-center justify-center' onClick={(e) => signIn(e)}>
              <svg className="mr-2 h-5 w-5 animate-spin text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8h-4l3 3 3-3h-4a8 8 0 01-8 8v-4l-3 3 3 3v-4a8 8 0 01-8-8z"/></svg>Signing in...</button>}
          </form>
        </main>
      <Footer />
    </>
  )
}

export default Signin