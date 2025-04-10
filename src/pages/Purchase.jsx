import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Details from '../components/details'
import { ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  

const Purchase = ({loggedIn}) => {

    const items = [
        {
            price:2000,
            img:"",
            name:"water"
        },
        {
            price:2000,
            img:"",
            name:"juice"
        },
        {
            price:2500,
            img:"",
            name:"ooha"
        },
        {
            price:1500,
            img:"",
            name:"milk"
        },
        {
            price:20000,
            img:"",
            name:"water bottle"
        },
        {
            price:2500,
            img:"",
            name:"tom kontick"
        },
        {
            price:2500,
            img:"",
            name:"bourbon"
        },
        {
            price:2500,
            img:"",
            name:"hurustic"
        },
        {
            price:2000,
            img:"",
            name:"hi"
        }
    ]

  return (
    <main className='w-full h-screen flex'>
    <Navbar activebtnNumber={7} loggedIn={loggedIn}/>
    <motion.article 
       initial={{opacity:0, background:"#f5f5f5"}}
       animate={{opacity:1}}
       transition={{delay:0, duration:0.6}}
      className='w-full h-full rounded-tl-3xl bg-gray-900 p-4 overflow-auto flex flex-col items-start justify-center gap-4 relative'>
      
   
      <Details pageName={"Buy from Cafeteria"} pagePath={"/Purcahse"}/>
      <section className='relative flex flex-col w-full gap-4 items-start text-lgx  py-5 px-4 bg-gray-900 text-white rounded-2xl'>
        <div className='flex w-full items-center justify-between'>
        
          <div className='flex gap-4 items-center'>
            <ShoppingCart />
            <p className='text-2xl'>Purchase</p>
          </div>
        
        </div>
      </section>
      
      <section className='w-full h-full flex border-2 rounded-2xl justify-center border-gray-900 overflow-auto mb-4 gap-3'>
     
                     <Carousel className="w-full max-w-sm">
      <CarouselContent className="-ml-1">
        {items.map((item) => (
          <CarouselItem  className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                <div className='flex flex-col'>
                                <h1>
                                {item.name}
                                </h1>
                                <img src={item.img} alt="" />

                                <p>
                                {item.price}
                                </p>
                            </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
      </section>
     
    </motion.article>
  </main>
  )
}

export default Purchase
