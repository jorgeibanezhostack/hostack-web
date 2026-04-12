import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Product from './components/Product'
import Pricing from './components/Pricing'
import WaitlistModal from './components/WaitlistModal'
import FounderForm from './components/FounderForm'
import Footer from './components/Footer'

export default function App() {
  const [modal, setModal] = useState({ open: false, tier: 'Not Sure' })

  const openWaitlist = (tier) => setModal({ open: true, tier })
  const closeWaitlist = () => setModal(m => ({ ...m, open: false }))

  return (
    <div style={{ background: '#0F172A', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <Product />
      <Pricing onWaitlist={openWaitlist} />
      <FounderForm />
      <Footer />

      <AnimatePresence>
        {modal.open && (
          <WaitlistModal
            key="waitlist-modal"
            tier={modal.tier}
            onClose={closeWaitlist}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
