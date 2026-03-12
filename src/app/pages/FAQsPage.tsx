'use client'

import { motion, useReducedMotion, useInView } from 'motion/react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Home, ChevronRight, ChevronDown } from 'lucide-react'
import { usePageSEO } from '../hooks/usePageSEO'
import imgImage from "../../assets/e2295a1a1a2bc348414dcc117de577c691164137.webp"
import imgImage1 from "../../assets/c5fbf2bb2ed01ea6f6ce38835da33519e2db95fe.webp"
import imgImage2 from "../../assets/27cea6501d6677b5b8f9f08502ce76c7a193f7f8.webp"
import { 
  GeneralDentistryIcon, 
  CosmeticDentistryIcon, 
  OrthodonticsIcon, 
  PediatricDentistryIcon, 
  ImplantAdvancedCareIcon 
} from '../components/ServiceIcons'
import ScrollSection from '../components/ScrollSection'

interface Category {
  id: string
  label: string
  Icon?: React.ComponentType<{ className?: string }>
  icon?: string
  color: string
}

interface FAQ {
  id: string
  question: string
  answer: string
}

interface FAQCategory {
  id: string
  title: string
  Icon?: React.ComponentType<{ className?: string }>
  icon?: string
  faqs: FAQ[]
}

const categories: Category[] = [
  { id: 'general', label: 'General Dentistry', Icon: GeneralDentistryIcon, color: 'bg-[#CBFF8F]' },
  { id: 'cosmetic', label: 'Cosmetic Dentistry', Icon: CosmeticDentistryIcon, color: 'bg-[#e0edff]' },
  { id: 'orthodontics', label: 'Orthodontics', Icon: OrthodonticsIcon, color: 'bg-[#e8f4ff]' },
  { id: 'pediatric', label: 'Pediatric Dentistry', Icon: PediatricDentistryIcon, color: 'bg-[#fff9e6]' },
  { id: 'advanced', label: 'Implant & Advanced Care', Icon: ImplantAdvancedCareIcon, color: 'bg-[#e8efff]' },
  { id: 'endodontics', label: 'Endodontics', icon: '🦷', color: 'bg-[#ffe8f5]' },
  { id: 'prosthodontics', label: 'Prosthodontics', icon: '🦷', color: 'bg-[#e8f4ff]' },
  { id: 'oral-surgery', label: 'Oral Surgery', icon: '⚕️', color: 'bg-[#e8f4ff]' },
  { id: 'dental-tourism', label: 'Dental Tourism', icon: '✈️', color: 'bg-[#e8f4ff]' },
  { id: 'insurance', label: 'Insurance', icon: '🛡️', color: 'bg-[#ffe8f5]' },
  { id: 'appointments', label: 'Appointments & Clinic', icon: '📅', color: 'bg-[#e8f4ff]' },
]

