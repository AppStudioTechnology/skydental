'use client'

import { motion, useReducedMotion } from 'motion/react'
import { useLanguage } from '../context/LanguageContext'

const testimonialImages = [
  "https://images.unsplash.com/photo-1684607633024-f1a2179118fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRlbnRhbCUyMHBhdGllbnQlMjBzbWlsaW5nfGVufDF8fHx8MTc2Nzc4OTY1NHww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1681939283065-011297ba26eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXRpc2ZpZWQlMjB3b21hbiUyMGRlbnRhbCUyMGNsaW5pY3xlbnwxfHx8fDE3Njc4NjU2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1758205307804-097f5437189f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBwYXRpZW50JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2Nzg2NTYyMXww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1684607633024-f1a2179118fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRlbnRhbCUyMHBhdGllbnQlMjBzbWlsaW5nfGVufDF8fHx8MTc2Nzc4OTY1NHww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1681939283065-011297ba26eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXRpc2ZpZWQlMjB3b21hbiUyMGRlbnRhbCUyMGNsaW5pY3xlbnwxfHx8fDE3Njc4NjU2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1758205307804-097f5437189f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBwYXRpZW50JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2Nzg2NTYyMXww&ixlib=rb-4.1.0&q=80&w=1080"
]

function TestimonialCard({ text, author, image }: { text: string; author: string; image: string }) {
  return (
    <div className="w-[320px] md:w-[380px] shrink-0 bg-[#CBFF8F] rounded-[20px] p-[20px] md:p-[24px] flex flex-col gap-4 h-full min-h-[220px]">
      <p className="text-black text-[14px] md:text-[15px] leading-[1.55] line-clamp-4 flex-1">
        {text}
      </p>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-white">
            <img
              src={image}
              alt={author}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <span className="text-black font-semibold text-[14px] md:text-[15px]">
            {author}
          </span>
        </div>
        <div className="flex gap-0.5 shrink-0">
          {[...Array(5)].map((_, j) => (
            <svg
              key={j}
              className="w-[14px] h-[14px] md:w-[16px] md:h-[16px]"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8 2L9.5 6.5H14L10.5 9.5L12 14L8 11L4 14L5.5 9.5L2 6.5H6.5L8 2Z"
                fill="black"
              />
            </svg>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  const shouldReduceMotion = useReducedMotion()
  const { t } = useLanguage()
  const testimonials = [1, 2, 3, 4, 5, 6].map((id) => ({
    id,
    text: t('home', 'testimonial' + id),
    author: t('home', 'testimonial' + id + 'Author'),
    image: testimonialImages[id - 1]
  }))

  return (
    <section className="pt-[80px] pb-[24px] px-[16px] md:px-[20px] lg:px-[25px]">
      <div className="max-w-[1390px] mx-auto">
        <div className="rounded-[24px] p-[24px] md:p-[36px] lg:p-[48px]">
          <h2
            className="text-black text-[32px] md:text-[40px] lg:text-[48px] leading-[1.2] tracking-[-1.44px] text-center mb-10 md:mb-14"
            style={{ fontFamily: "'Gilda Display', serif" }}
          >
            {t('home', 'hearFromThoseWhoTrustUs')}
          </h2>

          {/* Infinite scrolling carousel – same pattern as Insurance Partners */}
          <div className="relative overflow-hidden">
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-6 w-max"
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        x: [0, '-50%'],
                      }
                }
                transition={
                  shouldReduceMotion
                    ? {}
                    : {
                        x: {
                          repeat: Infinity,
                          repeatType: 'loop',
                          duration: 35,
                          ease: 'linear',
                        },
                      }
                }
              >
                {testimonials.map((testimonial) => (
                  <TestimonialCard key={`first-${testimonial.id}`} text={testimonial.text} author={testimonial.author} image={testimonial.image} />
                ))}
                {testimonials.map((testimonial) => (
                  <TestimonialCard key={`second-${testimonial.id}`} text={testimonial.text} author={testimonial.author} image={testimonial.image} />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}