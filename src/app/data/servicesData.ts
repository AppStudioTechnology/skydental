import { Calendar, Award, Users, CalendarCheck, Sparkles, Scissors, Sprout, Bandage, Shield, Sparkle, Palette, Zap, Gem, Crown, Target, Search, UserCheck, Smile, Square, Eye, ClipboardCheck, Heart, GraduationCap, BookOpen, Lock, Microscope, ShieldCheck, RefreshCw, AlertCircle } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

export interface ServiceDetail {
  id: string
  title: string
  icon: string
  shortDescription: string
  bgColor: string
  hero: {
    title: string
    subtitle: string
    description: string
  }
  benefitsIntro?: string
  benefits: {
    icon: LucideIcon
    title: string
    description: string
  }[]
  servicesIntro?: string
  services: {
    icon: LucideIcon
    title: string
    description: string
    features: string[]
  }[]
  whyChoose: {
    title: string
    description: string
    features: string[]
    image: string
  }
  cta?: {
    title: string
    description: string
    buttonText: string
  }
}

export const servicesData: ServiceDetail[] = [
  {
    id: 'general-dentistry',
    title: 'General Dentistry',
    icon: '🦷',
    shortDescription: 'Comprehensive dental care for healthy teeth and gums, including checkups, cleanings, and preventive treatments.',
    bgColor: '#CBFF8F',
    hero: {
      title: 'General Dentistry',
      subtitle: 'Foundation for Lifelong Oral Health',
      description: 'Foundation for Lifelong Oral Health General Dentistry forms the cornerstone of healthy teeth and gums, focusing on early detection, prevention, and treatment of common dental concerns.'
    },
    benefitsIntro: 'Our team provides thoughtful, precise care designed to protect your oral health and maintain strong, healthy teeth. Every visit is crafted for comfort, clarity, and confidence, guided by modern techniques and a patient-first approach.',
    benefits: [
      {
        icon: Calendar,
        title: 'Same-Day Appointments',
        description: 'Flexible scheduling to fit your lifestyle'
      },
      {
        icon: Award,
        title: 'Expert Care',
        description: 'Experienced professionals delivering precise treatments'
      },
      {
        icon: Users,
        title: 'Family-Friendly',
        description: 'Comprehensive care for all ages'
      }
    ],
    servicesIntro: 'From emergency care to urgent treatment, we deliver relief and support when you need it most.',
    services: [
      {
        icon: CalendarCheck,
        title: 'Emergency exam & pain management',
        description: 'Same-day assessment and pain relief when you need immediate care. Our team prioritizes your comfort and stabilizes urgent dental issues.',
        features: [
          'Same-day emergency appointments',
          'Pain management',
          'Urgent assessment',
          'Stabilization and care plan'
        ]
      },
      {
        icon: Bandage,
        title: 'Toothache / infection treatment',
        description: 'Targeted treatment for toothache and infection to relieve pain and restore oral health. We address the cause and prevent recurrence.',
        features: [
          'Pain relief',
          'Infection control',
          'Targeted treatment',
          'Follow-up care'
        ]
      },
      {
        icon: Scissors,
        title: 'Extractions (simple / surgical)',
        description: 'Gentle removal of damaged or non-restorable teeth, from simple to surgical extractions. Our approach minimizes discomfort and supports smooth healing.',
        features: [
          'Simple and surgical extractions',
          'Pain management',
          'Post-treatment guidance',
          'Healing support'
        ]
      },
      {
        icon: Shield,
        title: 'Gum pain / abscess management',
        description: 'Care for gum pain and abscess to reduce swelling, control infection, and restore comfort. Early intervention protects your teeth and overall wellbeing.',
        features: [
          'Abscess drainage and care',
          'Gum pain relief',
          'Infection management',
          'Ongoing oral health support'
        ]
      },
      {
        icon: Sprout,
        title: 'Root canal treatment',
        description: 'Advanced procedures to remove infection while preserving your natural tooth. Performed with modern techniques for comfort and durable outcomes.',
        features: [
          'Pain-free procedures',
          'Tooth preservation',
          'Long-lasting results',
          'Modern, precise techniques'
        ]
      }
    ],
    whyChoose: {
      title: 'Why Choose Our Relief & Urgent Care',
      description: 'We combine experience, attention, and careful planning to deliver reliable, patient-focused care.',
      features: [
        'Experienced, certified dentists',
        'Preventive-focused approach',
        'Comfort and clarity at every step',
        'Transparent pricing and flexible payment options'
      ],
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop'
    },
    cta: {
      title: 'Ready to Prioritize Your Oral Health?',
      description: 'Schedule your appointment today and let our team help you maintain a healthy, confident smile.',
      buttonText: 'Book Your Appointment'
    }
  },
  {
    id: 'cosmetic-dentistry',
    title: 'Cosmetic Dentistry',
    icon: '✨',
    shortDescription: 'Transform your smile with advanced aesthetic treatments including whitening, veneers, and smile design.',
    bgColor: '#CBFF8F',
    hero: {
      title: 'Cosmetic Dentistry',
      subtitle: 'Enhancing Your Smile, Naturally',
      description: 'Enhancing Your Smile, Naturally Cosmetic dentistry focuses on improving the appearance of your teeth, gums, and smile using advanced aesthetic techniques and materials, tailored to your unique features.'
    },
    benefitsIntro: 'Our team provides thoughtful, precise care designed to maintain healthy teeth while enhancing your smile. Each treatment is delivered with attention to detail, ensuring comfort, confidence, and results that feel natural and harmonious with your face.',
    benefits: [
      {
        icon: Sparkle,
        title: 'Beautiful Results',
        description: 'Natural-looking enhancements that elevate your smile'
      },
      {
        icon: Palette,
        title: 'Custom Design',
        description: 'Treatment plans personalized for your individual needs'
      },
      {
        icon: Zap,
        title: 'Efficient Transformation',
        description: 'Noticeable improvements in just a few visits'
      }
    ],
    servicesIntro: 'From subtle enhancements to full smile transformations, our services are designed to combine function, health, and aesthetics.',
    services: [
      {
        icon: Sparkles,
        title: 'Teeth whitening',
        description: 'A safe, effective treatment that brightens your smile and removes deep stains. Achieve noticeable, long-lasting results in a single session.',
        features: [
          'Safe and effective',
          'Deep stain removal',
          'Long-lasting brightness',
          'Quick, convenient sessions'
        ]
      },
      {
        icon: Gem,
        title: 'Veneers',
        description: 'Ultra-thin veneers that refine colour, shape, and symmetry for a naturally stunning smile. Enhance your teeth without compromising comfort or authenticity.',
        features: [
          'Custom ultra-thin veneers',
          'Colour and shape refinement',
          'Symmetry enhancement',
          'Naturally elegant results'
        ]
      },
      {
        icon: Palette,
        title: 'Smile design',
        description: 'A digital planning process that visualizes your ideal smile in harmony with your facial features. Preview your results before treatment begins.',
        features: [
          'Digital smile visualization',
          'Facial feature analysis',
          'Results preview',
          'Confident transformation'
        ]
      },
      {
        icon: Eye,
        title: 'Invisalign / clear aligners',
        description: 'Clear aligner systems that gently adjust teeth with digital precision. Comfortable, removable, and convenient for everyday life.',
        features: [
          'Clear, removable aligners',
          'Advanced digital planning',
          'Comfortable for daily use',
          'Highly effective and discreet'
        ]
      },
      {
        icon: Target,
        title: 'Cosmetic bonding / contouring',
        description: 'A minimally invasive solution to reshape and correct minor imperfections. Quick, precise, and effective, it refines your smile without extensive procedures.',
        features: [
          'Rapid treatment',
          'Minor imperfection correction',
          'Minimally invasive',
          'Refined, natural results'
        ]
      }
    ],
    whyChoose: {
      title: 'Why Choose Our Smile Aesthetics',
      description: 'We combine artistry, expertise, and a patient-focused approach to create smiles that feel natural, balanced, and uniquely yours.',
      features: [
        'Award-winning cosmetic dentists',
        'Digital smile design technology',
        'Premium materials and techniques',
        'Natural, harmonious results',
        'Comprehensive consultations',
        'Flexible financing options'
      ],
      image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=600&fit=crop'
    },
    cta: {
      title: 'Ready to Prioritize Your Oral Health?',
      description: 'Schedule your appointment today and let our team help you maintain a healthy, confident smile.',
      buttonText: 'Book Your Appointment'
    }
  },
  {
    id: 'orthodontics',
    title: 'Orthodontics',
    icon: '🦷',
    shortDescription: 'Straighten your teeth and correct misalignments with braces, Invisalign, and modern orthodontic solutions.',
    bgColor: '#CBFF8F',
    hero: {
      title: 'Orthodontics',
      subtitle: 'Straightening Smiles, Naturally',
      description: 'Straightening Smiles, Naturally Our orthodontic services combine advanced techniques with thoughtful planning to straighten teeth, correct bite issues, and create healthy, confident smiles tailored to your needs.'
    },
    benefitsIntro: 'Every treatment is carefully designed to maintain oral health while improving alignment. Using modern methods, our team ensures a comfortable experience and predictable, long-lasting results.',
    benefits: [
      {
        icon: Search,
        title: 'Advanced Technology',
        description: '3D imaging and digital treatment planning for precision'
      },
      {
        icon: UserCheck,
        title: 'Expert Orthodontists',
        description: 'Board-certified specialists guiding each step'
      },
      {
        icon: Smile,
        title: 'Comfortable Treatment',
        description: 'Modern techniques to minimize discomfort'
      }
    ],
    servicesIntro: 'From early assessments to full corrective treatments, we provide comprehensive care for every stage of your orthodontic journey.',
    services: [
      {
        icon: Square,
        title: 'Metal & Ceramic Braces',
        description: 'Traditional yet highly effective systems for a wide range of alignment issues. Ceramic braces offer a discreet, elegant option for those seeking subtle treatment.',
        features: [
          'Metal and ceramic options',
          'Corrects diverse alignment issues',
          'Reliable and predictable results',
          'Discreet ceramic appearance'
        ]
      },
      {
        icon: Eye,
        title: 'Invisalign, Sparks & Smarter Aligners',
        description: 'Clear aligner systems that gently adjust teeth with digital precision. Comfortable, removable, and convenient for everyday life, they offer a modern alternative to traditional braces.',
        features: [
          'Clear, removable aligners',
          'Advanced digital treatment planning',
          'Comfortable for daily use',
          'Highly effective and discreet'
        ]
      },
      {
        icon: Shield,
        title: 'Retainers & Smile Maintenance',
        description: 'Custom retainers designed to preserve your results and prevent teeth from shifting. Ensures your smile remains aligned long after active treatment.',
        features: [
          'Custom-fitted for comfort',
          'Maintains orthodontic results',
          'Prevents shifting',
          'Supports long-term stability'
        ]
      },
      {
        icon: ClipboardCheck,
        title: 'Orthodontic Check-ups',
        description: 'Regular assessments to monitor dental alignment, evaluate bite concerns, and adjust treatment plans as needed.',
        features: [
          'Comprehensive evaluation',
          'Bite and alignment analysis',
          'Treatment adjustments',
          'Ensures predictable outcomes'
        ]
      }
    ],
    whyChoose: {
      title: 'Why Choose Our Orthodontic Services',
      description: 'We combine expertise, advanced technology, and thoughtful patient care to create smiles that are both beautiful and healthy.',
      features: [
        'Board-certified orthodontists',
        'Customized treatment plans',
        'Digital planning for precision',
        'Comfortable, patient-focused care',
        'Family-friendly environment',
        'Proven track record of results'
      ],
      image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&h=600&fit=crop'
    },
    cta: {
      title: 'Ready to Prioritize Your Oral Health?',
      description: 'Schedule your appointment today and let our team help you maintain a healthy, confident smile.',
      buttonText: 'Book Your Appointment'
    }
  },
  {
    id: 'pediatric-dentistry',
    title: 'Pediatric Dentistry',
    icon: '👶',
    shortDescription: 'Gentle, specialized dental care for children and teens in a welcoming and comfortable environment.',
    bgColor: '#CBFF8F',
    hero: {
      title: 'Pediatric Dentistry',
      subtitle: 'Gentle Care for Growing Smiles',
      description: 'Gentle Care for Growing Smiles Our pediatric dentistry services provide specialized, compassionate care in a welcoming environment designed just for children. Every visit is crafted to make dental care a positive, engaging experience while promoting lifelong oral health.'
    },
    benefitsIntro: 'We combine expertise with a child-centered approach, ensuring treatments are gentle, educational, and supportive. From routine check-ups to preventive care, we help children build healthy habits that last a lifetime.',
    benefits: [
      {
        icon: Heart,
        title: 'Child-Friendly Environment',
        description: 'Fun, relaxing spaces that put kids at ease'
      },
      {
        icon: UserCheck,
        title: 'Specialized Dentists',
        description: 'Professionals trained in pediatric care'
      },
      {
        icon: GraduationCap,
        title: 'Education-Focused',
        description: 'Teaching children good oral hygiene habits early'
      }
    ],
    servicesIntro: 'From check-ups to preventive treatments, we deliver care tailored to each child\'s needs.',
    services: [
      {
        icon: Heart,
        title: 'Gentle Dental Care for Kids',
        description: 'Soft, comforting care that helps children feel relaxed during dental visits. Positive experiences foster healthy habits and reduce anxiety for future treatments.',
        features: [
          'Soft, reassuring techniques',
          'Relaxed, kid-friendly visits',
          'Encourages lifelong oral health',
          'Builds trust and confidence'
        ]
      },
      {
        icon: Shield,
        title: 'Fluoride Treatments',
        description: 'Preventive treatments that strengthen enamel and reduce the risk of decay, especially important for growing teeth.',
        features: [
          'Enamel strengthening',
          'Decay prevention',
          'Protective and proactive',
          'Supports healthy development'
        ]
      },
      {
        icon: Lock,
        title: 'Dental Sealants',
        description: 'A protective coating applied to molars to prevent cavities, offering one of the most effective long-term decay prevention methods for children.',
        features: [
          'Molar protection',
          'Cavity prevention',
          'Long-term effectiveness',
          'Easy, painless application'
        ]
      },
      {
        icon: Search,
        title: 'Early Orthodontic Evaluation',
        description: 'Assessments to identify developmental issues in teeth and jaws, ensuring timely intervention and guidance for proper alignment.',
        features: [
          'Early developmental screening',
          'Bite and jaw evaluation',
          'Proactive guidance',
          'Preventive planning for future treatments'
        ]
      },
      {
        icon: BookOpen,
        title: 'Oral Hygiene Education',
        description: 'Interactive instruction to teach children proper brushing, flossing, and healthy habits, empowering them to take charge of their oral health.',
        features: [
          'Engaging, age-appropriate teaching',
          'Brushing and flossing guidance',
          'Healthy habit development',
          'Builds lifelong oral care skills'
        ]
      }
    ],
    whyChoose: {
      title: 'Why Choose Our Pediatric Dentistry',
      description: 'We create experiences that children enjoy while ensuring parents feel confident in the care provided.',
      features: [
        'Specialized pediatric dentists',
        'Child-friendly clinic design',
        'Gentle, supportive approach',
        'Parent education and involvement',
        'Preventive, long-term care',
        'Builds trust, comfort, and confidence'
      ],
      image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&h=600&fit=crop'
    },
    cta: {
      title: 'Ready to Prioritize Your Oral Health?',
      description: 'Schedule your appointment today and let our team help you maintain a healthy, confident smile.',
      buttonText: 'Book Your Appointment'
    }
  },
  {
    id: 'advanced-restorative',
    title: 'Implant & Advanced Care',
    icon: '🔬',
    shortDescription: 'Complex treatments for structural and functional restoration including implants and full-mouth restoration.',
    bgColor: '#CBFF8F',
    hero: {
      title: 'Implant & Advanced Care Dentistry',
      subtitle: 'Confidence and Harmony',
      description: 'Confidence and Harmony Our advanced restorative dentistry combines expert care with thoughtful planning to repair, replace, and restore damaged or missing teeth. Every treatment is designed to bring lasting results while maintaining natural function and aesthetics.'
    },
    benefitsIntro: 'We provide carefully tailored treatments that support oral health, restore confidence, and enhance comfort. From single-tooth implants to full-mouth rehabilitation, each solution is delivered with precision, attention to detail, and a focus on long-term success.',
    benefits: [
      {
        icon: Microscope,
        title: 'Advanced Techniques',
        description: 'Cutting-edge tools and approaches for accurate, reliable outcomes'
      },
      {
        icon: ShieldCheck,
        title: 'Durable Results',
        description: 'Restorations built to last and function naturally'
      },
      {
        icon: Target,
        title: 'Comprehensive Solutions',
        description: 'Full-mouth and multi-disciplinary care for complex needs'
      }
    ],
    servicesIntro: 'From preventive care to full restoration, we help you maintain or rebuild your oral health for the long term.',
    services: [
      {
        icon: Shield,
        title: 'Fillings & restorations',
        description: 'Tooth-coloured fillings and restorations that repair decay and restore strength and function while matching your natural tooth shade.',
        features: [
          'Shade-matched fillings',
          'Durable restorations',
          'Decay repair',
          'Natural appearance'
        ]
      },
      {
        icon: Crown,
        title: 'Crowns / bridges',
        description: 'Durable, aesthetic crowns and bridges that replace or strengthen teeth while restoring natural function. Each restoration is custom-made for a perfect fit.',
        features: [
          'Strong and long-lasting',
          'Restores function',
          'Custom-crafted',
          'Harmonious appearance'
        ]
      },
      {
        icon: Microscope,
        title: 'Implants',
        description: 'Implants replace missing teeth with stability, function, and a natural appearance. Each case is planned to seamlessly restore your bite and smile.',
        features: [
          'Long-lasting, reliable solutions',
          'Natural, aesthetic results',
          'Exceptional functional stability',
          'Replaces single or multiple teeth'
        ]
      },
      {
        icon: RefreshCw,
        title: 'Dentures',
        description: 'Removable or fixed dentures that restore your smile and chewing ability. Custom-fitted for comfort and a natural look.',
        features: [
          'Full and partial options',
          'Custom-fitted for comfort',
          'Natural appearance',
          'Restored function'
        ]
      },
      {
        icon: ClipboardCheck,
        title: 'Deep cleaning / gum treatment',
        description: 'Professional deep cleaning and gum treatment to remove buildup, treat gum disease, and restore gum health for lasting oral wellness.',
        features: [
          'Scaling and root planing',
          'Gum disease treatment',
          'Prevention of progression',
          'Long-term gum health'
        ]
      }
    ],
    whyChoose: {
      title: 'Why Choose Our Protect & Restore',
      description: 'We combine expertise, advanced technology, and patient-focused planning to deliver restorative solutions with confidence and care.',
      features: [
        'Board-certified restorative specialists',
        'Advanced 3D imaging and planning',
        'Comprehensive, tailored treatments',
        'Sedation dentistry for comfort',
        'Long-term, functional results',
        'Commitment to patient wellbeing'
      ],
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop'
    },
    cta: {
      title: 'Ready to Prioritize Your Oral Health?',
      description: 'Schedule your appointment today and let our team help you maintain a healthy, confident smile.',
      buttonText: 'Book Your Appointment'
    }
  }
]

export function getServiceById(id: string): ServiceDetail | undefined {
  return servicesData.find(service => service.id === id)
}
