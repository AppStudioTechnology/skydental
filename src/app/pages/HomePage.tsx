'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { usePageSEO } from '../hooks/usePageSEO'
import HeroSection from '../components/HeroSection'
import ServicesSection from '../components/ServicesSection'
import InsurancePartnersSection from '../components/InsurancePartnersSection'
import ResultsSection from '../components/ResultsSection'
import TestimonialsSection from '../components/TestimonialsSection'
import DoctorsSection from '../components/DoctorsSection'
import ContactSection from '../components/ContactSection'
import ScrollSection from '../components/ScrollSection'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  usePageSEO()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <main>
      <ScrollSection><HeroSection /></ScrollSection>
      <ScrollSection><ServicesSection /></ScrollSection>
      <ScrollSection><DoctorsSection /></ScrollSection>
      <ScrollSection><TestimonialsSection /></ScrollSection>
      <ScrollSection><ResultsSection /></ScrollSection>
      <ScrollSection><InsurancePartnersSection /></ScrollSection>
      <ScrollSection><ContactSection /></ScrollSection>
    </main>
  )
}
