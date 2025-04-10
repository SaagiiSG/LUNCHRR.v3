import React, { useEffect } from 'react'
import Navbar from '../components/navbar/Navbar'
import peopleIcon from "../assets/icons/people.svg"
import SearchIcon from "../assets/icons/SearchOutline.svg"
import Popup from '../components/users/Popup'
import DeleteUser from '../components/users/deleteUser'
import {motion} from "framer-motion"
import Details from "../components/details"
import { Users } from 'lucide-react'

// import UserListItem from '../components/users/UserListItem'
// import { data } from '@remix-run/router/dist/utils'
function UserListItem({ name, username, id, phone, initialChecked, onToggle }){
  const[isChecked, setIsChecked] = React.useState(initialChecked);

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;  // Get the checked state
    setIsChecked(checked);
    onToggle(checked);  // Pass the checked state back to parent

  };

  return (
    <tr className='even:bg-gray-100 even:bg-opacity-5 odd:bg-gray-500 odd:bg-opacity-15 w-full px-5'>
      <td className='h-14 text-lg font-md text-center w-[30%]'>{name}</td>
      <td className='h-14 text-lg font-md text-center w-[20%]'>{username}</td>
      <td className='h-14 text-lg font-md text-center w-[20%]'>{id}</td>
      <td className='h-14 text-lg font-md text-center w-[20%]'>{phone}</td>
      <td className='h-14 w-full flex items-center justify-center text-center pr-2'>
        <label className="flex items-center cursor-pointer relative">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-gray-700 checked:bg-emerald-400 checked:border-slate-800"
          />
          <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </span>
        </label>
      </td>
    </tr>
  );
  }

const AllUser = ({loggedIn}) => {
    const m = new Date()
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const activeMonthNumber = m.getMonth()
    const activeMonth = months[activeMonthNumber]

    const [selectedUserNames, setSelectedUserNames] = React.useState([]); // State for selected user's name

    const toggleChecked = (checked, name, id) => {
      setSelectedUserNames((prevSelectedNames) => {
        if (checked) {
          return [...prevSelectedNames, {name:name, id:id}]; // Add user name if checked
        } else {
          return prevSelectedNames.filter((selectedName) => selectedName !== name); // Remove user name if unchecked
        }
      });
    };
    
    const length = selectedUserNames.length
    
    const deselectUser = (name) => {
      setSelectedUserNames((prevSelectedNames) => 
        prevSelectedNames.filter((selectedName) => selectedName !== name)
      );
    };

    const[users,setUsers] = React.useState([])
    const FetchUsers=() => {fetch('http://localhost:8080/')
    .then(response => response.json())
    .then(json => setUsers(json))}
    useEffect(()=>{
      FetchUsers()
    },[])

   
    


    const [isAddNewDisplay, setAddNewUser] = React.useState(false)

   function DisplayAddNewUser(){
      setAddNewUser(!isAddNewDisplay)
   }
   const [searchQuery, setSearchQuery] = React.useState("");
   const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <main className='w-full h-screen flex'>
      <Navbar activebtnNumber={2} loggedIn={loggedIn}/>
      <motion.article 
         initial={{opacity:0, background:"#f5f5f5"}}
         animate={{opacity:1}}
         transition={{delay:0, duration:0.6}}
        className='w-full h-full rounded-tl-3xl bg-gray-900 p-4 overflow-auto flex flex-col items-start justify-center gap-4 relative'>
        
        {isAddNewDisplay ? <Popup handleClick={DisplayAddNewUser}/> : ""}
        <Details pageName={"User control"} pagePath={"/Users"}/>
        <section className='relative flex flex-col w-full gap-4 items-start text-lgx  py-5 px-4 bg-gray-800 text-white rounded-2xl'>
          <div className='flex w-full items-center justify-between'>
          
            <div className='flex gap-4 items-center'>
              <Users className='text-emerald-400'/>
              <p className='text-2xl font-semibold'>Users</p>
            </div>
          
            <div className='bg-white bg-opacity-95 text-gray-800 rounded-2xl items-center h-12 w-1/2 flex px-2 gap-2'>
              <img src={SearchIcon} alt="" />
              <input
                  type="text"
                  placeholder='Search by name'
                  className='bg-transparent outline-none'
                  value={searchQuery} // Bind the input to the state
                  onChange={(e) => setSearchQuery(e.target.value)} // Update state on change
                />
            </div>

            <button onClick={DisplayAddNewUser} className='group hover:scale-105 hover:bg-opacity-90 duration-300 flex items-center gap-2 px-4 rounded-2xl h-12 bg-sky-900'>
              <p> add new user </p> 
              <span className='text-3xl rotate-180 group-hover:rotate-0 duration-300'>+</span>
            </button>
          </div>
          
          <DeleteUser ShouldDisplay={length} names={selectedUserNames} deselect={deselectUser}/>
        </section>
        
        <section className='w-full h-full border-2 rounded-2xl border-gray-900 overflow-auto mb-4'>
          <table className='w-full relative border-collapse'>
            <tr className='bg-white sticky top-0 border-b-2 border-background z-50'>
              <th className='h-16 text-xl font-semibold w-[30%] border-b-2 border-background'>Name</th>
              <th className='h-16 text-xl font-semibold w-[20%] border-b-2 border-background'>Last name</th>
              <th className='h-16 text-xl font-semibold w-[20%] border-b-2 border-background'>Card Id</th>
              <th className='h-16 text-xl font-semibold w-[20%] border-b-2 border-background'>{activeMonth} payment</th>
              <th className='h-16 text-xl font-semibold w-[10%] border-b-2 border-background'></th>
            </tr>
            <tbody>
             
                {filteredUsers.map((uData) => (
                <UserListItem
                  key={uData.id}
                  name={uData.name}
                  username={uData.username}
                  id={uData.id}
                  phone={uData.phone}
                  initialChecked={selectedUserNames.includes(uData.name, uData.id)}
                  onToggle={(checked) => toggleChecked(checked, uData.name, uData.id)}
                />
              ))}
            </tbody>
          </table>
        </section>
        
      </motion.article>
    </main>
  )
}

export default AllUser