'use client'

import { motion, useReducedMotion, useInView } from 'motion/react'
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { generateBookingPdf } from '../utils/generateBookingPdf'
import imgImage10 from '../../assets/6b7905bb93d0f824d8be0a8badf26d7ebf6ec721.webp'

const LOADING_LOGO_URL = '/logos/loading-logo.webp'

// Services list (sub-categories from document: Relief & Urgent Care, Protect & Restore, Smile Aesthetics, Pediatric)
const services = [
  'Emergency exam & pain management',
  'Toothache / infection treatment',
  'Extractions (simple / surgical)',
  'Gum pain / abscess management',
  'Root canal treatment',
  'Fillings & restorations',
  'Crowns / bridges',
  'Implants',
  'Dentures',
  'Deep cleaning / gum treatment',
  'Teeth whitening',
  'Veneers',
  'Smile design',
  'Invisalign / clear aligners',
  'Cosmetic bonding / contouring',
  'Pediatric Dentistry'
]

// Service to Doctor mapping (based on actual doctors in DoctorsSection)
const serviceToDoctors: Record<string, string[]> = {
  'Emergency exam & pain management': ['Dr. Saif Eldin Tawakul', 'Dr. Basma Alrawi', 'Dr. Claude Istanbouli', 'Dr. Elias Hanna'],
  'Toothache / infection treatment': ['Dr. Saif Eldin Tawakul', 'Dr. Basma Alrawi', 'Dr. Elias Hanna'],
  'Extractions (simple / surgical)': ['Dr. Saif Eldin Tawakul', 'Dr. Basma Alrawi'],
  'Gum pain / abscess management': ['Dr. Saif Eldin Tawakul', 'Dr. Basma Alrawi'],
  'Root canal treatment': ['Dr. Elias Hanna'],
  'Fillings & restorations': ['Dr. Claude Istanbouli', 'Dr. Elias Hanna'],
  'Crowns / bridges': ['Dr. Claude Istanbouli', 'Dr. Elias Hanna'],
  'Implants': ['Dr. Claude Istanbouli', 'Dr. Elias Hanna'],
  'Dentures': ['Dr. Claude Istanbouli', 'Dr. Elias Hanna'],
  'Deep cleaning / gum treatment': ['Dr. Saif Eldin Tawakul', 'Dr. Basma Alrawi', 'Dr. Claude Istanbouli', 'Dr. Elias Hanna'],
  'Teeth whitening': ['Dr. Basma Alrawi', 'Dr. Claude Istanbouli'],
  'Veneers': ['Dr. Basma Alrawi', 'Dr. Claude Istanbouli'],
  'Smile design': ['Dr. Basma Alrawi', 'Dr. Claude Istanbouli'],
  'Invisalign / clear aligners': ['Dr. Saif Eldin Tawakul'],
  'Cosmetic bonding / contouring': ['Dr. Basma Alrawi', 'Dr. Claude Istanbouli'],
  'Pediatric Dentistry': ['Dr. Basma Alrawi']
}

// Phone length rules by country code (national number, digits only)
const countryPhoneRules: Record<string, { min: number; max: number }> = {
  '+971': { min: 9, max: 9 },
  '+1': { min: 10, max: 10 },
  '+44': { min: 10, max: 10 },
  '+966': { min: 9, max: 9 },
  '+965': { min: 8, max: 8 },
  '+974': { min: 8, max: 8 },
  '+973': { min: 8, max: 8 },
  '+968': { min: 8, max: 8 },
  '+961': { min: 7, max: 8 },
  '+962': { min: 9, max: 9 },
  '+20': { min: 10, max: 10 },
  '+91': { min: 10, max: 10 },
  '+92': { min: 10, max: 10 },
  '+33': { min: 9, max: 9 },
  '+49': { min: 10, max: 11 }
}
const DEFAULT_PHONE_MIN = 7
const DEFAULT_PHONE_MAX = 15

