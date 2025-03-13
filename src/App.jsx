import { Routes, Route } from 'react-router-dom'
import Signin from './features/auth/Signin.jsx'
import Home from './Home.jsx'
import DoctorDashboard from './features/doctor/DoctorDashboard.jsx'
import TriageDashboard from './features/triage/TriageDashboard.jsx'
import PatientUpdate from './features/doctor/PatientUpdate.jsx'
import AdminDashboard from './features/admin/AdminDashboard.jsx'
import NewUser from './features/admin/NewUser.jsx'
import TriageAddPatient from './features/triage/TriageAddPatient.jsx'
import TriageUpdatePatient from './features/triage/TriageUpdatePatient.jsx'
import ForgotPatientID from './features/triage/ForgotPatientID.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import UpdateUser from './components/UpdateUser.jsx'

function App() {
  return(
    <Routes>
      <Route path='/'>
        <Route index element={<Home />} />
        <Route path='sign-in' element={<Signin/>} />
        <Route element={<PrivateRoute />}>
          <Route path='doctor'>
            <Route index element={<DoctorDashboard />} />
              <Route path=':id'>
                <Route index element={<PatientUpdate />} />
              </Route >
          </Route>
          <Route path='triage'>
            <Route index element={<TriageDashboard />} />
            <Route path='new-patient' element={<TriageAddPatient />}/>
            <Route exact path='forgot-id' element={<ForgotPatientID />}/>
            <Route path=':id'>
              <Route index element={<TriageUpdatePatient />} />
            </Route >
          </Route>
          <Route path='admin'>
            <Route index element={<AdminDashboard />} />
            <Route path='new-user' element={<NewUser />} />
          </Route>
          <Route path='update-user' element={<UpdateUser />}/>
          </Route>
      </Route>
    </Routes>
  )
}

export default App
