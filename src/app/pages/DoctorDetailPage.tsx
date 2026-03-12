'use client'

import { motion, useReducedMotion, useInView } from 'motion/react'
import { useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowUpRight, Home, ChevronRight, Phone, Calendar, CheckCircle } from 'lucide-react'
import { getDoctorById } from '../data/doctorsData'
import { useBooking } from '../context/BookingContext'
import { usePageSEO } from '../hooks/usePageSEO'
import ScrollSection from '../components/ScrollSection'

export default function DoctorDetailPage() {
  const { doctorId } = useParams()
  const doctor = getDoctorById(doctorId || '')
  const shouldReduceMotion = useReducedMotion()
  const { openBookingSidebar } = useBooking()
  
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const educationRef = useRef(null)
  const experienceRef = useRef(null)
  const expertiseRef = useRef(null)
  const philosophyRef = useRef(null)
  const galleryRef = useRef(null)
  const contactRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true })
  const aboutInView = useInView(aboutRef, { once: true })
  const educationInView = useInView(educationRef, { once: true })
  const experienceInView = useInView(experienceRef, { once: true })
  const expertiseInView = useInView(expertiseRef, { once: true })
  const philosophyInView = useInView(philosophyRef, { once: true })
  const galleryInView = useInView(galleryRef, { once: true })
  const contactInView = useInView(contactRef, { once: true })

  usePageSEO(doctor ? `${doctor.name} – ${doctor.specialty}` : undefined, doctor ? `${doctor.title} at Sky Dental Center. ${doctor.specialty}. Book an appointment.` : undefined)

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-['Gilda_Display'] text-black mb-4">Doctor Not Found</h1>
          <Link to="/our-doctors" className="text-[#0C0060] hover:underline">
            Back to Doctors
          </Link>
        </div>
      </div>
    )
  }

  return (
    <ScrollSection>
    <div className="bg-white">
      {/* Hero: Picture left (smaller), content right (white bg) - same style for all doctors */}
      <section ref={heroRef} className="min-h-[400px] flex flex-col lg:flex-row pt-20 lg:pt-24">
        {/* Left: Doctor image - smaller column, neutral grey background */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, x: -24 }}
          animate={heroInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-[32%] lg:max-w-[340px] min-h-[280px] lg:min-h-[400px] lg:max-h-[480px] bg-[#e8e8e8] flex items-center justify-center overflow-hidden shrink-0"
        >
          <img
            src={doctor.aboutImage}
            alt={doctor.name}
            className="w-full h-full object-cover object-top"
          />
        </motion.div>

        {/* Right: Content - white background, more space */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, x: 24 }}
          animate={heroInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full lg:flex-1 min-w-0 bg-white flex flex-col justify-center px-6 md:px-10 lg:px-14 py-12 lg:py-16"
        >
          {/* Breadcrumbs - at top */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 font-['Arial'] mb-6">
            <Link to="/" className="flex items-center gap-1 hover:text-gray-700">
              <Home className="w-4 h-4" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to="/our-doctors" className="hover:text-gray-700">Doctors</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-[#0C0060] font-medium">{doctor.name}</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-['Gilda_Display'] font-bold text-black mb-2 tracking-tight">
            {doctor.name}
          </h1>
          <p className="text-base md:text-lg text-black/80 font-['Arial'] mb-6">
            {doctor.title === doctor.specialty ? doctor.specialty : `${doctor.title} | ${doctor.specialty}`}
          </p>
          <p className="text-[15px] md:text-base text-black/85 leading-[1.7] max-w-2xl font-serif" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            {doctor.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {doctor.stats.map((stat, index) => (
              <div key={index} className="text-center sm:text-left">
                <div className="text-lg font-['Gilda_Display'] font-semibold text-[#0C0060]">
                  {stat.value}
                </div>
                <div className="text-sm text-black/60 font-['Arial']">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              onClick={() => openBookingSidebar(doctor.name)}
              className="bg-[#CBFF8F] text-[#0C0060] font-bold px-6 py-3 rounded-full inline-flex items-center gap-2 hover:bg-[#B1FF57] transition-colors font-['Arial'] text-sm md:text-base"
            >
              <Calendar className="w-5 h-5" />
              <span>Request Appointment</span>
              <div className="w-8 h-8 bg-[#0C0060] rounded-full flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 text-[#CBFF8F]" />
              </div>
            </motion.button>
            <motion.a
              href="tel:+97126677448"
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              className="bg-[#0C0060] text-white font-bold px-6 py-3 rounded-full inline-flex items-center gap-2 hover:bg-[#0a0052] transition-colors font-['Arial'] no-underline text-sm md:text-base"
            >
              <Phone className="w-5 h-5" />
              <span>Contact Now</span>
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* About Section - anchor for in-page nav; main bio is in hero right column */}
      <section ref={aboutRef} className="py-8 bg-white border-t border-gray-100" aria-hidden="true" />

      {/* Education & Certification Section */}
      {doctor.id !== 'dr-basma-al-rawi' && doctor.id !== 'dr-elias-daoud-hanna' && doctor.id !== 'dr-hazem-reslan' && doctor.id !== 'dr-mohanned-albasha' && doctor.education.length > 0 && (
        <section 
          ref={educationRef}
          className="py-24"
          style={{
            background: 'linear-gradient(160deg, rgb(237, 248, 255) 0%, rgb(255, 255, 255) 100%)'
          }}
        >
          <div className="container mx-auto px-6">
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={educationInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-['Gilda_Display'] text-black mb-4 tracking-tight">
                Distinguished Education & Certification
              </h2>
              <p className="text-lg text-black/70 font-['Arial'] max-w-3xl mx-auto">
                Credentials that reflect years of rigorous training and a commitment to excellence in dental care.
              </p>
            </motion.div>

            {/* Education Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {doctor.education.map((edu, index) => {
                const ref = useRef(null)
                const isInView = useInView(ref, { once: true, margin: "-100px" })
                
                return (
                  <motion.div
                    key={index}
                    ref={ref}
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-[#CBFF8F] rounded-2xl flex items-center justify-center shrink-0">
                        <span className="text-2xl">{edu.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-['Gilda_Display'] text-black mb-2">
                          {edu.degree}
                        </h3>
                        <p className="text-base text-black/70 font-['Arial'] mb-1">
                          {edu.institution}
                        </p>
                        {edu.year && (
                          <p className="text-sm text-[#0C0060] font-['Arial']">
                            {edu.year}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Clinical Experience Section */}
      {doctor.experience && (
        <section ref={experienceRef} className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Image First */}
                <motion.div
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: -30 }}
                  animate={experienceInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8 }}
                  className="relative order-2 lg:order-1"
                >
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src={doctor.clinicImages[0]}
                      alt="Clinical experience"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Decorative element */}
                  <div className="absolute -top-6 -right-6 w-40 h-40 bg-[#e0edff] rounded-3xl -z-10" />
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: 30 }}
                  animate={experienceInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8 }}
                  className="order-1 lg:order-2"
                >
                  <h2 className="text-4xl md:text-5xl font-['Gilda_Display'] text-black mb-6 tracking-tight">
                    {doctor.experience.title}
                  </h2>
                  <p className="text-base text-black/70 font-['Arial'] leading-relaxed mb-8">
                    {doctor.experience.description}
                  </p>

                  <ul className="space-y-4">
                    {doctor.experience.highlights.map((highlight, index) => (
                      <motion.li
                        key={index}
                        initial={shouldReduceMotion ? {} : { opacity: 0, x: 20 }}
                        animate={experienceInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle className="w-6 h-6 text-[#CBFF8F] shrink-0 mt-0.5" />
                        <span className="text-base text-black/80 font-['Arial']">
                          {highlight}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Specialized Expertise Section */}
      <section 
        ref={expertiseRef}
        className="py-24"
        style={{
          background: 'linear-gradient(180deg, rgb(245, 253, 237) 0%, rgb(255, 255, 255) 100%)'
        }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={expertiseInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-['Gilda_Display'] text-black mb-4 tracking-tight">
              Specialized Expertise in {doctor.specialty}
            </h2>
            <p className="text-lg text-black/70 font-['Arial'] max-w-3xl mx-auto">
              Comprehensive services tailored to restore function, health, and aesthetics.
            </p>
          </motion.div>

          {/* Expertise Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {doctor.expertise.map((category, index) => {
              const ref = useRef(null)
              const isInView = useInView(ref, { once: true, margin: "-100px" })
              
              return (
                <motion.div
                  key={index}
                  ref={ref}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
                >
                  <div className="w-12 h-12 bg-[#CBFF8F] rounded-xl flex items-center justify-center mb-6">
                    <CheckCircle className="w-6 h-6 text-[#0C0060]" />
                  </div>
                  <h3 className="text-2xl font-['Gilda_Display'] text-black mb-6">
                    {category.category}
                  </h3>
                  <ul className="space-y-3">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-black/70 font-['Arial']">
                        <span className="text-[#0C0060] mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section ref={philosophyRef} className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Content */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, x: -30 }}
                animate={philosophyInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-['Gilda_Display'] text-black mb-6 tracking-tight">
                  {doctor.philosophy.title}
                </h2>
                <p className="text-base text-black/70 font-['Arial'] leading-relaxed mb-8">
                  {doctor.philosophy.description}
                </p>

                <ul className="space-y-4 mb-8">
                  {doctor.philosophy.principles.map((principle, index) => (
                    <motion.li
                      key={index}
                      initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
                      animate={philosophyInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 bg-[#CBFF8F] rounded-full flex items-center justify-center mt-0.5 shrink-0">
                        <span className="text-[#0C0060] text-xs">✓</span>
                      </div>
                      <span className="text-base text-black/80 font-['Arial']">
                        {principle}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* Quote */}
                <div className="bg-[#CBFF8F] rounded-2xl p-6 border-l-4 border-[#0C0060]">
                  <p className="text-base text-black/80 font-['Arial'] italic leading-relaxed">
                    "{doctor.philosophy.quote}"
                  </p>
                  <p className="text-sm text-black/60 font-['Arial'] mt-3">
                    — {doctor.name}
                  </p>
                </div>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, x: 30 }}
                animate={philosophyInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={doctor.clinicImages[1]}
                    alt="Patient care philosophy"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-[#e0edff] rounded-3xl -z-10" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        ref={contactRef}
        className="py-24"
        style={{
          background: 'linear-gradient(to right, rgb(203, 255, 143) 0%, rgb(224, 237, 255) 100%)'
        }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <h3 className="text-3xl md:text-4xl font-['Gilda_Display'] text-black mb-4 tracking-tight">
                  Ready to Start Your Journey?
                </h3>
                <p className="text-base text-black/70 font-['Arial'] mb-6 leading-relaxed">
                  Schedule a consultation with {doctor.name.split(' ')[1]} and discover how expert care can transform your smile and oral health.
                </p>
                <div className="space-y-3 text-sm text-black/70 font-['Arial']">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#0C0060]" />
                    <span>Phone: +971 26 677 448</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#0C0060]" />
                    <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Right CTA */}
              <div className="flex flex-col gap-4">
                <motion.button
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  onClick={() => openBookingSidebar(doctor.name)}
                  className="bg-[#0C0060] text-white font-bold px-8 py-5 rounded-full inline-flex items-center justify-center gap-3 hover:bg-[#7db4ff] transition-colors font-['Arial'] text-lg w-full"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Request Appointment Now</span>
                </motion.button>

                <motion.a
                  href="tel:+97126677448"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  className="bg-white text-[#0C0060] font-bold px-8 py-5 rounded-full inline-flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors font-['Arial'] text-lg w-full no-underline"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Us Now</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section ref={galleryRef} className="py-24 bg-[#f8f9fa]">
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
            {doctor.clinicImages.map((image, index) => {
              const ref = useRef(null)
              const isInView = useInView(ref, { once: true, margin: "-100px" })
              
              return (
                <motion.div
                  key={index}
                  ref={ref}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative aspect-[4/5] rounded-3xl overflow-hidden group"
                >
                  <img
                    src={image}
                    alt={`Clinical environment ${index + 1}`}
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
