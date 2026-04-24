import { useState } from 'react'
import useBreakpoint from '../hooks/useBreakpoint'
import Nav from './Nav'
import Hero from './Hero'
import Problem from './Problem'
import Product from './Product'
import Results from './Results'
import Pricing from './Pricing'
import FoundingMember from './FoundingMember'
import Footer from './Footer'
import WaitlistModal from './WaitlistModal'

export default function LandingLayout() {
  const bp = useBreakpoint()
  const [waitlistPlan, setWaitlistPlan] = useState(null)

  return (
    <>
      <Nav bp={bp} />
      <main style={{ paddingTop: 56 }}>
        <Hero bp={bp} />
        <Product bp={bp} />
        <Problem bp={bp} />
        <Results bp={bp} />
        <Pricing bp={bp} onOpenWaitlist={(plan) => setWaitlistPlan(plan)} />
        <FoundingMember bp={bp} />
      </main>
      <Footer bp={bp} />

      {waitlistPlan && (
        <WaitlistModal plan={waitlistPlan} onClose={() => setWaitlistPlan(null)} />
      )}
    </>
  )
}
