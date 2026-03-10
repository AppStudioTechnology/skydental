'use client'

import { motion, useReducedMotion } from 'motion/react'
import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, ChevronDown, Award, Shield, Heart, Target, Zap } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { useLanguage } from '../context/LanguageContext'
import { usePageSEO } from '../hooks/usePageSEO'
import ScrollSection from '../components/ScrollSection'
import { doctorsData as fullDoctorsData } from '../data/doctorsData'

// Derive list from central doctorsData (uses front/side view photos from assets); hide Dr. Arwa for now
const doctorsData = fullDoctorsData
  .filter((d) => d.id !== 'dr-arwa-rashed')
  .map((d) => {
  const expStat = d.stats.find((s) => s.label.toLowerCase().includes('year'))
  const experience = expStat ? expStat.value : (d.stats[0]?.value ?? '')
  return {
    id: d.id,
    name: d.name,
    specialty: d.specialty,
    experience: experience.includes('+') ? experience : experience ? `${experience} years` : '',
    image: d.image,
    imageSide: d.imageSide,
    available: true
  }
})

// Derive specialty options from actual doctors (tags they use)
const specialtySet = new Set(fullDoctorsData.map((d) => d.specialty))
const specialties = ['All Specialties', ...Array.from(specialtySet).sort((a, b) => a.localeCompare(b))]

const coreValuesConfig = [
  { icon: Award, titleKey: 'coreValue1Title', descKey: 'coreValue1Desc' },
  { icon: Heart, titleKey: 'coreValue2Title', descKey: 'coreValue2Desc' },
  { icon: Target, titleKey: 'coreValue3Title', descKey: 'coreValue3Desc' },
  { icon: Zap, titleKey: 'coreValue4Title', descKey: 'coreValue4Desc' },
  { icon: Shield, titleKey: 'coreValue5Title', descKey: 'coreValue5Desc' }
]

// Guest Experience Images
const guestExperiences = [
  'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop'
]

