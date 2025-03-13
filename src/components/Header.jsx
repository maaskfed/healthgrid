import { useNavigate } from 'react-router-dom'
import API from '../app/api/api.js'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoCloseSharp } from 'react-icons/io5'
import { useState } from 'react'

const Header = ({nav}) => {
  const navigate = useNavigate()
  const [signingOut, setSigningOut] = useState(false)
  const logout = async () => {
    setSigningOut(true)
    const response = await API.post('/sign-out')
    if(response.status === 200){
      setSigningOut(false)
    }
    localStorage.removeItem('user')
    localStorage.removeItem('accessToken')
    window.location.reload();
  };

  const [ham, setHam] = useState("close")

  const handleHeader = (e) => {
    if(ham === "open"){
      setHam("close");
    } else {
      setHam("open");
    }
  }

  const handleNavigation = (item) => {
    if(item === "Home"){
      navigate('/');
    } else if(item === "Logout"){
      logout()
    }else if(item === "Edit Profile"){
      navigate('/update-user');
    }else{
      navigate(`/${item.toLowerCase()}`);
    }
  } 


  return (
    <header className='bg-[#fff] text-[#193920] flex items-center px-5 py-3 justify-between fixed top-0 left-0 right-0 shadow shadow[rgba(0,0,0,0.5)] h-[3.5rem] z-50'>
      <div className='flex items-center justify-between max-w-5xl md:w-3xl w-full mx-auto '>
        <div className='flex items-center gap-1 cursor-pointer' onClick={() => navigate('/')}>
          <img src="/logo.png" alt="" width="25px" height="auto"/>
          <h1 className='font-bold text-2xl'>HealthGrid</h1>
        </div>
        <div>
          {
          location.pathname.includes('admin') || location.pathname.includes('triage') || location.pathname.includes('doctor') ? 
          <div className='flex gap-3'>
            <button className='font-regular bg-[#193920] text-white px-2 py-1 hover:opacity-90 rounded-sm active:opactiy-80 cursor-pointer outline-none hidden md:block' onClick={() => navigate('/update-user')}>Update Profile</button>
            {signingOut ? <button className='font-regular bg-[#193920] text-white px-2 py-1 hover:opacity-90 rounded-sm active:opactiy-80 cursor-pointer outline-none hidden md:flex items-center justify-center' onClick={logout}><svg className="mr-2 h-5 w-5 animate-spin text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8h-4l3 3 3-3h-4a8 8 0 01-8 8v-4l-3 3 3 3v-4a8 8 0 01-8-8z"/></svg>Logging out...</button> :<button className='font-regular bg-[#193920] text-white px-2 py-1 hover:opacity-90 rounded-sm active:opactiy-80 cursor-pointer outline-none hidden md:block' onClick={logout}>Log out</button>}
          </div> : ""
          }
        </div>
        {ham === "close" && nav ? (
          <div key="ham-icon" className="text-[#193920] text-3xl cursor-pointer animate-rotate md:hidden" id="ham-icon" onClick={(e) => handleHeader(e)}>
            <GiHamburgerMenu />
          </div>) : ham === "open" && nav ?
          (<div key="close-icon" className=" text-3xl cursor-pointer animate-rotate md:hidden" id="close-icon" onClick={(e) => handleHeader(e)}>
            <IoCloseSharp />
          </div>
        ) : ""}
        { ham === "open"?
          <>
            <div className="fixed top-14 bottom-0 left-0 right-0 bg-black opacity-70 z-50"></div>
            <nav className="fixed top-14 bottom-0 left-[65%] right-0 bg-[#193920] text-white animate-slideIn z-50">
              <ul>
                {nav? nav.map(item => <li key={item} onClick={() => handleNavigation(item)} className="h-20 flex justify-center items-center border-b-[1px] font-montserrat cursor-pointer animate-slideIn">{item}</li>) : ""}
              </ul>
            </nav>
          </> 
          
        : null}
        
      </div>
      
      
    </header>
  )
}

export default Header