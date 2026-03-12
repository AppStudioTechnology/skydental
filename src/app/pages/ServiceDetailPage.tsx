'use client'

import { motion, useReducedMotion, useInView } from 'motion/react'
import { useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowUpRight, Home, ChevronRight } from 'lucide-react'
import { getServiceById } from '../data/servicesData'
import { useBooking } from '../context/BookingContext'
import { serviceIcons } from '../components/ServiceIcons'
import { usePageSEO } from '../hooks/usePageSEO'
import ScrollSection from '../components/ScrollSection'

// Guest experience images
const guestExperiences = [
  'https://images.unsplash.com/photo-1606811842243-af7e16970c1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1758205307854-5f0b57c27f17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1642844819197-5f5f21b89ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
]

function ServiceCard({ service, index }: { service: any; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Icon */}
      <div 
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
        style={{ backgroundColor: '#CBFF8F' }}
      >
        <service.icon className="w-8 h-8 text-[#0C0060]" />
      </div>

      {/* Content */}
      <h3 className="text-2xl font-['Gilda_Display'] text-black mb-4">
        {service.title}
      </h3>
      <p className="text-base text-black/80 font-['Arial'] leading-relaxed mb-6">
        {service.description}
      </p>

      {/* Features */}
      <ul className="space-y-2">
        {service.features.map((feature: string, idx: number) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-black/70 font-['Arial']">
            <span className="text-[#0C0060] mt-1">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function ServiceDetailPage() {
  const { serviceId } = useParams()
  const service = getServiceById(serviceId || '')
  const shouldReduceMotion = useReducedMotion()
  usePageSEO(service?.title, service ? `${service.shortDescription} Sky Dental Center Abu Dhabi.` : undefined)

  const heroRef = useRef(null)
  const benefitsRef = useRef(null)
  const servicesRef = useRef(null)
  const whyChooseRef = useRef(null)
  const ctaRef = useRef(null)
  const experiencesRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true })
  const benefitsInView = useInView(benefitsRef, { once: true })
  const servicesInView = useInView(servicesRef, { once: true })
  const whyChooseInView = useInView(whyChooseRef, { once: true })
  const ctaInView = useInView(ctaRef, { once: true })
  const experiencesInView = useInView(experiencesRef, { once: true })
  
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-['Gilda_Display'] text-black mb-4">Service Not Found</h1>
          <Link to="/services" className="text-[#0C0060] hover:underline">
            Back to Services
          </Link>
        </div>
      </div>
    )
  }

  return (
    <ScrollSection>
    <div className="bg-white">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-[500px] overflow-hidden pt-24"
        style={{
          background: 'linear-gradient(160.216deg, rgb(224, 237, 255) 0%, rgb(255, 255, 255) 50%, rgb(224, 237, 255) 100%)'
        }}
      >
        {/* Decorative blurs */}
        <div className="absolute -left-24 top-40 w-64 h-64 bg-[rgba(203,255,143,0.2)] rounded-full blur-[64px]" />
        <div className="absolute right-32 top-80 w-64 h-64 bg-[rgba(12,0,96,0.1)] rounded-full blur-[64px]" />

        <div className="container mx-auto px-6 py-20 relative z-10">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-['Gilda_Display'] text-black mb-6 tracking-tight">
              {service.hero.title}
            </h1>

            {/* Description */}
            <p className="text-lg text-black/80 font-['Arial'] leading-relaxed mb-10 max-w-3xl mx-auto">
              {service.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                onClick={() => openBookingSidebar()}
                className="bg-[#CBFF8F] text-[#0C0060] font-bold px-8 py-4 rounded-full inline-flex items-center gap-3 hover:bg-[#b8ff6d] transition-colors font-['Arial']"
              >
                <span>Request Appointment</span>
                <div className="w-9 h-9 bg-[#0C0060] rounded-full flex items-center justify-center">
                  <ArrowUpRight className="w-5 h-5 text-[#CBFF8F]" />
                </div>
              </motion.button>

              <motion.a
                href="tel:+97126677448"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                className="bg-white text-[#0C0060] font-bold px-8 py-4 rounded-full inline-flex items-center gap-3 hover:bg-gray-50 transition-colors font-['Arial'] no-underline"
              >
                <span>Call Us Now</span>
                <div className="w-9 h-9 bg-[#CBFF8F] rounded-full flex items-center justify-center">
                  <ArrowUpRight className="w-5 h-5 text-[#0C0060]" />
                </div>
              </motion.a>
            </div>

            {/* Breadcrumbs */}
            <div className="flex items-center justify-center gap-2 text-sm">
              <Link to="/" className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                <Home className="w-4 h-4" />
                <span className="font-['Arial']">Home</span>
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link to="/services" className="text-gray-500 hover:text-gray-700 font-['Arial']">
                Services
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-[#0C0060] font-['Arial']">{service.title}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section - moved up */}
      <section ref={servicesRef} className="py-24 bg-[#f8f9fa]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-['Gilda_Display'] text-black mb-6 tracking-tight">
              Our {service.title} Services
            </h2>
            <p className="text-lg text-black/70 font-['Arial'] leading-relaxed max-w-3xl mx-auto">
              {service.servicesIntro ?? 'From routine checkups to specialized treatments, we offer comprehensive care for your oral health needs.'}
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {service.services.map((item, index) => (
              <ServiceCard key={index} service={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Comprehensive Care for Your Smile - moved below Services */}
      <section ref={benefitsRef} className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-['Gilda_Display'] text-black mb-6 tracking-tight">
              Comprehensive Care for Your Smile
            </h2>
            <p className="text-lg text-black/70 font-['Arial'] leading-relaxed max-w-3xl mx-auto">
              {service.benefitsIntro ?? 'Our team provides precise, comfortable care designed to protect your smile and maintain healthy teeth and gums. We adopt modern techniques to ensure accurate results and an exceptional patient journey.'}
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {service.benefits.map((benefit, index) => {
              const ref = useRef(null)
              const isInView = useInView(ref, { once: true, margin: "-100px" })
              
              return (
                <motion.div
                  key={index}
                  ref={ref}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="bg-[#CBFF8F] rounded-3xl p-8 text-center"
                >
                  <div className="w-16 h-16 bg-[#E0EDFF] rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="w-8 h-8 text-[#0C0060]" />
                  </div>
                  <h3 className="text-2xl font-['Gilda_Display'] text-black mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-base text-black/80 font-['Arial']">
                    {benefit.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section ref={whyChooseRef} className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, x: -30 }}
                animate={whyChooseInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-5xl font-['Gilda_Display'] text-black mb-6 tracking-tight">
                  {service.whyChoose.title}
                </h2>
                <p className="text-lg text-black/70 font-['Arial'] leading-relaxed mb-8">
                  {service.whyChoose.description}
                </p>

                <ul className="space-y-4">
                  {service.whyChoose.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
                      animate={whyChooseInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 bg-[#CBFF8F] rounded-full flex items-center justify-center mt-1 shrink-0">
                        <span className="text-[#0C0060] text-sm">✓</span>
                      </div>
                      <span className="text-base text-black/80 font-['Arial'] leading-relaxed">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, x: 30 }}
                animate={whyChooseInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={service.whyChoose.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#CBFF8F] rounded-3xl -z-10" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={ctaRef}
        className="py-24 relative overflow-hidden"
        style={{
          background: 'linear-gradient(160.216deg, rgb(224, 237, 255) 0%, rgb(255, 255, 255) 50%, rgb(224, 237, 255) 100%)'
        }}
      >
        {/* Decorative blur */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[rgba(203,255,143,0.2)] rounded-full blur-[64px]" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-5xl font-['Gilda_Display'] text-black mb-6 tracking-tight">
              {service.cta?.title ?? 'Ready to Prioritize Your Oral Health?'}
            </h2>
            <p className="text-lg text-black/70 font-['Arial'] leading-relaxed mb-10">
              {service.cta?.description ?? 'Schedule your appointment today! Allow our team to help create the healthy, beautiful smile you deserve.'}
            </p>

            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              onClick={() => openBookingSidebar()}
              className="bg-[#CBFF8F] text-[#0C0060] font-bold px-10 py-5 rounded-full inline-flex items-center gap-3 hover:bg-[#b8ff6d] transition-colors font-['Arial'] text-lg"
            >
              <span>{service.cta?.buttonText ?? 'Book Your Appointment'}</span>
              <div className="w-10 h-10 bg-[#0C0060] rounded-full flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-[#CBFF8F]" />
              </div>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Guest Experiences Section */}
      <section ref={experiencesRef} className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={experiencesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-['Gilda_Display'] text-black tracking-tight">
              A Collection of Memorable Patient Experiences
            </h2>
          </motion.div>

          {/* Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {guestExperiences.map((image, index) => {
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
                    alt={`Guest experience ${index + 1}`}
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
