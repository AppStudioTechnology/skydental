'use client'

import { motion, useReducedMotion, useInView } from 'motion/react'
import { useRef, useState } from 'react'
import { Shield } from 'lucide-react'

const insurancePartners = [
  { id: '1', name: 'Thiqa', logo: '/logos/thiqa.webp' },
  { id: '2', name: 'Daman', logo: '/logos/daman.webp' },
  { id: '3', name: 'ADNIC', logo: '/logos/adnic.webp' },
  { id: '4', name: 'NAS', logo: '/logos/nas.webp' },
  { id: '5', name: 'Neuron', logo: '/logos/neuron.webp' },
  { id: '6', name: 'AXA GIG', logo: '/logos/axagig.webp' },
  { id: '7', name: 'NextCare', logo: '/logos/nextcare.webp' },
  { id: '8', name: 'MedNet', logo: '/logos/mednet.webp' },
  { id: '9', name: 'Cigna', logo: '/logos/cigna.webp' },
  { id: '10', name: 'SAICO', logo: '/logos/saico.webp' },
]

function PartnerCard({ partner }: { partner: typeof insurancePartners[0] }) {
  const [imageError, setImageError] = useState(false)
  const isBiggerLogo = partner.name === 'AXA GIG' || partner.name === 'MedNet' || partner.name === 'SAICO'
  
  return (
    <div className="bg-white rounded-2xl px-12 py-8 flex items-center justify-center w-[230px] shrink-0 h-[128px]">
      {!imageError ? (
        <img
          src={partner.logo}
          alt={`${partner.name} logo`}
          className={isBiggerLogo ? "max-w-[240px] max-h-[80px] object-contain" : "max-w-[180px] max-h-[60px] object-contain"}
          loading="lazy"
          decoding="async"
          onError={() => setImageError(true)}
        />
      ) : (
        <p className="text-base text-[#9ca3af] font-['Arial'] font-semibold whitespace-nowrap">
          {partner.name}
        </p>
      )}
    </div>
  )
}

export default function InsurancePartnersSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      ref={ref}
      className="py-[80px] overflow-hidden"
      style={{
        background: '#CBFF8F',
      }}
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-6 border border-[#e5e7eb]">
            <Shield className="w-4 h-4 text-[#4b5563]" />
            <span className="text-xs text-[#4b5563] font-['Arial'] font-medium uppercase tracking-wider">
              DIRECT BILLING AVAILABLE
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-['Gilda_Display'] text-black tracking-tight mb-6">
            Insurance Partners
          </h2>
          <p className="text-[15px] text-[#4b5563] font-['Arial'] leading-relaxed max-w-3xl mx-auto">
            We work with a wide network of trusted local and international insurance providers to make premium dental care more accessible. Our team takes care of benefits verification, approvals, and claims.
          </p>
        </motion.div>

        {/* Infinite Scrolling Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={shouldReduceMotion ? {} : {
                x: [0, -1920],
              }}
              transition={shouldReduceMotion ? {} : {
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {/* First set of partners */}
              {insurancePartners.map((partner) => (
                <PartnerCard key={`first-${partner.id}`} partner={partner} />
              ))}
              {/* Duplicate set for infinite scroll */}
              {insurancePartners.map((partner) => (
                <PartnerCard key={`second-${partner.id}`} partner={partner} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
