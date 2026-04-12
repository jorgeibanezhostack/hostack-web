import { useState } from 'react'
import Navbar from './components/Navbar'
import { Hero } from './components/Hero'
import { Product } from './components/Product'
import { Pricing } from './components/Pricing'
import { WaitlistForm } from './components/WaitlistForm'
import FounderForm from './components/FounderForm'
import Footer from './components/Footer'

export default function App() {
  const [modal, setModal] = useState({ open: false, tier: '' })

  const openWaitlist = (tier) => setModal({ open: true, tier })
  const closeWaitlist = () => setModal(m => ({ ...m, open: false }))

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <Product />
      <Pricing onWaitlist={openWaitlist} />
      <FounderForm />
      <Footer />

      <WaitlistForm
        isOpen={modal.open}
        onClose={closeWaitlist}
        defaultTier={modal.tier}
      />
    </div>
  )
}