// Country codes
const countryCodes = [
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+966', country: 'SA', flag: '🇸🇦' },
  { code: '+965', country: 'KW', flag: '🇰🇼' },
  { code: '+974', country: 'QA', flag: '🇶🇦' },
  { code: '+973', country: 'BH', flag: '🇧🇭' },
  { code: '+968', country: 'OM', flag: '🇴🇲' },
  { code: '+961', country: 'LB', flag: '🇱🇧' },
  { code: '+962', country: 'JO', flag: '🇯🇴' },
  { code: '+20', country: 'EG', flag: '🇪🇬' },
  { code: '+91', country: 'IN', flag: '🇮🇳' },
  { code: '+92', country: 'PK', flag: '🇵🇰' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
  { code: '+49', country: 'DE', flag: '🇩🇪' }
]

// Time slots
const morningSlots = ['07:00 am', '07:45 am', '08:30 am', '09:15 am', '09:45 am', '10:30 am', '11:15 am']
const afternoonSlots = ['12:00 pm', '12:45 pm', '01:30 pm', '01:45 pm', '02:30 pm', '03:15 pm', '04:00 pm', '04:45 pm', '05:30 pm']

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const shouldReduceMotion = useReducedMotion()
  const { t } = useLanguage()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+971',
    phone: '',
    service: '',
    doctor: '',
    date: '',
    time: '',
    message: ''
  })

  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [showCountryCodeDropdown, setShowCountryCodeDropdown] = useState(false)
  const [availableDoctors, setAvailableDoctors] = useState<string[]>([])
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [bookingId, setBookingId] = useState('')
  const [lastBookingDetails, setLastBookingDetails] = useState<typeof formData | null>(null)
  const [userEmailSent, setUserEmailSent] = useState<boolean | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [phoneError, setPhoneError] = useState('')
  const [emailError, setEmailError] = useState('')
  const datePickerRef = useRef<HTMLDivElement>(null)
  const timePickerRef = useRef<HTMLDivElement>(null)
  const countryCodeRef = useRef<HTMLDivElement>(null)
  const logoBase64Ref = useRef<string | null>(null)
  const logoNaturalWidthRef = useRef<number>(1)
  const logoNaturalHeightRef = useRef<number>(1)

  // Update available doctors when service changes
  useEffect(() => {
    if (formData.service && serviceToDoctors[formData.service]) {
      setAvailableDoctors(serviceToDoctors[formData.service])
      // Reset doctor selection if current doctor is not available for new service
      if (!serviceToDoctors[formData.service].includes(formData.doctor)) {
        setFormData(prev => ({ ...prev, doctor: '', date: '', time: '' }))
      }
    } else {
      setAvailableDoctors([])
      setFormData(prev => ({ ...prev, doctor: '', date: '', time: '' }))
    }
  }, [formData.service])

  // Reset date and time when doctor changes
  useEffect(() => {
    if (!formData.doctor) {
      setFormData(prev => ({ ...prev, date: '', time: '' }))
    }
  }, [formData.doctor])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowDatePicker(false)
      }
      if (timePickerRef.current && !timePickerRef.current.contains(event.target as Node)) {
        setShowTimePicker(false)
      }
      if (countryCodeRef.current && !countryCodeRef.current.contains(event.target as Node)) {
        setShowCountryCodeDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Preload loading logo as base64 for PDF
  useEffect(() => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      try {
        logoNaturalWidthRef.current = img.naturalWidth
        logoNaturalHeightRef.current = img.naturalHeight
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(img, 0, 0)
          const dataUrl = canvas.toDataURL('image/png')
          logoBase64Ref.current = dataUrl.includes(',') ? dataUrl.split(',')[1] : dataUrl
        }
      } catch {
        logoBase64Ref.current = null
      }
    }
    img.src = LOADING_LOGO_URL
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '')
      setFormData(prev => ({ ...prev, phone: digitsOnly }))
      setPhoneError('')
      return
    }
    if (name === 'email') setEmailError('')
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleDateSelect = (date: string) => {
    setFormData(prev => ({ ...prev, date }))
    setShowDatePicker(false)
  }

  const handleTimeSelect = (time: string) => {
    setFormData(prev => ({ ...prev, time }))
    setShowTimePicker(false)
  }

  const generateBookingId = () => {
    const prefix = 'SKY'
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.floor(1000 + Math.random() * 9000)
    return `${prefix}-${timestamp}-${random}`
  }

  const BOOKING_API_URL =
    (import.meta.env.VITE_BOOKING_API_URL as string | undefined) ||
    (typeof window !== 'undefined' ? `${window.location.origin}/api/send-booking.php` : '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPhoneError('')
    setEmailError('')
    const email = (formData.email ?? '').trim()
    const phoneDigits = (formData.phone ?? '').replace(/\D/g, '')
    const rules = countryPhoneRules[formData.countryCode] ?? { min: DEFAULT_PHONE_MIN, max: DEFAULT_PHONE_MAX }
    if (!email) {
      setEmailError('Email is required.')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.')
      return
    }
    if (phoneDigits.length < rules.min || phoneDigits.length > rules.max) {
      setPhoneError(`Enter a valid ${formData.countryCode} number (${rules.min}–${rules.max} digits).`)
      return
    }
    setIsSubmitting(true)
    const id = generateBookingId()
    setBookingId(id)
    setLastBookingDetails({ ...formData })

    try {
      const { blob, base64 } = generateBookingPdf(id, formData, {
        logoBase64: logoBase64Ref.current ?? undefined,
        logoNaturalWidth: logoNaturalWidthRef.current,
        logoNaturalHeight: logoNaturalHeightRef.current
      })

      if (BOOKING_API_URL) {
        try {
          const res = await fetch(BOOKING_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              bookingId: id,
              booking: formData,
              pdfBase64: base64,
              toUser: formData.email || undefined
            })
          })
          const data = await res.json().catch(() => ({}))
          const sent = (data as { userEmailSent?: boolean }).userEmailSent
          setUserEmailSent(typeof sent === 'boolean' ? sent : null)
        } catch {
          setUserEmailSent(null)
        }
      } else {
        setUserEmailSent(null)
      }

      setShowSuccessModal(true)
      setFormData({
        fullName: '',
        email: '',
        countryCode: '+971',
        phone: '',
        service: '',
        doctor: '',
        date: '',
        time: '',
        message: ''
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false)
    setBookingId('')
    setLastBookingDetails(null)
    setUserEmailSent(null)
  }

  return (
    <section id="contact" className="py-[80px] px-[25px]">
      <div className="max-w-[1390px] mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
          className="rounded-[24px] p-[48px]"
        >
          <div className="flex flex-col lg:flex-row gap-[32px] md:gap-[40px]">
            {/* Left - Image */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.3, duration: shouldReduceMotion ? 0 : 0.8 }}
              className="flex-1"
            >
              <div className="flex flex-col gap-[24px]">
                <h2
                  className="text-black text-[48px] leading-[1.2] tracking-[-1.44px]"
                  style={{ fontFamily: "'Gilda Display', serif" }}
                >
                  {t('home', 'scheduleTitle')}
                </h2>

                <p className="text-black text-[16px] leading-[1.6] max-w-[500px]">
                  {t('home', 'scheduleSub')}
                </p>

                {/* Social Links */}
                <div className="flex gap-[16px] mt-[8px]">
                  <SocialIcon>
                    <path d="M12 2C6.477 2 2 6.477 2 12C2 16.991 5.657 21.128 10.438 21.878V14.891H7.898V12H10.438V9.797C10.438 7.291 11.93 5.907 14.215 5.907C15.309 5.907 16.453 6.102 16.453 6.102V8.562H15.193C13.95 8.562 13.563 9.333 13.563 10.124V12H16.336L15.893 14.89H13.563V21.878C18.343 21.128 22 16.991 22 12C22 6.477 17.523 2 12 2Z" fill="black" />
                  </SocialIcon>
                  <SocialIcon>
                    <path d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 17.7383 21.3889 19.2135 20.3012 20.3012C19.2135 21.3889 17.7383 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 6.26174 2.61107 4.78649 3.69878 3.69878C4.78649 2.61107 6.26174 2 7.8 2ZM7.6 4C6.64522 4 5.72955 4.37928 5.05442 5.05442C4.37928 5.72955 4 6.64522 4 7.6V16.4C4 18.39 5.61 20 7.6 20H16.4C17.3548 20 18.2705 19.6207 18.9456 18.9456C19.6207 18.2705 20 17.3548 20 16.4V7.6C20 5.61 18.39 4 16.4 4H7.6ZM17.25 5.5C17.5815 5.5 17.8995 5.6317 18.1339 5.86612C18.3683 6.10054 18.5 6.41848 18.5 6.75C18.5 7.08152 18.3683 7.39946 18.1339 7.63388C17.8995 7.8683 17.5815 8 17.25 8C16.9185 8 16.6005 7.8683 16.3661 7.63388C16.1317 7.39946 16 7.08152 16 6.75C16 6.41848 16.1317 6.10054 16.3661 5.86612C16.6005 5.6317 16.9185 5.5 17.25 5.5ZM12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7ZM12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9Z" fill="black" />
                  </SocialIcon>
                  <SocialIcon>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="black" />
                  </SocialIcon>
                  <SocialIcon>
                    <path d="M19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM18.5 18.5V13.2C18.5 12.3354 18.1565 11.5062 17.5452 10.8948C16.9338 10.2835 16.1046 9.94 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17C14.6813 12.17 15.0374 12.3175 15.2999 12.5801C15.5625 12.8426 15.71 13.1987 15.71 13.57V18.5H18.5ZM6.88 8.56C7.32556 8.56 7.75288 8.383 8.06794 8.06794C8.383 7.75288 8.56 7.32556 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19C6.43178 5.19 6.00193 5.36805 5.68499 5.68499C5.36805 6.00193 5.19 6.43178 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56ZM8.27 18.5V10.13H5.5V18.5H8.27Z" fill="black" />
                  </SocialIcon>
                </div>

                <div className="rounded-[20px] overflow-hidden mt-[16px]">
                  <img
                    src={imgImage10}
                    alt="Dental consultation"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.5, duration: shouldReduceMotion ? 0 : 0.8 }}
              className="flex-1"
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-[24px] sm:gap-[30px]">
                {/* Patient Information Section */}
                <div className="flex flex-col gap-[16px] sm:gap-[20px]">
                  <div className="flex flex-col gap-[8px]">
                    <label className="text-[14px] font-medium text-black">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Full name"
                      required
                      className="bg-[#f1f1f1] h-[55px] px-[16px] sm:px-[24px] py-[16px] rounded-[12px] text-[14px] text-black"
                    />
                  </div>

                  <div className="flex flex-col gap-[8px]">
                    <label className="text-[14px] font-medium text-black">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-shrink-0" ref={countryCodeRef}>
                        <button
                          type="button"
                          onClick={() => setShowCountryCodeDropdown(!showCountryCodeDropdown)}
                          className="bg-[#f1f1f1] h-[55px] px-[12px] py-[16px] rounded-[12px] text-[14px] text-black flex items-center gap-1 min-w-[90px]"
                        >
                          <span>{countryCodes.find(c => c.code === formData.countryCode)?.flag}</span>
                          <span>{formData.countryCode}</span>
                          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {showCountryCodeDropdown && (
                          <div className="absolute top-full left-0 mt-1 bg-white rounded-[12px] shadow-lg border border-gray-200 z-50 max-h-[200px] overflow-y-auto">
                            {countryCodes.map((country) => (
                              <button
                                key={country.code}
                                type="button"
                                onClick={() => {
                                  setFormData(prev => ({ ...prev, countryCode: country.code }))
                                  setShowCountryCodeDropdown(false)
                                  setPhoneError('')
                                }}
                                className="w-full px-4 py-2 text-left hover:bg-[#f1f1f1] flex items-center gap-2 text-[14px]"
                              >
                                <span>{country.flag}</span>
                                <span>{country.code}</span>
                                <span className="text-gray-500 text-xs">({country.country})</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={formData.countryCode === '+971' ? '50 123 4567' : 'Digits only'}
                        required
                        inputMode="numeric"
                        autoComplete="tel-national"
                        className={`bg-[#f1f1f1] h-[55px] px-[16px] sm:px-[24px] py-[16px] rounded-[12px] text-[14px] text-black flex-1 min-w-0 ${phoneError ? 'ring-2 ring-red-500' : ''}`}
                      />
                    </div>
                    {phoneError && <p className="text-red-500 text-[13px]">{phoneError}</p>}
                  </div>

                  <div className="flex flex-col gap-[8px]">
                    <label className="text-[14px] font-medium text-black">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter email address"
                      required
                      className={`bg-[#f1f1f1] h-[55px] px-[16px] sm:px-[24px] py-[16px] rounded-[12px] text-[14px] text-black ${emailError ? 'ring-2 ring-red-500' : ''}`}
                    />
                    {emailError && <p className="text-red-500 text-[13px]">{emailError}</p>}
                  </div>
                </div>

                {/* Appointment Details Section */}
                <div className="flex flex-col gap-[16px] sm:gap-[20px]">
                  {/* Service and Doctor in one row */}
                  <div className="flex flex-col gap-[8px]">
                    <div className="flex flex-col sm:flex-row gap-[16px]">
                      {/* Service Input */}
                      <div className="relative flex-1 w-full">
                        <label className="text-[14px] font-medium text-black mb-[8px] block">
                          Service <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          required
                          className="bg-[#f1f1f1] h-[55px] px-[16px] sm:px-[24px] py-[16px] rounded-[12px] text-[14px] text-black appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcuNDEgOC41OEwxMiAxMy4xN0wxNi41OSA4LjU4TDE4IDEwTDEyIDE2TDYgMTBMNy40MSA4LjU4WiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg==')] bg-no-repeat bg-[right_16px_center] sm:bg-[right_24px_center] w-full"
                        >
                          <option value="">Select service</option>
                          {services.map(service => (
                            <option key={service} value={service}>{service}</option>
                          ))}
                        </select>
                      </div>

                      <div className="relative flex-1 w-full">
                        <label className="text-[14px] font-medium text-black mb-[8px] block">
                          Doctor <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="doctor"
                          value={formData.doctor}
                          onChange={handleInputChange}
                          required
                          disabled={!formData.service}
                          className="bg-[#f1f1f1] h-[55px] px-[16px] sm:px-[24px] py-[16px] rounded-[12px] text-[14px] text-black appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcuNDEgOC41OEwxMiAxMy4xN0wxNi41OSA4LjU4TDE4IDEwTDEyIDE2TDYgMTBMNy40MSA4LjU4WiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg==')] bg-no-repeat bg-[right_16px_center] sm:bg-[right_24px_center] disabled:opacity-50 disabled:cursor-not-allowed w-full"
                        >
                          <option value="">Select doctor</option>
                          {formData.service && availableDoctors.map(doctor => (
                            <option key={doctor} value={doctor}>{doctor}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Date and Time in one row */}
                  <div className="flex flex-col gap-[8px]">
                    <div className="flex flex-col sm:flex-row gap-[16px]">
                      {/* Date Input */}
                      <div className="relative flex-1 w-full" ref={datePickerRef}>
                        <label className="text-[14px] font-medium text-black mb-[8px] block">
                          Date <span className="text-red-500">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => formData.service && formData.doctor && setShowDatePicker(!showDatePicker)}
                          disabled={!formData.service || !formData.doctor}
                          className={`w-full bg-[#f1f1f1] h-[55px] px-[16px] sm:px-[24px] py-[16px] rounded-[12px] text-[14px] text-black text-left flex items-center justify-between transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                            formData.date 
                              ? 'bg-[#e0edff]' 
                              : 'hover:bg-[#e8e8e8]'
                          }`}
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className={`truncate ${formData.date ? 'font-semibold text-black' : 'text-gray-500'}`}>
                              {formData.date || 'Select date'}
                            </span>
                          </div>
                          <svg className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </button>
                        {showDatePicker && formData.service && formData.doctor && (
                          <DatePicker
                            onDateSelect={handleDateSelect}
                            selectedDate={formData.date}
                            onClose={() => setShowDatePicker(false)}
                          />
                        )}
                      </div>

                      {/* Time Input */}
                        <div className="relative flex-1 w-full" ref={timePickerRef}>
                        <label className="text-[14px] font-medium text-black mb-[8px] block">
                          Time <span className="text-red-500">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => formData.date && setShowTimePicker(!showTimePicker)}
                          disabled={!formData.service || !formData.doctor || !formData.date}
                          className={`w-full bg-[#f1f1f1] h-[55px] px-[16px] sm:px-[24px] py-[16px] rounded-[12px] text-[14px] text-black text-left flex items-center justify-between transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                            formData.time ? 'bg-[#e0edff]' : ''
                          }`}
                        >
                            <span className={`truncate flex-1 ${formData.time ? 'font-semibold text-black' : 'text-gray-500'}`}>
                              {formData.time || 'Select time'}
                            </span>
                          <svg className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                        {showTimePicker && formData.date && (
                          <TimePicker
                            onTimeSelect={handleTimeSelect}
                            selectedTime={formData.time}
                            onClose={() => setShowTimePicker(false)}
                          />
                        )}
                        {!formData.date && formData.service && formData.doctor && (
                          <p className="text-[12px] text-gray-500 mt-1">Select date first</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Internal Notes Section */}
                <div className="flex flex-col gap-[16px] sm:gap-[20px]">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Add any special instructions or notes..."
                      rows={4}
                      className="bg-[#f1f1f1] px-[16px] sm:px-[24px] py-[16px] rounded-[12px] text-[14px] text-black resize-none"
                    />
                </div>

                <div className="pt-[8px]">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    initial={{ y: 30, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                    transition={{ delay: shouldReduceMotion ? 0 : 0.5, duration: shouldReduceMotion ? 0 : 0.6 }}
                    className="w-full bg-[#CBFF8F] h-[50px] px-[24px] py-[16px] rounded-[12px] text-[14px] font-medium text-[#0C0060] hover:bg-[#B1FF57] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : t('common', 'requestAppointment')}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {showSuccessModal && lastBookingDetails && (
        <ContactSectionBookingSuccessModal
          bookingId={bookingId}
          bookingDetails={lastBookingDetails}
          userEmailSent={userEmailSent}
          logoBase64={logoBase64Ref.current ?? undefined}
          logoNaturalWidth={logoNaturalWidthRef.current}
          logoNaturalHeight={logoNaturalHeightRef.current}
          onClose={handleCloseSuccessModal}
        />
      )}
    </section>
  )
}

// Date Picker Component (Calendar Only)
function DatePicker({ 
  onDateSelect, 
  selectedDate, 
  onClose 
}: { 
  onDateSelect: (date: string) => void
  selectedDate: string
  onClose: () => void
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  const formatDateString = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  // Calendar functions
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const handleDateClick = (day: number) => {
    const date = new Date(currentYear, currentMonth, day)
    onDateSelect(formatDateString(date))
  }

  const isDateSelected = (day: number) => {
    const date = new Date(currentYear, currentMonth, day)
    return formatDateString(date) === selectedDate
  }

  const isDateToday = (day: number) => {
    const today = new Date()
    const date = new Date(currentYear, currentMonth, day)
    return date.toDateString() === today.toDateString()
  }

  const isDatePast = (day: number) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const date = new Date(currentYear, currentMonth, day)
    date.setHours(0, 0, 0, 0)
    return date < today
  }

  // Generate calendar days
  const daysInMonth = getDaysInMonth(currentMonth, currentYear)
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
  const days: (number | null)[] = []

  // Get previous month's last days to fill the first row
  const prevMonth = currentMonth - 1 < 0 ? 11 : currentMonth - 1
  const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear
  const prevMonthDays = getDaysInMonth(prevMonth, prevMonthYear)
  
  // Add previous month's days
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push(prevMonthDays - i)
  }

  // Add all days of the current month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day)
  }

  // Fill remaining cells to complete the grid (next month's days)
  const totalCells = 42 // 6 rows * 7 days
  const remainingCells = totalCells - days.length
  for (let day = 1; day <= remainingCells; day++) {
    days.push(day)
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-[24px] shadow-2xl border border-gray-100 z-50 overflow-hidden w-full max-w-[400px]">
      <div className="p-6">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#e0edff] transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h3 className="text-[18px] font-semibold text-black">
            {months[currentMonth]} {currentYear}
          </h3>
          <button
            type="button"
            onClick={handleNextMonth}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#e0edff] transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-2 mb-3">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-[12px] font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            // Determine if this day belongs to previous, current, or next month
            const isPrevMonth = index < firstDay
            const isNextMonth = index >= firstDay + daysInMonth
            
            const isSelected = !isPrevMonth && !isNextMonth && isDateSelected(day)
            const isToday = !isPrevMonth && !isNextMonth && isDateToday(day)
            const isPast = !isPrevMonth && !isNextMonth && isDatePast(day)
            const isCurrentMonth = !isPrevMonth && !isNextMonth

            return (
              <button
                key={`${day}-${index}`}
                type="button"
                onClick={() => isCurrentMonth && !isPast && handleDateClick(day)}
                disabled={!isCurrentMonth || isPast}
                className={`h-10 rounded-lg text-[14px] font-medium transition-all ${
                  isSelected
                    ? 'bg-[#0C0060] text-white shadow-md'
                    : isToday
                    ? 'bg-[#e0edff] text-[#0C0060] font-bold border-2 border-[#0C0060]'
                    : !isCurrentMonth
                    ? 'text-gray-300 cursor-not-allowed'
                    : isPast
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-black hover:bg-[#e0edff] hover:text-[#0C0060]'
                }`}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Time Picker Component (Time Slots Only)
function TimePicker({ 
  onTimeSelect, 
  selectedTime,
  onClose 
}: { 
  onTimeSelect: (time: string) => void
  selectedTime: string
  onClose: () => void
}) {
  // Get all time slots (morning + afternoon)
  const allTimeSlots = [...morningSlots, ...afternoonSlots]

  return (
    <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-[24px] shadow-2xl border border-gray-100 z-50 overflow-hidden w-full max-w-[400px]">
      <div className="p-6 max-h-[400px] overflow-y-auto">
        <h4 className="text-[16px] font-semibold text-black mb-4">Select Time</h4>
        <div className="space-y-2">
          {allTimeSlots.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => onTimeSelect(time)}
              className={`w-full px-4 py-3 rounded-lg text-[14px] font-medium text-left transition-all ${
                selectedTime === time
                  ? 'bg-[#0C0060] text-white shadow-md'
                  : 'bg-[#f5f5f5] text-black hover:bg-[#e0edff] hover:text-[#0C0060]'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function getAvailableDates() {
  const dates = []
  const today = new Date()
  for (let i = 0; i < 8; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    dates.push(date)
  }
  return dates
}

function SocialIcon({ children, href = '/contact' }: { children: React.ReactNode; href?: string }) {
  const isInternal = href.startsWith('/') && !href.startsWith('//')
  const className = "w-[24px] h-[24px] transition-opacity hover:opacity-70"
  if (isInternal) {
    return (
      <Link to={href} className={className}>
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
          {children}
        </svg>
      </Link>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
        {children}
      </svg>
    </a>
  )
}

// Success modal (same as Request Appointment sidebar)
function ContactSectionBookingSuccessModal({
  bookingId,
  bookingDetails,
  userEmailSent,
  logoBase64,
  logoNaturalWidth,
  logoNaturalHeight,
  onClose
}: {
  bookingId: string
  bookingDetails: {
    fullName: string
    email: string
    countryCode?: string
    phone?: string
    service: string
    doctor: string
    date: string
    time: string
    message?: string
  }
  userEmailSent?: boolean | null
  logoBase64?: string
  logoNaturalWidth?: number
  logoNaturalHeight?: number
  onClose: () => void
}) {
  const handleDownloadPdf = () => {
    const details = {
      fullName: bookingDetails.fullName,
      email: bookingDetails.email,
      countryCode: bookingDetails.countryCode ?? '+971',
      phone: bookingDetails.phone ?? '',
      service: bookingDetails.service,
      doctor: bookingDetails.doctor,
      date: bookingDetails.date,
      time: bookingDetails.time,
      message: bookingDetails.message
    }
    const { blob } = generateBookingPdf(bookingId, details, {
      logoBase64: logoBase64 ?? undefined,
      logoNaturalWidth: logoNaturalWidth ?? 1,
      logoNaturalHeight: logoNaturalHeight ?? 1
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Sky-Dental-Booking-${bookingId}.pdf`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1001] p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-[24px] shadow-2xl max-w-[500px] w-full p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-6">
          <div className="w-16 h-16 bg-[#CBFF8F] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#0C0060]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-[24px] font-bold text-black mb-2 text-center" style={{ fontFamily: "'Gilda Display', serif" }}>
            Your request has been sent
          </h3>
          <p className="text-[14px] text-gray-600 text-center">
            {bookingDetails.email
              ? userEmailSent === false
                ? 'The clinic has received your request at smile@skydc.ae. We tried to send a copy to your email but it may not have arrived—please check your spam folder and use the Download PDF button below to save your confirmation.'
                : userEmailSent === true
                  ? 'A copy of your request has been sent to your email, and the clinic has received your appointment request at smile@skydc.ae.'
                  : 'The clinic has received your request at smile@skydc.ae. If you do not see an email from us, check your spam folder or use the Download PDF button below.'
              : 'The clinic has received your appointment request at smile@skydc.ae.'}
          </p>
        </div>

        <div className="bg-[#f1f1f1] rounded-[16px] p-6 mb-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-300">
              <span className="text-[14px] text-gray-600">Booking ID</span>
              <span className="text-[16px] font-bold text-black">{bookingId}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-300">
              <span className="text-[14px] text-gray-600">Name</span>
              <span className="text-[16px] font-semibold text-black">{bookingDetails.fullName}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-300">
              <span className="text-[14px] text-gray-600">Service</span>
              <span className="text-[16px] font-semibold text-black">{bookingDetails.service}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-300">
              <span className="text-[14px] text-gray-600">Doctor</span>
              <span className="text-[16px] font-semibold text-black">{bookingDetails.doctor}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-300">
              <span className="text-[14px] text-gray-600">Date</span>
              <span className="text-[16px] font-semibold text-black">{bookingDetails.date}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-gray-600">Time</span>
              <span className="text-[16px] font-semibold text-black">{bookingDetails.time}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="w-full bg-[#CBFF8F] h-[50px] px-[24px] py-[16px] rounded-[12px] text-[14px] font-medium text-[#0C0060] hover:bg-[#B1FF57] transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF
          </button>
          <button
            onClick={onClose}
            className="w-full bg-[#0C0060] h-[50px] px-[24px] py-[16px] rounded-[12px] text-[14px] font-medium text-white hover:bg-[#7db3ff] transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  )
}
