// Doctor front-view photos from assets
import drSaifImg from '../../assets/Drs Front View Pictures/dr saif.jpg'
import drBasmaImg from '../../assets/Drs Front View Pictures/dr basma.jpg'
import drClaudeImg from '../../assets/Drs Front View Pictures/dr claude.jpg'
import drEliasImg from '../../assets/Drs Front View Pictures/dr elias.jpg'
import drAmrHussonImg from '../../assets/Drs Front View Pictures/dr amr husson.jpg'
import drShridharImg from '../../assets/Drs Front View Pictures/dr shridhar.jpg'
import drMuhammadAbdulrazakImg from '../../assets/Drs Front View Pictures/dr muhammad abdulrazak.jpg'
import drHazemImg from '../../assets/Drs Front View Pictures/dr hazem.jpg'
import drKinanImg from '../../assets/Drs Front View Pictures/dr kinan mohammed.jpg'
import drMohanedImg from '../../assets/Drs Front View Pictures/dr mohaned albasha.jpg'
import drReemImg from '../../assets/Drs Front View Pictures/dr reem.jpg'
import drArwaImg from '../../assets/Drs Front View Pictures/dr arwa.jpg'
// Doctor side-view photos (hover state)
import drSaifSideImg from '../../assets/Drs Side View Pictures/dr saif.jpg'
import drBasmaSideImg from '../../assets/Drs Side View Pictures/dr basma.jpg'
import drClaudeSideImg from '../../assets/Drs Side View Pictures/dr claude.jpg'
import drEliasSideImg from '../../assets/Drs Side View Pictures/dr elias.jpg'
import drAmrHussonSideImg from '../../assets/Drs Side View Pictures/dr amr husson.jpg'
import drShridharSideImg from '../../assets/Drs Side View Pictures/dr shridhar munje.jpg'
import drMuhammadAbdulrazakSideImg from '../../assets/Drs Side View Pictures/dr mohammad abdulrazak.jpg'
import drHazemSideImg from '../../assets/Drs Side View Pictures/dr hazem.jpg'
import drKinanSideImg from '../../assets/Drs Side View Pictures/dr kinan mohammed.jpg'
import drMohanedSideImg from '../../assets/Drs Side View Pictures/dr mohanned albasha.jpg'
import drReemSideImg from '../../assets/Drs Side View Pictures/dr reem.jpg'
import drArwaSideImg from '../../assets/Drs Side View Pictures/dr Arwa.jpg'

export interface DoctorDetail {
  id: string
  name: string
  title: string
  specialty: string
  image: string
  /** Side-view image shown on hover (optional; e.g. Dr. Nasrin has no side view) */
  imageSide?: string
  aboutImage: string
  description: string
  stats: {
    label: string
    value: string
  }[]
  education: {
    icon: string
    degree: string
    institution: string
    year?: string
  }[]
  experience: {
    title: string
    description: string
    highlights: string[]
  } | null
  expertise: {
    category: string
    items: string[]
  }[]
  philosophy: {
    title: string
    description: string
    principles: string[]
    quote: string
  }
  clinicImages: string[]
}

