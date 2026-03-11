'use client'

import { motion, useReducedMotion, useInView } from 'motion/react'
import { useLanguage } from '../context/LanguageContext'
import { useRef, useState, useCallback, useEffect } from 'react'

// Update these paths to your new high-quality images in the public folder
const BEFORE_IMAGE = '/assets/images/before-treatment.jp.png'
const AFTER_IMAGE = '/assets/images/after-treatment.jpg.jpg'

export default function ResultsSection() {
  const ref = useRef(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const shouldReduceMotion = useReducedMotion()
  const { t } = useLanguage()
  
  // Track slider position (0-100%)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const animationFrameRef = useRef<number | null>(null)

  const updateSliderPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = (x / rect.width) * 100
    
    // Clamp between 0 and 100
    const newPosition = Math.max(0, Math.min(100, percentage))
    
    // Use requestAnimationFrame for smooth updates
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    
    animationFrameRef.current = requestAnimationFrame(() => {
      setSliderPosition(newPosition)
    })
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    e.preventDefault()
    updateSliderPosition(e.clientX)
  }, [updateSliderPosition])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return
    updateSliderPosition(e.clientX)
  }, [isDragging, updateSliderPosition])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true)
    if (e.touches[0]) {
      updateSliderPosition(e.touches[0].clientX)
    }
  }, [updateSliderPosition])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || !e.touches[0]) return
    updateSliderPosition(e.touches[0].clientX)
  }, [isDragging, updateSliderPosition])

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  // Add/remove event listeners when dragging state changes
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchmove', handleTouchMove)
      window.addEventListener('touchend', handleTouchEnd)
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
        window.removeEventListener('touchmove', handleTouchMove)
        window.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd])

  return (
    <section className="pt-[24px] pb-[80px] px-0 overflow-x-hidden">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
        className="w-full bg-[#e0edff] rounded-none"
      >
        <div className="max-w-[1390px] mx-auto px-[16px] md:px-[20px] lg:px-[25px] py-[24px] md:py-[36px] lg:py-[48px]">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-[24px] md:gap-[32px] lg:gap-[40px] min-w-0">
            {/* Before/After Images */}
            <motion.div
              ref={containerRef}
              initial={{ x: -50, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.3, duration: shouldReduceMotion ? 0 : 0.8 }}
              className="relative w-full lg:w-[600px] h-[400px] md:h-[500px] lg:h-[565px] rounded-[12px] md:rounded-[16px] overflow-hidden select-none"
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              {/* After Image (Full width - underneath) */}
              <div className="absolute inset-0">
                <img
                  src={AFTER_IMAGE}
                  alt="After treatment"
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.1)]" />
                
                {/* After Label */}
                <div className="absolute top-[20px] right-[20px] bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-[#0C0060] font-semibold text-[14px]">{t('common', 'after')}</span>
                </div>
              </div>

              {/* Before Image (Clipped by slider position) */}
              <div 
                className="absolute inset-0"
                style={{ 
                  clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                  pointerEvents: 'none',
                  willChange: 'clip-path',
                  transition: isDragging ? 'none' : 'clip-path 0.1s ease-out'
                }}
              >
                <img
                  src={BEFORE_IMAGE}
                  alt="Before treatment"
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]" />
                
                {/* Before Label */}
                <div className="absolute top-[20px] left-[20px] bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-[#0C0060] font-semibold text-[14px]">{t('common', 'before')}</span>
                </div>
              </div>

              {/* Draggable Divider with controls */}
              <div 
                className="absolute top-0 bottom-0 w-[4px] bg-white"
                style={{ 
                  left: `${sliderPosition}%`, 
                  transform: 'translateX(-50%)',
                  willChange: 'left',
                  transition: isDragging ? 'none' : 'left 0.1s ease-out'
                }}
              >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-[8px]">
                  {/* Left Arrow */}
                  <button 
                    className="w-[34px] h-[34px] bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSliderPosition(Math.max(0, sliderPosition - 10))
                    }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                      <path d="M12 15L7 10L12 5" stroke="#808080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  
                  {/* Right Arrow */}
                  <button 
                    className="w-[34px] h-[34px] bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSliderPosition(Math.min(100, sliderPosition + 10))
                    }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                      <path d="M8 5L13 10L8 15" stroke="#0C0060" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right Content - min-w-0 prevents flex overflow on mobile */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.5, duration: shouldReduceMotion ? 0 : 0.8 }}
              className="flex flex-col gap-[20px] md:gap-[28px] lg:gap-[32px] min-w-0 w-full max-w-full lg:max-w-[610px]"
            >
              <div className="flex flex-col gap-[16px] min-w-0">
                <h2
                  className="text-black text-[28px] sm:text-[32px] md:text-[40px] lg:text-[48px] leading-[1.2] tracking-[-1.44px] capitalize lg:whitespace-nowrap"
                  style={{ fontFamily: "'Gilda Display', serif" }}
                >
                  {t('home', 'excellentResults')}
                </h2>
                <p className="text-[#202020] text-[15px] sm:text-[16px] leading-[1.55] break-words">
                  {t('home', 'excellentResultsDesc')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}