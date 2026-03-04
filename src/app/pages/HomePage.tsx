'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import ServicesSection from '../components/ServicesSection'
import WhyChooseSection from '../components/WhyChooseSection'
import InsurancePartnersSection from '../components/InsurancePartnersSection'
import ResultsSection from '../components/ResultsSection'
import TestimonialsSection from '../components/TestimonialsSection'
import DoctorsSection from '../components/DoctorsSection'
import ContactSection from '../components/ContactSection'
import ScrollSection from '../components/ScrollSection'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <main>
      <ScrollSection><HeroSection /></ScrollSection>
      <ScrollSection><AboutSection /></ScrollSection>
      <ScrollSection><ServicesSection /></ScrollSection>
      <ScrollSection><WhyChooseSection /></ScrollSection>
      <ScrollSection><ResultsSection /></ScrollSection>
      <ScrollSection><TestimonialsSection /></ScrollSection>
      <ScrollSection><DoctorsSection /></ScrollSection>
      <ScrollSection><InsurancePartnersSection /></ScrollSection>
      <ScrollSection><ContactSection /></ScrollSection>
    </main>
  )
}
