'use client'

import { motion, useReducedMotion, useInView } from 'motion/react'
import { useRef } from 'react'
import { useBooking } from '../context/BookingContext'
import { useLanguage } from '../context/LanguageContext'
// Image is in public folder, using direct path
const imgImage1 = '/woman-patient-in-dental-clinic-being-examined-by-a-2025-04-01-13-09-56-utc.png'

export default function WhyChooseSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const shouldReduceMotion = useReducedMotion()
  const { openBookingSidebar } = useBooking()
  const { t } = useLanguage()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.1 }
    }
  }

  const itemVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.6, ease: 'easeOut' }
    }
  }

  const imageVariants = {
    hidden: { x: 30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.8, ease: 'easeOut' }
    }
  }

  return (
    <section className="py-[80px] px-[16px] md:px-[20px] lg:px-[25px]">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-[1390px] mx-auto"
      >
        <div className="flex flex-col lg:flex-row items-start gap-[20px] md:gap-[28px] lg:gap-[32px] max-w-[1299px] mx-auto relative lg:min-h-0">
          {/* Left Content - defines section height on lg */}
          <motion.div variants={itemVariants} className="flex flex-col gap-[20px] md:gap-[24px] lg:gap-[28px] flex-1 w-full lg:flex-shrink-0 lg:pr-[753px]">
            <h2
              className="text-black text-[32px] md:text-[40px] lg:text-[48px] leading-[1.2] tracking-[-1.44px] capitalize"
              style={{ fontFamily: "'Gilda Display', serif" }}
            >
              {t('home', 'whyChooseTitle')}
            </h2>

            <p className="text-black/80 text-[16px] leading-[1.55]">
              {t('home', 'whyChooseSub')}
            </p>

            <div className="flex flex-col gap-[12px] md:gap-[16px] w-full lg:max-w-[478px]">
              <ReasonItem number="1" text={t('home', 'reason1')} />
              <ReasonItem number="2" text={t('home', 'reason2')} />
              <ReasonItem number="3" text={t('home', 'reason3')} />
              <ReasonItem number="4" text={t('home', 'reason4')} />
            </div>

            {/* Request Appointment - kept here per doc */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ delay: 0.8, duration: shouldReduceMotion ? 0 : 0.5 }}
              onClick={() => openBookingSidebar()}
              className="bg-[#CBFF8F] flex items-center gap-4 md:gap-6 pl-4 md:pl-6 pr-[8px] md:pr-[10px] py-2 rounded-[35px] hover:bg-[#B1FF57] transition-colors z-10 w-fit mt-6 md:mt-8"
            >
              <span className="text-[#0C0060] font-bold text-[14px] md:text-[16px] whitespace-nowrap">{t('common', 'requestAppointment')}</span>
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
            </motion.button>
          </motion.div>

          {/* Right Image - same height as left content on lg */}
          <motion.div
            variants={imageVariants}
            className="relative w-full h-[400px] md:h-[500px] rounded-[20px] overflow-hidden lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-[721px]"
          >
            <img
              src={imgImage1}
              alt="Dental team"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

function ReasonItem({ number, text }: { number: string; text: string }) {
  return (
    <div className="flex items-center gap-[12px] md:gap-[14px]">
      <div className="bg-[#CBFF8F] w-[34px] h-[34px] md:w-[38px] md:h-[38px] rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-black text-[16px] md:text-[18px] leading-[1.15]">{number}</span>
      </div>
      <p className="text-[#202020] text-[16px] md:text-[18px] leading-[1.15]">{text}</p>
    </div>
  )
}