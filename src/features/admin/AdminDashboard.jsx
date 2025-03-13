import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState} from 'react';
import { UserContext } from '../../app/api/UserContext.jsx';
import API from '../../app/api/api.js';

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [userReload, setUserReload] = useState(false)
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [removingStaff, setRemovingStaff] = useState({state: false, id: ""})
  const { currentUser, users, setUsers } = useContext(UserContext)

  useEffect(() => {
    const fetchUsers = async () => {
        try{
            setLoadingUsers(true)
            const response = await API.get('/users')
            if(response.status === 200){
              setLoadingUsers(false)
            }
            setUsers(response.data.filter(user => user.email !== currentUser.email && user.fullname !== "Admin"))
        } catch (err) {
          setLoadingUsers(false)
          console.log(err.message)
        }
    }
    fetchUsers();
  }, [userReload, setUsers])

  const removeStaff = async (staff_id) => {
    try{
      setRemovingStaff({state: true, id: staff_id})
      const response = await API.delete(`/users/${staff_id}`);
      if(response.status === 200){
        setRemovingStaff({state: false, id: ""})
        setUserReload(true)
      }
    } catch (err) {
      setRemovingStaff({state: false, id: ""})
      console.log(err.message)
    }
  }

  return (
    <>
      <Header nav={["Triage", "Doctor", "Edit Profile"]}/>
        <main className='max-w-3xl mx-auto min-h-[100vh] pt-[4.5rem] pb-16 px-5 md:px-0 flex flex-col gap-2'>
          <section>
            <button className='bg-[#193920] w-full text-xl py-2 font-bold rounded-md cursor-pointer hover:opacity-95 active:opacity-90 text-white font-montserrat' onClick={() => navigate('/admin/new-user')}>Add Staff</button>
          </section>
          { loadingUsers ? <p className='flex items-center justify-center bg-[#193920ae] text-center px-3 py-2 rounded-md text-white font-bold'><svg className="mr-2 h-5 w-5 animate-spin text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8h-4l3 3 3-3h-4a8 8 0 01-8 8v-4l-3 3 3 3v-4a8 8 0 01-8-8z"/></svg>Loading...</p> :<section className='flex flex-col gap-2 text-[#193920]'>
            {users && currentUser ? users.map(staff => 
              <article key={staff._id} className='flex items-start rounded-md p-3 bg-[#ffffff] shadow shadow-[rgba(0,0,0,0.5)]'>
                <div className='flex flex-col w-full'>
                  <h2 className='font-extrabold'>{staff.fullname}</h2>
                  <p>{staff.role}</p>
                </div>
                { removingStaff.state && removingStaff.id === staff._id ? <button className='bg-red-600 text-white px-2 py-1 rounded-md font-bold cursor-pointer hover:opacity-80 active:opacity-70 flex items-center justify-center' onClick={() => removeStaff(staff._id)}><svg className="mr-2 h-5 w-5 animate-spin text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8h-4l3 3 3-3h-4a8 8 0 01-8 8v-4l-3 3 3 3v-4a8 8 0 01-8-8z"/></svg>Removing...</button> : <button className='bg-red-600 text-white px-2 py-1 rounded-md font-bold cursor-pointer hover:opacity-80 active:opacity-70' onClick={() => removeStaff(staff._id)}>Remove</button>}
              </article>
            ) : <p></p>}
          </section>}
        </main>
      <Footer />
    </>
  )
}

export default AdminDashboard