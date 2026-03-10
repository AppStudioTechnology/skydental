'use client'

import { motion, useReducedMotion, useInView } from 'motion/react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, MessageCircle, ArrowUpRight, Upload, Send, Stethoscope, Heart, Monitor, Briefcase } from 'lucide-react'
import { usePageSEO } from '../hooks/usePageSEO'
import imgImage from "../../assets/e2295a1a1a2bc348414dcc117de577c691164137.png"
import imgImage1 from "../../assets/c5fbf2bb2ed01ea6f6ce38835da33519e2db95fe.png"
import imgImage2 from "../../assets/27cea6501d6677b5b8f9f08502ce76c7a193f7f8.png"
import ScrollSection from '../components/ScrollSection'

interface WhyJoinCard {
  title: string
  description: string
  bgColor: string
}

interface JobCategory {
  title: string
  icon: React.ComponentType<{ className?: string }>
}

const whyJoinCards: WhyJoinCard[] = [
  {
    title: 'Supportive Work Culture',
    description: 'Join a team that values collaboration, respect, and work-life balance. Here, every team member is valued, heard, and empowered.',
    bgColor: 'bg-[#e0edff]',
  },
  {
    title: 'Advanced Technology',
    description: 'Work with cutting-edge dental technology and modern equipment. We invest in innovation to ensure you have the best tools for delivering exceptional patient care.',
    bgColor: 'bg-[#CBFF8F]',
  },
  {
    title: 'Career Development',
    description: 'Continuous learning and advancement are part of our culture. Benefit from workshops, training programs, and skill development opportunities to support your professional growth.',
    bgColor: 'bg-[#e0edff]',
  },
  {
    title: 'Meaningful Impact',
    description: 'Make a real difference every day. Your work directly contributes to improving oral health and creating confident, beautiful smiles in our community.',
    bgColor: 'bg-[#CBFF8F]',
  },
]

const jobCategories: JobCategory[] = [
  {
    title: 'General & Specialist Dentists',
    icon: Stethoscope,
  },
  {
    title: 'Dental Assistants & Nurses',
    icon: Heart,
  },
  {
    title: 'Front Desk & Patient Relations',
    icon: Monitor,
  },
  {
    title: 'Administrative/Support Roles',
    icon: Briefcase,
  },
]

