'use client'

import { useEffect, useState, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOverClickable, setIsOverClickable] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>()
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    // Don't show custom cursor on mobile/touch devices or if user prefers reduced motion
    if (shouldReduceMotion || typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0

    const animate = () => {
      // Smooth interpolation for trailing effect
      currentX += (targetX - currentX) * 0.1
      currentY += (targetY - currentY) * 0.1

      if (cursorRef.current) {
        cursorRef.current.style.left = `${currentX}px`
        cursorRef.current.style.top = `${currentY}px`
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    const checkIfClickable = (element: Element | null): boolean => {
      if (!element) return false
      
      // Check if element is clickable
      const tagName = element.tagName.toLowerCase()
      if (tagName === 'a' || tagName === 'button' || tagName === 'input' || tagName === 'textarea' || tagName === 'select') {
        return true
      }
      
      // Check if element has click handler or role
      if (element.hasAttribute('onclick') || 
          element.getAttribute('role') === 'button' ||
          element.getAttribute('tabindex') !== null) {
        return true
      }
      
      // Check computed cursor style
      const computedStyle = window.getComputedStyle(element)
      const cursor = computedStyle.cursor
      if (cursor === 'pointer' || cursor === 'grab' || cursor === 'grabbing') {
        return true
      }
      
      return false
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      
      // Check if we're over a clickable element
      const elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY)
      const clickable = checkIfClickable(elementUnderMouse)
      setIsOverClickable(clickable)
      
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
      setIsOverClickable(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.body.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.body.removeEventListener('mouseenter', handleMouseEnter)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [shouldReduceMotion])

  // Don't render on mobile or if reduced motion is preferred
  if (shouldReduceMotion || typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999]"
      style={{
        transform: 'translate(-50%, -50%)',
        opacity: isVisible && !isOverClickable ? 1 : 0,
        transition: 'opacity 0.2s ease-out',
        willChange: 'transform',
      }}
    >
      <div className="w-10 h-10 md:w-12 md:h-12">
        <img 
          src="/logos/tooth-logo.png" 
          alt="Sky Dental Logo" 
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  )
}
