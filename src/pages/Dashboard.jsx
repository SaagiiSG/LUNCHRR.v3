import React from 'react'
import DashBoardTable from './dashBoardTable'
import TopThree from '../components/dashboard/TopThree'
import Navbar from '../components/navbar/Navbar'
import { motion } from 'framer-motion'
import { Calendar } from '..//components/ui/calendar'
import { Button } from '../components/ui/button'
import { ChevronRight, LayoutDashboard } from 'lucide-react'
import Details from '../components/details'

const Dashboard = ({loggedIn}) => {
  
  const m = new Date()
  const months = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"]
  const activeMonthNumber = m.getMonth() 
  const activeMonth = months[activeMonthNumber]
  const [selectedMonth, setSelectedMonth] = React.useState(activeMonth)
  const todayDay = m.getDate();

  const [open, setOpen] = React.useState(false)
  const SchoolClasses = [
    "all classes","6.1","6.2","7.1","7.2","8.1","8.2","9.1","9.2","10.1","10.2","11.1","11.2","12.1","12.2",
  ]
  const [selectedClass, setSelectedClass] = React.useState("all classes") 
  function selectClass(e){
    setSelectedClass(e.target.value)
  }

  const [selectedDay, setSelectedDay] = React.useState(todayDay);
  const [selectedDate, setSelectedDate] = React.useState(null);
    
    const handleDateChange = (date) => {
      if (date) {

        setSelectedDate(date);
        const month = date.getMonth() + 1; 
        const day = date.getDate();

        setSelectedDay(day)
        setSelectedMonth(month)
      }
    };
    
    const [openCalendar, setOpenCalendar] = React.useState(false)
    const handleCalendarOpen = () => {
      setOpenCalendar(true);
    };
    const handleCalendarClose = () => {
      setOpenCalendar(false);
    };
    const handleCalendarChange = (date) => {
      setSelectedDate(date);
      handleCalendarClose();
    };

    return (
   <main
      className='w-full h-[100vh]  flex text-slate-50'>
      <Navbar activebtnNumber={1} loggedIn={loggedIn}/>
      <motion.article 
        initial={{opacity:0, background:"#f5f5f5"}}
        animate={{opacity:1}}
        transition={{delay:0, duration:0.6}}
        className='w-full rounded-tl-3xl py-4 px-4 text-white overflow-auto flex flex-col gap-4 '>
        <Details pagePath={"/"}/>
        <motion.div 
          layout
          initial={{height:"72px", borderRadius:"1rem"}}
          animate={{height:"fit-content",borderRadius:"1rem"}}
          transition={{duration:"0.3"}}
          className='group w-full h-fit  bg-gray-900 py-4 ' >
            <motion.button layout  className='flex w-full justify-between items-center text-lgx  py-1  px-4  text-white rounded-2xl'>
                <motion.div layout className='flex gap-4 items-center relative'>
                  <LayoutDashboard />
                  <p className='text-2xl'>Admin dashboard</p>
                  <div className='flex gap-2 z-50'>
                   
                    <div className='flex h-14 items-end w-38 border-b-2 relative border-neutral-700 '>
                      <select value={selectedClass} onChange={selectClass} className='appearance-none flex flex-row gap-1 pl-1 text-md py-2  w-32 outline-none bg-transparent cursor-pointer '> 
                          {SchoolClasses.map((classOption)=>{
                            return(
                              <option key={classOption} className=' text-gray-900 font-small'>{classOption}</option>
                            )
                          })}
                      </select>
                        <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className='rotate-90 absolute right-0 bottom-1'>
                        <path d="M16.904 13.16L19.026 11.04L30.584 22.594C30.7703 22.7791 30.9181 22.9993 31.019 23.2418C31.1199 23.4843 31.1719 23.7443 31.1719 24.007C31.1719 24.2696 31.1199 24.5297 31.019 24.7722C30.9181 25.0147 30.7703 25.2348 30.584 25.42L19.026 36.98L16.906 34.86L27.754 24.01L16.904 13.16" fill="#f5f5f5"/>
                        </svg>
                    </div>
                    
                    <button  className={` overflow-hidden flex h-14 items-start justify-center w-auto border-b-2 relative border-neutral-700 z-0}`}>
                   <Calendar captionLayout='dropdown-buttons' className='z-10' fromYear={2020} toYear={2025}/>
                   </button>
                         
                  </div>
                </motion.div>
                
                  <Button onClick={()=>{ setOpen(!open)}} variant={"ghost"} size={"icon"}>
                    <ChevronRight className='size-6 rotate-90'/>
                  </Button>
              </motion.button> 

             {open && <TopThree/>}
        </motion.div>
        <section className='w-full h-full mb-3 flex flex-col items-center text-gray-900 border-gray-900 border-2 rounded-2xl overflow-auto'>
              
          <DashBoardTable displayMonth={selectedMonth} grade={selectedClass} day={selectedDay}/>
        
        </section>
      </motion.article>
      </main>
  )
}

export default Dashboard
