import { useContext, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom'
import QRCode from 'react-qr-code'
import { PatientContext } from '../../app/api/PatientContext.jsx'
import { format, differenceInYears } from 'date-fns'

const ForgotPatientID = () => {
  const navigate = useNavigate()
  const [patient, setPatient] = useState(null)
  const [isError, setIsError] = useState(false)
  const { patients } = useContext(PatientContext);
  const [searchValues, setSearchValues] = useState({
    fullname: "",
    phone: ""
  });

  const nowDate = new Date()

  const printIdCard = () => {
    const divContents = document.getElementById('id-card').innerHTML
  
    // Get the styles from the main document
    let styles = Array.from(document.styleSheets)
      .map((sheet) => {
        try {
          return Array.from(sheet.cssRules)
            .map((rule) => rule.cssText)
            .join('\n')
        } catch (e) {
          console.log(e)
          return ''
        }
      })
      .join('\n');
    const printWindow = window.open('', '', 'width=800,height=600')
    printWindow.document.write('<html><head><title>Print ID</title>')
    printWindow.document.write('<style>' + styles + '</style>')
    printWindow.document.write('<style>body { background: white !important; margin: 0; padding: 0; }</style>')
    printWindow.document.write('</head><body>')
    printWindow.document.write(divContents)
    printWindow.document.write('</body></html>')
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print()
    }, 500)
  }
  
  let data
  if(patient){
    data = `Name: ${patient.fullname}\n Patient ID: ${patient.id}\nGender: ${patient.gender}\nD.O.B: ${patient.dob}\nPhone: ${patient.phone}\nAddress: ${patient.address}`
  }

  const searchPatient = (e) => {
    e.preventDefault()
    const foundPatient = patients.find(patient => patient.phone === searchValues.phone && patient.fullname === searchValues.fullname)
    if(foundPatient){
      setIsError(false)
      setPatient(foundPatient)
    } else{
      setIsError(true)
      setPatient(null)
    }
  }

  return (
    <>
      <Header />
      <main className='flex min-h-[100vh] flex-col md:gap-0 gap-3 px-5 pt-[4.5rem] pb-16 font-montserrat max-w-6xl items-center justify-center mx-auto'>
        <div className='flex flex-col gap-3 md:flex-row max-w-[427px] md:max-w-6xl'>
        <section className='flex flex-col items-center md:items-start justify-center  p-8 pt-6 gap-2 bg-[#193920ae] rounded-md text-white shadow shadow-[rgba(0,0,0,0.5)]'>
          <div>
            <p className='text-xl md:text-2xl font-bold md:text-white'>Search for patient</p>
          </div>
          
          <form className='w-full max-w-md flex flex-col gap-2 items-center'>
            <div>
              <label htmlFor="fullname" className=''>Fullname:</label>
              <input placeholder='Mohamed Kamara' type='text' name='fullname' className='border border-[#25D162] px-2 py-2 w-full rounded-sm outline-none md:text-white' autoFocus value={searchValues.fullname} onChange={(e) => setSearchValues({...searchValues, [e.target.name]: e.target.value})}/>
            </div>
            
            <div className='w-full'>
            <label htmlFor="phone" className=''>Phone:</label>
            <input placeholder='+23200123456' type='text' name='phone' className='border border-[#25D162] px-2 py-2 w-full rounded-sm outline-none md:text-white' value={searchValues.phone} onChange={(e) => setSearchValues({...searchValues, [e.target.name]: e.target.value})}/>
            </div>

          <button onClick={(e) => searchPatient(e)} className='bg-white w-full p-2 text-xl rounded-md text-[#193920] font-black cursor-pointer hover:opacity-90 active:opacity-80'>Search</button>

            
          </form>
        </section>
        
        <section className='flex flex-col'>
          {patient ?
            <article key={patient.id} className='flex flex-col justify-center text-[#193920] rounded-md h-full p-4 bg-white shadow shadow-[rgba(0,0,0,0.5)]'>
            <div className='flex justify-between w-full'>
              <div className='flex flex-col w-full'>
                <h2 className='font-bold'>{patient.fullname}</h2>
                <p className='text-sm font-medium'>{patient.id}</p>
              </div>
              <button className='bg-[#193920] text-[#fff] px-2 py-1 rounded-md font-bold cursor-pointer hover:opacity-95 active:opacity-90' onClick={() => navigate(`/triage/${patient.id}`)}>Update</button>
            </div>
            <div className='text-sm font-medium flex flex-col gap-1'>
              <p>Age: {differenceInYears(nowDate, patient.dob) > 1 ? `${differenceInYears(nowDate, patient.dob)} years` : `${differenceInYears(nowDate, patient.dob)} year`}</p>
              <p>Gender: {patient.gender}</p>
              <p>Phone: {patient.phone}</p>
              <p>Address: {patient.address}</p>
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
            <button className='bg-[#193920] text-white mt-3 py-3 font-bold cursor-pointer hover:opacity-95 active:opacity-90 hidden md:block' onClick={printIdCard}>Print ID</button>
          </article> : searchValues.fullname.trim() === "" || searchValues.phone.trim() ? <p></p> : ""}
          {isError ? <article className='flex flex-col justify-center text-[#f00] font-semibold italic rounded-md h-full md:p-14 px-5 py-2 bg-[#ffffffae] shadow shadow-[rgba(0,0,0,0.5)] text-center'>No patient with that ID!</article> : ""
          }
        </section>
        </div>
        {patient ? <div id='id-card'>
            <article className='w-[426.5px] h-[270.5px] bg-[#193920] rounded-xl mt-5 relative overflow-hidden hidden md:flex md:flex-col'>
              <div className='w-full h-[30%] bg-[url("healthgridbg.jpg")] rounded-t-xl bg-cover bg-right flex flex-col items-center justify-center text-[#193920]'>
                <p className='font-black'>HealthGrid</p>
                <p className='-mt-1'>ID Card</p>
              </div>
              <img src="dummypp.jpg" alt="" className='w-[25%] rounded-full absolute top-7 left-5' />
              <div className='w-full h-[70%] flex'>
                <div className='w-[35%] h-[100%] bg-white flex items-center justify-center pt-7'>
                  <QRCode value={data} size={106} fgColor='#193920'/>
                </div>
                <div className='w-[65%] h-[100%] bg-[#193920]  text-white text-sm px-3 flex flex-col gap-1 justify-center'>
                  <p><span className='font-bold'>Name: </span>{patient.fullname}</p>
                  <p><span className='font-bold'>Patient ID: </span>{patient.id}</p>
                  <p><span className='font-bold'>D.O.B: </span>{patient.dob}</p>
                  <p><span className='font-bold'>Gender: </span>{patient.gender}</p>
                  <p><span className='font-bold'>Phone: </span>{patient.phone}</p>
                  <p><span className='font-bold'>Address: </span>{patient.address}</p>
                </div>
              </div>
              
            </article>
          </div> : ""}
        
      </main>
      <Footer />
    </>
  )
}

export default ForgotPatientID