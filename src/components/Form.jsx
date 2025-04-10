import React from 'react'
import Navbar from './navbar/Navbar'
import {motion} from "framer-motion"
const Form = ({loggedIn}) => {
  const isLoggedIn = loggedIn

 function Login (){
  return(
    <section className='h-1/2 flex flex-col gap-8 justify-center ml-[5%]'>
    <header className='flex flex-col gap-2'>
      <h1 className='text-2xl'>Welcome to <span className='text-pink-primary font-semibold'>LUNCHRR</span> </h1>
      <h3 className='text-4xl'>log into your account</h3>
    </header>
    <form action="" className='flex flex-col w-full gap-4 p-4'>
      <input className='py-3 rounded-xl pl-3 leading-relaxed tracking-wider focus:outline-pink-primary' type="email" placeholder='email'/>
      <input className='py-3 rounded-xl pl-3 leading-relaxed tracking-wider focus:outline-pink-primary' type="password" placeholder='password' />
      <button type='submit' className='text-xl py-2 px-9 text-white text-opacity-90 rounded-xl bg-gray-600 w-max hover:scale-105 duration-300 hover:border-emerald-400 border-[4px] border-background'>log in</button>
    </form>
    </section>
  )
 }
 function Logout(){
  return(
    <section className='h-1/2 flex flex-col gap-8 justify-center ml-[5%]'>
    <header className='flex flex-col gap-2'>
      <h1 className='text-2xl'>See you back!</h1>
      <h3 className='text-4xl'>log out of your account</h3>
    </header>
    <form action="" className='flex flex-col w-full gap-4 p-4'>
     
      <button type='submit' className='text-xl py-2 px-9 text-white text-opacity-90 rounded-xl bg-gray-600 w-max hover:scale-105 duration-300 hover:border-emerald-400 border-[4px] '>log out</button>
    </form>
    </section>
  )
 }
  return (
    <main className="flex w-full">
      <Navbar activebtnNumber={4} loggedIn={isLoggedIn}/>
   <motion.article 
     initial={{opacity:0, background:"#f5f5f5"}}
     animate={{opacity:1}}
     transition={{delay:0, duration:0.6}}
    className='w-full h-full rounded-tl-3xl bg-white py-4 px-4  overflow-auto flex flex-col items-start justify-center gap-8'>
    {isLoggedIn ?  <Logout/>: <Login/>  }
   </motion.article>
   </main>
  )
}

export default Form