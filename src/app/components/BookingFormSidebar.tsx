'use client'

import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { useRef, useState, useEffect } from 'react'
import { generateBookingPdf } from '../utils/generateBookingPdf'

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

// Service to Doctor mapping
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

interface BookingFormSidebarProps {
  isOpen: boolean
  onClose: () => void
  preselectedDoctor?: string
}

export default function BookingFormSidebar({ isOpen, onClose, preselectedDoctor }: BookingFormSidebarProps) {
  const shouldReduceMotion = useReducedMotion()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+971',
    phone: '',
    service: '',
    doctor: preselectedDoctor || '',
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const datePickerRef = useRef<HTMLDivElement>(null)
  const timePickerRef = useRef<HTMLDivElement>(null)
  const countryCodeRef = useRef<HTMLDivElement>(null)
  const savedScrollYRef = useRef(0)

  // Set preselected doctor when sidebar opens
  useEffect(() => {
    if (isOpen && preselectedDoctor) {
      setFormData(prev => ({ ...prev, doctor: preselectedDoctor }))
    }
  }, [isOpen, preselectedDoctor])

  // Update available doctors when service changes
  useEffect(() => {
    if (formData.service && serviceToDoctors[formData.service]) {
      setAvailableDoctors(serviceToDoctors[formData.service])
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

  // Lock body scroll when sidebar is open (stops background/Lenis from scrolling)
  useEffect(() => {
    if (isOpen) {
      savedScrollYRef.current = window.scrollY
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${savedScrollYRef.current}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
    } else {
      const scrollY = savedScrollYRef.current
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      window.scrollTo(0, scrollY)
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      window.scrollTo(0, savedScrollYRef.current)
    }
  }, [isOpen])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
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

  // Generate a booking ID
  const generateBookingId = () => {
    const prefix = 'SKY'
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.floor(1000 + Math.random() * 9000)
    return `${prefix}-${timestamp}-${random}`
  }

  // When deployed on Vercel (same app + api), use same-origin. Else use env or skip.
  const BOOKING_API_URL =
    (import.meta.env.VITE_BOOKING_API_URL as string | undefined) ||
    (typeof window !== 'undefined' ? `${window.location.origin}/api/send-booking` : '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const id = generateBookingId()
    setBookingId(id)
    setLastBookingDetails({ ...formData })

    try {
      const { blob, base64 } = generateBookingPdf(id, formData)

      // Call API to send PDF to user email and clinic (works on Vercel same-deployment)
      if (BOOKING_API_URL) {
        try {
          const res = await fetch(BOOKING_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              bookingId: id,
              booking: formData,
              pdfBase64: base64,
              toUser: formData.email || undefined,
              toClinic: 'aliaslam683@gmail.com'
            })
          })
          const data = await res.json().catch(() => ({}))
          if (!res.ok) {
            const msg = (data as { message?: string })?.message || (data as { error?: string })?.error
            console.error('[Booking] API error:', res.status, msg || data)
          }
        } catch (err) {
          console.error('[Booking] Request failed:', err)
          // Still show success; user can download PDF
        }
      }

      setShowSuccessModal(true)
      setFormData({
        fullName: '',
        email: '',
        countryCode: '+971',
        phone: '',
        service: '',
        doctor: preselectedDoctor || '',
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
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 z-[999]"
            />

            {/* Sidebar - one scrollable column so form + button are always reachable */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: 'easeInOut' }}
              className="fixed top-0 right-0 w-full max-w-[600px] h-[100vh] max-h-[100dvh] bg-white shadow-2xl z-[1000] flex flex-col"
            >
              {/* Single scrollable area: header + form; capture wheel so background doesn't scroll */}
              <div
                className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain h-full"
                style={{
                  WebkitOverflowScrolling: 'touch',
                  overflowY: 'scroll',
                  touchAction: 'pan-y',
                  maxHeight: '100vh',
                } as React.CSSProperties}
                onWheel={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 md:p-8 pb-4 md:pb-6 border-b border-gray-100 flex-shrink-0">
                  <h2 className="text-[28px] font-bold text-black" style={{ fontFamily: "'Gilda Display', serif" }}>
                    Book an Appointment
                  </h2>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Form content */}
                <div className="p-6 md:p-8 pt-4 md:pt-6 pb-10">
                <form onSubmit={handleSubmit} className="flex flex-col gap-[24px] sm:gap-[30px] pb-8">
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
                          placeholder="+971-XX-XXX-XXXX"
                          required
                          className="bg-[#f1f1f1] h-[55px] px-[16px] sm:px-[24px] py-[16px] rounded-[12px] text-[14px] text-black flex-1 min-w-0"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-[8px]">
                      <label className="text-[14px] font-medium text-black">
                        Email <span className="text-gray-500">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter email address"
                        className="bg-[#f1f1f1] h-[55px] px-[16px] sm:px-[24px] py-[16px] rounded-[12px] text-[14px] text-black"
                      />
                    </div>
                  </div>

                  {/* Appointment Details Section */}
                  <div className="flex flex-col gap-[16px] sm:gap-[20px]">
                    <div className="flex flex-col gap-[8px]">
                      <div className="flex flex-col sm:flex-row gap-[16px]">
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

                    <div className="flex flex-col gap-[8px]">
                      <div className="flex flex-col sm:flex-row gap-[16px]">
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

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#CBFF8F] h-[50px] px-[24px] py-[16px] rounded-[12px] text-[14px] font-medium text-[#0C0060] hover:bg-[#B1FF57] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Request Appointment'}
                  </motion.button>
                </form>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success confirmation modal */}
      {showSuccessModal && lastBookingDetails && (
        <BookingSuccessModal
          bookingId={bookingId}
          bookingDetails={lastBookingDetails}
          onClose={handleCloseSuccessModal}
        />
      )}
    </>
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

  const daysInMonth = getDaysInMonth(currentMonth, currentYear)
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
  const days: (number | null)[] = []

  const prevMonth = currentMonth - 1 < 0 ? 11 : currentMonth - 1
  const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear
  const prevMonthDays = getDaysInMonth(prevMonth, prevMonthYear)
  
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push(prevMonthDays - i)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day)
  }

  const totalCells = 42
  const remainingCells = totalCells - days.length
  for (let day = 1; day <= remainingCells; day++) {
    days.push(day)
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-[24px] shadow-2xl border border-gray-100 z-50 overflow-hidden w-full max-w-[400px]">
      <div className="p-6">
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

        <div className="grid grid-cols-7 gap-2 mb-3">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-[12px] font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
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

// Success confirmation modal (no OTP – request sent, copy to email + clinic)
function BookingSuccessModal({
  bookingId,
  bookingDetails,
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
    const { blob } = generateBookingPdf(bookingId, details)
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
              ? 'A copy of your request has been sent to your email, and the clinic has received your appointment request at aliaslam683@gmail.com.'
              : 'The clinic has received your appointment request at aliaslam683@gmail.com.'}
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
