import React from 'react'
import coinIcon from "../../assets/icons/bx_coin.svg"
import foodIcon from "../../assets/icons/mdi_food.svg"
import personIcon from "../../assets/icons/people_black.svg"
import {motion} from "framer-motion"

const ListItem = ({icon, content, hovermessage}) => {
  const [isHoveredForLi, setIsHoveredForLi] = React.useState(false);
  const PopUpVariantsForLi = {
    hover: {
      y: -20,
      
    },
    initial: {
      x: 0,
      opacity:0,
      scale: 1
    }
  };
  function handleMouseEnterForLi() {
    setIsHoveredForLi(true);
  }

  function handleMouseLeaveForLi() {
    setIsHoveredForLi(false);
  }

  return (
      <motion.li 
      onMouseEnter={handleMouseEnterForLi}
      onMouseLeave={handleMouseLeaveForLi}
      
      className='w-full flex gap-3 items-end group'>   
      <div className='text-xs font-normal relative'>
        <motion.p 
        variants={PopUpVariantsForLi}
        animate={isHoveredForLi ? "hover" : "initial"} 
        className='bg-zinc-400 text-white p-1 px-2 rounded-md absolute w-auto text-nowrap'>{hovermessage}</motion.p>
        <img className='w-10 ' src={icon} alt="" />
      </div>                
      <p>{content}  </p>
    </motion.li> 
  )
}
const MonthDisplay = ({month , date , grade , totalMeal, totalPayment, avaragePerson}) => {
    const [isHovered, setIsHovered] = React.useState(false);
    

    const PopUpVariants = {
      hover: {
        y: -40,
        scale: [1.1, 1]
      },
      initial: {
        x: 0,
        opacity:0,
        scale: 1
      }
    };
    
    const ArrowVariants = {
      hover: {
        rotate:90
      },
      initial: {
        rotate:0
      }
    };
  
    function handleMouseEnter() {
      setIsHovered(true);
    }
  
    function handleMouseLeave() {
      setIsHovered(false);
    }
   
    return(
        <div className='w-[32%] flex flex-col border-gray-700 border-2 rounded-2xl px-3 py-2'>
            <header className='w-full flex flex-col pb-4 pt-2 border-b-2 border-gray-700'>
                <h1 className='text-2xl font-semibold'>{month} ({grade})</h1>
                <p 
                variants={PopUpVariants}
                animate={isHovered ? "hover" : "initial"} 
                className='text-md opacity-85'>{date}</p>
            </header>
            <div className='flex w-full h-full justify-between items-end'>
            <ul className='mt-4 flex flex-col gap-6 text-lg font-semibold'>
              <ListItem icon={foodIcon} content={totalMeal} hovermessage={"Total meals eaten this month"}/>
              <ListItem icon={coinIcon} content={totalPayment} hovermessage={"Total cost for this month"}/>
              <ListItem icon={personIcon} content={avaragePerson} hovermessage={"Number of avarage person ate lunch this month"}/>

            </ul>
           <motion.span 
           onMouseEnter={handleMouseEnter} 
           onMouseLeave={handleMouseLeave}
           className='relative w-10 aspect-square flex justify-center items-center rounded-xl bg-gray-300  hover:bg-opacity-75 duration-300 group'>
           
              <motion.p  
              variants={PopUpVariants}
              animate={isHovered ? "hover" : "initial"} 
              className='w-32 text-center absolute text-xs bg-gray-400 rounded-sm p-1 text-white'>convert this month</motion.p>
            <button>
            <motion.svg 
            variants={ArrowVariants}
            animate={isHovered ? "hover" :"initial"}
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-6'>
           
           <path className='group-hover:fill-emerald-400' fill="#30324a" d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160 352 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l111.5 0c0 0 0 0 0 0l.4 0c17.7 0 32-14.3 32-32l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1L16 432c0 17.7 14.3 32 32 32s32-14.3 32-32l0-35.1 17.6 17.5c0 0 0 0 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.8c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352l34.4 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L48.4 288c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/></motion.svg></button>
           </motion.span>
            </div>
       </div>
    )

}

export default MonthDisplay