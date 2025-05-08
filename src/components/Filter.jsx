import React from 'react'

const Filter = () => {
    const m = new Date()
  const months = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"]
  const activeMonthNumber = m.getMonth()
  const activeMonth = months[activeMonthNumber]
  const [selectedMonth, setSelectedMonth] = React.useState(activeMonth)
  
  const [open, setOpen] = React.useState(false)
  const SchoolClasses = [
    "all classes","6.1","6.2","7.1","7.2","8.1","8.2","9.1","9.2","10.1","10.2","11.1","11.2","12.1","12.2",
  ]
  const [selectedClass, setSelectedClass] = React.useState() 
  function selectClass(e){
    setSelectedClass(e.target.value)
  }

  const [daysInMonth, setDaysInMonth] = React.useState([]);
  const [selectedDay, setSelectedDay] = React.useState("");

  const getDaysInMonth = (month) => {
    const monthIndex = months.indexOf(month); // Get zero-based month index
    const year = m.getFullYear(); // Assume the current year
    return new Date(year, monthIndex + 1, 0).getDate(); // Get the number of days
  };

  const handleChange = (e) => {
    const newMonth = e.target.value;
    setSelectedMonth(newMonth);
    const days = getDaysInMonth(newMonth);
    setDaysInMonth([...Array(days).keys()].map((d) => d + 1)); // Generate days array [1, 2, ..., days]
  };

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };
  React.useEffect(() => {
  const days = getDaysInMonth(selectedMonth);
  setDaysInMonth([...Array(days).keys()].map((d) => d + 1));
}, [selectedMonth]);
  return (
    <div className='flex gap-2 z-50'>
                    <div className='flex h-12 items-center border-b-2 w-32 relative border-pink-accent cursor-pointer'>
                      <select value={selectedMonth} onChange={(e)=>handleChange(e)} className='appearance-none flex flex-row gap-1 pl-3 text-lg py-1  w-32 outline-none bg-transparent cursor-pointer'> 
                          {months.map((month)=>{
                            return(
                              <option key={month} value={month} className='text-background'>{month}</option>
                            )
                          })}
                      </select>
                        <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className='rotate-90 absolute right-0'>
                        <path d="M16.904 13.16L19.026 11.04L30.584 22.594C30.7703 22.7791 30.9181 22.9993 31.019 23.2418C31.1199 23.4843 31.1719 23.7443 31.1719 24.007C31.1719 24.2696 31.1199 24.5297 31.019 24.7722C30.9181 25.0147 30.7703 25.2348 30.584 25.42L19.026 36.98L16.906 34.86L27.754 24.01L16.904 13.16" fill="#f5f5f5"/>
                        </svg>
                    </div>
                    <div className='flex h-12 items-center w-36 border-b-2 border-pink-accent relative'>
                      <select value={selectedClass} onChange={(e)=>selectClass(e)} className='appearance-none flex flex-row gap-1 pl-3 text-lg py-1  w-32 outline-none bg-transparent cursor-pointer'> 
                          {SchoolClasses.map((month)=>{
                            return(
                              <option className='text-background'>{month}</option>
                            )
                          })}
                      </select>
                        <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className='rotate-90 absolute right-0'>
                        <path d="M16.904 13.16L19.026 11.04L30.584 22.594C30.7703 22.7791 30.9181 22.9993 31.019 23.2418C31.1199 23.4843 31.1719 23.7443 31.1719 24.007C31.1719 24.2696 31.1199 24.5297 31.019 24.7722C30.9181 25.0147 30.7703 25.2348 30.584 25.42L19.026 36.98L16.906 34.86L27.754 24.01L16.904 13.16" fill="#f5f5f5"/>
                        </svg>
                    </div>
                    <div className='flex h-12 items-center w-36 border-b-2 border-pink-accent relative'>
                    <select value={selectedDay} onChange={handleDayChange} className='appearance-none flex flex-row gap-1 pl-3 text-lg py-1  w-32 outline-none bg-transparent cursor-pointer'>
                      {daysInMonth.map((day) => (
                        <option key={day} className='text-background'>{day}</option>
                      ))}
                    </select>
                        <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className='rotate-90 absolute right-0'>
                        <path d="M16.904 13.16L19.026 11.04L30.584 22.594C30.7703 22.7791 30.9181 22.9993 31.019 23.2418C31.1199 23.4843 31.1719 23.7443 31.1719 24.007C31.1719 24.2696 31.1199 24.5297 31.019 24.7722C30.9181 25.0147 30.7703 25.2348 30.584 25.42L19.026 36.98L16.906 34.86L27.754 24.01L16.904 13.16" fill="#f5f5f5"/>
                        </svg>
                        
                    </div>
                  </div>  )
}

export default Filter