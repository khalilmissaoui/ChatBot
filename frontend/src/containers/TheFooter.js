/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a target="_blank" rel="noopener noreferrer">Flash-Learn</a>
        <span className="ml-1">&copy; 2021 </span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
