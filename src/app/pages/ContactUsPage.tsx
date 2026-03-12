'use client'

import { motion, useReducedMotion, useInView } from 'motion/react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { usePageSEO } from '../hooks/usePageSEO'
import imgImage from "../../assets/e2295a1a1a2bc348414dcc117de577c691164137.webp"
import imgImage1 from "../../assets/c5fbf2bb2ed01ea6f6ce38835da33519e2db95fe.webp"
import imgImage2 from "../../assets/27cea6501d6677b5b8f9f08502ce76c7a193f7f8.webp"
import ScrollSection from '../components/ScrollSection'

/** Sky Dental Center exact location – opens in Google Maps; user can tap Directions for route from their location */
const SKY_DENTAL_GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/p3GwfZJ32sokvec96'

export default function ContactUsPage() {
  const shouldReduceMotion = useReducedMotion()
  const { t } = useLanguage()
  usePageSEO('Contact Us', 'Contact Sky Dental Center in Khalifa City A, Abu Dhabi. Phone, email, map, and opening hours. Book your appointment.')
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    subject: '',
    message: ''
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const heroRef = useRef(null)
  const contactCardsRef = useRef(null)
  const formRef = useRef(null)
  const galleryRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true })
  const contactCardsInView = useInView(contactCardsRef, { once: true })
  const formInView = useInView(formRef, { once: true })
  const galleryInView = useInView(galleryRef, { once: true })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    setIsSubmitting(true)
    const apiUrl = import.meta.env.VITE_CONTACT_API_URL || `${window.location.origin}/api/send-contact-message.php`
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          emailAddress: formData.emailAddress.trim(),
          phoneNumber: formData.phoneNumber.trim() || undefined,
          subject: formData.subject.trim(),
          message: formData.message.trim()
        })
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        const msg = data?.message || data?.error || `Failed to send message. Please try again or email smile@skydc.ae.`
        setSubmitError(msg)
        setIsSubmitting(false)
        return
      }
      setFormSubmitted(true)
      setFormData({ fullName: '', phoneNumber: '', emailAddress: '', subject: '', message: '' })
      setIsSubmitting(false)
      setTimeout(() => setFormSubmitted(false), 5000)
    } catch {
      setSubmitError("Network error. Please try again or email smile@skydc.ae.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white">
      <ScrollSection>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[500px] overflow-hidden pt-32"
        style={{
          background: 'linear-gradient(160deg, rgb(224, 237, 255) 0%, rgb(255, 255, 255) 50%, rgb(224, 237, 255) 100%)',
        }}
      >
        {/* Decorative blurs */}
        <div className="absolute -left-24 top-40 w-64 h-64 bg-[rgba(203,255,143,0.2)] rounded-full blur-[64px]" />
        <div className="absolute right-32 top-80 w-64 h-64 bg-[rgba(12,0,96,0.1)] rounded-full blur-[64px]" />

        <div className="container mx-auto px-6 relative z-10 py-20">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-['Gilda_Display'] text-black mb-6 tracking-tight">
              {t('contactPage', 'heroTitle')}
            </h1>

            {/* Description */}
            <p className="text-lg text-[#1b1b1b] font-['Arial'] leading-relaxed mb-10 max-w-3xl mx-auto">
              {t('contactPage', 'heroSub')}
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <div className="bg-[#CBFF8F] px-6 py-3 rounded-full flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0C0060]" />
                <span className="text-sm font-['Arial'] font-bold text-[#0C0060]">Quick Response</span>
              </div>
              <div className="bg-[#CBFF8F] px-6 py-3 rounded-full flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0C0060]" />
                <span className="text-sm font-['Arial'] font-bold text-[#0C0060]">Professional Support</span>
              </div>
              <div className="bg-[#CBFF8F] px-6 py-3 rounded-full flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0C0060]" />
                <span className="text-sm font-['Arial'] font-bold text-[#0C0060]">Easy Booking</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      </ScrollSection>

      <ScrollSection>
      {/* Get In Touch Section */}
      <section ref={contactCardsRef} className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={contactCardsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-['Gilda_Display'] text-black mb-4">
              {t('contactPage', 'getInTouch')}
            </h2>
            <p className="text-base text-black font-['Arial']">
              Choose the most convenient way to connect with us. Our team is always ready to assist and guide you.
            </p>
          </motion.div>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Phone Card */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={contactCardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[#e0edff] rounded-3xl p-8 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-[#CBFF8F] rounded-2xl flex items-center justify-center mb-6">
                <Phone className="w-8 h-8 text-[#0C0060]" />
              </div>
              <h3 className="text-2xl font-['Gilda_Display'] text-black mb-4">{t('contactPage', 'phone')}</h3>
              <a href="tel:+97126677448" className="text-base font-['Arial'] font-bold text-[#0c0060] mb-1 hover:underline">
                +971 26 677 448
              </a>
              <p className="text-xs font-['Arial'] text-black opacity-70">
                Call us to book appointments or for any enquiries.
              </p>
            </motion.div>

            {/* Email Card */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={contactCardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#e0edff] rounded-3xl p-8 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-[#CBFF8F] rounded-2xl flex items-center justify-center mb-6">
                <Mail className="w-8 h-8 text-[#0C0060]" />
              </div>
              <h3 className="text-2xl font-['Gilda_Display'] text-black mb-4">{t('contactPage', 'email')}</h3>
              <p className="text-base font-['Arial'] font-bold text-[#0c0060] mb-1">smile@skydc.ae</p>
              <p className="text-xs font-['Arial'] text-black opacity-70">
                Reach out to us anytime—we're happy to assist.
              </p>
            </motion.div>

            {/* Location Card */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={contactCardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[#e0edff] rounded-3xl p-8 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-[#CBFF8F] rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-[#0C0060]" />
              </div>
              <h3 className="text-2xl font-['Gilda_Display'] text-black mb-4">{t('contactPage', 'visitClinic')}</h3>
              <a
                href={SKY_DENTAL_GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-['Arial'] font-bold text-[#0c0060] mb-1 hover:underline block"
                aria-label="Open Sky Dental Center in Google Maps"
              >
                Villa 45, Al Forsan Street, Khalifa City, Abu Dhabi, UAE
              </a>
              <p className="text-xs font-['Arial'] text-black opacity-70">
                Visit us for personalised, in-person consultations.
              </p>
            </motion.div>

            {/* Working Hours Card */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={contactCardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-[#e0edff] rounded-3xl p-8 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-[#CBFF8F] rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-[#0C0060]" />
              </div>
              <h3 className="text-2xl font-['Gilda_Display'] text-black mb-4">{t('contactPage', 'workingHours')}</h3>
              <p className="text-base font-['Arial'] font-bold text-[#0c0060] mb-1">10:00 AM – 10:00 PM</p>
              <p className="text-xs font-['Arial'] text-black mb-4">7 days a week</p>
              <p className="text-xs font-['Arial'] text-black opacity-70">
                Open daily for your convenience.
              </p>
            </motion.div>
          </div>

          {/* Google Map - after Get in Touch 4 boxes */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={contactCardsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-6xl mx-auto mt-12 bg-[#e0edff] rounded-3xl overflow-hidden relative"
            style={{ minHeight: '400px' }}
          >
            <iframe
              src="https://www.google.com/maps?q=Sky+Dental+Center,+Villa+45,+Alforsan+street,+Khalifa+city,+Abu+Dhabi,+UAE&output=embed&zoom=16"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
              title="Sky Dental Center Location"
            />
            <div className="absolute bottom-4 right-4 z-10">
              <a
                href={SKY_DENTAL_GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-[#f9fafb] text-[#0C0060] font-['Arial'] font-bold py-2 px-4 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300 hover:shadow-xl"
                aria-label="Open Sky Dental Center in Google Maps to view location or get directions"
              >
                <MapPin className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      </ScrollSection>

      <ScrollSection>
      {/* Send Us a Message Section */}
      <section ref={formRef} className="py-20" style={{ background: 'linear-gradient(to bottom, rgb(224, 237, 255) 0%, rgb(255, 255, 255) 100%)' }}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-['Gilda_Display'] text-black mb-4">
              {t('contactPage', 'sendUsMessage')}
            </h2>
            <p className="text-base text-black font-['Arial']">
              Complete the form below and our team will get back to you promptly.
            </p>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            {formSubmitted ? (
              <div className="bg-[#CBFF8F] rounded-3xl p-12 text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-[#0C0060]" />
                </div>
                <h3 className="text-3xl font-['Gilda_Display'] text-black mb-4">{t('contactPage', 'successTitle')}</h3>
                <p className="text-base font-['Arial'] text-black">
                  {t('contactPage', 'successMessage')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-['Arial'] text-black mb-2">
                      {t('contactPage', 'fullName')} *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0C0060] font-['Arial'] text-black bg-[#f9fafb]"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label htmlFor="emailAddress" className="block text-sm font-['Arial'] text-black mb-2">
                      {t('contactPage', 'emailAddress')} *
                    </label>
                    <input
                      type="email"
                      id="emailAddress"
                      name="emailAddress"
                      value={formData.emailAddress}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0C0060] font-['Arial'] text-black bg-[#f9fafb]"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-['Arial'] text-black mb-2">
                      {t('contactPage', 'phoneNumber')}
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0C0060] font-['Arial'] text-black bg-[#f9fafb]"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-['Arial'] text-black mb-2">
                      {t('contactPage', 'subject')} *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0C0060] font-['Arial'] text-black bg-[#f9fafb]"
                      placeholder="Let us know how we can help"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="mb-8">
                  <label htmlFor="message" className="block text-sm font-['Arial'] text-black mb-2">
                    {t('contactPage', 'message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0C0060] font-['Arial'] text-black bg-[#f9fafb] resize-none"
                    placeholder="Type your message here..."
                  />
                </div>

                {submitError && (
                  <p className="mb-4 text-sm font-['Arial'] text-red-600 bg-red-50 px-4 py-3 rounded-xl">
                    {submitError}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#CBFF8F] hover:bg-[#b8e680] text-[#0C0060] font-['Arial'] font-bold py-4 px-6 rounded-full flex items-center justify-center gap-3 transition-all duration-300 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className="text-base">{isSubmitting ? 'Sending…' : t('contactPage', 'sendMessage')}</span>
                  <div className="w-8 h-8 bg-[#0C0060] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Send className="w-4 h-4 text-[#CBFF8F]" />
                  </div>
                </button>

                <p className="text-xs font-['Arial'] text-gray-500 text-center mt-4">
                  * Required fields
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>
      </ScrollSection>

      <ScrollSection>
      {/* Guest Experiences Gallery Section */}
      <section ref={galleryRef} className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={galleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-['Gilda_Display'] text-black tracking-tight">
              A Collection of Memorable Patient Experiences
            </h2>
          </motion.div>

          {/* Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[imgImage, imgImage1, imgImage2].map((image, index) => {
              const ref = useRef(null)
              const isInView = useInView(ref, { once: true, margin: '-100px' })

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
      </ScrollSection>
    </div>
  )
}
