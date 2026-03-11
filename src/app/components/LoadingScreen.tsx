'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'

import logoSrc from '../../assets/0279a12caadec65ec1eff7a13c4a4eb8aa32c2fa.png'

interface LoadingScreenProps {
  onComplete?: () => void
  visible: boolean
}

export default function LoadingScreen({ visible, onComplete }: LoadingScreenProps) {
  const [exiting, setExiting] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (!visible) {
      setExiting(true)
      const t = setTimeout(() => onComplete?.(), 400)
      return () => clearTimeout(t)
    }
  }, [visible, onComplete])

  if (!visible && !exiting) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-[400ms] ease-out"
      style={{
        opacity: exiting ? 0 : 1,
        pointerEvents: exiting ? 'none' : 'auto',
      }}
      aria-hidden={exiting}
      aria-live="polite"
    >
      <div className="relative flex items-center justify-center">
        {/* Animated circle(s) around logo */}
        <div className="absolute size-[120px] md:size-[160px]" aria-hidden>
          <svg
            className={`size-full -rotate-90 ${shouldReduceMotion ? '' : 'animate-loading-spin'}`}
            viewBox="0 0 100 100"
            fill="none"
          >
            <circle
              cx="50"
              cy="50"
              r="46"
              stroke="rgba(0, 97, 175, 0.15)"
              strokeWidth="3"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="46"
              stroke="url(#loading-gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="120 170"
              fill="none"
              className={shouldReduceMotion ? '' : 'animate-loading-dash'}
            />
            <defs>
              <linearGradient id="loading-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0061AF" />
                <stop offset="100%" stopColor="#CBFF8F" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <img
          src={logoSrc}
          alt="Sky Dental Center"
          className="relative z-10 h-14 w-14 object-contain md:h-16 md:w-16"
          width={64}
          height={64}
          fetchPriority="high"
        />
      </div>
    </div>
  )
}
