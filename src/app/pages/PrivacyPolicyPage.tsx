'use client'

import { motion, useReducedMotion, useInView } from 'motion/react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Home, ChevronRight, Check } from 'lucide-react'
import { usePageSEO } from '../hooks/usePageSEO'
import ScrollSection from '../components/ScrollSection'
import imgImage from "../../assets/e2295a1a1a2bc348414dcc117de577c691164137.png"
import imgImage1 from "../../assets/c5fbf2bb2ed01ea6f6ce38835da33519e2db95fe.png"
import imgImage2 from "../../assets/27cea6501d6677b5b8f9f08502ce76c7a193f7f8.png"

export default function PrivacyPolicyPage() {
  const shouldReduceMotion = useReducedMotion()
  usePageSEO('Privacy Policy', 'Sky Dental Center privacy policy, terms of use, and legal information. How we collect, use, and protect your data in the UAE.')
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const galleryRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true })
  const contentInView = useInView(contentRef, { once: true })
  const galleryInView = useInView(galleryRef, { once: true })

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
              Privacy Policy, Terms & Disclaimer
            </h1>

            {/* Description */}
            <p className="text-base text-[#4b5563] font-['Arial'] leading-relaxed mb-10 max-w-3xl mx-auto">
              At Sky Dental Center, we are committed to protecting your privacy and ensuring transparency in how we collect, use, and safeguard your personal and medical information. This document covers our privacy practices, the terms under which we provide dental services, and necessary disclaimers in accordance with the laws of the United Arab Emirates (UAE).
            </p>

            {/* Breadcrumbs */}
            <div className="flex items-center justify-center gap-2 text-sm">
              <Link to="/" className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                <Home className="w-4 h-4" />
                <span className="font-['Arial']">Home</span>
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-500 font-['Arial']">More</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-[#0C0060] font-['Arial']">Privacy Policy</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section ref={contentRef} className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Important Notice Box */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="bg-[#CBFF8F] p-8 rounded-3xl mb-12"
            >
              <p className="text-[15px] text-[#0C0060] font-['Arial'] leading-relaxed text-center">
                <strong>Important:</strong> By accessing or using the services of Sky Dental Center (referred to as "the Clinic," "we," or "us"), you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy, Terms of Use, Medical Disclaimer, and compliance statements. If you do not agree with any part of these policies, please do not use our services or share your personal information.
              </p>
            </motion.div>

            {/* Section 1: Privacy Policy */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-[#CBFF8F] rounded-2xl flex items-center justify-center text-2xl font-['Gilda_Display'] text-[#0C0060]">
                  1
                </div>
                <h2 className="text-3xl md:text-4xl font-['Gilda_Display'] text-black">
                  Privacy Policy
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-[15px] text-[#4b5563] font-['Arial'] leading-relaxed mb-4">
                    We are fully committed to protecting your privacy by maintaining the confidentiality and security of your personal and health information.
                  </p>
                </div>

                {/* 1.1 Information We Collect */}
                <div>
                  <h3 className="text-xl font-['Arial'] font-semibold text-black mb-4">
                    1.1 Information We Collect
                  </h3>
                  <p className="text-[15px] text-[#4b5563] font-['Arial'] leading-relaxed mb-3">
                    We may collect the following types of personal and sensitive information:
                  </p>
                  <ul className="space-y-2">
                    {[
                      'Personal identification (name, age, nationality, Emirates ID, passport, etc.)',
                      'Contact information (email, phone number, mailing address)',
                      'Payment and billing information',
                      'Dental and medical history, treatment records, X-rays, and clinical notes',
                      'Insurance policy details (if applicable)',
                      'Any information you voluntarily provide via forms, calls, or in-person visits',
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="shrink-0 w-5 h-5 bg-[#CBFF8F] rounded-full flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-[#0C0060]" />
                        </div>
                        <span className="text-[15px] text-[#4b5563] font-['Arial'] leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 1.2 How We Use Your Information */}
                <div>
                  <h3 className="text-xl font-['Arial'] font-semibold text-black mb-4">
                    1.2 How We Use Your Information
                  </h3>
                  <p className="text-[15px] text-[#4b5563] font-['Arial'] leading-relaxed mb-3">
                    We use your information for the following legitimate purposes:
                  </p>
                  <ul className="space-y-2">
                    {[
                      'To deliver safe and effective dental treatments and oral healthcare services',
                      'To manage and maintain your patient records and clinical data',
                      'To process billing, insurance claims, and payment transactions',
                      'To communicate appointment reminders, follow-ups, and treatment updates',
                      'To comply with legal and regulatory requirements in the UAE',
                      'To improve our services through internal analysis and quality assurance',
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="shrink-0 w-5 h-5 bg-[#CBFF8F] rounded-full flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-[#0C0060]" />
                        </div>
                        <span className="text-[15px] text-[#4b5563] font-['Arial'] leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 1.3 Data Protection & Security */}
                <div>
                  <h3 className="text-xl font-['Arial'] font-semibold text-black mb-4">
                    1.3 Data Protection & Security
                  </h3>
                  <p className="text-[15px] text-[#4b5563] font-['Arial'] leading-relaxed mb-3">
                    We take the security of your data seriously. To protect your information, we implement:
                  </p>
                  <ul className="space-y-2">
                    {[
                      'Secure physical storage of patient files',
                      'Encrypted digital systems and access controls',
                      'Employee confidentiality agreements and training on data privacy',
                      'Restricted access to medical records limited to authorized personnel only',
                      'Compliance with UAE data protection and healthcare regulations',
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="shrink-0 w-5 h-5 bg-[#CBFF8F] rounded-full flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-[#0C0060]" />
                        </div>
                        <span className="text-[15px] text-[#4b5563] font-['Arial'] leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 1.4 Sharing of Information */}
                <div>
                  <h3 className="text-xl font-['Arial'] font-semibold text-black mb-4">
                    1.4 Sharing of Information
                  </h3>
                  <p className="text-[15px] text-[#4b5563] font-['Arial'] leading-relaxed mb-3">
                    We do not sell or rent your information to third parties. We may share your data only under specific circumstances:
                  </p>
                  <ul className="space-y-2">
                    {[
                      'With dental specialists, labs, or other healthcare providers involved in your treatment',
                      'With insurance companies for claim processing (with your consent)',
                      'With legal or regulatory authorities as required by UAE law',
                      'With your explicit consent or at your request',
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="shrink-0 w-5 h-5 bg-[#CBFF8F] rounded-full flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-[#0C0060]" />
                        </div>
                        <span className="text-[15px] text-[#4b5563] font-['Arial'] leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 1.5 Your Rights as a Patient */}
                <div>
                  <h3 className="text-xl font-['Arial'] font-semibold text-black mb-4">
                    1.5 Your Rights as a Patient
                  </h3>
                  <p className="text-[15px] text-[#4b5563] font-['Arial'] leading-relaxed mb-3">
                    As a patient, you have the right to:
                  </p>
                  <ul className="space-y-2">
                    {[
                      'Access and review your personal and medical records',
                      'Request corrections to inaccurate or incomplete information',
                      'Withdraw your consent for certain data uses (subject to legal obligations)',
                      'Request deletion of your data in accordance with applicable laws and regulations',
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="shrink-0 w-5 h-5 bg-[#CBFF8F] rounded-full flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-[#0C0060]" />
                        </div>
                        <span className="text-[15px] text-[#4b5563] font-['Arial'] leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Section 2: Terms of Use */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-[#CBFF8F] rounded-2xl flex items-center justify-center text-2xl font-['Gilda_Display'] text-[#0C0060]">
                  2
                </div>
                <h2 className="text-3xl md:text-4xl font-['Gilda_Display'] text-black">
                  Terms of Use
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-[15px] text-[#4b5563] font-['Arial'] leading-relaxed mb-4">
                    By using the services or accessing the website of Sky Dental Center, you agree to the following terms:
                  </p>
                </div>

                {/* 2.1 Scope of Services */}
                <div>
                  <h3 className="text-xl font-['Arial'] font-semibold text-black mb-4">
                    2.1 Scope of Services
                  </h3>
                  <ul className="space-y-2">
                    {[
                      'We provide professional dental care, diagnostics, treatments, and consultations',
                      'All treatments are provided by licensed and qualified dental professionals',
                      'Services offered may vary; treatment plans are customized based on individual patient needs',
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="shrink-0 w-5 h-5 bg-[#CBFF8F] rounded-full flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-[#0C0060]" />
                        </div>
                        <span className="text-[15px] text-[#4b5563] font-['Arial'] leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2.2 Patient Responsibilities */}
                <div>
                  <h3 className="text-xl font-['Arial'] font-semibold text-black mb-4">
                    2.2 Patient Responsibilities
                  </h3>
                  <p className="text-[15px] text-[#4b5563] font-['Arial'] leading-relaxed mb-3">
                    As a patient, you agree to:
                  </p>
                  <ul className="space-y-2">
                    {[
                      'Provide accurate and complete medical and personal information',
                      'Arrive on time for scheduled appointments or notify us of cancellations',
                      'Follow post-treatment care instructions provided by your dentist',
                      'Settle payment obligations promptly according to agreed terms',
                      'Respect clinic policies, staff, and other patients during your visit',
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="shrink-0 w-5 h-5 bg-[#CBFF8F] rounded-full flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-[#0C0060]" />
                        </div>
                        <span className="text-[15px] text-[#4b5563] font-['Arial'] leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2.3 Fees, Charges, and Billing */}
                <div>
                  <h3 className="text-xl font-['Arial'] font-semibold text-black mb-4">
                    2.3 Fees, Charges, and Billing
                  </h3>
                  <ul className="space-y-2">
                    {[
                      'Treatment costs will be discussed and agreed upon before starting procedures',
                      'Payment is due at the time of service unless otherwise arranged',
                      'We accept multiple forms of payment (cash, credit card, insurance)',
                      'Insurance coverage is subject to verification; patients are responsible for uncovered costs',
                      'Cancellation or no-show fees may apply in accordance with our clinic policy',
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="shrink-0 w-5 h-5 bg-[#CBFF8F] rounded-full flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-[#0C0060]" />
                        </div>
                        <span className="text-[15px] text-[#4b5563] font-['Arial'] leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2.4 Limitation of Liability */}
                <div>
                  <h3 className="text-xl font-['Arial'] font-semibold text-black mb-4">
                    2.4 Limitation of Liability
                  </h3>
                  <ul className="space-y-2">
                    {[
                      'We strive for excellent outcomes, but individual results may vary',
                      'We are not liable for complications arising from failure to follow aftercare instructions',
                      'In the unlikely event of a dispute, both parties agree to seek resolution in accordance with UAE laws',
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="shrink-0 w-5 h-5 bg-[#CBFF8F] rounded-full flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-[#0C0060]" />
                        </div>
                        <span className="text-[15px] text-[#4b5563] font-['Arial'] leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Section 3: Medical Disclaimer */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-[#CBFF8F] rounded-2xl flex items-center justify-center text-2xl font-['Gilda_Display'] text-[#0C0060]">
                  3
                </div>
                <h2 className="text-3xl md:text-4xl font-['Gilda_Display'] text-black">
                  Medical Disclaimer
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-[15px] text-[#4b5563] font-['Arial'] leading-relaxed mb-4">
                    The information provided on our website, marketing materials, and verbal consultations is for general informational purposes only and should not be considered a substitute for professional dental or medical advice.
                  </p>
                </div>

                {/* 3.1 Not a Substitute for Medical Consultation */}
                <div>
                  <h3 className="text-xl font-['Arial'] font-semibold text-black mb-4">
                    3.1 Not a Substitute for Medical Consultation
                  </h3>
                  <ul className="space-y-2">
                    {[
                      'Always seek the advice of a qualified healthcare provider for diagnosis and treatment',
                      'Do not disregard professional medical advice or delay seeking it based on information found on our website or social media',
                      'In case of a dental emergency, contact us immediately or visit the nearest emergency facility',
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="shrink-0 w-5 h-5 bg-[#CBFF8F] rounded-full flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-[#0C0060]" />
                        </div>
                        <span className="text-[15px] text-[#4b5563] font-['Arial'] leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3.2 Individual Results May Vary */}
                <div>
                  <h3 className="text-xl font-['Arial'] font-semibold text-black mb-4">
                    3.2 Individual Results May Vary
                  </h3>
                  <p className="text-[15px] text-[#4b5563] font-['Arial'] leading-relaxed">
                    Testimonials, before-and-after images, and success stories shared by Sky Dental Center are real patient experiences. However, results vary depending on individual oral health conditions, compliance with treatment plans, and other factors.
                  </p>
                </div>

                {/* 3.3 No Liability for Adverse Reactions */}
                <div>
                  <h3 className="text-xl font-['Arial'] font-semibold text-black mb-4">
                    3.3 No Liability for Adverse Reactions
                  </h3>
                  <p className="text-[15px] text-[#4b5563] font-['Arial'] leading-relaxed">
                    While we take every precaution, dental treatments may carry risks such as allergic reactions, infections, or complications. Patients will be informed of potential risks and must provide informed consent before treatment begins.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Section 4: Compliance with UAE Regulations */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-[#CBFF8F] rounded-2xl flex items-center justify-center text-2xl font-['Gilda_Display'] text-[#0C0060]">
                  4
                </div>
                <h2 className="text-3xl md:text-4xl font-['Gilda_Display'] text-black">
                  Compliance with UAE Regulations
                </h2>
              </div>

              <div className="space-y-4">
                <p className="text-[15px] text-[#4b5563] font-['Arial'] leading-relaxed">
                  Sky Dental Center operates in full compliance with the laws and regulations governing healthcare services in the United Arab Emirates, including but not limited to:
                </p>
                <ul className="space-y-2">
                  {[
                    'UAE Federal Law No. 4 of 2016 on Medical Liability',
                    'UAE Data Protection Laws and Guidelines',
                    'Department of Health (DOH) – Abu Dhabi licensing and regulations',
                    'Dubai Health Authority (DHA) standards and compliance requirements',
                    'UAE Ministry of Health and Prevention (MoHAP) directives',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="shrink-0 w-5 h-5 bg-[#CBFF8F] rounded-full flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-[#0C0060]" />
                      </div>
                      <span className="text-[15px] text-[#4b5563] font-['Arial'] leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-[15px] text-[#4b5563] font-['Arial'] leading-relaxed">
                  We respect patients' rights as outlined in UAE law and strive to offer quality, ethical, and safe dental care.
                </p>
              </div>
            </motion.div>

            {/* Section 5: Contact Information */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-[#e0edff] p-10 rounded-3xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#CBFF8F] rounded-2xl flex items-center justify-center text-2xl font-['Gilda_Display'] text-[#0C0060]">
                  5
                </div>
                <h2 className="text-3xl md:text-4xl font-['Gilda_Display'] text-black">
                  Contact Information
                </h2>
              </div>

              <p className="text-[15px] text-[#4b5563] font-['Arial'] leading-relaxed mb-6">
                If you have any questions, concerns, or requests regarding this Privacy Policy, Terms of Use, or Medical Disclaimer, please contact us:
              </p>

              <div className="space-y-3 text-[15px] text-[#4b5563] font-['Arial']">
                <p>
                  <strong className="text-black">Sky Dental Center</strong>
                </p>
                <p>Villa 45, Alforsan Street, Khalifa City, Abu Dhabi, UAE</p>
                <p>
                  <strong className="text-black">Phone:</strong> +971 26677448
                </p>
                <p>
                  <strong className="text-black">Email:</strong>{' '}
                  <a href="mailto:smile@skydc.ae" className="text-[#0C0060] hover:underline">
                    smile@skydc.ae
                  </a>
                </p>
                <p>
                  <strong className="text-black">Website:</strong>{' '}
                  <a href="https://skydentalcenter.ae" className="text-[#0C0060] hover:underline" target="_blank" rel="noopener noreferrer">
                    www.skydentalcenter.ae
                  </a>
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-[#4b5563] font-['Arial'] leading-relaxed text-center">
                  <strong>Effective Date:</strong> January 9, 2026
                  <br />
                  <em>This policy may be updated periodically to reflect changes in our practices or legal requirements.</em>
                </p>
              </div>
            </motion.div>
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
