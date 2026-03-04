'use client'

import { motion, useReducedMotion, useInView } from 'motion/react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

const doctorsData = [
  { id: 'dr-saifaldin-tawakul', name: 'Dr. Saif Eldin Tawakul', specialtyKey: 'specialistOralSurgeon' as const, image: '/doctor1.png' },
  { id: 'dr-basma-al-rawi', name: 'Dr. Basma Alrawi', specialtyKey: 'specialistOralSurgeon' as const, image: '/doctor2.png' },
  { id: 'dr-claude-istanbouli', name: 'Dr. Claude Istanbouli', specialtyKey: 'generalDentalImplantologist' as const, image: '/doctor3.png' },
  { id: 'dr-elias-daoud-hanna', name: 'Dr. Elias Hanna', specialtyKey: 'specialistPedodontist' as const, image: '/doctor4.png' }
]

export default function DoctorsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const shouldReduceMotion = useReducedMotion()
  const { t } = useLanguage()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15
      }
    }
  }

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.6, ease: 'easeOut' }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.6, ease: 'easeOut' }
    }
  }

  return (
    <section id="doctors" className="py-[80px] px-[16px] md:px-[20px] lg:px-[25px] bg-[#e0edff]">
      <div className="max-w-[1390px] mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
          className="text-center mb-[20px] md:mb-[28px] flex flex-col items-center gap-[16px] md:gap-[20px]"
        >
          <p className="text-black/80 text-[18px] md:text-[20px] leading-[1.3] font-medium">
            {t('home', 'doctorsTagline')}
          </p>
          <h2
            className="text-black text-[32px] md:text-[40px] lg:text-[48px] leading-[1.2] tracking-[-1.44px] max-w-[900px]"
            style={{ fontFamily: "'Gilda Display', serif" }}
          >
            {t('home', 'meetOurTeam')}
          </h2>
          <p className="text-black/80 text-[16px] md:text-[17px] leading-[1.55] max-w-[800px]">
            {t('home', 'meetOurTeamSub')}
          </p>
          <Link to="/our-doctors" className="bg-[#CBFF8F] flex items-center gap-4 md:gap-6 pl-4 md:pl-6 pr-[8px] md:pr-[10px] py-2 rounded-[35px] hover:bg-[#B1FF57] transition-colors">
            <span className="text-[#0C0060] font-bold text-[14px] md:text-[16px] whitespace-nowrap">{t('home', 'viewAllDoctors')}</span>
            <div className="bg-[#0C0060] w-[32px] h-[32px] md:w-[34px] md:h-[34px] rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                <path 
                  d="M5 15L15 5" 
                  stroke="#CBFF8F" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                <path 
                  d="M6.875 5H15V13.125" 
                  stroke="#CBFF8F" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </svg>
            </div>
          </Link>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px] md:gap-[24px] lg:gap-[32px]"
        >
          {doctorsData.map((doctor, index) => (
            <DoctorCard key={doctor.id} doctor={doctor} specialty={t('home', doctor.specialtyKey)} viewDetails={t('common', 'viewDetails')} variants={cardVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function DoctorCard({ doctor, specialty, viewDetails, variants }: { doctor: { id: string; name: string; image: string }; specialty: string; viewDetails: string; variants: any }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={variants}
      className="group flex flex-col"
    >
      <div className="bg-white rounded-[20px] overflow-hidden shadow-md hover:shadow-xl transition-shadow">
        <div className="relative h-[350px] md:h-[400px] overflow-hidden">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-[16px] left-[16px] bg-black/70 backdrop-blur-sm px-[16px] py-[8px] rounded-[20px]">
            <span className="text-white text-[12px] md:text-[13px] font-medium">{specialty}</span>
          </div>
        </div>
      </div>
      <div className="mt-[20px] md:mt-[24px] text-center flex flex-col gap-[8px]">
        <h3
          className="text-black text-[18px] md:text-[20px] leading-[1.2]"
          style={{ fontFamily: "'Gilda Display', serif" }}
        >
          {doctor.name}
        </h3>
        <Link 
          to={`/our-doctors/${doctor.id}`}
          className="text-[#0C0060] text-[14px] md:text-[15px] hover:underline"
        >
          {viewDetails}
        </Link>
      </div>
    </motion.div>
  )
}