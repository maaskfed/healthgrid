import Header from './components/Header'
import Footer from './components/Footer'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate()

  return (
    <>
      <Header page='home'/>
      <main className='flex flex-col items-center justify-center w-full min-h-[100vh] max-w-3xl mx-auto px-10 text-[#193920]'>
          <h2 className='text-2xl font-black'>HealthGrid</h2>
          <p className='text-xl text-center mb-2'>A modern health management system designed to streamline hospital and clinic operations. HealthGrid simplifies patient record management, appointment scheduling, and medical data tracking. With secure access and an intuitive interface, healthcare professionals can focus on providing quality care while ensuring efficiency and compliance.</p>
          <button className='bg-[#fff] text-[#193920] font-black text-xl px-6 pt-2 pb-3 rounded-md cursor-pointer hover:opacity-90 active:opacity-80' onClick={() => navigate('/sign-in')}>
              Sign in
          </button>
      </main>
      <Footer />
    </>
  )
}

export default Home