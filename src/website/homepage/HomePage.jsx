import React from 'react'
import { Hero } from './components/Hero'
import StrategicPillars from './components/Feature'
import AboutHome from './components/AboutHome'
import AboutHome2 from './components/AboutHome2'
import WhyChooseSection from './components/WhyChooseSection'
import FAQSec from './components/FaqSec'
import Footer from './components/Footer'

const HomePage = () => {
  return (
    <div>
     
     <Hero />
     <StrategicPillars />
     <AboutHome />
     <AboutHome2 />
     <WhyChooseSection />
     <FAQSec />
   
    </div>
  )
}

export default HomePage
