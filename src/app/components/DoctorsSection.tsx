'use client'

import { motion, useReducedMotion, useInView } from 'motion/react'
import { useRef, useEffect, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { doctorsData as fullDoctorsData } from '../data/doctorsData'
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from './ui/carousel'
import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'

// All doctors for the carousel (same filter as OurDoctorsPage: hide Dr. Arwa)
const doctorsData = fullDoctorsData.filter((d) => d.id !== 'dr-arwa-rashed')

/** Next button: at end scroll back to start (Dr. Kinan) so first and last never meet with no gap */
function DoctorsCarouselNext() {
  const { scrollNext, canScrollNext, api } = useCarousel()
  return (
    <Button
      variant="outline"
      size="icon"
      data-slot="carousel-next"
      className="absolute top-1/2 -right-12 md:-right-14 -translate-y-1/2 z-20 size-10 md:size-11 rounded-full border-2 border-[#0C0060] bg-white text-[#0C0060] hover:bg-[#0C0060] hover:text-white disabled:opacity-40 shadow-lg hover:shadow-xl transition-shadow"
      aria-label="Next doctor"
      onClick={() => (canScrollNext ? scrollNext() : api?.scrollTo(0))}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  )
}

const AUTOPLAY_DELAY_MS = 4500

export default function DoctorsSection() {
  const ref = useRef(null)
  const emblaRef = useRef<CarouselApi | null>(null)
  const [apiReady, setApiReady] = useState(false)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const shouldReduceMotion = useReducedMotion()
  const { t } = useLanguage()

  const setApi = useCallback((api: CarouselApi | null) => {
    emblaRef.current = api
    if (api) setApiReady(true)
  }, [])

  useEffect(() => {
    if (shouldReduceMotion || !apiReady || !emblaRef.current) return
    const api = emblaRef.current
    const interval = setInterval(() => {
      if (!api) return
      const last = api.scrollSnapList().length - 1
      const selected = api.selectedScrollSnap()
      if (selected >= last) {
        api.scrollTo(0)
      } else {
        api.scrollNext()
      }
    }, AUTOPLAY_DELAY_MS)
    return () => clearInterval(interval)
  }, [shouldReduceMotion, apiReady])

  return (
    <section id="doctors" className="py-[80px] px-[16px] md:px-[20px] lg:px-[25px] bg-[#e8f5e9]">
      <div className="max-w-[1390px] mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
          className="text-center mb-[20px] md:mb-[28px] flex flex-col items-center gap-[16px] md:gap-[20px]"
        >
          <p className="text-black/80 text-[18px] md:text-[20px] leading-[1.3] font-medium">
            {t('home', 'doctorsTagline')}
          </p>
          <h2
            className="text-black text-[32px] md:text-[40px] lg:text-[48px] leading-[1.2] tracking-[-1.44px] max-w-[900px]"
            style={{ fontFamily: "'Gilda Display', serif" }}
          >
            {t('home', 'meetOurTeam')}
          </h2>
          <p className="text-black/80 text-[16px] md:text-[17px] leading-[1.55] max-w-[800px]">
            {t('home', 'meetOurTeamSub')}
          </p>
          <Link to="/our-doctors" className="bg-[#CBFF8F] flex items-center gap-4 md:gap-6 pl-4 md:pl-6 pr-[8px] md:pr-[10px] py-2 rounded-[35px] hover:bg-[#B1FF57] transition-colors">
            <span className="text-[#0C0060] font-bold text-[14px] md:text-[16px] whitespace-nowrap">{t('common', 'viewAllDoctors')}</span>
            <div className="bg-[#0C0060] w-[32px] h-[32px] md:w-[34px] md:h-[34px] rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                <path d="M5 15L15 5" stroke="#CBFF8F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.875 5H15V13.125" stroke="#CBFF8F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Link>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
          className="relative px-14 md:px-16 lg:px-20"
        >
          {/* No overflow-hidden on Carousel root so arrows at -left-12/-right-12 stay visible in padded area */}
          <Carousel
            setApi={setApi}
            opts={{
              loop: false,
              align: 'start',
              dragFree: false,
              slidesToScroll: 1,
              containScroll: 'trimSnaps',
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-0 md:-ml-4 md:gap-4 xl:-ml-0 xl:gap-6">
              {doctorsData.map((doctor) => (
                <CarouselItem
                  key={doctor.id}
                  className="pl-0 basis-full min-w-0 shrink-0 md:pl-4 md:basis-[calc(50%-0.5rem)] lg:basis-[calc(33.333%-0.5rem)] xl:basis-[calc(25cqw-1.125rem)] xl:pl-0"
                >
                  {/* Single big card on mobile; no wrapper on desktop so 4 cards show in row */}
                  <div className="max-w-[360px] sm:max-w-[400px] mx-auto px-2 md:max-w-none md:mx-0 md:px-0">
                    <DoctorCard
                      doctor={{
                        id: doctor.id,
                        name: doctor.name.replace(/,?\s*DDS\s*$/i, '').trim(),
                        image: doctor.image,
                        imageSide: doctor.imageSide,
                      }}
                      specialty={doctor.specialty}
                      viewDetails={t('common', 'viewDetails')}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              className="-left-12 md:-left-14 top-1/2 -translate-y-1/2 z-20 size-10 md:size-11 border-2 border-[#0C0060] bg-white text-[#0C0060] hover:bg-[#0C0060] hover:text-white disabled:opacity-40 shadow-lg hover:shadow-xl transition-shadow"
              aria-label="Previous doctor"
            />
            <DoctorsCarouselNext />
          </Carousel>
        </motion.div>
      </div>
    </section>
  )
}

function DoctorCard({
  doctor,
  specialty,
  viewDetails,
}: {
  doctor: { id: string; name: string; image: string; imageSide?: string }
  specialty: string
  viewDetails: string
}) {
  return (
    <div className="group flex flex-col">
      <div className="bg-white rounded-[20px] overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="relative w-full aspect-[3/5] overflow-hidden isolate">
          {doctor.imageSide && (
            <img
              src={doctor.imageSide}
              alt={`${doctor.name} (side view)`}
              className="absolute inset-0 w-full h-full object-cover object-top z-0"
              loading="lazy"
            />
          )}
          <img
            src={doctor.image}
            alt={doctor.name}
            className={`absolute inset-0 w-full h-full object-cover object-top z-[1] opacity-100 ${doctor.imageSide ? 'transition-opacity duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-0' : ''}`}
            style={doctor.imageSide ? { willChange: 'opacity' } : undefined}
            loading="lazy"
          />
          <div className="absolute bottom-[16px] left-[16px] bg-black px-5 py-2.5 rounded-full z-10">
            <span className="text-white text-[12px] md:text-[13px] font-medium line-clamp-2">{specialty}</span>
          </div>
        </div>
      </div>
      <div className="mt-[20px] md:mt-[24px] text-center flex flex-col gap-[8px]">
        <h3 className="text-black text-[18px] md:text-[20px] leading-[1.2]" style={{ fontFamily: "'Gilda Display', serif" }}>
          {doctor.name}
        </h3>
        <Link
          to={`/our-doctors/${doctor.id}`}
          className="inline-block bg-white text-[#0C0060] text-[13px] md:text-[14px] font-medium py-[10px] px-[20px] rounded-[12px] hover:bg-[#0C0060] hover:text-white transition-colors text-center whitespace-nowrap"
        >
          {viewDetails}
        </Link>
      </div>
    </div>
  )
}
