'use client'

import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Suspense, lazy, useEffect, useState, useCallback } from 'react'
import { useReducedMotion } from 'motion/react'
import Lenis from 'lenis'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'
import LoadingScreen from './components/LoadingScreen'
import Footer from './components/Footer'
import { BookingProvider } from './context/BookingContext'
import { LanguageProvider } from './context/LanguageContext'
import CustomCursor from './components/CustomCursor'

// Home page loads immediately for fast first paint; other pages load on demand
import HomePage from './pages/HomePage'
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'))
const OurDoctorsPageNew = lazy(() => import('./pages/OurDoctorsPageNew'))
const DoctorDetailPage = lazy(() => import('./pages/DoctorDetailPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'))
const PackagesPage = lazy(() => import('./pages/PackagesPage'))
const PatientGuidePage = lazy(() => import('./pages/PatientGuidePage'))
const FAQsPage = lazy(() => import('./pages/FAQsPage'))
const CareersPage = lazy(() => import('./pages/CareersPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))
const ContactUsPage = lazy(() => import('./pages/ContactUsPage'))

function PageFallback() {
  return <div className="min-h-[50vh] flex items-center justify-center" aria-hidden />
}

/** When 404.html redirects to /?redirect=/path, navigate to the clean URL */
function RedirectHandler() {
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (pathname !== '/' || !search) return
    const params = new URLSearchParams(search)
    const target = params.get('redirect')
    if (target && target.startsWith('/')) {
      navigate(target, { replace: true })
    }
  }, [pathname, search, navigate])
  return null
}

export default function App() {
  const [mounted, setMounted] = useState(false)
  const [showLoadingScreen, setShowLoadingScreen] = useState(true)
  const [loadingScreenMounted, setLoadingScreenMounted] = useState(true)
  const shouldReduceMotion = useReducedMotion()

  const handleLoadingComplete = useCallback(() => {
    setLoadingScreenMounted(false)
  }, [])

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    setMounted(true)
  }, [])

  // Hide loading screen after app is mounted and a short delay for smooth transition
  useEffect(() => {
    if (!mounted) return
    const t = setTimeout(() => setShowLoadingScreen(false), 280)
    return () => clearTimeout(t)
  }, [mounted])

  // Lenis smooth scroll only (no snap — snap was causing unwanted auto-scroll to sections/footer)
  useEffect(() => {
    if (!mounted || shouldReduceMotion) return

    const lenis = new Lenis({
      duration: 2,
      lerp: 0.07,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [mounted, shouldReduceMotion])

  return (
    <>
      {loadingScreenMounted && (
        <LoadingScreen visible={showLoadingScreen} onComplete={handleLoadingComplete} />
      )}
      {mounted && (
        <BrowserRouter>
          <LanguageProvider>
            <BookingProvider>
              <RedirectHandler />
              <ScrollToTop />
              <CustomCursor />
              <div className="bg-white min-h-screen">
                <Header />
                <Suspense fallback={<PageFallback />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about-us" element={<AboutUsPage />} />
                  <Route path="/our-doctors" element={<OurDoctorsPageNew />} />
                  <Route path="/our-doctors/:doctorId" element={<DoctorDetailPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
                  <Route path="/packages" element={<PackagesPage />} />
                  <Route path="/patient-guide" element={<PatientGuidePage />} />
                  <Route path="/faqs" element={<FAQsPage />} />
                  <Route path="/careers" element={<CareersPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/contact" element={<ContactUsPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                </Suspense>
                <Footer />
              </div>
            </BookingProvider>
          </LanguageProvider>
        </BrowserRouter>
      )}
    </>
  )
}