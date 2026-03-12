'use client'

import { motion, useReducedMotion, useInView } from 'motion/react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Home, ChevronRight, Check, FileText, ClipboardList, Shield, DollarSign, MapPin } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { usePageSEO } from '../hooks/usePageSEO'
import ScrollSection from '../components/ScrollSection'
import imgDentalCare from "../../assets/7e26eb0c35bbd0356cd593caf48b0b5a702f7753.webp"
import imgImage from "../../assets/e2295a1a1a2bc348414dcc117de577c691164137.webp"
import imgImage1 from "../../assets/c5fbf2bb2ed01ea6f6ce38835da33519e2db95fe.webp"
import imgImage2 from "../../assets/27cea6501d6677b5b8f9f08502ce76c7a193f7f8.webp"

interface FirstVisitStep {
  id: string
  title: string
  description: string
  color: string
}

interface SecondOpinionCard {
  id: string
  icon: React.ReactNode
  title: string
  description: string
}

interface InsurancePartner {
  id: string
  name: string
  logo: string
}

const firstVisitSteps: FirstVisitStep[] = [
  {
    id: 'step1',
    title: 'Book Welcome Consultation',
    description: 'Choose the date and time that suits you with our online appointment system',
    color: 'bg-[#CBFF8F]',
  },
  {
    id: 'step2',
    title: 'Comprehensive Exam',
    description: 'Our dentists will examine your teeth, gums and overall oral health to identify any issues',
    color: 'bg-[#CBFF8F]',
  },
  {
    id: 'step3',
    title: 'Care plan & Plan',
    description: "We'll discuss findings with you and create a personalized treatment plan tailored to your needs",
    color: 'bg-[#CBFF8F]',
  },
]

const secondOpinionCards: SecondOpinionCard[] = [
  {
    id: 'assessment',
    icon: <ClipboardList className="w-6 h-6 text-[#0C0060]" stroke="#0C0060" />,
    title: 'Thorough Assessment',
    description: 'Our specialists conduct a detailed review of your records and current condition.',
  },
  {
    id: 'explanation',
    icon: <FileText className="w-6 h-6 text-[#0C0060]" stroke="#0C0060" />,
    title: 'Honest Explanation',
    description: 'We provide a transparent, detailed explanation of all available treatment options.',
  },
  {
    id: 'peace',
    icon: <Shield className="w-6 h-6 text-[#0C0060]" stroke="#0C0060" />,
    title: 'Peace of Mind',
    description: 'Empowering you to make informed decisions with complete confidence and trust.',
  },
]

const insurancePartners: InsurancePartner[] = [
  { id: '1', name: 'Thiqa', logo: '/logos/thiqa.webp' },
  { id: '2', name: 'Daman', logo: '/logos/daman.webp' },
  { id: '3', name: 'ADNIC', logo: '/logos/adnic.webp' },
  { id: '4', name: 'NAS', logo: '/logos/nas.webp' },
  { id: '5', name: 'Neuron', logo: '/logos/neuron.webp' },
  { id: '6', name: 'AXA GIG', logo: '/logos/axagig.webp' },
  { id: '7', name: 'NextCare', logo: '/logos/nextcare.webp' },
  { id: '8', name: 'MedNet', logo: '/logos/mednet.webp' },
  { id: '9', name: 'Cigna', logo: '/logos/cigna.webp' },
  { id: '10', name: 'SAICO', logo: '/logos/saico.webp' },
]

function PatientGuidePartnerCard({ partner }: { partner: InsurancePartner }) {
  const [imageError, setImageError] = useState(false)
  const isBiggerLogo = partner.name === 'AXA GIG' || partner.name === 'MedNet' || partner.name === 'SAICO'
  
  return (
    <div className="bg-white rounded-2xl px-12 py-8 flex items-center justify-center w-[230px] shrink-0 h-[128px]">
      {!imageError ? (
        <img
          src={partner.logo}
          alt={`${partner.name} logo`}
          className={isBiggerLogo ? "max-w-[240px] max-h-[80px] object-contain" : "max-w-[180px] max-h-[60px] object-contain"}
          onError={() => setImageError(true)}
        />
      ) : (
        <p className="text-base text-[#9ca3af] font-['Arial'] font-semibold whitespace-nowrap">
          {partner.name}
        </p>
      )}
    </div>
  )
}