const faqCategories: FAQCategory[] = [
  {
    id: 'general',
    title: 'General Dentistry',
    Icon: GeneralDentistryIcon,
    faqs: [
      {
        id: 'general-1',
        question: 'What should I expect during my first dental visit?',
        answer: 'Your initial visit includes a thorough oral examination, digital X-rays if required, and a personalised treatment plan tailored to your needs. Our team ensures a comfortable, seamless experience, leaving you informed, confident, and in control of your oral health.',
      },
      {
        id: 'general-2',
        question: 'How often should I have a dental check-up and cleaning?',
        answer: 'We recommend a professional check-up and cleaning every six months. Regular visits help maintain healthy teeth and gums, prevent dental issues before they arise, and keep your smile looking its best.',
      },
      {
        id: 'general-3',
        question: 'Do tooth-coloured fillings last long?',
        answer: 'Yes. Our advanced tooth-coloured composite fillings are durable, natural-looking, and designed to blend seamlessly with your teeth, providing long-lasting, aesthetically pleasing results.',
      },
    ],
  },
  {
    id: 'cosmetic',
    title: 'Cosmetic Dentistry',
    Icon: CosmeticDentistryIcon,
    faqs: [
      {
        id: 'cosmetic-1',
        question: 'What is the difference between veneers and a Hollywood Smile?',
        answer: 'Veneers enhance individual teeth for subtle improvements, while a Hollywood Smile is a complete smile transformation, often combining veneers or crowns to create a striking, harmonious result. Every treatment is fully customised to suit your facial features and desired aesthetic, ensuring a natural, confident smile.',
      },
      {
        id: 'cosmetic-2',
        question: 'Is teeth whitening safe?',
        answer: 'Absolutely. Our professional whitening treatments are safe, highly effective, and carefully designed to protect your enamel while delivering a brighter, radiant smile—often visible in just a single session.',
      },
      {
        id: 'cosmetic-3',
        question: 'How long does a Smile Design take?',
        answer: 'A Digital Smile Design usually requires 1–2 sessions. During this process, you\'ll preview your future smile before any treatment begins, ensuring a personalised, precise, and confident transformation.',
      },
    ],
  },
  {
    id: 'orthodontics',
    title: 'Orthodontics',
    Icon: OrthodonticsIcon,
    faqs: [
      {
        id: 'orthodontics-1',
        question: 'Do braces work for adults?',
        answer: 'Absolutely! Modern braces and clear aligners, including Invisalign and Spark, are highly effective for adults seeking tooth alignment and bite correction—delivering precise, comfortable, and discreet results.',
      },
      {
        id: 'orthodontics-2',
        question: 'How long does orthodontic treatment take?',
        answer: 'The duration of orthodontic treatment varies between 6 and 24 months, depending on the complexity of your case and the method chosen. Your orthodontist will provide a personalised timeline, ensuring precise, predictable, and lasting results.',
      },
      {
        id: 'orthodontics-3',
        question: 'Are clear aligners as effective as traditional braces?',
        answer: 'For many cases, absolutely. Clear aligners provide discreet, comfortable treatment and deliver excellent results when worn consistently, offering a modern, convenient alternative without compromising on precision or outcomes.',
      },
    ],
  },
  {
    id: 'pediatric',
    title: 'Pediatric Dentistry',
    Icon: PediatricDentistryIcon,
    faqs: [
      {
        id: 'pediatric-1',
        question: 'When should my child see a dentist for the first time?',
        answer: 'We recommend your child\'s first dental visit by age 1, or within six months of their first tooth appearing. Early visits help prevent potential oral issues and create a positive, comfortable experience, setting the foundation for a lifetime of healthy, confident smiles.',
      },
      {
        id: 'pediatric-2',
        question: 'What are dental sealants, and do children need them?',
        answer: 'Dental sealants are thin, protective coatings applied to the chewing surfaces of molars to prevent cavities and decay. They are highly recommended for children, particularly between the ages of 6 and 12, helping safeguard young smiles and support long-term oral health.',
      },
      {
        id: 'pediatric-3',
        question: 'How do you manage anxious children during treatment?',
        answer: 'Our paediatric specialists create a calm and welcoming environment using gentle communication, child-friendly techniques, and positive guidance. Every visit is designed to be stress-free and even enjoyable, helping children feel comfortable, confident, and cared for from the very first appointment.',
      },
    ],
  },
  {
    id: 'advanced',
    title: 'Implant & Advanced Care',
    Icon: ImplantAdvancedCareIcon,
    faqs: [
      {
        id: 'advanced-1',
        question: 'Who is eligible for dental implants?',
        answer: 'Most adults with healthy gums and sufficient bone structure are excellent candidates for dental implants. Our specialists conduct a thorough assessment to ensure each treatment is personalised and suitable for long-lasting, natural results.',
      },
      {
        id: 'advanced-2',
        question: 'What is full-mouth rehabilitation?',
        answer: 'Full-mouth rehabilitation is a comprehensive treatment that restores both function and aesthetics. Using crowns, implants, veneers, and other advanced restorative techniques, we create a harmonious, healthy, and confident smile tailored to your individual needs.',
      },
      {
        id: 'advanced-3',
        question: 'Are digital X-rays safe?',
        answer: 'Yes. Digital X-rays use significantly lower radiation than traditional imaging while providing highly accurate diagnostic results. This allows our team to plan treatments with precision and safety at the forefront.',
      },
    ],
  },
  {
    id: 'endodontics',
    title: 'Endodontics',
    icon: '🦷',
    faqs: [
      {
        id: 'endodontics-1',
        question: 'Is root canal treatment painful?',
        answer: 'Not at all. Using modern techniques and effective anaesthesia, root canal treatment is comfortable and often provides relief from existing pain rather than causing it.',
      },
      {
        id: 'endodontics-2',
        question: 'How long does a root canal take?',
        answer: 'Most root canal treatments are completed in a single visit, though duration can vary depending on the tooth and the complexity of the case. Your endodontist ensures every step is precise, efficient, and as comfortable as possible.',
      },
    ],
  },
  {
    id: 'prosthodontics',
    title: 'Prosthodontics',
    icon: '🦷',
    faqs: [
      {
        id: 'prosthodontics-1',
        question: 'What is the difference between crowns and bridges?',
        answer: 'A crown is a custom-made restoration that covers a single tooth to restore its shape, strength, and appearance. A bridge, on the other hand, replaces one or more missing teeth by anchoring to adjacent teeth, restoring both function and a seamless smile.',
      },
      {
        id: 'prosthodontics-2',
        question: 'Are dentures still used today?',
        answer: 'Absolutely. Modern dentures are more comfortable, natural-looking, and functional than ever. We offer removable, fixed, and implant-supported options to suit individual needs and lifestyle, ensuring a confident, beautiful smile.',
      },
    ],
  },
  {
    id: 'oral-surgery',
    title: 'Oral Surgery',
    icon: '⚕️',
    faqs: [
      {
        id: 'oral-surgery-1',
        question: 'When is wisdom tooth removal necessary?',
        answer: 'Wisdom tooth extraction is recommended when teeth are impacted, causing discomfort, swelling, or crowding. Our skilled oral surgeons ensure the procedure is safe, precise, and as comfortable as possible.',
      },
      {
        id: 'oral-surgery-2',
        question: 'How long is recovery after an extraction?',
        answer: 'With proper care, most patients recover within 2–3 days. Our team provides clear post-operative guidance to ensure a smooth, comfortable recovery and optimal healing.',
      },
    ],
  },
  {
    id: 'dental-tourism',
    title: 'Dental Tourism',
    icon: '✈️',
    faqs: [
      {
        id: 'dental-tourism-1',
        question: 'Do you assist international patients with travel planning?',
        answer: 'Absolutely. We offer comprehensive support for international patients, including appointment coordination, personalised treatment planning, hotel guidance, and seamless follow-up care—ensuring a smooth, stress-free experience from start to finish.',
      },
      {
        id: 'dental-tourism-2',
        question: 'Why choose Abu Dhabi for dental treatment?',
        answer: 'Abu Dhabi combines world-class healthcare, luxury hospitality, and highly skilled dental specialists within a safe, modern, and welcoming environment. It\'s the perfect destination to receive exceptional dental care while enjoying comfort and peace of mind.',
      },
    ],
  },
  {
    id: 'insurance',
    title: 'Insurance',
    icon: '🛡️',
    faqs: [
      {
        id: 'insurance-1',
        question: 'Which insurance partners do you work with?',
        answer: 'Sky Dental Center collaborates with a wide network of local and international insurance companies. Our team assists with verification, approvals, and direct billing (when available).',
      },
      {
        id: 'insurance-2',
        question: 'How do I know what my insurance covers?',
        answer: 'Simply share your insurance details with our reception team—we will explain your benefits clearly and guide you through all covered services.',
      },
    ],
  },
  {
    id: 'appointments',
    title: 'Appointments & Clinic',
    icon: '📅',
    faqs: [
      {
        id: 'appointments-1',
        question: 'How can I book an appointment?',
        answer: 'Booking is easy and convenient. You can schedule your visit via WhatsApp, phone, our website booking form, or by visiting our reception in person.',
      },
      {
        id: 'appointments-2',
        question: 'Do you offer same-day appointments for emergencies?',
        answer: 'Yes. We prioritise urgent cases and strive to provide same-day treatment whenever possible, ensuring prompt relief and care when you need it most.',
      },
      {
        id: 'appointments-3',
        question: 'Is Sky Dental Center suitable for families?',
        answer: 'Absolutely. We provide comprehensive care for both adults and children, making Sky Dental Center a leading family-friendly dental clinic in Abu Dhabi—where every member of your family receives expert, personalised care.',
      },
    ],
  },
]

