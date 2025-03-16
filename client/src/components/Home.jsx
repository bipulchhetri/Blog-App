import React from 'react'
import Hero from '../components/Hero'
import Blogcard from './Blogcard'
// import BlogDetail from './BlogDetail'
import Latest from './Latest'

const Home = () => {
  return (
 <>
   <Hero/>
   <Blogcard/>
   
   <Latest/>
  
 </>
  )
}

export default Home