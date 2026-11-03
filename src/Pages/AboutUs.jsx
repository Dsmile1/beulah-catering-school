import React from 'react'
import About from '../../Component/About'
import Vision from '../../Component/Vision&Mission'
import Desk from '../../Component/Desk'
import NavBar from '../../Component/NavBar'
import Team from '@/Component/Team'

function AboutUs() {
  return (
    <div>
        <NavBar/>
        <Desk/>
        <About/>
        <Vision/>
        <Team/>
      
    </div>
  )
}

export default AboutUs
