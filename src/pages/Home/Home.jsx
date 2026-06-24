import { useState } from 'react'
import Hero       from './Hero'
import Features   from './Features'
import Categories from './Categories'
import News       from './News'

const Home = () => {
  const [audience, setAudience] = useState('individual')

  return (
    <>
      <Hero audience={audience} setAudience={setAudience} />
      <Features audience={audience} />
      <Categories />
      <News />
    </>
  )
}

export default Home
