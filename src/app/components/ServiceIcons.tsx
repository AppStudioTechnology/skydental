// Line icons for services - using images from public folder

export function GeneralDentistryIcon({ className = "w-6 h-6" }: { className?: string }) {
  // Extract size from className - match w-[70px] or h-[70px] pattern
  const widthMatch = className.match(/w-\[(\d+)px\]/);
  const heightMatch = className.match(/h-\[(\d+)px\]/);
  const size = widthMatch ? widthMatch[1] : (heightMatch ? heightMatch[1] : '70'); // default 70px
  
  return (
    <img 
      src="/assets/images/GeneralDentistry.webp" 
      alt="General Dentistry" 
      style={{ 
        objectFit: 'cover', 
        display: 'block',
        width: `${size}px`,
        height: `${size}px`,
        flexShrink: 0
      }}
      loading="eager"
    />
  )
}

export function CosmeticDentistryIcon({ className = "w-6 h-6" }: { className?: string }) {
  const widthMatch = className.match(/w-\[(\d+)px\]/);
  const heightMatch = className.match(/h-\[(\d+)px\]/);
  const size = widthMatch ? widthMatch[1] : (heightMatch ? heightMatch[1] : '70');
  
  return (
    <img 
      src="/assets/images/CosmeticDentistry.webp" 
      alt="Cosmetic Dentistry" 
      style={{ 
        objectFit: 'cover', 
        display: 'block',
        width: `${size}px`,
        height: `${size}px`,
        flexShrink: 0
      }}
      loading="eager"
    />
  )
}

export function OrthodonticsIcon({ className = "w-6 h-6" }: { className?: string }) {
  const widthMatch = className.match(/w-\[(\d+)px\]/);
  const heightMatch = className.match(/h-\[(\d+)px\]/);
  const size = widthMatch ? widthMatch[1] : (heightMatch ? heightMatch[1] : '70');
  
  return (
    <img 
      src="/assets/images/Orthodontics.webp" 
      alt="Orthodontics" 
      style={{ 
        objectFit: 'cover', 
        display: 'block',
        width: `${size}px`,
        height: `${size}px`,
        flexShrink: 0
      }}
      loading="eager"
    />
  )
}

export function PediatricDentistryIcon({ className = "w-6 h-6" }: { className?: string }) {
  const widthMatch = className.match(/w-\[(\d+)px\]/);
  const heightMatch = className.match(/h-\[(\d+)px\]/);
  const size = widthMatch ? widthMatch[1] : (heightMatch ? heightMatch[1] : '70');
  
  return (
    <img 
      src="/assets/images/PediatricDentistry.webp" 
      alt="Pediatric Dentistry" 
      style={{ 
        objectFit: 'cover', 
        display: 'block',
        width: `${size}px`,
        height: `${size}px`,
        flexShrink: 0
      }}
      loading="eager"
    />
  )
}

export function ImplantAdvancedCareIcon({ className = "w-6 h-6" }: { className?: string }) {
  const widthMatch = className.match(/w-\[(\d+)px\]/);
  const heightMatch = className.match(/h-\[(\d+)px\]/);
  const size = widthMatch ? widthMatch[1] : (heightMatch ? heightMatch[1] : '70');
  
  return (
    <img 
      src="/assets/images/ImplantAdvancedCare.webp" 
      alt="Implant & Advanced Care" 
      style={{ 
        objectFit: 'cover', 
        display: 'block',
        width: `${size}px`,
        height: `${size}px`,
        flexShrink: 0
      }}
      loading="eager"
    />
  )
}

// Additional icons for sub-services - keeping SVG for now, can be updated later
export function RootCanalIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C10 2 8 3 8 5C8 7 9 9 12 9C15 9 16 7 16 5C16 3 14 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 9V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 11L10 13L12 15L14 13L12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function GumTreatmentIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C10 2 8 3 8 5C8 7 9 9 12 9C15 9 16 7 16 5C16 3 14 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 9L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 9V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function DentalCheckupIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C10 2 8 3 8 5C8 7 9 9 12 9C15 9 16 7 16 5C16 3 14 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 9V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="6" r="1.5" fill="currentColor"/>
    </svg>
  )
}

export function ToothColoredFillingsIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C10 2 8 3 8 5C8 7 9 9 12 9C15 9 16 7 16 5C16 3 14 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 7H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 9V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function MetalCeramicBracesIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C10 2 8 3 8 5C8 7 9 9 12 9C15 9 16 7 16 5C16 3 14 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 7L9 9L7 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 7L15 9L17 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 7H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 9V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function InvisalignIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C10 2 8 3 8 5C8 7 9 9 12 9C15 9 16 7 16 5C16 3 14 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 7H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 9V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="9" y="6" width="6" height="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function RetainersIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C10 2 8 3 8 5C8 7 9 9 12 9C15 9 16 7 16 5C16 3 14 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 7H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 9V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 7L11 9L9 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 7L13 9L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function OrthodonticCheckupIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C10 2 8 3 8 5C8 7 9 9 12 9C15 9 16 7 16 5C16 3 14 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 9V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="6" r="1.5" fill="currentColor"/>
      <path d="M7 7L9 9L7 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 7L15 9L17 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function DentalCrownsIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C10 2 8 3 8 5C8 7 9 9 12 9C15 9 16 7 16 5C16 3 14 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 5L10 7L12 5L14 7L16 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 9V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function DentalBridgesIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 2C6 2 5 3 5 5C5 7 6 9 8 9C10 9 11 7 11 5C11 3 10 2 8 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 2C14 2 13 3 13 5C13 7 14 9 16 9C18 9 19 7 19 5C19 3 18 2 16 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 9V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 9V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 16H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 9H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function DenturesIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 10C4 10 6 8 12 8C18 8 20 10 20 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 10V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 10V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M10 14H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

export function OralSurgeryIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C10 2 8 3 8 5C8 7 9 9 12 9C15 9 16 7 16 5C16 3 14 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 9V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 5L14 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 3L12 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

export function WisdomToothIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C10 2 8 3 8 5C8 7 9 9 12 9C15 9 16 7 16 5C16 3 14 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 9V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 4L8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 4L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function BoneGraftingIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C10 2 8 3 8 5C8 7 9 9 12 9C15 9 16 7 16 5C16 3 14 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 9V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 12L14 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M9 14L15 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

export function DentalTourismIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C10 2 8 3 8 5C8 7 9 9 12 9C15 9 16 7 16 5C16 3 14 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 9V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 4L8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 4L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function InsuranceIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L4 6V12C4 17 8 20 12 22C16 20 20 17 20 12V6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function AppointmentsIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="5" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 10H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="15" r="1.5" fill="currentColor"/>
    </svg>
  )
}

export function EndodonticsIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C10 2 8 3 8 5C8 7 9 9 12 9C15 9 16 7 16 5C16 3 14 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 9V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 11L12 13L14 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function ProsthodonticsIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 2C6 2 5 3 5 5C5 7 6 9 8 9C10 9 11 7 11 5C11 3 10 2 8 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 2C14 2 13 3 13 5C13 7 14 9 16 9C18 9 19 7 19 5C19 3 18 2 16 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 9V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 9V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 16H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 5L11 7L8 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 5L13 7L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// Icon mapping for easy use
export const serviceIcons = {
  'general-dentistry': GeneralDentistryIcon,
  'cosmetic-dentistry': CosmeticDentistryIcon,
  'orthodontics': OrthodonticsIcon,
  'pediatric-dentistry': PediatricDentistryIcon,
  'advanced-restorative': ImplantAdvancedCareIcon,
}
