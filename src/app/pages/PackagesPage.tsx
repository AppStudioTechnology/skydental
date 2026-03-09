'use client'

import { motion, useReducedMotion, useInView } from 'motion/react'
import { useRef, useState } from 'react'
import { ArrowUpRight, Check, GraduationCap, HeartPulse, Sparkles, Smile, Percent, Sparkle } from 'lucide-react'
import { usePageSEO } from '../hooks/usePageSEO'
import imgImage from "../../assets/e2295a1a1a2bc348414dcc117de577c691164137.png"
import imgImage1 from "../../assets/c5fbf2bb2ed01ea6f6ce38835da33519e2db95fe.png"
import imgImage2 from "../../assets/27cea6501d6677b5b8f9f08502ce76c7a193f7f8.png"
import ScrollSection from '../components/ScrollSection'

interface Package {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
}

interface PaymentCard {
  id: string
  name: string
  description: string
  logo: string
  color: string
}

const packages: Package[] = [
  {
    id: 'back-to-school',
    icon: <GraduationCap className="w-6 h-6 text-[#0C0060]" />,
    title: 'Back to School',
    description: 'Give your child a confident start to the academic year with our exclusive Back to School package, designed to protect oral health, enhance confidence, and support long-term wellbeing.',
    features: [
      'Advanced dental assessments',
      'Professional cleaning',
      'Preventive care for young patients'
    ]
  },
  {
    id: 'healthy-smiles',
    icon: <HeartPulse className="w-6 h-6 text-[#0C0060]" />,
    title: 'Sky Healthy Smiles',
    description: 'Our signature Sky Healthy Smiles package offers a comprehensive wellness experience for individuals and families dedicated to maintaining exceptional oral health.',
    features: [
      'Expert dental examinations',
      'Deep professional cleaning',
      'Preventive care guidance'
    ]
  },
  {
    id: 'hollywood-smile',
    icon: <Sparkles className="w-6 h-6 text-[#0C0060]" />,
    title: 'Hollywood Smile',
    description: 'Transform your smile into a refined expression of confidence with our luxury Hollywood Smile package, crafted using advanced cosmetic dentistry and premium veneer artistry.',
    features: [
      'Digital smile design',
      'Premium veneer craftsmanship',
      'Customised facial harmony'
    ]
  },
  {
    id: 'whitening-cleaning',
    icon: <Sparkle className="w-6 h-6 text-[#0C0060]" />,
    title: 'Whitening & Cleaning',
    description: 'Reveal the natural brilliance of your smile with our professional Whitening & Cleaning package—meticulously designed to deliver immediate, radiant results.',
    features: [
      'Advanced stain removal',
      'Clinical-grade whitening technology',
      'Instantly luminous finish'
    ]
  },
  {
    id: 'consultation',
    icon: <Smile className="w-6 h-6 text-[#0C0060]" />,
    title: 'Braces Consultation',
    description: 'Begin your orthodontic journey with clarity and confidence. Your path to a beautifully aligned smile starts with a complimentary consultation.',
    features: [
      'Detailed bite analysis',
      'Comprehensive orthodontic assessment',
      'Personalised treatment roadmap'
    ]
  },
  {
    id: 'discount',
    icon: <Percent className="w-6 h-6 text-[#0C0060]" />,
    title: 'Member Discount – 40%',
    description: 'At Sky Dental Center, we value loyalty. Members enjoy an exclusive 40% discount on selected treatments—exceptional care complemented by outstanding value.',
    features: [
      '40% off selected treatments',
      'Exclusive member privileges',
      'Consistently high standards of care'
    ]
  }
]

const paymentCards = [
  {
    id: 'homat-al-watan',
    name: 'Homat Al Watan',
    description: 'We proudly accept Homat Al Watan cards, providing exclusive benefits for UAE Armed Forces members, veterans, and their families.',
    logo: '/logos/homatalwatan.png',
    color: '#0C0060'
  },
  {
    id: 'tabby',
    name: 'Tabby',
    description: 'Enjoy interest-free installment plans with Tabby. Receive your treatment today and pay over time with ease.',
    logo: '/logos/tabby.svg',
    color: '#000000'
  },
  {
    id: 'tamara',
    name: 'Tamara',
    description: 'Benefit from flexible payment solutions with Tamara, allowing you to manage your dental care costs comfortably and transparently.',
    logo: '/logos/tamara.png',
    color: '#000000'
  },
  {
    id: 'faza',
    name: 'Faza',
    description: 'Faza cardholders receive special discounts and exclusive benefits across our dental services. Simply present your card to enjoy preferred savings.',
    logo: '/logos/fazaa.svg',
    color: '#0C0060'
  }
]

