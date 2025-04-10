import React from 'react'
import GBreadcrumb from './breadcrumb'
const Details = (props) => {
  return (
    <div>
      <GBreadcrumb pageName={props.pageName} pagePath={props.pagePath}/>
    </div>
  )
}

export default Details
