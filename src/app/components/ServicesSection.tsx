'use client'

import { motion, useReducedMotion, useInView } from 'motion/react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { 
  GeneralDentistryIcon, 
  CosmeticDentistryIcon, 
  PediatricDentistryIcon, 
  ImplantAdvancedCareIcon 
} from './ServiceIcons'

const serviceConfig = [
  { id: 'general-dentistry', titleKey: 'reliefUrgentCareTitle', descKey: 'reliefUrgentCareDesc', Icon: GeneralDentistryIcon, bgColor: '#CBFF8F' },
  { id: 'advanced-restorative', titleKey: 'protectRestoreTitle', descKey: 'protectRestoreDesc', Icon: ImplantAdvancedCareIcon, bgColor: '#CBFF8F' },
  { id: 'cosmetic-dentistry', titleKey: 'smileAestheticsTitle', descKey: 'smileAestheticsDesc', Icon: CosmeticDentistryIcon, bgColor: '#CBFF8F' },
  { id: 'pediatric-dentistry', titleKey: 'pediatricDentistryTitle', descKey: 'pediatricDentistryDesc', Icon: PediatricDentistryIcon, bgColor: '#CBFF8F' },
] as const

function ServiceCard({ service, title, description, learnMore, index }: { service: typeof serviceConfig[number]; title: string; description: string; learnMore: string; index: number }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={cardRef}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white border border-gray-100 rounded-3xl p-5 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group flex flex-col h-full"
    >
      {/* Decorative overlay */}
      <div 
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-30"
        style={{ backgroundColor: 'rgba(224, 237, 255, 0.5)' }}
      />
      
      {/* Icon */}
      <div 
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 relative z-10 flex-shrink-0 bg-[#CBFF8F]"
      >
        <service.Icon className="w-[60px] h-[60px]" />
      </div>

      {/* Content - Takes up remaining space */}
      <div className="flex flex-col flex-grow min-h-0">
        <h3 className="text-xl md:text-xl font-['Gilda_Display'] text-black mb-3 flex-shrink-0">
          {title}
        </h3>
        <p className="text-sm md:text-sm text-black/80 font-['Arial'] leading-relaxed flex-grow min-h-0">
          {description}
        </p>
      </div>

      {/* Learn More Link - Always at bottom */}
      <Link to={`/services/${service.id}`} className="flex items-center gap-2 text-black font-['Poppins'] font-semibold text-sm group-hover:gap-3 transition-all mt-4 flex-shrink-0">
        <span>{learnMore}</span>
        <ArrowUpRight className="w-4 h-4" />
      </Link>
    </motion.div>
  )
}

export default function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const shouldReduceMotion = useReducedMotion()
  const { t } = useLanguage()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.6, ease: 'easeOut' }
    }
  }

  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <section id="services" className="pt-0 w-full">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="w-full"
        >
          {/* Service Detail Card - Full Width Blue Background */}
          <motion.div
            variants={itemVariants}
            className="bg-[#e0edff] rounded-none pt-[64px] pb-[64px] px-[24px] md:pt-[80px] md:pb-[80px] md:px-[36px] lg:pt-[96px] lg:pb-[96px] lg:px-[48px] relative overflow-hidden w-full"
          >
            {/* Background Tooth Icon */}
            <div className="absolute left-[-163px] top-[-97px] w-[642px] h-[642px] opacity-5 hidden lg:block">
              <BigToothIcon />
            </div>

            {/* Title */}
            <h2
              className="text-black text-[32px] md:text-[40px] lg:text-[48px] leading-[1.2] tracking-[-1.44px] text-center mb-[20px] md:mb-[28px] relative z-10"
              style={{ fontFamily: "'Gilda Display', serif" }}
            >
              {t('home', 'whatDoYouNeedToday')}
            </h2>

            {/* Services Grid - All 5 cards in one row on large screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10 px-4 md:px-6 lg:px-8 items-stretch">
              {serviceConfig.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  title={t('home', service.titleKey)}
                  description={t('home', service.descKey)}
                  learnMore={t('common', 'learnMore')}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}

function BigToothIcon() {
  return (
    <svg className="w-full h-full" fill="none" viewBox="0 0 641.997 612.581">
      <g>
        <path d="M320.999 0C144.5 0 0 137.29 0 306.291C0 475.291 144.5 612.581 320.999 612.581C497.499 612.581 641.997 475.291 641.997 306.291C641.997 137.29 497.499 0 320.999 0Z" fill="black" />
        <path d="M320.999 122.516C220.5 122.516 140.5 202.516 140.5 303.016C140.5 403.516 220.5 483.516 320.999 483.516C421.499 483.516 501.499 403.516 501.499 303.016C501.499 202.516 421.499 122.516 320.999 122.516Z" fill="black" />
        <path d="M320.999 183.774C253.5 183.774 201.75 235.524 201.75 303.024C201.75 370.524 253.5 422.274 320.999 422.274C388.499 422.274 440.249 370.524 440.249 303.024C440.249 235.524 388.499 183.774 320.999 183.774Z" fill="black" />
        <path d="M320.999 244.032C286.5 244.032 263 267.532 263 302.032C263 336.532 286.5 360.032 320.999 360.032C355.499 360.032 378.999 336.532 378.999 302.032C378.999 267.532 355.499 244.032 320.999 244.032Z" fill="black" />
      </g>
    </svg>
  )
}
