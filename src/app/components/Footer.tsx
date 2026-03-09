'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import MaskGroup from '../../imports/MaskGroup'
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const shouldReduceMotion = useReducedMotion()
  const { t } = useLanguage()

  return (
    <footer className="w-full bg-[#CBFF8F]">
      <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 py-8 md:py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
          className="max-w-[1390px] mx-auto"
        >
          <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-6 lg:gap-4">
              {/* Logo and Description */}
              <div className="flex flex-col gap-5 md:gap-7">
                <div className="flex items-center">
                  <div className="w-[64px] h-[60px]">
                    <MaskGroup />
                  </div>
                </div>
                <p className="text-black text-[13px] md:text-[14px] leading-[1.6]">
                  {t('footer', 'description')}
                </p>
              </div>

              {/* Quick Links - First Column */}
              <div className="flex flex-col gap-3 md:gap-4">
                <h3
                  className="text-black text-[16px] md:text-[18px] font-bold leading-[1.15]"
                  style={{ fontFamily: "'Gilda Display', serif" }}
                >
                  {t('footer', 'quickLinks')}
                </h3>
                <div className="flex flex-col gap-2 md:gap-3">
                  <FooterLink href="/">{t('footer', 'home')}</FooterLink>
                  <FooterLink href="/about-us">{t('footer', 'aboutUs')}</FooterLink>
                  <FooterLink href="/our-doctors">{t('footer', 'doctors')}</FooterLink>
                  <FooterLink href="/services">{t('footer', 'services')}</FooterLink>
                  <FooterLink href="/packages">{t('footer', 'packages')}</FooterLink>
                </div>
              </div>

              {/* Quick Links - Second Column */}
              <div className="flex flex-col gap-3 md:gap-4">
                <h3
                  className="text-black text-[16px] md:text-[18px] font-bold leading-[1.15] invisible"
                  style={{ fontFamily: "'Gilda Display', serif" }}
                >
                  {t('footer', 'quickLinks')}
                </h3>
                <div className="flex flex-col gap-2 md:gap-3">
                  <FooterLink href="/patient-guide">{t('footer', 'patientGuide')}</FooterLink>
                  <FooterLink href="/faqs">{t('footer', 'faqs')}</FooterLink>
                  <FooterLink href="/careers">{t('footer', 'careers')}</FooterLink>
                  <FooterLink href="/contact">{t('footer', 'contactUs')}</FooterLink>
                  <FooterLink href="/privacy-policy">{t('footer', 'privacyPolicy')}</FooterLink>
                </div>
              </div>

              {/* All Services */}
              <div className="flex flex-col gap-3 md:gap-4">
                <h3
                  className="text-black text-[16px] md:text-[18px] font-bold leading-[1.15]"
                  style={{ fontFamily: "'Gilda Display', serif" }}
                >
                  {t('footer', 'allServices')}
                </h3>
                <div className="flex flex-col gap-2 md:gap-3">
                  <FooterLink href="/services/general-dentistry">{t('footer', 'reliefUrgentCare')}</FooterLink>
                  <FooterLink href="/services/advanced-restorative">{t('footer', 'protectRestore')}</FooterLink>
                  <FooterLink href="/services/cosmetic-dentistry">{t('footer', 'smileAesthetics')}</FooterLink>
                  <FooterLink href="/services/pediatric-dentistry">{t('footer', 'pediatricDentistry')}</FooterLink>
                </div>
              </div>

              {/* Contact Information */}
              <div className="flex flex-col gap-3 md:gap-4">
                <h3
                  className="text-black text-[16px] md:text-[18px] font-bold leading-[1.15]"
                  style={{ fontFamily: "'Gilda Display', serif" }}
                >
                  {t('footer', 'contactInfo')}
                </h3>
                <div className="flex flex-col gap-2 md:gap-3">
                  <ContactItem icon={<PhoneIcon />} text="+971 26677448" />
                  <ContactItem icon={<EmailIcon />} text="smile@skydc.ae" />
                  <ContactItem icon={<ClockIcon />} text={t('footer', 'hours')} />
                </div>
                {/* Social Icons */}
                <div className="flex gap-3 md:gap-4 mt-1">
                  <SocialIcon href="#">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C6.477 2 2 6.477 2 12C2 16.991 5.657 21.128 10.438 21.878V14.891H7.898V12H10.438V9.797C10.438 7.291 11.93 5.907 14.215 5.907C15.309 5.907 16.453 6.102 16.453 6.102V8.562H15.193C13.95 8.562 13.563 9.333 13.563 10.124V12H16.336L15.893 14.89H13.563V21.878C18.343 21.128 22 16.991 22 12C22 6.477 17.523 2 12 2Z" fill="#0C0060" />
                    </svg>
                  </SocialIcon>
                  <SocialIcon href="#">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <path d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 17.7383 21.3889 19.2135 20.3012 20.3012C19.2135 21.3889 17.7383 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 6.26174 2.61107 4.78649 3.69878 3.69878C4.78649 2.61107 6.26174 2 7.8 2ZM7.6 4C6.64522 4 5.72955 4.37928 5.05442 5.05442C4.37928 5.72955 4 6.64522 4 7.6V16.4C4 18.39 5.61 20 7.6 20H16.4C17.3548 20 18.2705 19.6207 18.9456 18.9456C19.6207 18.2705 20 17.3548 20 16.4V7.6C20 5.61 18.39 4 16.4 4H7.6ZM17.25 5.5C17.5815 5.5 17.8995 5.6317 18.1339 5.86612C18.3683 6.10054 18.5 6.41848 18.5 6.75C18.5 7.08152 18.3683 7.39946 18.1339 7.63388C17.8995 7.8683 17.5815 8 17.25 8C16.9185 8 16.6005 7.8683 16.3661 7.63388C16.1317 7.39946 16 7.08152 16 6.75C16 6.41848 16.1317 6.10054 16.3661 5.86612C16.6005 5.6317 16.9185 5.5 17.25 5.5ZM12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7ZM12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9Z" fill="#0C0060" />
                    </svg>
                  </SocialIcon>
                  <SocialIcon href="#">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#0C0060" />
                    </svg>
                  </SocialIcon>
                  <SocialIcon href="#">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <path d="M19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM18.5 18.5V13.2C18.5 12.3354 18.1565 11.5062 17.5452 10.8948C16.9338 10.2835 16.1046 9.94 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17C14.6813 12.17 15.0374 12.3175 15.2999 12.5801C15.5625 12.8426 15.71 13.1987 15.71 13.57V18.5H18.5ZM6.88 8.56C7.32556 8.56 7.75288 8.383 8.06794 8.06794C8.383 7.75288 8.56 7.32556 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19C6.43178 5.19 6.00193 5.36805 5.68499 5.68499C5.36805 6.00193 5.19 6.43178 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56ZM8.27 18.5V10.13H5.5V18.5H8.27Z" fill="#0C0060" />
                    </svg>
                  </SocialIcon>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 md:pt-6 border-t border-black/10">
              <p className="text-black text-[11px] md:text-[12px] break-words">MOHAP APPROVAL LICENSE: RE6YF8UV-101224</p>
              <p className="text-black text-[11px] md:text-[12px] whitespace-nowrap">Copyright © 2025 Sky Dental Center. {t('footer', 'rights')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      to={href}
      className="inline-block text-black text-[13px] md:text-[14px] capitalize leading-[1.5] hover:text-[#0C0060] transition-colors break-words w-fit"
    >
      {children}
    </Link>
  )
}

function ContactItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <p className="text-black text-[13px] md:text-[14px] leading-[1.5] break-words">{text}</p>
    </div>
  )
}

function PhoneIcon() {
  return (
    <div className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] flex items-center justify-center flex-shrink-0">
      <svg className="w-full h-full" fill="none" viewBox="0 0 18 18">
        <path
          d="M10.374 12.426C10.5289 12.4971 10.7034 12.5134 10.8688 12.4721C11.0341 12.4308 11.1805 12.3344 11.2838 12.1987L11.55 11.85C11.6897 11.6637 11.8709 11.5125 12.0792 11.4084C12.2875 11.3042 12.5171 11.25 12.75 11.25H15C15.3978 11.25 15.7794 11.408 16.0607 11.6893C16.342 11.9706 16.5 12.3522 16.5 12.75V15C16.5 15.3978 16.342 15.7794 16.0607 16.0607C15.7794 16.342 15.3978 16.5 15 16.5C11.4196 16.5 7.9858 15.0777 5.45406 12.5459C2.92232 10.0142 1.5 6.58042 1.5 3C1.5 2.60218 1.65804 2.22064 1.93934 1.93934C2.22064 1.65804 2.60218 1.5 3 1.5H5.25C5.64782 1.5 6.02936 1.65804 6.31066 1.93934C6.59196 2.22064 6.75 2.60218 6.75 3V5.25C6.75 5.48287 6.69578 5.71254 6.59164 5.92082C6.4875 6.1291 6.33629 6.31028 6.15 6.45L5.799 6.71325C5.66131 6.81838 5.56426 6.96794 5.52434 7.13651C5.48442 7.30509 5.50409 7.48228 5.58 7.638C6.60501 9.7199 8.29082 11.4036 10.374 12.426Z"
          fill="black"
        />
      </svg>
    </div>
  )
}

function EmailIcon() {
  return (
    <div className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] flex items-center justify-center flex-shrink-0">
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
        <path
          d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
          fill="black"
        />
      </svg>
    </div>
  )
}

function ClockIcon() {
  return (
    <div className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] flex items-center justify-center flex-shrink-0">
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" stroke="black" strokeWidth="1.5" fill="none" />
        <path d="M12 7V12L15 15" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

function SocialIcon({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="w-[32px] h-[32px] md:w-[36px] md:h-[36px] flex items-center justify-center transition-opacity hover:opacity-70"
    >
      {children}
    </a>
  )
}
