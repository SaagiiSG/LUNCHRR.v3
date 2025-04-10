import React from 'react'
import NavBtn from './navbar/NavBtn'
import { LogOut } from 'lucide-react'
import { HelpCircle } from 'lucide-react';

const Profile = (props, ) => {
  
  return (
    <section className='w-full py-8 flex flex-col items-start gap-4'>
      <div className='w-full flex flex-row items-start gap-6 px-4'>
        <img src={props.userUrl} alt="" className='w-16 h-16 rounded-full'/>
        <div className=''>
          <h1>
            {props.userName}
          </h1>
          <h2 className='text-sm opacity-85'>{props.userAcces}</h2>
        </div>
      </div>
      <div className='w-full flex flex-col items-start gap-6 px-4'>
      {props.activebtnNumber == 4 ? <NavBtn icon={<LogOut/>} btnName={props.logInOut} path={"/"} activeBtn={true}/> : <NavBtn icon={<LogOut/>} btnName={props.logInOut} path={"/"} activeBtn={false}/>} 
      {props.activebtnNumber == 6 ? <NavBtn icon={<HelpCircle/>} btnName={"Help"} path={"/help"} activeBtn={true}/> : <NavBtn icon={<HelpCircle/>} btnName={"Help"} path={"/help"} activeBtn={false}/>} 
      </div>
    </section>
  )
}

export default Profile