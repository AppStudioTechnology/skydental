'use client'

import { motion, useReducedMotion, useInView } from 'motion/react'
import { useRef, useEffect, useMemo } from 'react'
import { Heart, Target, Users, Award, Zap, Shield, Clock, CheckCircle } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { useLanguage } from '../context/LanguageContext'
import { usePageSEO } from '../hooks/usePageSEO'
import ScrollSection from '../components/ScrollSection'

// Guest Experience Images
const guestExperiences = [
  'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1606811842243-af7e16970c1f?w=800&h=600&fit=crop'
]

export default function AboutUsPageNew() {
  const shouldReduceMotion = useReducedMotion()
  const { openBookingSidebar } = useBooking()
  const { t } = useLanguage()
  usePageSEO('About Us', 'Learn about Sky Dental Center in Abu Dhabi. Our team, values, technology, and commitment to your smile and confidence.')

  const coreValues = useMemo(() => [
    { icon: Award, title: t('about', 'coreValue1Title'), description: t('about', 'coreValue1Desc'), bgColor: '#CBFF8F' },
    { icon: Heart, title: t('about', 'coreValue2Title'), description: t('about', 'coreValue2Desc'), bgColor: '#CBFF8F' },
    { icon: Target, title: t('about', 'coreValue3Title'), description: t('about', 'coreValue3Desc'), bgColor: '#CBFF8F' },
    { icon: Zap, title: t('about', 'coreValue4Title'), description: t('about', 'coreValue4Desc'), bgColor: '#CBFF8F' },
    { icon: Shield, title: t('about', 'coreValue5Title'), description: t('about', 'coreValue5Desc'), bgColor: '#CBFF8F' }
  ], [t])

  const innovationFeatures = useMemo(() => [
    { icon: Zap, title: t('about', 'imagingTitle'), description: t('about', 'imagingDesc') },
    { icon: Shield, title: t('about', 'xrayTitle'), description: t('about', 'xrayDesc') },
    { icon: Clock, title: t('about', 'equipmentTitle'), description: t('about', 'equipmentDesc') },
    { icon: Heart, title: t('about', 'sterilisationTitle'), description: t('about', 'sterilisationDesc') }
  ], [t])

  const journeySteps = useMemo(() => [
    { title: t('about', 'initialVisit'), description: t('about', 'initialVisitDesc'), icon: '🏥' },
    { title: t('about', 'detailedAssessment'), description: t('about', 'detailedAssessmentDesc'), icon: '🔍' },
    { title: t('about', 'customizedTreatment'), description: t('about', 'customizedTreatmentDesc'), icon: '⚕️' },
    { title: t('about', 'longTermPartnership'), description: t('about', 'longTermPartnershipDesc'), icon: '🤝' }
  ], [t])

  const patientJourneySteps = useMemo(() => [
    { title: t('about', 'bookBooking'), description: t('about', 'bookBookingDesc') },
    { title: t('about', 'expertDiagnosis'), description: t('about', 'expertDiagnosisDesc') },
    { title: t('about', 'personalizedCare'), description: t('about', 'personalizedCareDesc') },
    { title: t('about', 'longTermWellness'), description: t('about', 'longTermWellnessDesc') }
  ], [t])

  const heroRef = useRef(null)
  const visionRef = useRef(null)
  const valuesRef = useRef(null)
  const innovationRef = useRef(null)
  const patientJourneyRef = useRef(null)
  const galleryRef = useRef(null)
  const ctaRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true })
  const visionInView = useInView(visionRef, { once: true })
  const valuesInView = useInView(valuesRef, { once: true })
  const innovationInView = useInView(innovationRef, { once: true })
  const patientJourneyInView = useInView(patientJourneyRef, { once: true })
  const galleryInView = useInView(galleryRef, { once: true })
  const ctaInView = useInView(ctaRef, { once: true })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-white overflow-x-hidden">
      <ScrollSection>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-[400px] overflow-hidden pt-24 pb-20"
        style={{
          background: 'linear-gradient(160deg, rgb(237, 248, 255) 0%, rgb(255, 255, 255) 50%, rgb(237, 248, 255) 100%)'
        }}
      >
        {/* Decorative blurs */}
        <div className="absolute -left-32 top-20 w-96 h-96 bg-[rgba(203,255,143,0.3)] rounded-full blur-[100px]" />
        <div className="absolute -right-32 top-40 w-96 h-96 bg-[rgba(151,196,255,0.2)] rounded-full blur-[100px]" />

        <div className="container mx-auto px-6 py-20 relative z-10">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[rgba(203,255,143,0.3)] px-5 py-2 rounded-full mb-6">
              <Heart className="w-4 h-4 text-[#0C0060]" />
              <span className="text-sm text-black font-['Arial']">{t('about', 'pageTitle')}</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl font-['Gilda_Display'] text-black mb-6 tracking-tight leading-tight">
              {t('about', 'dentistryLongRun')}
            </h1>

            {/* Description */}
            <div className="text-lg text-black/70 font-['Arial'] leading-relaxed max-w-4xl mx-auto space-y-4 text-left">
              <p>{t('about', 'aboutIntro')}</p>
              <p>{t('about', 'aboutClinic')}</p>
              <p>{t('about', 'aboutExperience')}</p>
              <p>{t('about', 'aboutBelief')}</p>
              <p className="font-['Gilda_Display'] font-bold text-[#CBFF8F] text-2xl md:text-3xl pt-2">{t('about', 'careThatGrows')}</p>
            </div>
          </motion.div>
        </div>
      </section>
      </ScrollSection>

      <ScrollSection>
      {/* Vision & Mission Section */}
      <section ref={visionRef} className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={visionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
            <h2 className="text-4xl md:text-5xl font-['Gilda_Display'] text-black mb-4 tracking-tight">
              Vision & Mission
            </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Vision Card - first to match headline order */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, x: -30 }}
                animate={visionInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm h-full flex flex-col"
              >
                <div className="w-12 h-12 bg-[#CBFF8F] rounded-xl flex items-center justify-center mb-6">
                  <Award className="w-6 h-6 text-[#0C0060]" />
                </div>
                <h3 className="text-2xl font-['Gilda_Display'] text-black mb-4">{t('about', 'ourVision')}</h3>
                <p className="text-base text-black/70 font-['Arial'] leading-relaxed flex-grow">
                  {t('about', 'visionText')}
                </p>
              </motion.div>

              {/* Mission Card */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, x: 30 }}
                animate={visionInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm h-full flex flex-col"
              >
                <div className="w-12 h-12 bg-[#CBFF8F] rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-[#0C0060]" />
                </div>
                <h3 className="text-2xl font-['Gilda_Display'] text-black mb-4">{t('about', 'ourMission')}</h3>
                <p className="text-base text-black/70 font-['Arial'] leading-relaxed flex-grow">
                  {t('about', 'missionText')}
                </p>
              </motion.div>

              {/* Image Section - Spans Both Columns on Large Screens */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                animate={visionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-2 mt-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop"
                      alt="Dental team"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=600&fit=crop"
                      alt="Patient care"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      </ScrollSection>

      <ScrollSection>
      {/* Core Values Section */}
      <section 
        ref={valuesRef}
        className="py-24"
        style={{
          background: 'linear-gradient(180deg, rgb(237, 248, 255) 0%, rgb(255, 255, 255) 100%)'
        }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-['Gilda_Display'] text-black mb-4 tracking-tight">
              {t('about', 'coreValues')}
            </h2>
            <p className="text-base text-black/60 font-['Arial'] max-w-3xl mx-auto">
              These principles guide our actions and shape the culture of care we provide to our community every single day.
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {coreValues.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-8 text-center shadow-sm"
                >
                  <div className="w-16 h-16 bg-[#CBFF8F] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-[#0C0060]" stroke="#0C0060" />
                  </div>
                  <h3 className="text-xl font-['Gilda_Display'] text-black mb-4">
                    {value.title}
                  </h3>
                  <p className="text-sm text-black/70 font-['Arial'] leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
      </ScrollSection>

      <ScrollSection>
      {/* Powered by Innovation Section */}
      <section 
        ref={innovationRef}
        className="py-24"
        style={{
          background: 'linear-gradient(180deg, rgb(245, 253, 237) 0%, rgb(255, 255, 255) 100%)'
        }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={innovationInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-['Gilda_Display'] text-black mb-4 tracking-tight">
                {t('about', 'innovation')}
              </h2>
              <p className="text-base text-black/70 font-['Arial'] max-w-2xl mx-auto">
                At Sky Dental Center, advanced technology supports the smile we create. Our cutting-edge systems enhance precision, ensure safer procedures, and make your experience as comfortable and efficient as possible.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Features List */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, x: -30 }}
                animate={innovationInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                {innovationFeatures.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <motion.div
                      key={index}
                      initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
                      animate={innovationInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                      className="flex items-start gap-4 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                    >
                      <div className="w-12 h-12 bg-[#CBFF8F] rounded-xl flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-[#0C0060]" />
                      </div>
                      <div>
                        <h4 className="text-lg font-['Gilda_Display'] text-black mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-black/70 font-['Arial']">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* Images Grid */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, x: 30 }}
                animate={innovationInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="space-y-4">
                  <div className="aspect-square rounded-3xl overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=500&h=500&fit=crop"
                      alt="Advanced technology"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=500&h=400&fit=crop"
                      alt="Modern clinic"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=500&h=400&fit=crop"
                      alt="Patient care"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-3xl overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=500&h=500&fit=crop"
                      alt="Dental equipment"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      </ScrollSection>

      <ScrollSection>
      {/* CTA Section */}
      <section 
        ref={ctaRef}
        className="py-20 bg-[#CBFF8F]"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-['Gilda_Display'] text-black mb-8 tracking-tight leading-tight">
              Where healthy, confident smiles begin.
            </h2>
            <button
              onClick={() => openBookingSidebar()}
              className="bg-[#0C0060] text-white px-8 py-4 rounded-full font-['Arial'] font-semibold text-lg hover:bg-[#7ab3ff] transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
            >
              {t('about', 'requestAppointmentCta')}
            </button>
          </motion.div>
        </div>
      </section>
      </ScrollSection>

      <ScrollSection>
      {/* Patient Experience Section */}
      <section 
        ref={patientJourneyRef}
        className="py-24 bg-white"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={patientJourneyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-['Gilda_Display'] text-black mb-4 tracking-tight">
              Patient Experience
            </h2>
            <p className="text-base text-black/70 font-['Arial'] max-w-3xl mx-auto leading-relaxed mb-8">
              Your journey at Sky Dental Center begins with a warm, welcoming reception and continues with care designed around your comfort and confidence. Every step of your visit is crafted to ensure a seamless, stress-free experience. We pride ourselves on:
            </p>
          </motion.div>

          {/* Patient Experience Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
              animate={patientJourneyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0 * 0.1 }}
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm"
            >
              <CheckCircle className="w-6 h-6 text-[#0C0060] mb-4" />
              <p className="text-base text-black/70 font-['Arial'] leading-relaxed">
                Smooth and organised appointment management
              </p>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
              animate={patientJourneyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 * 0.1 }}
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm"
            >
              <CheckCircle className="w-6 h-6 text-[#0C0060] mb-4" />
              <p className="text-base text-black/70 font-['Arial'] leading-relaxed">
                Clear explanation of treatment plans
              </p>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
              animate={patientJourneyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 2 * 0.1 }}
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm"
            >
              <CheckCircle className="w-6 h-6 text-[#0C0060] mb-4" />
              <p className="text-base text-black/70 font-['Arial'] leading-relaxed">
                Comprehensive pre- and post-treatment follow-up
              </p>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
              animate={patientJourneyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 3 * 0.1 }}
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm"
            >
              <CheckCircle className="w-6 h-6 text-[#0C0060] mb-4" />
              <p className="text-base text-black/70 font-['Arial'] leading-relaxed">
                A relaxing environment that fosters trust and comfort
              </p>
            </motion.div>
          </div>

          <motion.p
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={patientJourneyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center text-base text-black/70 font-['Arial'] max-w-3xl mx-auto mt-12"
          >
            Every detail is designed to create an unforgettable experience
          </motion.p>
        </div>
      </section>
      </ScrollSection>

      <ScrollSection>
      {/* Guest Experiences Gallery */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {guestExperiences.map((image, index) => (
              <motion.div
                key={index}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                animate={galleryInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative aspect-[4/5] rounded-3xl overflow-hidden group"
              >
                <img
                  src={image}
                  alt={`Guest experience ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      </ScrollSection>
    </div>
  )
}