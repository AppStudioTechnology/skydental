'use client'

import { motion, useReducedMotion, useInView } from 'motion/react'
import { useRef } from 'react'
import React from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function TechnologySection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const shouldReduceMotion = useReducedMotion()
  
  // Ensure video plays when in view
  React.useEffect(() => {
    if (videoRef.current && isInView) {
      videoRef.current.play().catch((error) => {
        console.error('Error playing video:', error)
      })
    }
  }, [isInView])

  return (
    <section className="py-[80px] px-[16px] md:px-[20px] lg:px-[25px]">
      <div className="max-w-[1390px] mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
          className="relative w-full h-[400px] md:h-[470px] lg:h-[537px] rounded-[20px] md:rounded-[25px] overflow-hidden"
        >
          {/* Background Video */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[#c4c4c4]" />
            <video
              ref={videoRef}
              autoPlay
              loop
              playsInline
              muted
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
              controlsList="nodownload"
              onLoadedData={() => {
                console.log('Technology video loaded successfully')
              }}
              onError={(e) => {
                console.error('Technology video failed to load')
                console.error('Video path:', '/assets/videos/technology-video.mp4')
                console.error('Full URL:', window.location.origin + '/assets/videos/technology-video.mp4')
                console.error('Error:', e)
              }}
            >
              <source src="/assets/videos/technology-video.mp4" type="video/mp4" />
            </video>
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[5.587%] to-[rgba(0,0,0,0.6)] to-[68.156%]" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-end px-[24px] md:px-[36px] lg:px-[48px] pb-[24px] md:pb-[36px] lg:pb-[48px]">
            <div className="flex flex-col gap-[24px] max-w-[1294px]">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.3, duration: shouldReduceMotion ? 0 : 0.6 }}
                className="flex flex-col gap-[16px] md:gap-[20px] lg:gap-[24px] text-white w-full lg:max-w-[884px]"
              >
                <h2
                  className="text-[40px] md:text-[52px] lg:text-[64px] leading-[1.2] tracking-[-1.44px]"
                  style={{ fontFamily: "'Gilda Display', serif" }}
                >
                  {t('home', 'technologyTitle')}
                </h2>
                <p className="text-[16px] md:text-[18px] lg:text-[20px] leading-[1.55]">
                  {t('home', 'technologyDesc')}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}