export default function CareersPage() {
  const shouldReduceMotion = useReducedMotion()
  usePageSEO('Careers', 'Join Sky Dental Center. Dental careers in Abu Dhabi. Supportive culture, advanced technology, and growth opportunities.')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cvFile: null as File | null
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const heroRef = useRef(null)
  const whyJoinRef = useRef(null)
  const opportunitiesRef = useRef(null)
  const applyRef = useRef(null)
  const galleryRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true })
  const whyJoinInView = useInView(whyJoinRef, { once: true })
  const opportunitiesInView = useInView(opportunitiesRef, { once: true })
  const applyInView = useInView(applyRef, { once: true })
  const galleryInView = useInView(galleryRef, { once: true })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, cvFile: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.cvFile) {
      setSubmitError('Please upload your CV.')
      return
    }
    setSubmitError(null)
    setIsSubmitting(true)
    const file = formData.cvFile
    const reader = new FileReader()
    reader.onload = async () => {
      const cvBase64 = (reader.result as string).split(',')[1]
      if (!cvBase64) {
        setSubmitError('Could not read file. Please try again.')
        setIsSubmitting(false)
        return
      }
      const apiUrl = import.meta.env.VITE_JOB_APPLICATION_API_URL || `${window.location.origin}/api/send-job-application`
      try {
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            cvBase64,
            cvFilename: file.name
          })
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) {
          setSubmitError(data?.message || data?.error || 'Failed to send application. Please try again or email smile@skydc.ae.')
          setIsSubmitting(false)
          return
        }
        setFormSubmitted(true)
        setFormData({ name: '', email: '', cvFile: null })
        setIsSubmitting(false)
        setTimeout(() => setFormSubmitted(false), 5000)
      } catch (err) {
        setSubmitError('Network error. Please try again or email smile@skydc.ae.')
        setIsSubmitting(false)
      }
    }
    reader.onerror = () => {
      setSubmitError('Could not read file. Please try again.')
      setIsSubmitting(false)
    }
    reader.readAsDataURL(file)
  }

  return (
    <ScrollSection>
    <div className="bg-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[500px] overflow-hidden pt-32 pb-20"
        style={{
          background: 'linear-gradient(160deg, rgb(224, 237, 255) 0%, rgb(255, 255, 255) 50%, rgb(224, 237, 255) 100%)',
        }}
      >
        {/* Decorative blurs */}
        <div className="absolute -left-24 top-40 w-80 h-80 bg-[rgba(203,255,143,0.3)] rounded-full blur-[80px]" />
        <div className="absolute right-20 top-60 w-96 h-96 bg-[rgba(151,196,255,0.2)] rounded-full blur-[100px]" />

        <div className="container mx-auto px-6 relative z-10 py-20">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-['Gilda_Display'] text-black mb-3 tracking-tight leading-tight">
              Careers
            </h1>

            {/* Subtitle */}
            <p className="text-2xl md:text-3xl font-['Gilda_Display'] text-black/90 mb-6">
              Shape Your Future with Sky Dental Center
            </p>

            {/* Description */}
            <p className="text-base text-[#4b5563] font-['Arial'] leading-relaxed mb-10 max-w-3xl mx-auto">
              At Sky Dental Center, we believe exceptional care begins with exceptional people. We are always seeking talented, dedicated professionals who share our vision for delivering best-in-class oral healthcare, embrace our values, and are eager to grow alongside us.
            </p>

            {/* Pills/Tags */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="px-6 py-2.5 bg-[#CBFF8F] rounded-full text-[14px] font-['Arial'] font-medium text-[#0C0060]"
              >
                Dynamic Environment
              </motion.div>
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="px-6 py-2.5 bg-[#CBFF8F] rounded-full text-[14px] font-['Arial'] font-medium text-[#0C0060]"
              >
                Professional Growth
              </motion.div>
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="px-6 py-2.5 bg-[#CBFF8F] rounded-full text-[14px] font-['Arial'] font-medium text-[#0C0060]"
              >
                Rewarding Career
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section ref={whyJoinRef} className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={whyJoinInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-['Gilda_Display'] text-black mb-6 tracking-tight">
              Why Join Us?
            </h2>
            <p className="text-base text-[#4b5563] font-['Arial'] leading-relaxed max-w-3xl mx-auto">
              We offer more than just a role—this is a professional home where your growth, well-being, and the impact you make are our priority. Experience the difference of working in an environment designed to empower, inspire, and reward your contribution.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {whyJoinCards.map((card, index) => {
              const ref = useRef(null)
              const isInView = useInView(ref, { once: true, margin: '-50px' })

              return (
                <motion.div
                  key={index}
                  ref={ref}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`${card.bgColor} p-8 rounded-3xl`}
                >
                  <h3 className="text-xl font-['Gilda_Display'] text-black mb-4">
                    {card.title}
                  </h3>
                  <p className="text-[15px] text-[#4b5563] font-['Arial'] leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Current Opportunities Section */}
      <section ref={opportunitiesRef} className="py-24 bg-[#e0edff]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={opportunitiesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-['Gilda_Display'] text-black mb-6 tracking-tight">
              Current Opportunities
            </h2>
            <p className="text-base text-[#4b5563] font-['Arial'] leading-relaxed max-w-2xl mx-auto">
              We regularly welcome applications for the following roles. Even if your ideal position isn't listed, we encourage you to apply.
            </p>
          </motion.div>

          {/* Job Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            {jobCategories.map((job, index) => {
              const ref = useRef(null)
              const isInView = useInView(ref, { once: true, margin: '-50px' })

              return (
                <motion.div
                  key={index}
                  ref={ref}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-[#CBFF8F] rounded-full flex items-center justify-center shrink-0">
                    <job.icon className="w-6 h-6 text-[#0C0060]" />
                  </div>
                  <h3 className="text-lg font-['Arial'] font-semibold text-black">
                    {job.title}
                  </h3>
                </motion.div>
              )
            })}
          </div>

          {/* Who We're Looking For Card */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={opportunitiesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white p-10 rounded-3xl max-w-4xl mx-auto"
          >
            <h3 className="text-2xl font-['Gilda_Display'] text-black mb-6 text-center">
              Who We're Looking For
            </h3>
            <p className="text-[15px] text-[#4b5563] font-['Arial'] leading-relaxed text-center max-w-3xl mx-auto">
              We seek individuals who are passionate, patient-focused, and committed to excellence. Whether you are an experienced professional or starting your career, if you share our values and have a genuine desire to make a positive impact, we want to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Apply Now Section */}
      <section
        ref={applyRef}
        className="py-24"
        style={{
          background: 'linear-gradient(to bottom, rgb(203, 255, 143) 0%, rgb(203, 255, 143) 100%)',
        }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={applyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-5xl md:text-6xl font-['Gilda_Display'] text-black mb-6 tracking-tight">
                Apply Now
              </h2>
              <p className="text-base text-black font-['Arial'] leading-relaxed mb-4">
                Send your CV and cover letter to:
              </p>
              <a
                href="mailto:smile@skydc.ae"
                className="text-2xl font-['Arial'] font-semibold text-black hover:text-[#0C0060] transition-colors inline-block"
              >
                smile@skydc.ae
              </a>
            </div>

            {/* Application Form */}
            {formSubmitted ? (
              <div className="bg-white rounded-3xl p-12 text-center">
                <div className="w-20 h-20 bg-[#CBFF8F] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-10 h-10 text-[#0C0060]" />
                </div>
                <h3 className="text-3xl font-['Gilda_Display'] text-black mb-4">Application Submitted!</h3>
                <p className="text-base font-['Arial'] text-black">
                  Thank you for your interest. We'll review your application and get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
                {/* Name Field */}
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-['Arial'] text-black mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0C0060] font-['Arial'] text-black bg-[#f9fafb]"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Field */}
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-['Arial'] text-black mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0C0060] font-['Arial'] text-black bg-[#f9fafb]"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* CV Upload Field */}
                <div className="mb-8">
                  <label htmlFor="cvFile" className="block text-sm font-['Arial'] text-black mb-2">
                    Upload CV *
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="cvFile"
                      name="cvFile"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      required
                      className="hidden"
                    />
                    <label
                      htmlFor="cvFile"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-[#f9fafb] cursor-pointer hover:bg-[#e0edff] transition-colors"
                    >
                      <Upload className="w-5 h-5 text-[#0C0060]" />
                      <span className="text-sm font-['Arial'] text-black">
                        {formData.cvFile ? formData.cvFile.name : 'Choose file (PDF, DOC, DOCX)'}
                      </span>
                    </label>
                  </div>
                  {formData.cvFile && (
                    <p className="text-xs text-gray-500 font-['Arial'] mt-2">
                      Selected: {formData.cvFile.name}
                    </p>
                  )}
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
                  <span className="text-base">{isSubmitting ? 'Sending…' : 'Submit Application'}</span>
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

    </div>
    </ScrollSection>
  )
}