export default function FAQsPage() {
  const shouldReduceMotion = useReducedMotion()
  const [selectedCategory, setSelectedCategory] = useState<string>('general')
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)
  usePageSEO('FAQs', 'Frequently asked questions about Sky Dental Center. Appointments, treatments, insurance, and dental care in Abu Dhabi.')
  const heroRef = useRef(null)
  const categoriesRef = useRef(null)
  const faqsRef = useRef(null)
  const galleryRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true })
  const categoriesInView = useInView(categoriesRef, { once: true })
  const faqsInView = useInView(faqsRef, { once: true })
  const galleryInView = useInView(galleryRef, { once: true })

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId)
  }

  const activeCategoryData = faqCategories.find((cat) => cat.id === selectedCategory)

  return (
    <ScrollSection>
    <div className="bg-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[400px] overflow-hidden pt-32 pb-16"
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
              Frequently Asked Questions
            </h1>

            {/* Description */}
            <p className="text-base text-[#4b5563] font-['Arial'] leading-relaxed mb-10 max-w-2xl mx-auto">
              Find answers to the most common questions about our services, treatments, and patient care. If you don't see what you're looking for, our team is always ready to assist.
            </p>

            {/* Tabs - Static Design Elements */}
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="px-6 py-2.5 rounded-full text-[14px] font-['Arial'] font-medium flex items-center gap-2 bg-[#CBFF8F] text-[#0C0060] shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#0C0060]" />
                <span>Expert Answers</span>
              </div>
              <div className="px-6 py-2.5 rounded-full text-[14px] font-['Arial'] font-medium flex items-center gap-2 bg-[#CBFF8F] text-[#0C0060] shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#0C0060]" />
                <span>Comprehensive Guide</span>
              </div>
              <div className="px-6 py-2.5 rounded-full text-[14px] font-['Arial'] font-medium flex items-center gap-2 bg-[#CBFF8F] text-[#0C0060] shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#0C0060]" />
                <span>Always Here to Help</span>
              </div>
            </div>

            {/* Breadcrumbs */}
            <div className="flex items-center justify-center gap-2 text-sm">
              <Link to="/" className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                <Home className="w-4 h-4" />
                <span className="font-['Arial']">Home</span>
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-500 font-['Arial']">More</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-[#0C0060] font-['Arial']">FAQ</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section - single line carousel */}
      <section ref={categoriesRef} className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-full"
          >
            <h2 className="text-2xl md:text-3xl font-['Gilda_Display'] text-black text-center mb-6 tracking-tight">
              Browse by Category
            </h2>
            <div className="overflow-x-auto overflow-y-hidden pb-2 -mx-6 px-6 scroll-smooth hide-scrollbar">
              <div className="flex items-stretch gap-2.5 justify-start min-w-max">
                {categories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
                    animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.35, delay: index * 0.03 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`${
                      selectedCategory === category.id ? 'bg-[#CBFF8F] border border-[#CBFF8F]' : 'bg-white border border-[#e5e7eb]'
                    } h-10 rounded-full text-[13px] font-['Arial'] font-medium text-black hover:shadow-md transition-all flex items-center justify-center shrink-0 px-4 whitespace-nowrap`}
                  >
                    <span>{category.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs Section */}
      <section ref={faqsRef} className="py-16 bg-[#e0edff]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {activeCategoryData && (
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={faqsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                {/* Category Title */}
                <h2 className="text-3xl md:text-4xl font-['Gilda_Display'] text-black mb-8">
                  {activeCategoryData.title}
                </h2>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                  {activeCategoryData.faqs.map((faq, index) => {
                    const isExpanded = expandedFAQ === faq.id

                    return (
                      <motion.div
                        key={faq.id}
                        initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                        animate={faqsInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white rounded-2xl overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFAQ(faq.id)}
                          className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-base md:text-lg font-['Arial'] font-semibold text-black flex-1">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 shrink-0 text-[#0C0060] transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                            aria-hidden
                          />
                        </button>

                        {/* Answer */}
                        <motion.div
                          initial={false}
                          animate={{
                            height: isExpanded ? 'auto' : 0,
                            opacity: isExpanded ? 1 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5 pt-2">
                            <p className="text-[15px] text-[#4b5563] font-['Arial'] leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </div>
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