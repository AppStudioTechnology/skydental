'use client'

import { motion, useReducedMotion } from 'motion/react'
import { useLanguage } from '../context/LanguageContext'

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion()
  const { t } = useLanguage()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.2,
        delayChildren: shouldReduceMotion ? 0 : 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.8, ease: 'easeOut' }
    }
  }

  return (
    <section id="home" className="relative w-full min-h-[70vh] h-[85vh] md:h-[90vh] lg:h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 rounded-none overflow-hidden">
        <video 
          autoPlay 
          loop 
          playsInline 
          muted
          preload="auto"
          fetchPriority="high"
          className="absolute w-full h-full object-cover"
          controlsList="nodownload"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Transparent dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/35" aria-hidden />
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent from-[44.828%] to-[rgba(0,0,0,0.7)]"
        />
      </div>

      {/* Content - responsive padding and spacing by breakpoint */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 h-full flex flex-col justify-end px-4 sm:px-5 md:px-8 lg:px-10 xl:px-6 pb-12 sm:pb-14 md:pb-[36px] lg:pb-[44px] xl:pb-[48px] pt-10 sm:pt-12 md:pt-0 w-full max-w-[1340px] mx-auto"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between w-full gap-4 sm:gap-6 md:gap-[40px]">
          {/* Left Content - headline with responsive type scale */}
          <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-[16px] max-w-full lg:max-w-[771px]">
            <motion.h1
              variants={itemVariants}
              className="text-white leading-[1.2] tracking-tight font-serif
                text-[26px] sm:text-[30px]
                md:text-[44px] md:leading-[1.18]
                lg:text-[56px] lg:leading-[1.15]
                xl:text-[64px] 2xl:text-[70px] xl:leading-[1.12]
                tracking-[-0.02em] md:tracking-[-0.03em]"
              style={{ fontFamily: "'Gilda Display', serif" }}
            >
              {t('hero', 'title')}
              <br />
              <span className="whitespace-nowrap">{t('hero', 'tagline1')}{t('hero', 'tagline2')}</span>
              <br />
              <span style={{ color: '#cbff8f' }}>{t('hero', 'tagline3')}</span>
            </motion.h1>
          </div>
        </div>
      </motion.div>
    </section>
  )
}