export default function PatientGuidePage() {
  const shouldReduceMotion = useReducedMotion()
  const { openBookingSidebar } = useBooking()
  usePageSEO('Patient Guide', 'Your guide to visiting Sky Dental Center. First visit, second opinion, insurance, and what to expect. Abu Dhabi dental care.')
  const heroRef = useRef(null)
  const firstVisitRef = useRef(null)
  const secondOpinionRef = useRef(null)
  const insuranceRef = useRef(null)
  const galleryRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true })
  const firstVisitInView = useInView(firstVisitRef, { once: true })
  const secondOpinionInView = useInView(secondOpinionRef, { once: true })
  const insuranceInView = useInView(insuranceRef, { once: true })
  const galleryInView = useInView(galleryRef, { once: true })

  return (
    <ScrollSection>
    <div className="bg-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[400px] overflow-hidden pt-32 pb-16"
        style={{
          background: 'linear-gradient(160deg, rgb(224, 237, 255) 0%, rgb(255, 255, 255) 50%, rgb(224, 237, 255) 100%)',
        }}
      >
        {/* Decorative blurs */}
        <div className="absolute -left-24 top-40 w-64 h-64 bg-[rgba(203,255,143,0.2)] rounded-full blur-[64px]" />
        <div className="absolute right-32 top-80 w-64 h-64 bg-[rgba(12,0,96,0.1)] rounded-full blur-[64px]" />

        <div className="container mx-auto px-6 relative z-10 py-20">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-['Gilda_Display'] text-black mb-6 tracking-tight">
              Patient Guide
            </h1>

            {/* Description */}
            <p className="text-lg text-[#1b1b1b] font-['Arial'] leading-relaxed mb-10 max-w-3xl mx-auto">
              At Sky Dental Center, we understand that visiting the dentist can feel overwhelming, especially for new patients. This guide will help walk you through the entire process, making sure you feel confident, cared for, and ready to take the next steps in your oral care.
            </p>

            {/* Breadcrumbs */}
            <div className="flex items-center justify-center gap-2 text-sm">
              <Link to="/" className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                <Home className="w-4 h-4" />
                <span className="font-['Arial']">Home</span>
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-[#0C0060] font-['Arial']">Patient Guide</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Your First Dental Visit Section */}
      <section ref={firstVisitRef} className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, x: -30 }}
                animate={firstVisitInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-['Gilda_Display'] text-black mb-6 tracking-tight">
                  Your First Dental Visit
                </h2>
                <p className="text-base text-[#1b1b1b] font-['Arial'] leading-relaxed mb-10">
                  Your first visit sets the tone for a welcoming, pain-free experience at Sky Dental Center. Here's what you can expect. Arrive, relax, and let our caring team make you feel comfortable from the moment you step in.
                </p>

                {/* Steps */}
                <div className="space-y-5">
                  {firstVisitSteps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                      animate={firstVisitInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.15 }}
                      className="flex items-start gap-4"
                    >
                      <div className={`${step.color} w-12 h-12 rounded-2xl flex items-center justify-center shrink-0`}>
                        <Check className="w-6 h-6 text-[#0C0060]" stroke="#0C0060" />
                      </div>
                      <div>
                        <h3 className="text-lg font-['Arial'] font-bold text-black mb-2">
                          {step.title}
                        </h3>
                        <p className="text-[15px] text-[#4b5563] font-['Arial'] leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right Image */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, x: 30 }}
                animate={firstVisitInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="relative aspect-[4/3] rounded-3xl overflow-hidden"
              >
                <img
                  src={imgDentalCare}
                  alt="Dental Care"
                  className="w-full h-full object-cover"
                />
                {/* Overlay Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#CBFF8F] w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5 text-[#0C0060]" stroke="#0C0060" />
                    </div>
                    <div>
                      <h4 className="text-sm font-['Arial'] font-bold text-black mb-1">
                        Sky Dental Center
                      </h4>
                      <p className="text-xs text-[#6b7280] font-['Arial']">
                        Modern dental clinic in Abu Dhabi
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Second Opinion Service Section */}
      <section
        ref={secondOpinionRef}
        className="py-24"
        style={{
          background: 'rgb(224, 237, 255)',
        }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={secondOpinionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-['Gilda_Display'] text-black mb-6 tracking-tight">
              Second Opinion Service
            </h2>
            <p className="text-base text-[#4b5563] font-['Arial'] leading-relaxed max-w-2xl mx-auto">
              At Sky Dental Center, we understand the importance of confidence when it comes to your oral health. Our Second Opinion service offers clarity, reassurance, and expert guidance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {secondOpinionCards.map((card, index) => {
              const ref = useRef(null)
              const isInView = useInView(ref, { once: true, margin: '-100px' })

              return (
                <motion.div
                  key={card.id}
                  ref={ref}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="bg-[#fefefe] rounded-[32px] p-8 hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Icon */}
                  <div className="w-14 h-14 bg-[#CBFF8F] rounded-2xl flex items-center justify-center text-[#0C0060] mb-6 mx-auto">
                    {card.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-['Gilda_Display'] text-black mb-4 text-center">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[14px] text-[#4b5563] font-['Arial'] leading-relaxed text-center">
                    {card.description}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={secondOpinionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-center"
          >
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              onClick={() => openBookingSidebar()}
              className="bg-[#CBFF8F] text-[#0C0060] font-bold px-8 py-4 rounded-full inline-flex items-center gap-3 hover:bg-[#b8ff6d] transition-colors font-['Arial'] text-[15px]"
            >
              <span>Get a Second Opinion</span>
              <div className="w-8 h-8 bg-[#0C0060] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </motion.button>
          </motion.div>
        </div>
      </section>


      {/* Insurance Partners Section */}
      <section
        ref={insuranceRef}
        className="py-24 overflow-hidden"
        style={{
          background: '#CBFF8F',
        }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={insuranceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-6 border border-[#e5e7eb]">
              <Shield className="w-4 h-4 text-[#4b5563]" />
              <span className="text-xs text-[#4b5563] font-['Arial'] font-medium uppercase tracking-wider">
                DIRECT BILLING AVAILABLE
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-['Gilda_Display'] text-black tracking-tight mb-6">
              Insurance Partners
            </h2>
            <p className="text-[15px] text-[#4b5563] font-['Arial'] leading-relaxed max-w-3xl mx-auto">
              To make premium dental care more accessible, we collaborate with a wide network of trusted local and international insurance providers. Our team handles benefits verification, approvals, and claims support.
            </p>
          </motion.div>

          {/* Infinite Scrolling Carousel */}
          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-6"
                animate={shouldReduceMotion ? {} : {
                  x: [0, -1920],
                }}
                transition={shouldReduceMotion ? {} : {
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear",
                  },
                }}
              >
                {/* First set of partners */}
                {insurancePartners.map((partner) => (
                  <PatientGuidePartnerCard key={`first-${partner.id}`} partner={partner} />
                ))}
                {/* Duplicate set for infinite scroll */}
                {insurancePartners.map((partner) => (
                  <PatientGuidePartnerCard key={`second-${partner.id}`} partner={partner} />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Guest Experiences Gallery Section */}
      <section ref={galleryRef} className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={galleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-['Gilda_Display'] text-black tracking-tight">
              A Collection of Memorable Patient Experiences
            </h2>
          </motion.div>

          {/* Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[imgImage, imgImage1, imgImage2].map((image, index) => {
              const ref = useRef(null)
              const isInView = useInView(ref, { once: true, margin: '-100px' })

              return (
                <motion.div
                  key={index}
                  ref={ref}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative aspect-[3/4] rounded-3xl overflow-hidden group"
                >
                  <img
                    src={image}
                    alt={`Guest experience ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

    </div>
    </ScrollSection>
  )
}