export const doctorsData: DoctorDetail[] = [
  {
    id: 'dr-saifaldin-tawakul',
    name: 'Dr. Saif Eldin Tawakul',
    title: 'Specialist Oral Surgeon & Implantologist',
    specialty: 'Specialist Oral Surgeon & Implantologist',
    image: drSaifImg,
    imageSide: drSaifSideImg,
    aboutImage: drSaifImg,
    description: 'Dr. Saif Eldin Tawakul is a distinguished Specialist Oral Surgeon and Implantologist with more than 20 years of international clinical experience in Germany and the UAE. Renowned for his advanced surgical expertise and precision-driven treatment approach, Dr. Saif is one of the region\'s most respected oral surgery practitioners. He completed his German Board Certification in Oral Surgery in Bremen, Germany, in 2009, and holds a certified implant privilege. He is also a registered Specialist under the Department of Health – Abu Dhabi. Dr. Saif began his professional journey in Germany, practising Oral Surgery and Implantology from 2004 to 2010, before relocating to the UAE, where he spent over a decade practicing general dentistry and oral surgery in Al Ain. In 2020, he co-founded Sky Dental Center, where he continues to provide exceptional surgical care and plays an integral role in shaping the centre\'s clinical excellence and patient-focused philosophy.',
    stats: [
      { label: 'Years of Experience', value: '20+' },
      { label: 'International Experience', value: 'Germany & UAE' },
      { label: 'Co-Founder', value: 'Sky Dental Center' }
    ],
    education: [
      {
        icon: '📜',
        degree: 'German Board Certification in Oral Surgery',
        institution: 'Bremen, Germany',
        year: '2009'
      },
      {
        icon: '🏆',
        degree: 'Certified Implant Privilege',
        institution: 'Department of Health – Abu Dhabi',
        year: ''
      },
      {
        icon: '📜',
        degree: 'Registered Specialist',
        institution: 'Department of Health – Abu Dhabi',
        year: ''
      }
    ],
    experience: null,
    expertise: [
      {
        category: 'Evaluation & Diagnosis',
        items: [
          'Comprehensive dental and medical evaluation',
          'Oral cancer screening and assessment of TMJ, salivary glands, and facial structures',
          'CBCT and advanced radiographic interpretation',
          'Diagnosis of cysts, tumours, oral pathologies, and orofacial pain',
          'Multidisciplinary treatment planning in collaboration with orthodontic, prosthodontic, periodontal, and restorative teams'
        ]
      },
      {
        category: 'Surgical Procedures',
        items: [
          'Simple and complex tooth extractions, including impacted and wisdom teeth',
          'Surgical management of oral cysts, tumours, and soft tissue lesions',
          'Pre-prosthetic surgeries such as ridge augmentation and alveoloplasty',
          'Bone grafting and sinus lift procedures',
          'Surgical exposure of impacted teeth for orthodontic treatment'
        ]
      },
      {
        category: 'Implantology',
        items: [
          'Surgical placement of dental implants',
          'Advanced implant procedures including All-on-X and ridge preservation techniques',
          'Management of peri-implantitis and implant-related complications'
        ]
      }
    ],
    philosophy: {
      title: 'Professional Philosophy',
      description: 'Dr. Saif believes that successful surgical dentistry is built on meticulous planning, advanced clinical skill, and complete transparency with patients. His treatment philosophy focuses on safety, accuracy, and long-term stability, ensuring every patient receives the highest standards of personalised care. Through his leadership and expertise, he continues to elevate the quality of oral surgical services within Sky Dental Center.',
      principles: [
        'Meticulous planning and advanced clinical skill',
        'Complete transparency with patients',
        'Safety, accuracy, and long-term stability',
        'Highest standards of personalised care',
        'Leadership in clinical excellence'
      ],
      quote: 'Dr. Saif Eldin Tawakul welcomes patients seeking advanced surgical and implant solutions and is committed to providing exceptional care that restores health, function, and confidence.'
    },
    clinicImages: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'dr-basma-al-rawi',
    name: 'Dr. Basma Alrawi',
    title: 'Specialist Oral Surgeon',
    specialty: 'Specialist Oral Surgeon',
    image: drBasmaImg,
    imageSide: drBasmaSideImg,
    aboutImage: drBasmaImg,
    description: 'Dr. Basma Alrawi is a highly accomplished Specialist Oral Surgeon renowned for her advanced surgical expertise, precision-driven clinical approach, and unwavering commitment to patient safety and wellbeing. With implant privileges and extensive experience managing complex oral and maxillofacial conditions, she brings exceptional skill and a calm, reassuring presence to every treatment journey. Her practice integrates evidence-based surgery, modern diagnostic technologies, and a multidisciplinary philosophy—ensuring that patients receive comprehensive, safe, and predictable surgical outcomes.',
    stats: [
      { label: 'Specialist', value: 'Specialist Oral Surgeon' },
      { label: 'Implant Privileges', value: 'Yes' },
      { label: 'Approach', value: 'Evidence-Based' }
    ],
    education: [],
    experience: null,
    expertise: [
      {
        category: 'Evaluation & Diagnosis',
        items: [
          'Comprehensive dental and medical evaluations',
          'Oral cancer screening and assessment of TMJ, salivary glands, and facial structures',
          'CBCT and radiographic interpretation (intraoral & extraoral)',
          'Diagnosis of cysts, tumours, orofacial pain, and oral pathologies',
          'Collaborative treatment planning with multidisciplinary medical teams'
        ]
      },
      {
        category: 'Surgical Procedures',
        items: [
          'Simple and complex tooth extractions',
          'Removal of impacted and wisdom teeth',
          'Management of oral cysts, tumours, and soft-tissue lesions',
          'Pre-prosthetic surgeries including ridge augmentation and alveoloplasty',
          'Bone grafting, sinus lift procedures, and surgical exposure of teeth'
        ]
      },
      {
        category: 'Implantology',
        items: [
          'Surgical placement of dental implants',
          'Advanced implant solutions, including All-On-X and ridge-preservation techniques',
          'Management of implant complications and peri-implantitis'
        ]
      }
    ],
    philosophy: {
      title: 'A Patient-Centred Surgical Philosophy',
      description: 'Dr. Basma Alrawi believes that exceptional surgical care requires not only technical expertise but also empathy, communication, and trust. She prioritises clear explanation of procedures and treatment expectations, gentle patient-focused surgical delivery, multidisciplinary collaboration for comprehensive outcomes, and individualised treatment plans tailored to each patient\'s clinical needs and personal comfort.',
      principles: [
        'Clear explanation of procedures and treatment expectations',
        'Gentle, patient-focused surgical delivery',
        'Multidisciplinary collaboration for comprehensive outcomes',
        'Individualised treatment plans tailored to each patient\'s clinical needs and personal comfort',
        'Professionalism, skill, and dedication to highest standards'
      ],
      quote: 'Dr. Basma Alrawi looks forward to continuing her mission of elevating oral surgical care at Sky Dental Center, ensuring every patient experiences safe, advanced, and transformative treatment.'
    },
    clinicImages: [
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'dr-claude-istanbouli',
    name: 'Dr. Claude Istanbouli',
    title: 'General Dental Practitioner & Implantologist',
    specialty: 'General Dental Practitioner & Implantologist',
    image: drClaudeImg,
    imageSide: drClaudeSideImg,
    aboutImage: drClaudeImg,
    description: 'With more than 30 years of transformative experience in restorative, surgical, and cosmetic dentistry, Dr. Claude Istanbouli stands as one of the region\'s foremost authorities in dental implants and full-mouth rehabilitation. Since graduating from Damascus University in 1988 and completing advanced training in cosmetic and restorative dentistry at UCLA, California in 1999, Dr. Istanbouli has built a distinguished international career across the United States and the UAE. His professional journey includes key positions at ADNOC Medical Services and Mubadala Health\'s Healthpoint Hospital, where he contributed to elevating clinical standards and delivering life-changing results. Today, as a leading specialist at Sky Dental Center in Khalifa City A, part of CMC Medical, he continues to redefine modern implant dentistry with unparalleled expertise and innovation.',
    stats: [
      { label: 'Years of Experience', value: '30+' },
      { label: 'International Career', value: 'USA & UAE' }
    ],
    education: [
      {
        icon: '🎓',
        degree: 'Graduated',
        institution: 'Damascus University',
        year: '1988'
      },
      {
        icon: '🎓',
        degree: 'Advanced Training in Cosmetic and Restorative Dentistry',
        institution: 'UCLA, California',
        year: '1999'
      },
      {
        icon: '📜',
        degree: 'American National Board Certification',
        institution: 'American Dental Association (ADA)',
        year: '1999'
      },
      {
        icon: '🏆',
        degree: 'Fellowship',
        institution: 'American Academy of Implant Dentistry (AAID)',
        year: '2013'
      },
      {
        icon: '🏆',
        degree: 'Fellowship',
        institution: 'American Academy of Anti-Aging Medicine (A4M)',
        year: '2018'
      },
      {
        icon: '📜',
        degree: 'UAE Department of Health Implant Privileges',
        institution: 'Abu Dhabi DOH Examination Panel',
        year: ''
      }
    ],
    experience: null,
    expertise: [
      {
        category: 'Dental Implants & Full Mouth Rehabilitation',
        items: [
          'Specialised in complete oral reconstructions and full-mouth implant solutions',
          'Expert in treating medically compromised patients requiring advanced implant therapy',
          'Utilises cutting-edge technology and biological enhancement methods for predictable, long-lasting results'
        ]
      },
      {
        category: 'Restorative & Cosmetic Dentistry',
        items: [
          'Precision crowns, onlays, veneers, and full smile design',
          'Aesthetic restorations that harmonise facial proportions with optimal occlusal function',
          'Blends artistic craftsmanship with evidence-based restorative science'
        ]
      },
      {
        category: 'Advanced Surgical Procedures',
        items: [
          'Skilled in multiple extractions, lesion removal, and pre-implant surgical preparation',
          'Three decades of refined surgical expertise ensuring safe and predictable outcomes'
        ]
      },
      {
        category: 'Specialised Aesthetic Treatments',
        items: [
          'Functional Botox for gummy smile correction and bruxism management',
          'Minimally invasive techniques that improve comfort, function, and facial aesthetics'
        ]
      }
    ],
    philosophy: {
      title: 'Commitment to Excellence',
      description: 'Beyond his extensive clinical achievements, Dr. Claude Istanbouli is deeply committed to the advancement of the dental profession. He regularly participates in continuing education, mentors aspiring clinicians, and contributes to shaping the future of implant dentistry through training and scientific knowledge-sharing. His legacy is reflected not only in the thousands of patients whose lives he has transformed, but also in the next generation of dental professionals whose careers he continues to inspire.',
      principles: [
        'Pioneering innovation in regenerative dental techniques',
        'Gentle clinical approach with meticulous attention to detail',
        'Continuing education and mentorship',
        'Scientific knowledge-sharing and training',
        'Transforming lives through exceptional care'
      ],
      quote: 'Dr. Claude Istanbouli welcomes patients seeking world-class implant, surgical, and restorative solutions and remains dedicated to delivering care that is precise, compassionate, and transformative.'
    },
    clinicImages: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'dr-elias-daoud-hanna',
    name: 'Dr. Elias Hanna',
    title: 'Specialist Pedodontist',
    specialty: 'Specialist Pedodontist',
    image: drEliasImg,
    imageSide: drEliasSideImg,
    aboutImage: drEliasImg,
    description: 'Dr. Elias Hanna is a distinguished Specialist Prosthodontist with advanced expertise in the restoration and replacement of missing or damaged teeth, functional rehabilitation, and aesthetic smile enhancement. With implant privileges and extensive training in prosthodontic sciences, he offers patients comprehensive restorative solutions grounded in precision, craftsmanship, and evidence-based excellence. His clinical philosophy focuses on restoring harmony, comfort, and confidence—ensuring that every patient receives personalised, functional, and naturally aesthetic outcomes.',
    stats: [
      { label: 'Specialist', value: 'Specialist Pedodontist' },
      { label: 'Implant Privileges', value: 'Yes' },
      { label: 'Focus', value: 'Restoration & Aesthetics' }
    ],
    education: [],
    experience: null,
    expertise: [
      {
        category: 'Evaluation & Diagnostic Services',
        items: [
          'Comprehensive assessment of oral health, occlusion, TMJ function, and soft tissues',
          'Diagnosis of conditions affecting chewing efficiency, phonetics, and facial aesthetics',
          'Taking and interpreting diagnostic radiographs, including intraoral and panoramic imaging',
          'Risk assessment and personalised treatment planning tailored to functional and aesthetic goals'
        ]
      },
      {
        category: 'Prosthodontic Rehabilitation',
        items: [
          'Fabrication and fitting of full and partial dentures',
          'Crown and bridge restorations for individual or multiple tooth replacement',
          'Veneers for aesthetic enhancements and minor alignment corrections',
          'Restoration of missing teeth using tooth-supported or implant-supported fixed prostheses',
          'Fabrication and restoration of implant-supported crowns, bridges, and overdentures'
        ]
      },
      {
        category: 'Implantology',
        items: [
          'Surgical placement of dental implants',
          'Restoration of implant-supported prostheses including crowns, bridges, and hybrid solutions',
          'Occlusal rehabilitation and bite correction for functional and aesthetic optimisation'
        ]
      }
    ],
    philosophy: {
      title: 'Patient-Centred Philosophy',
      description: 'Dr. Elias believes that exceptional prosthodontic care requires a holistic understanding of patient needs—balancing function, aesthetics, comfort, and long-term health. He provides clear communication and detailed explanations, personalised treatment planning, and a gentle, reassuring approach that supports patient confidence.',
      principles: [
        'Holistic understanding of patient needs',
        'Clear communication and detailed explanations',
        'Personalised treatment planning',
        'Gentle, reassuring approach that supports patient confidence',
        'Commitment to excellence and refined clinical skillset'
      ],
      quote: 'Dr. Elias Hanna looks forward to welcoming patients seeking advanced restorative, prosthodontic, and implant solutions—delivering care defined by precision, artistry, and trust.'
    },
    clinicImages: [
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'dr-amr-husson',
    name: 'Dr. Amr Husson',
    title: 'Specialist Orthodontist',
    specialty: 'Specialist Orthodontist',
    image: drAmrHussonImg,
    imageSide: drAmrHussonSideImg,
    aboutImage: drAmrHussonImg,
    description: 'Dr. Amr Husson is an accomplished Orthodontic Specialist with more than nine years of advanced clinical expertise dedicated to diagnosing, correcting, and preventing dental and facial irregularities. At Sky Dental Center, he combines cutting-edge orthodontic technologies with a compassionate, patient-focused approach to create healthy, aesthetically refined smiles for children, teens, and adults alike. His commitment to excellence, meticulous attention to detail, and reliance on evidence-based practice ensure that every treatment delivers optimal functional stability and exceptional cosmetic results.',
    stats: [
      { label: 'Years of Experience', value: '9+' },
      { label: 'Specialist', value: 'Orthodontics' },
      { label: 'Registered', value: 'UAE & Syria' }
    ],
    education: [
      {
        icon: '🎓',
        degree: 'Master\'s Degree in Orthodontics',
        institution: 'Damascus University',
        year: '2016'
      },
      {
        icon: '🎓',
        degree: 'Bachelor\'s Degree in Dental Surgery',
        institution: 'Damascus University',
        year: '2010'
      },
      {
        icon: '🏆',
        degree: 'Invisalign Certification',
        institution: '',
        year: ''
      },
      {
        icon: '🏆',
        degree: 'Temporary Anchorage Devices (TADs) Training',
        institution: '',
        year: ''
      },
      {
        icon: '📜',
        degree: 'Licensed Member',
        institution: 'Syrian Dental Association',
        year: '2010'
      }
    ],
    experience: null,
    expertise: [
      {
        category: 'Management of Malocclusions',
        items: [
          'Crowding and spacing',
          'Deep bite and open bite',
          'All Angle classifications: Class I, II, and III',
          'Correction of functional habits (thumb-sucking, tongue thrust)'
        ]
      },
      {
        category: 'Full Spectrum of Orthodontic Treatment Modalities',
        items: [
          'Traditional metal braces',
          'Aesthetic ceramic braces',
          'Self-ligating systems',
          'Clear aligner therapy (including Invisalign)'
        ]
      },
      {
        category: 'Paediatric Orthodontics',
        items: [
          'Preventive and interceptive orthodontics',
          'Space maintainers',
          'Functional appliances guiding proper jaw development'
        ]
      },
      {
        category: 'Advanced Biomechanics & TADs',
        items: [
          'Temporary Anchorage Devices enabling precise control in complex movements',
          'Customised treatment mechanics for challenging orthodontic cases'
        ]
      }
    ],
    philosophy: {
      title: 'Technology-Driven, Patient-Centred Care',
      description: 'At Sky Dental Center, Dr. Husson integrates a fully digital orthodontic workflow through 3D intraoral scanning, digital treatment simulations, and precision-designed appliances. This technology enables highly accurate planning, improved patient comfort, and the ability for patients to preview their future smiles even before treatment begins. His approach emphasises patient education, comfort, and clear communication. He collaborates with restorative, prosthodontic, and periodontal specialists when interdisciplinary care is required, ensuring holistic treatment outcomes. Through consistent monitoring and long-term follow-up, he ensures stability, functionality, and lasting satisfaction.',
      principles: [
        'Fully digital orthodontic workflow',
        'Patient education, comfort, and clear communication',
        'Collaboration with multidisciplinary specialists',
        'Consistent monitoring and long-term follow-up',
        'Evidence-based practice for optimal results'
      ],
      quote: 'Dr. Amr Husson welcomes patients of all ages and is committed to creating confident, naturally beautiful smiles through advanced orthodontic care rooted in precision, expertise, and compassion.'
    },
    clinicImages: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'dr-shridhar-munje',
    name: 'Dr. Shridhar Munje',
    title: 'Specialist Orthodontist',
    specialty: 'Specialist Orthodontist',
    image: drShridharImg,
    imageSide: drShridharSideImg,
    aboutImage: drShridharImg,
    description: 'Dr. Shridhar Munje is a distinguished Specialist Orthodontist with more than 16 years of combined academic and clinical excellence, offering patients an advanced and comprehensive approach to orthodontic care. His career reflects a rare balance between high-level clinical expertise and a deep commitment to dental education, having mentored future dental professionals while continuously refining his mastery of modern orthodontic systems. With a professional journey that spans traditional mechanotherapy, cutting-edge aligner technologies, and interdisciplinary treatment planning, Dr. Munje provides tailored orthodontic solutions designed to achieve functional, aesthetic, and long-lasting results. His patient-centred philosophy emphasises precision, clarity, and comfort—ensuring that every individual receives a customised treatment pathway aligned with their unique dental needs and goals.',
    stats: [
      { label: 'Years of Experience', value: '16+' },
      { label: 'Academic Experience', value: '9 Years' },
      { label: 'Licensed', value: 'UAE & India' }
    ],
    education: [
      {
        icon: '🎓',
        degree: 'Master of Dental Surgery (MDS) – Orthodontics',
        institution: 'Sharad Pawar Dental College, Datta Meghe University of Medical Sciences',
        year: '2009'
      },
      {
        icon: '🎓',
        degree: 'Bachelor of Dental Surgery (BDS)',
        institution: 'VSPM Dental College, Maharashtra University of Health Sciences',
        year: '2006'
      },
      {
        icon: '📜',
        degree: 'Member',
        institution: 'Maharashtra State Dental Council of India',
        year: '2005'
      }
    ],
    experience: null,
    expertise: [
      {
        category: 'Traditional & Advanced Braces Systems',
        items: [
          'Fixed orthodontic therapy: Beggs, Edgewise, and Pre-adjusted Edgewise systems (MBT, Roth prescriptions)',
          'Ceramic braces for aesthetic alignment',
          'Self-ligating braces for enhanced comfort and efficiency',
          'Lingual orthodontics for discreet, invisible correction',
          'Removable and semi-fixed appliances'
        ]
      },
      {
        category: 'Modern Aligner Technology',
        items: [
          'Invisalign and Smartee clear aligner systems',
          'Customised aligner treatment planning for subtle, aesthetic smile transformation'
        ]
      },
      {
        category: 'Specialised Orthodontic Approaches',
        items: [
          'Myofunctional orthodontics with removable and fixed functional appliances',
          'Preventive and interceptive orthodontics for early developmental intervention',
          'Surgical orthodontics for complex skeletal discrepancies',
          'Adult orthodontic treatments tailored to mature patient needs',
          'TMJ disorder assessment and management'
        ]
      },
      {
        category: 'Advanced Techniques & Interdisciplinary Care',
        items: [
          'Temporary anchorage devices (TADs/micro-implants) for precise tooth movement',
          'Interdisciplinary collaboration with periodontists, prosthodontists, endodontists, and oral surgeons',
          'Comprehensive planning for complex full-mouth rehabilitation and aesthetic cases'
        ]
      }
    ],
    philosophy: {
      title: 'Professional Philosophy',
      description: 'Dr. Munje believes that orthodontic care is both a science and an art—requiring technical precision, thoughtful diagnosis, and individualised attention to each patient\'s functional and cosmetic goals. His approach prioritises patient comfort, informed decision-making, and treatment outcomes that enhance both oral health and confidence.',
      principles: [
        'Technical precision and thoughtful diagnosis',
        'Individualised attention to each patient\'s functional and cosmetic goals',
        'Patient comfort and informed decision-making',
        'Treatment outcomes that enhance both oral health and confidence',
        'Evidence-based orthodontics and collaborative treatment planning'
      ],
      quote: 'Dr. Shridhar Munje welcomes patients of all ages and looks forward to creating beautifully aligned, healthy smiles that stand the test of time.'
    },
    clinicImages: [
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'dr-mohammad-abdulrazak',
    name: 'Dr. Mohammad Abdulrazak',
    title: 'Specialist Periodontist',
    specialty: 'Specialist Periodontist',
    image: drMuhammadAbdulrazakImg,
    imageSide: drMuhammadAbdulrazakSideImg,
    aboutImage: drMuhammadAbdulrazakImg,
    description: 'Dr. Mohammad Abdulrazak is a highly accomplished Specialist Periodontist with more than a decade of advanced clinical experience dedicated to preserving periodontal health and restoring the structural foundations of the smile. Recognising that healthy gums are essential for long-term oral function and aesthetics, he integrates preventive care with sophisticated surgical techniques to deliver effective and sustainable outcomes for every patient. His refined clinical approach, supported by years of specialised training and international experience, positions him as one of the region\'s leading experts in periodontal therapy and gum-related surgical procedures.',
    stats: [
      { label: 'Years of Experience', value: '10+' },
      { label: 'Registered', value: 'UAE, Oman & Syria' },
      { label: 'Academic Role', value: '2 Years Supervisor' }
    ],
    education: [
      {
        icon: '🎓',
        degree: 'Postgraduate Training in Periodontology',
        institution: 'Damascus University',
        year: '2017'
      },
      {
        icon: '📜',
        degree: 'Syrian Board in Periodontology',
        institution: 'National Centre for Medical Specialties, Damascus, Syria',
        year: ''
      }
    ],
    experience: null,
    expertise: [
      {
        category: 'Non-Surgical Periodontal Therapy',
        items: [
          'Scaling and root planing (deep cleaning)',
          'Periodontal maintenance programmes',
          'Management of early and moderate gum disease'
        ]
      },
      {
        category: 'Advanced Surgical Procedures',
        items: [
          'Treatment of advanced periodontitis',
          'Periodontal flap surgery',
          'Bone grafting and regenerative procedures',
          'Guided tissue regeneration',
          'Soft tissue grafting for gum recession',
          'Crown lengthening (functional & aesthetic)'
        ]
      },
      {
        category: 'Dental Implants & Surgical Support',
        items: [
          'Surgical placement of dental implants',
          'Ridge preservation and bone augmentation',
          'Management of peri-implant disease',
          'Exposure and management of impacted teeth'
        ]
      },
      {
        category: 'Laser-Assisted Periodontal Therapy',
        items: [
          'Minimally invasive laser treatments',
          'Reduced discomfort and faster healing',
          'Enhanced precision for soft tissue procedures'
        ]
      }
    ],
    philosophy: {
      title: 'A Patient-Centred Philosophy',
      description: 'What truly distinguishes Dr. Abdulrazak is his unwavering commitment to patient education and empowerment. He believes that informed patients are better equipped to make decisions that support their long-term oral health. During consultations, he takes the time to explain diagnoses clearly and thoroughly, discuss treatment options in detail, provide practical oral hygiene guidance, and ensure patients feel confident and supported throughout their care. His compassionate, collaborative approach allows patients to feel relaxed and assured, whether they are receiving routine gum treatment or complex surgical interventions.',
      principles: [
        'Unwavering commitment to patient education and empowerment',
        'Clear and thorough explanation of diagnoses',
        'Detailed discussion of treatment options',
        'Practical oral hygiene guidance',
        'Compassionate, collaborative approach'
      ],
      quote: 'Dr. Mohammad Abdulrazak remains committed to advancing periodontal health, protecting the foundations of every smile, and delivering specialist care with precision, empathy, and excellence.'
    },
    clinicImages: [
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'dr-hazem-reslan',
    name: 'Dr. Hazem Reslan',
    title: 'Specialist Pedodontist',
    specialty: 'Specialist Pedodontist',
    image: drHazemImg,
    imageSide: drHazemSideImg,
    aboutImage: drHazemImg,
    description: 'Dr. Hazem Reslan is a distinguished Specialist Pedodontist dedicated to delivering exceptional dental care to infants, children, and adolescents. With advanced expertise in paediatric oral health, behavioural management, preventive dentistry, and minimally invasive treatment techniques, he ensures that every child receives compassionate, safe, and personalised care in a comfortable environment. With a deep understanding of the unique dental and emotional needs of young patients, Dr. Hazem combines clinical excellence with a gentle, reassuring approach that builds trust and confidence—laying the foundation for a lifetime of healthy smiles.',
    stats: [
      { label: 'Specialist', value: 'Pedodontist' },
      { label: 'Focus', value: 'Infants, Children & Adolescents' },
      { label: 'Approach', value: 'Compassionate & Safe' }
    ],
    education: [],
    experience: null,
    expertise: [
      {
        category: 'Evaluation & Diagnosis',
        items: [
          'Comprehensive oral evaluations for infants, children, and adolescents',
          'Detection of oral and systemic health conditions',
          'Diagnosis of developmental abnormalities',
          'Taking and interpreting intraoral and extraoral radiographs'
        ]
      },
      {
        category: 'Preventive Care',
        items: [
          'Professional fluoride applications and dental sealants',
          'Oral hygiene treatments and personalised education for children and parents',
          'Dietary and oral habit counselling',
          'Risk-based prevention planning',
          'Custom mouthguards for sports and trauma prevention'
        ]
      },
      {
        category: 'Restorative Treatments',
        items: [
          'Management of dental caries in primary and mixed dentition',
          'Minimally invasive restorations, including aesthetic composites',
          'Temporary and permanent restorations for paediatric cases'
        ]
      },
      {
        category: 'Surgical Procedures',
        items: [
          'Simple extractions of erupted teeth or roots',
          'Uncomplicated surgical extractions of fractured or residual roots',
          'Frenectomy and tongue-tie release',
          'Mucocele removal',
          'Foreign body removal',
          'Surgical exposure of impacted teeth in children',
          'Removal of supernumerary teeth',
          'Decoronation of ankylosed teeth'
        ]
      }
    ],
    philosophy: {
      title: 'A Patient-Centred Paediatric Philosophy',
      description: 'Dr. Hazem believes that paediatric dentistry goes far beyond treating teeth—it is about nurturing trust, reducing anxiety, and creating a positive dental experience from the very first visit. His calm, empathetic manner helps children feel safe and supported, while his expert communication style ensures parents remain informed and confident throughout every step of their child\'s care.',
      principles: [
        'Nurturing trust and reducing anxiety',
        'Creating a positive dental experience from the very first visit',
        'Calm, empathetic manner that helps children feel safe and supported',
        'Expert communication with parents',
        'Promoting lifelong oral health through exceptional paediatric dental care'
      ],
      quote: 'From early childhood visits to complex restorative and surgical procedures, Dr. Hazem is committed to promoting lifelong oral health through exceptional paediatric dental care rooted in precision, empathy, and excellence.'
    },
    clinicImages: [
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'dr-nasrin-badreldin',
    name: 'Dr. Nasrin Badreldin Mahgoub',
    title: 'Specialist Endodontist',
    specialty: 'Specialist Endodontist',
    image: drArwaImg,
    imageSide: drArwaSideImg,
    aboutImage: drArwaImg,
    description: 'Dr. Nasrin Badreldin Mahgoub is a passionate, patient-centred Endodontic Specialist with more than 15 years of clinical experience across Sudan, China, Egypt, and the UAE. Her practice is defined by precision, deep clinical insight, and mastery of advanced root canal therapies that restore comfort, function, and confidence to every patient she treats. With a reputation for delivering meticulous endodontic care using modern, evidence-based techniques, Dr. Nasrin provides exceptional treatment outcomes even in the most complex and challenging cases.',
    stats: [
      { label: 'Years of Experience', value: '15+' },
      { label: 'International Experience', value: 'Sudan, China, Egypt & UAE' }
    ],
    education: [
      {
        icon: '🎓',
        degree: 'Master\'s Degree in Endodontics',
        institution: 'Xi\'an Jiaotong University, China',
        year: ''
      },
      {
        icon: '🎓',
        degree: 'Bachelor of Dental Surgery (BDS)',
        institution: 'University of Science & Technology, Omdurman',
        year: ''
      },
      {
        icon: '🏆',
        degree: 'Specialised Certifications',
        institution: 'Advanced Endodontics, Implantology, Composite Restoration, Cosmetic Bleaching, Periodontal Surgery',
        year: ''
      },
      {
        icon: '📜',
        degree: 'Licensed Specialist',
        institution: 'Department of Health – Abu Dhabi (DOH)',
        year: ''
      }
    ],
    experience: null,
    expertise: [
      {
        category: 'Clinical Expertise',
        items: [
          'Advanced root canal therapy',
          'Retreatment of failed root canals',
          'Management of complex endodontic infections',
          'Treatment of traumatic dental injuries',
          'Aesthetic and functional restoration using high-precision techniques',
          'Collaboration with multidisciplinary teams in prosthodontics, periodontics, and orthodontics'
        ]
      }
    ],
    philosophy: {
      title: 'A Patient-Centred Philosophy',
      description: 'Dr. Nasrin believes that successful endodontic care extends beyond technical accuracy—it requires empathy, communication, and trust. She takes time to explain conditions and treatment options clearly, address patient concerns with understanding and patience, build confidence through transparency and reassurance, and tailor every treatment plan to the patient\'s needs and goals. Her warm, compassionate approach allows her to support patients throughout their healing journey and deliver outcomes that restore both oral health and peace of mind.',
      principles: [
        'Empathy, communication, and trust',
        'Clear explanation of conditions and treatment options',
        'Understanding and patience in addressing patient concerns',
        'Transparency and reassurance to build confidence',
        'Tailored treatment plans to patient\'s needs and goals'
      ],
      quote: 'Dr. Nasrin Badreldin Mahgoub continues to elevate endodontic care at Sky Dental Center through scientific excellence, clinical mastery, and an unwavering dedication to patient wellbeing.'
    },
    clinicImages: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'dr-kinan-mohammed',
    name: 'Dr. Kinan Mohammed Mohdi, DDS',
    title: 'General Dental Practitioner',
    specialty: 'General Dental Practitioner',
    image: drKinanImg,
    imageSide: drKinanSideImg,
    aboutImage: drKinanImg,
    description: 'With more than 15 years of dedicated clinical experience in general and prosthodontic dentistry, Dr. Kinan Mohammed Mohdi brings a distinguished level of expertise and an exceptional commitment to patient-focused care. His professional journey—beginning with the establishment of his own private clinic in Syria and extending into a longstanding career in the UAE—reflects a deep dedication to clinical excellence, continuous development, and restorative dentistry that restores both function and aesthetic confidence. Through his extensive international experience, Dr. Kinan has become known for his meticulous approach, advanced restorative skills, and his ability to manage complex dental cases with precision, artistry, and a compassionate patient-centred philosophy.',
    stats: [
      { label: 'Years of Experience', value: '15+' },
      { label: 'Sky Dental Center', value: '2015 – Present' },
      { label: 'Focus', value: 'General & Prosthodontic Dentistry' }
    ],
    education: [
      {
        icon: '🎓',
        degree: 'Doctor of Dental Surgery (DDS)',
        institution: 'University of Aleppo, Syria',
        year: '2007'
      },
      {
        icon: '🏆',
        degree: 'Fixed Prosthodontics Certificate',
        institution: 'University of Aleppo',
        year: '2008–2011'
      },
      {
        icon: '🏆',
        degree: 'Fixed Prosthodontics Certificate',
        institution: 'University of Damascus',
        year: '2011–2012'
      }
    ],
    experience: null,
    expertise: [
      {
        category: 'Comprehensive General Dentistry',
        items: [
          'Full oral examinations and personalised treatment planning',
          'Preventive care and patient education',
          'Restorative treatments, including fillings and decay management',
          'Prompt and effective emergency dental care',
          'Routine cleaning and periodontal maintenance'
        ]
      },
      {
        category: 'Advanced Prosthodontic Services',
        items: [
          'Crown and bridge design, fabrication, and placement',
          'Full-mouth rehabilitation for complex restorative needs',
          'Cosmetic veneers and smile enhancement',
          'Complete and partial denture solutions',
          'Implant-supported prosthetic restorations',
          'Precision restorations integrating aesthetics and function'
        ]
      },
      {
        category: 'Aesthetic & Functional Restoration',
        items: [
          'Comprehensive smile makeover treatments',
          'Tooth-coloured restorative solutions',
          'Bite correction and occlusal adjustment therapies'
        ]
      }
    ],
    philosophy: {
      title: 'A Decade of Excellence in the UAE',
      description: 'Since joining Sky Dental Center in 2015, Dr. Kinan has become an essential member of the medical team. His consistency, clinical excellence, and patient-first philosophy have earned him long-term trust within the community. His tenure reflects not only professional expertise but also a genuine commitment to serving patients with integrity, precision, and compassion.',
      principles: [
        'Consistency and clinical excellence',
        'Patient-first philosophy',
        'Long-term trust within the community',
        'Genuine commitment to serving patients',
        'Integrity, precision, and compassion'
      ],
      quote: 'Dr. Kinan Mohammed Mohdi welcomes new patients and looks forward to supporting them in achieving optimal dental health and a confident, beautiful smile.'
    },
    clinicImages: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'dr-mohanned-albasha',
    name: 'Dr. Mohanned Albasha',
    title: 'General Dental Practitioner',
    specialty: 'General Dental Practitioner',
    image: drMohanedImg,
    imageSide: drMohanedSideImg,
    aboutImage: drMohanedImg,
    description: 'Dr. Mohanned Albasha is a dedicated General Dentist who delivers high-quality, patient-centred dental care with precision, compassion, and a commitment to long-term oral health. With extensive experience across the full spectrum of general dentistry, he ensures that every patient receives personalised treatment tailored to their unique needs, whether for prevention, restoration, or urgent care. His approach is grounded in clinical excellence, evidence-based practice, and clear communication—providing patients with confidence and comfort throughout their dental journey.',
    stats: [
      { label: 'Specialist', value: 'General Dental Practitioner' },
      { label: 'Approach', value: 'Patient-Centred' },
      { label: 'Focus', value: 'Precision & Compassion' }
    ],
    education: [],
    experience: null,
    expertise: [
      {
        category: 'General Dentistry',
        items: [
          'Comprehensive oral examinations and development of personalised treatment plans',
          'Capture, processing, and interpretation of dental radiographs',
          'Immediate management of common dental emergencies',
          'Routine oral hygiene care, including professional scaling and polishing'
        ]
      },
      {
        category: 'Preventive Dentistry',
        items: [
          'Fluoride treatments and application of dental sealants',
          'Education on oral hygiene practices and preventive strategies'
        ]
      },
      {
        category: 'Restorative Dentistry',
        items: [
          'Direct restorations for decayed or damaged teeth',
          'Aesthetic fillings designed to restore function and natural appearance'
        ]
      },
      {
        category: 'Prosthodontics',
        items: [
          'Management of simple prosthodontic cases, including crowns and bridges',
          'Dentures and removable partial dentures (RPDs)',
          'Onlays, inlays, and veneers',
          'Restoration of functional and aesthetic balance through customised prosthetic solutions'
        ]
      }
    ],
    philosophy: {
      title: 'Patient-Centred Philosophy',
      description: 'Dr. Mohanned Albasha believes that exceptional dental care is built on trust, clarity, and comfort. He prioritises patient education, taking the time to explain treatment options and ensure individuals feel informed and relaxed throughout their care. With a gentle clinical approach and dedication to excellence, he strives to create positive dental experiences and long-lasting oral health outcomes for patients of all ages.',
      principles: [
        'Trust, clarity, and comfort',
        'Patient education and clear explanations',
        'Gentle clinical approach',
        'Dedication to excellence',
        'Positive dental experiences and long-lasting oral health outcomes'
      ],
      quote: 'Dr. Mohanned Albasha looks forward to welcoming new patients and supporting them in achieving healthy, confident, and beautiful smiles through high-quality general dentistry.'
    },
    clinicImages: [
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'dr-arwa-rashed',
    name: 'Dr. Arwa Rashed Almarshoodi',
    title: 'General Dental Practitioner',
    specialty: 'General Dental Practitioner',
    image: '/assets/images/doctor9.png',
    aboutImage: '/assets/images/doctor9.png',
    description: 'Dr. Arwa Rashed Almarshoodi is a distinguished Prosthodontic Specialist who transforms lives by restoring oral function, comfort, and aesthetics with exceptional precision. Through her advanced training and meticulous approach to comprehensive restorative care, she empowers patients to regain their confidence, rediscover their smiles, and achieve long-term oral health. Her clinical philosophy is grounded in the belief that every patient deserves a personalised, functional, and aesthetically harmonious smile—crafted through evidence-based practice and artistic attention to detail.',
    stats: [
      { label: 'Specialist', value: 'Prosthodontic Specialist' },
      { label: 'Residency', value: '3 Years (2021-2024)' },
      { label: 'Certifications', value: 'Triple Certification' }
    ],
    education: [
      {
        icon: '🎓',
        degree: 'Doctor of Dental Surgery (DDS)',
        institution: 'Ajman University of Science and Technology',
        year: '2017'
      },
      {
        icon: '📜',
        degree: 'Triple Certification',
        institution: 'Jordan Medical Council, Arab Board Certification, ACGME-I',
        year: '2024'
      },
      {
        icon: '🎓',
        degree: 'Three-Year Residency in Prosthodontics',
        institution: 'Ambulatory Health Services – Al Ain Dental Centre',
        year: '2021-2024'
      }
    ],
    experience: null,
    expertise: [
      {
        category: 'Preventive & Supportive Care',
        items: [
          'Professional cleaning and fluoride applications',
          'Sealants and preventive treatments',
          'Comprehensive patient education on oral hygiene and nutrition'
        ]
      },
      {
        category: 'Restorative Dentistry',
        items: [
          'Direct and indirect fillings',
          'Inlays and onlays',
          'Crowns, bridges, and post–core restorations',
          'Selection of ideal restorative materials based on functional and aesthetic needs'
        ]
      },
      {
        category: 'Fixed & Removable Prosthodontics',
        items: [
          'Implant–supported restorations',
          'Full and partial dentures',
          'Complex prosthodontic rehabilitation',
          'Restoring oral function and aesthetics with lifelike, durable prostheses'
        ]
      },
      {
        category: 'Aesthetic Excellence',
        items: [
          'Bespoke smile makeover planning',
          'Veneers crafted with artistic precision',
          'Professional teeth-whitening techniques',
          'Seamless blend of beauty with function'
        ]
      }
    ],
    philosophy: {
      title: 'Patient-Centred Philosophy',
      description: 'Dr. Arwa believes that exceptional prosthodontic care extends beyond technical skill—it requires empathy, collaboration, and a deep understanding of each patient\'s goals. She takes the time to listen carefully to patient concerns, explain treatment options clearly, develop personalised care plans, and provide supportive guidance throughout each stage of treatment. Her gentle manner, transparent communication, and commitment to patient comfort foster trust and long-lasting relationships.',
      principles: [
        'Empathy, collaboration, and deep understanding of patient goals',
        'Listen carefully to patient concerns',
        'Clear explanation of treatment options',
        'Personalised care plans',
        'Supportive guidance throughout each stage of treatment'
      ],
      quote: 'Whether restoring a single tooth or rehabilitating an entire smile, Dr. Arwa blends clinical mastery, artistic vision, and compassionate care to deliver transformative results.'
    },
    clinicImages: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'dr-reem-al-hammadi',
    name: 'Dr. Reem Al-Hammadi',
    title: 'General Dental Practitioner',
    specialty: 'General Dental Practitioner',
    image: drReemImg,
    imageSide: drReemSideImg,
    aboutImage: drReemImg,
    description: 'Dr. Reem Al-Hammadi is a highly committed general practice dentist who delivers comprehensive, patient-focused dental care grounded in precision, empathy, and evidence-based practice. With a solid academic foundation and extensive clinical exposure across leading healthcare institutions in Abu Dhabi, she has built a reputation as a trusted dental professional who blends technical excellence with genuine dedication to patient wellbeing. Her approach reflects the highest standards of modern dentistry—combining meticulous diagnostic skill, refined clinical techniques, and a warm, reassuring patient experience.',
    stats: [
      { label: 'Education', value: 'DMD, Gulf Medical University' },
      { label: 'Internship', value: 'Healthpoint Hospital, 2021' },
      { label: 'Registered', value: 'UAE Health Authority' }
    ],
    education: [
      {
        icon: '🎓',
        degree: 'Doctor of Dental Medicine (DMD)',
        institution: 'Gulf Medical University',
        year: '2019'
      },
      {
        icon: '🎓',
        degree: 'Clinical Internship',
        institution: 'Healthpoint Hospital',
        year: '2021'
      },
      {
        icon: '📜',
        degree: 'Licensed General Dentist',
        institution: 'UAE Health Authority',
        year: ''
      }
    ],
    experience: null,
    expertise: [
      {
        category: 'Diagnostic & Preventive Care',
        items: [
          'Comprehensive oral examinations and diagnostic evaluations',
          'Personalised treatment planning',
          'Preventive dentistry and oral hygiene education',
          'Prompt management of dental emergencies'
        ]
      },
      {
        category: 'Restorative Dentistry',
        items: [
          'Aesthetic and functional restorative treatments',
          'Tooth-coloured fillings and advanced reconstructions',
          'Simple endodontic procedures (root canal therapy)'
        ]
      },
      {
        category: 'Prosthodontics',
        items: [
          'Crown and bridge restorations',
          'Cosmetic veneers and smile enhancement',
          'Complete and partial dentures',
          'Full-mouth rehabilitation planning and coordination'
        ]
      },
      {
        category: 'Surgical & Periodontal Care',
        items: [
          'Non-surgical tooth extractions',
          'Non-surgical periodontal therapy',
          'Gum health maintenance and disease control'
        ]
      }
    ],
    philosophy: {
      title: 'Professional Philosophy',
      description: 'Dr. Reem believes that exceptional dentistry is built on more than clinical skill—it requires trust, transparency, and a deep understanding of each patient\'s concerns and goals. She strives to create a supportive environment where patients feel informed, valued, and confident in every step of their treatment journey.',
      principles: [
        'Trust, transparency, and deep understanding of patient concerns and goals',
        'Supportive environment for patients',
        'Patients feel informed, valued, and confident',
        'Highest standards of safety, accuracy, and patient care',
        'Technical excellence with genuine dedication to patient wellbeing'
      ],
      quote: 'Dr. Reem Al-Hammadi looks forward to welcoming new patients and partnering with them in achieving lasting oral health and confident, beautiful smiles.'
    },
    clinicImages: [
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop'
    ]
  }
]

export function getDoctorById(id: string): DoctorDetail | undefined {
  return doctorsData.find(doctor => doctor.id === id)
}
