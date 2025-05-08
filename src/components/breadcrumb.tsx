import React from 'react'
import { cn } from '@/lib/utils'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { Slash } from 'lucide-react'  


const GBreadcrumb = (props) => {
  return (
    <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/Dashboard">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <Slash />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbLink href={`${props.pagePath}`}>{props.pageName}</BreadcrumbLink>
      </BreadcrumbItem>
      
     
    </BreadcrumbList>
  </Breadcrumb>
  
  )
}

export default GBreadcrumb