export default function OurDoctorsPageNew() {
  const shouldReduceMotion = useReducedMotion()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties')
  const [isSpecialtyOpen, setIsSpecialtyOpen] = useState(false)
  const { openBookingSidebar } = useBooking()
  const { t } = useLanguage()
  usePageSEO('Our Doctors', 'Meet the expert dental team at Sky Dental Center. Experienced specialists in general dentistry, implants, orthodontics, and more in Abu Dhabi.')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Filter doctors based on search and specialty
  const filteredDoctors = useMemo(() => {
    return doctorsData.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesSpecialty = selectedSpecialty === 'All Specialties' || doctor.specialty === selectedSpecialty
      return matchesSearch && matchesSpecialty
    })
  }, [searchQuery, selectedSpecialty])

  return (
    <ScrollSection>
    <div className="bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section 
        className="relative min-h-[320px] overflow-hidden pt-20"
        style={{
          background: 'linear-gradient(160deg, rgb(237, 248, 255) 0%, rgb(255, 255, 255) 50%, rgb(237, 248, 255) 100%)'
        }}
      >
        {/* Decorative blurs */}
        <div className="absolute -left-32 top-20 w-96 h-96 bg-[rgba(203,255,143,0.3)] rounded-full blur-[100px]" />
        <div className="absolute -right-32 top-40 w-96 h-96 bg-[rgba(151,196,255,0.2)] rounded-full blur-[100px]" />

        <div className="container mx-auto px-6 py-14 relative z-10">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-['Gilda_Display'] text-black mb-3 tracking-tight leading-tight px-4">
              Doctors
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl font-['Gilda_Display'] text-black/90 mb-6">
              Expert Care You Can Trust
            </p>

            {/* Description */}
            <p className="text-base md:text-lg text-black/70 font-['Arial'] leading-relaxed max-w-3xl mx-auto mb-8">
              Meet our team of highly trained, experienced dental professionals. Each doctor brings a blend of skill, compassion, and modern expertise to every treatment, ensuring your oral health and smile are in the best hands.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                <input
                  type="text"
                  placeholder="Search Doctors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full font-['Arial'] text-sm focus:outline-none focus:border-[#0C0060] transition-colors"
                />
              </div>

              {/* Specialty Filter */}
              <div className="relative md:w-64">
                <button
                  onClick={() => setIsSpecialtyOpen(!isSpecialtyOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-full font-['Arial'] text-sm hover:border-[#0C0060] transition-colors bg-white"
                >
                  <span className="text-black">{selectedSpecialty}</span>
                  <ChevronDown className={`w-4 h-4 text-black/60 transition-transform ${isSpecialtyOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isSpecialtyOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg z-50 max-h-64 overflow-y-auto">
                    {specialties.map((specialty) => (
                      <button
                        key={specialty}
                        onClick={() => {
                          setSelectedSpecialty(specialty)
                          setIsSpecialtyOpen(false)
                        }}
                        className={`w-full text-left px-4 py-3 font-['Arial'] text-sm hover:bg-gray-50 transition-colors ${
                          selectedSpecialty === specialty ? 'bg-[#edf8ff] text-[#0C0060]' : 'text-black'
                        }`}
                      >
                        {specialty}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Results Count */}
              <div className="text-sm font-['Arial'] text-black/60">
                Found <span className="font-bold text-black">{filteredDoctors.length}</span> Doctors
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-[50px] md:py-[60px] lg:py-[70px] px-[16px] md:px-[20px] lg:px-[25px] bg-[#e0edff]">
        <div className="max-w-[1390px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px] md:gap-[24px] lg:gap-[32px]">
            {filteredDoctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: index * 0.15, ease: 'easeOut' }}
                className="group flex flex-col"
              >
                {/* Image Card - front/side view with smooth hover crossfade */}
                <div className="bg-white rounded-[20px] overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group/card">
                  <div className="relative w-full aspect-[3/4] overflow-hidden isolate">
                    {doctor.image ? (
                      <>
                        {/* Layer 1: Side view (back); object-top keeps head in frame */}
                        {doctor.imageSide && (
                          <img
                            src={doctor.imageSide}
                            alt={`${doctor.name} (side view)`}
                            className="absolute inset-0 w-full h-full object-cover object-top z-0"
                            loading="eager"
                          />
                        )}
                        {/* Layer 2: Front view; object-top keeps head in frame */}
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className={`absolute inset-0 w-full h-full object-cover object-top z-[1] opacity-100 ${doctor.imageSide ? 'transition-opacity duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/card:opacity-0' : ''}`}
                          style={doctor.imageSide ? { willChange: 'opacity' } : undefined}
                          loading="eager"
                        />
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <svg className="w-24 h-24 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                    )}
                    {/* Specialty Badge */}
                    <div className="absolute bottom-[16px] left-[16px] bg-black px-5 py-2.5 rounded-full z-10">
                      <span className="text-white text-[12px] md:text-[13px] font-medium whitespace-nowrap">{doctor.specialty}</span>
                    </div>
                  </div>
                </div>
                
                {/* Name and Buttons - Outside the card */}
                <div className="mt-[20px] md:mt-[24px] text-center flex flex-col gap-[12px]">
                  <h3
                    className="text-black text-[18px] md:text-[20px] leading-[1.2]"
                    style={{ fontFamily: "'Gilda Display', serif" }}
                  >
                    {doctor.name}
                  </h3>
                  {/* Buttons - Side by side on larger screens, stacked on mobile */}
                  <div className="flex flex-col sm:flex-row gap-[8px] sm:gap-[12px] items-center justify-center">
                    <Link 
                      to={`/our-doctors/${doctor.id}`}
                      className="bg-white text-[#0C0060] text-[13px] md:text-[14px] font-medium py-[10px] px-[20px] rounded-[12px] hover:bg-[#0C0060] hover:text-white transition-colors text-center whitespace-nowrap"
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={() => openBookingSidebar(doctor.name)}
                      className="flex-1 sm:flex-1 bg-[#CBFF8F] text-[#0C0060] text-[13px] md:text-[14px] font-medium py-[10px] px-[16px] rounded-[12px] hover:bg-[#B1FF57] transition-colors text-center"
                    >
                      Request Appointment
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredDoctors.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-black/60 font-['Arial']">
                No doctors found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedSpecialty('All Specialties')
                }}
                className="mt-4 text-[#0C0060] font-['Arial'] text-sm hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Our Core Values Section */}
      <section 
        className="py-24"
        style={{
          background: 'linear-gradient(180deg, rgb(237, 248, 255) 0%, rgb(255, 255, 255) 100%)'
        }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-['Gilda_Display'] text-black mb-4 tracking-tight">
              {t('about', 'coreValues')}
            </h2>
            <p className="text-base text-black/60 font-['Arial'] max-w-3xl mx-auto">
              Guiding Every Smile, Every Day
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {coreValuesConfig.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-8 text-center shadow-sm"
                >
                  <div className="w-16 h-16 bg-[#CBFF8F] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-[#0C0060]" stroke="#0C0060" />
                  </div>
                  <h3 className="text-xl font-['Gilda_Display'] text-black mb-4">
                    {t('about', value.titleKey)}
                  </h3>
                  <p className="text-sm text-black/70 font-['Arial'] leading-relaxed">
                    {t('about', value.descKey)}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Guest Experiences Gallery */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-['Gilda_Display'] text-black tracking-tight">
              A Collection of Memorable Patient Experiences
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {guestExperiences.map((image, index) => (
              <motion.div
                key={index}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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

    </div>
    </ScrollSection>
  )
}
