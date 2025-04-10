import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Day from '../components/dashboard/Day';
import { div } from 'framer-motion/m';

const DashBoardTable = ({displayMonth, grade, day}  ) => {

    const numberToMonthMap = {
        1: "Jan",
        2: "Feb",
        3: "Mar",
        4: "Apr",
        5: "May",
        6: "June",
        7: "July",
        8: "Aug",
        9: "Sep",
        10: "Oct",
        11: "Nov",
        12: "Dec",
      };
      const convertedMonth = numberToMonthMap[displayMonth];
    //   monthss
      
    const[monthss,setMonths] = useState([])
    const FetchUsers=() => {fetch('http://localhost:8080/dashboard')
    .then(response => response.json())
    .then(json => setMonths(json))}
    useEffect(()=>{
        FetchUsers()
    })
    console.log("Props:", { displayMonth, grade, day });
    
    const StringNum = day.toString()
    
    const matchingObjects = monthss.filter((month) => {
        console.log(`Checking: ${month.MonthName} === ${displayMonth}`);
        console.log(`Checking: ${grade} === "all classes" || ${month.grade} === ${grade}`);
        console.log(`Checking: ${!day} || ${month.Day} === ${day.toString()}`);
        
        return (
            month.MonthName === convertedMonth &&
            (grade === "all classes" || month.grade === grade) &&
            (!day || month.Day.trim() === day.toString().trim())
          );
        
      });
      
      console.log("Matching Objects:", matchingObjects);
      

    
    
    return(
        <div className='w-full'>
             {matchingObjects.length > 0 ? (
        <div className='w-full flex flex-row flex-wrap gap-y-2 items-center justify-start  '>
          
            {matchingObjects.map((match, index) => (
              <div className='w-1/2 py-3 px-2 flex items-center justify-center '>
                <div key={index} className='w-full mx-2 flex flex-col border-3 border-sky-900 rounded-xl overflow-hidden'>
                    
                    <div className='font-semibold bg-gradient-to-l from-emerald-400 to-sky-900 text-slate-100 pl-2 text-xl flex gap-2 py-1'>
                         <p>{match.grade}</p>
                         <span className='flex font-normal'>
                            <p>( {match.MonthName}</p>.
                            <p className='ml-[2px]'>{match.Day} )</p>
                         </span>
                    </div>
                    <div className='bg-gray-900 text-slate-100 p-2'>
                        <p>class total meal</p>
                        <p>class total meal</p>
                        <p>class total meal</p>                        
                    </div>
                    
                    
                </div>
              </div>
            ))}
          
        </div>
      ) : (
        <div className='w-full p-3'>
          <p className='w-full border-2 border-red-500 bg-red-300 p-4 text-red-800 rounded-xl'>No matching Data</p>
        </div>
      )}
        </div>
    )
}

export default DashBoardTable