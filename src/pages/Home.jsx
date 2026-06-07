import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import HeroIntroCard from '../components/HeroIntroCard'
import About from '../components/About'
import ImpactStats from '../components/ImpactStats'
import Programs from '../components/Programs'
import FounderQuote from '../components/FounderQuote'
import JoinSupportSection from '../components/JoinSupportSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HeroIntroCard />
      <About />
      <ImpactStats />
      <Programs />
      <FounderQuote />
      <JoinSupportSection />
      <Footer />
    </>
  )
}