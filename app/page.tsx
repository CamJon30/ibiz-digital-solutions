import Hero from '@/components/Hero'
import Assessment from '@/components/Assessment'
import Trifecta from '@/components/Trifecta'
import WhoWeServe from '@/components/WhoWeServe'
import About from '@/components/About'
import Process from '@/components/Process'
import Capability from '@/components/Capability'
import Blog from '@/components/Blog'
import Contact from '@/components/Contact'
import ScrollObserver from '@/components/ScrollObserver'

export default function Home() {
  return (
    <>
      <ScrollObserver />
      <Hero />
      <Assessment />
      <Trifecta />
      <WhoWeServe />
      <About />
      <Process />
      <Capability />
      <Blog />
      <Contact />
    </>
  )
}
