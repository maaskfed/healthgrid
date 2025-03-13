import { useContext } from 'react'
import Header from '../../components/Header'
import { useNavigate } from 'react-router-dom';
//import { patients } from '../../app/api/patients';
import Footer from '../../components/Footer';
import { format, differenceInYears } from 'date-fns'
import { PatientContext } from '../../app/api/PatientContext.jsx';
import { UserContext } from '../../app/api/UserContext.jsx';

const DoctorDashboard = () => {

  const navigate = useNavigate()
  const {patients, searchValue, setSearchValue} = useContext(PatientContext)
  const {currentUser} = useContext(UserContext)
  const nowDate = new Date()
  const patient = patients?.find(patient => patient.id === searchValue);

  return (
    <>
      <Header nav={["Edit Profile","Logout"]}/>
      <main className='flex min-h-[100vh] flex-col pt-[4.5rem] pb-16 px-5 md:px-0 font-montserrat justify-center items-center mx-auto gap-3 md:flex-row max-w-[427px] md:max-w-6xl'>
      <div className='flex flex-col gap-3 md:flex-row max-w-[427px] md:max-w-6xl'>
        <section className='flex flex-col items-center justify-center p-10 gap-2 bg-[#193920ae] rounded-md text-white shadow shadow-[rgba(0,0,0,0.5)]'>
          <div>
          <h2 className='text-2xl text-center md:text-white'><span className='font-black '>Hello </span>Dr. {currentUser.fullname.split(' ').at(-1)}!</h2>
          <p className='text-center text-[1.05rem] font-normal md:text-white'>Search for your patient by ID</p>
          </div>
          
          <form className='w-full max-w-md flex flex-col gap-2 items-center'>
            <label htmlFor="patient_id" className='absolute -left-[10000px]'>Patient ID:</label>
            <input placeholder='Patient ID' type='text' name='patient_id' className='border border-[#fff] px-2 py-2 rounded-sm outline-none text-lg text-center md:text-white' autoFocus value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
          </form>
        </section>
        
        <section className='flex flex-col'>
          {patient ?
            <article key={patient.id} className='flex flex-col justify-center text-[#193920] rounded-md h-full p-4 bg-white shadow shadow-[rgba(0,0,0,0.5)]'>
            <div className='flex justify-between w-full'>
              <div className='flex flex-col w-full'>
                <h2 className='font-bold'>{patient.fullname}</h2>
                <p className='text-sm'>{patient.id}</p>
              </div>
              <button className='bg-[#193920] text-[#fff] px-2 py-1 rounded-md font-bold cursor-pointer hover:opacity-90 active:opacity-80' onClick={() => navigate(`/doctor/${patient.id}`)}>Update</button>
            </div>
            <div className='text-sm flex flex-col gap-1'>
              <p>Age: {differenceInYears(nowDate, patient.dob) > 1 ? `${differenceInYears(nowDate, patient.dob)} years` : `${differenceInYears(nowDate, patient.dob)} year`}</p>
              <p>Gender: {patient.gender}</p>
              <p>Phone: {patient.phone}</p>
            </div>
            <div className='relative border p-3 w-full mt-4'>
              <h3 className='font-bold absolute left-2 -top-3 bg-white text-sm px-1'>Medical history</h3>
              <ul className='list-disc ml-4'>
                {patient.medical_history.map(history => <li className='text-sm' key={history}>{history}</li>)}
              </ul>
            </div>
            <div className='relative border p-3 w-full mt-4'>
              <h3 className='font-bold absolute left-2 -top-3 bg-white text-sm px-1'>Triage note</h3>
              <p className='text-sm'>{patient.triage_notes}</p>
            </div>
            <div className='relative border p-3 w-full mt-4'>
              <h3 className='font-bold absolute left-2 -top-3 bg-white text-sm px-1'>Diagnosis</h3>
              <ul className='list-disc ml-4'>
                {patient.diagnosis.map(diagnosis => <li className='text-sm' key={diagnosis}>{diagnosis}</li>)}
              </ul>
            </div>
            <div className='relative border p-3 w-full mt-4'>
              <h3 className='font-bold absolute left-2 -top-3 bg-white text-sm px-1'>Treatment Plan</h3>
              <p className='text-sm'>{patient.treatment_plan}</p>
            </div>
            <div className='relative border p-3 w-full mt-4'>
              <h3 className='font-bold absolute left-2 -top-3 bg-white text-sm px-1'>Prescription</h3>
              <ul className='list-disc ml-4'>
                {patient.prescription.map(prescription => <li className='text-sm' key={prescription}>{prescription}</li>)}
              </ul>
            </div>
            <div className='relative border p-3 w-full mt-4'>
              <h3 className='font-bold absolute left-2 -top-3 bg-white text-sm px-1'>Appointment</h3>
              <p className='text-sm'>{patient.appointment > nowDate.toISOString() ? format(patient.appointment, 'MMMM do, yyyy - hh:mm a') : "None"}</p>
            </div>
          </article> : searchValue.trim() === "" ? <p></p> : <article className='flex flex-col justify-center text-[#f00] font-semibold italic rounded-md h-full md:p-14 px-5 py-2 bg-[#ffffffae] shadow shadow-[rgba(0,0,0,0.5)] text-center'>No patient with that ID!</article>
          }
        </section>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default DoctorDashboard