export default function PackagesPage() {
  const shouldReduceMotion = useReducedMotion()
  usePageSEO('Packages & Offers', 'Exclusive dental packages and offers at Sky Dental Center Abu Dhabi. Back to School, loyalty rewards, and premium smile care.')
  const heroRef = useRef(null)
  const packagesRef = useRef(null)
  const privilegesRef = useRef(null)
  const galleryRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true })
  const packagesInView = useInView(packagesRef, { once: true })
  const privilegesInView = useInView(privilegesRef, { once: true })
  const galleryInView = useInView(galleryRef, { once: true })

  return (
    <ScrollSection>
    <div className="bg-white">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-[500px] overflow-hidden pt-32"
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
            <h1 className="text-5xl font-['Gilda_Display'] text-black mb-4 tracking-tight">
              Packages & Premium Offers
            </h1>

            {/* Subtitle */}
            <p className="text-lg italic text-[rgba(12,0,96,0.8)] mb-6 font-['Arial']">
              "Exclusive Dental Packages & Premium Smile Offers in Abu Dhabi"
            </p>

            {/* Description */}
            <p className="text-lg text-[#1b1b1b] font-['Arial'] leading-relaxed mb-10 max-w-3xl mx-auto">
              At Sky Dental Center, we present a carefully curated selection of exclusive dental packages and premium smile offers, thoughtfully designed to enhance both your oral health and dental aesthetics. Each offering reflects our commitment to personalised care, refined excellence, and long-lasting results—delivered within a sophisticated and welcoming environment.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              <div className="bg-[#CBFF8F] border border-[rgba(12,0,96,0.05)] px-4 py-2 rounded-full shadow-sm inline-flex items-center gap-2">
                <Check className="w-4 h-4 text-[#0C0060]" />
                <span className="text-sm text-[#0C0060] font-['Poppins'] font-medium">Premium Care</span>
              </div>
              <div className="bg-[#CBFF8F] border border-[rgba(12,0,96,0.05)] px-4 py-2 rounded-full shadow-sm inline-flex items-center gap-2">
                <Check className="w-4 h-4 text-[#0C0060]" />
                <span className="text-sm text-[#0C0060] font-['Poppins'] font-medium">Exclusive Benefits</span>
              </div>
              <div className="bg-[#CBFF8F] border border-[rgba(12,0,96,0.05)] px-4 py-2 rounded-full shadow-sm inline-flex items-center gap-2">
                <Check className="w-4 h-4 text-[#0C0060]" />
                <span className="text-sm text-[#0C0060] font-['Poppins'] font-medium">World-Class Dentistry</span>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Premium Dental Packages Section */}
      <section ref={packagesRef} className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={packagesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-['Gilda_Display'] text-black mb-6 tracking-tight">
              Premium Dental Packages
            </h2>
            <p className="text-lg text-[#1b1b1b] font-['Arial'] leading-relaxed max-w-3xl mx-auto">
              Whether you are seeking a radiant Hollywood smile, an orthodontic transformation, or comprehensive family dental care, our premium packages are thoughtfully tailored to meet your individual needs and lifestyle.
            </p>
          </motion.div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {packages.map((pkg, index) => {
              const ref = useRef(null)
              const isInView = useInView(ref, { once: true, margin: "-100px" })
              
              return (
                <motion.div
                  key={pkg.id}
                  ref={ref}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white border-[#f3f4f6] border rounded-[32px] p-8 flex flex-col h-full"
                >
                  {/* Icon */}
                  <div className="w-14 h-14 bg-[#CBFF8F] rounded-[18px] flex items-center justify-center mb-5">
                    <div className="text-[#0C0060]">
                      {pkg.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-[22px] font-['Gilda_Display'] text-black mb-4 leading-tight">
                    {pkg.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[15px] text-[#4b5563] font-['Arial'] leading-[1.7] mb-6">
                    {pkg.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-8 flex-grow">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 bg-black rounded-full mt-[7px] shrink-0" />
                        <span className="text-[14px] text-black font-['Arial'] leading-[1.6]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                    className="bg-[#CBFF8F] text-[#0C0060] font-bold px-6 py-3.5 rounded-full w-full inline-flex items-center justify-between hover:bg-[#b8ff6d] transition-colors font-['Arial'] text-[15px]"
                  >
                    <span>Request Now</span>
                    <div className="w-8 h-8 bg-[#0C0060] rounded-full flex items-center justify-center">
                      <ArrowUpRight className="w-[18px] h-[18px] text-[#CBFF8F]" />
                    </div>
                  </motion.button>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Accepted Payment Cards Section */}
      <section 
        ref={privilegesRef}
        className="py-24"
        style={{
          background: 'linear-gradient(180deg, rgb(245, 253, 237) 0%, rgb(255, 255, 255) 100%)'
        }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={privilegesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-['Gilda_Display'] text-black mb-6 tracking-tight">
              Accepted Payment Cards
            </h2>
            <p className="text-lg text-[#1b1b1b] font-['Arial'] leading-relaxed max-w-3xl mx-auto">
              We offer a range of flexible payment options to ensure your dental care is both accessible and convenient.
            </p>
          </motion.div>

          {/* Payment Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {paymentCards.map((card, index) => {
              const ref = useRef(null)
              const isInView = useInView(ref, { once: true, margin: "-100px" })
              const [imageError, setImageError] = useState(false)
              
              return (
                <motion.div
                  key={card.id}
                  ref={ref}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-[#e0edff] to-[#f0f4ff] border border-[#f3f4f6] rounded-3xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Logo Container */}
                  <div className="w-full h-24 bg-white rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden">
                    {!imageError ? (
                      <img 
                        src={card.logo} 
                        alt={`${card.name} logo`}
                        className="max-w-[140px] max-h-[60px] object-contain"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <span className="text-xl font-bold text-[#0C0060]">
                        {card.name}
                      </span>
                    )}
                  </div>

                  {/* Card Name */}
                  <h3 className="text-xl font-['Gilda_Display'] text-black mb-3 text-center">
                    {card.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#4b5563] font-['Arial'] leading-relaxed text-center flex-grow">
                    {card.description}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Additional Info */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={privilegesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-sm text-gray-600 font-['Arial']">
              For further details on payment options and eligibility, please contact our reception team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Guest Experiences Gallery Section */}
      <section ref={galleryRef} className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={galleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-['Gilda_Display'] text-black tracking-tight">
              A Collection of Memorable Patient Experiences
            </h2>
          </motion.div>

          {/* Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[imgImage, imgImage1, imgImage2].map((image, index) => {
              const ref = useRef(null)
              const isInView = useInView(ref, { once: true, margin: "-100px" })
              
              return (
                <motion.div
                  key={index}
                  ref={ref}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative aspect-[3/4] rounded-3xl overflow-hidden group"
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