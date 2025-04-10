import React from 'react'
import { Link } from 'react-router-dom'
const NavBtn = ({icon , btnName , path, activeBtn}) => {
  
  // const [active, setActive] = React.useState(false)'
  const activeClass = 'bg-emerald-400 w-full py-2 px-2 rounded-lg flex flex-row items-center gap-6 text-xl group cursor-pointer'
  const inActiveClass = 'hover:text-black w-full py-2 px-2 rounded-lg flex flex-row items-center gap-6 text-xl group cursor-pointer hover:bg-white hover:bg-opacity-10'
  return (
    
        <Link to={path} className={activeBtn ? activeClass : inActiveClass}>
            <span>{icon}</span>
            <p className='group-hover:scale-105 duration-200'>{btnName}</p>
            </Link>
        
  )
}

export default NavBtn 