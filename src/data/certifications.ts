import SpecialtiesStock from '@assets/images/certifications/specialties.jpg';

export interface Certification {
  short: string;
  slug: string;
  name: string;
  radius: number;
  angle: number;
  image: ImageMetadata;
  description: string;
}

export const certifications: Certification[] = [
  {
    short: 'OCS',
    slug: 'ocs',
    name: 'Orthopedic Clinical Specialist',
    angle: 0,
    radius: 290,
    image: SpecialtiesStock,
    description: `A prestigious board certification representing advanced expertise in orthopedic
     physical therapy and one of the highest levels of specialization a physical therapist can
      achieve. This training reflects a deep understanding of complex injuries, movement mechanics,
       and evidence-based treatment strategies to help patients recover and return to the activities
        they love`,
  },
  {
    short: 'TPS',
    slug: 'tps',
    name: 'Therapeutic Pain Specialist',
    angle: 60,
    radius: 330,
    image: SpecialtiesStock,
    description: `Advanced training focused on understanding persistent pain through a comprehensive 
    approach that combines modern pain science, movement, and individualized treatment strategies.`,
  },
  {
    short: 'CSCS',
    slug: 'cscs',
    name: 'Certified Strength and Conditioning Specialist',
    angle: 120,
    radius: 330,
    image: SpecialtiesStock,
    description: `A nationally recognized certification in strength and performance training, 
    allowing Dr. Elie to create evidence-based programs that help patients build resilience, 
    improve performance, and prevent future injuries.`,
  },
  {
    short: 'TPI 3',
    slug: 'tpi',
    name: 'Titleist Performance Institute Medical Level 3',
    angle: 180,
    radius: 290,
    image: SpecialtiesStock,
    description: `
    The highest level of TPI Medical certification, representing advanced expertise in golf-specific
     movement assessment, injury prevention, and performance optimization. This is focused on
      identifying how the body influences the golf swing, helping golfers improve movement
       efficiency, reduce injury risk, and return to the course with confidence.
    `,
  },
  {
    short: 'Barre',
    name: 'Pure Barre Instructor',
    slug: 'barre',
    angle: 240,
    radius: 330,
    image: SpecialtiesStock,
    description: `Specialized training in barre-based movement, emphasizing strength, mobility,
       posture, and body awareness to help patients improve control, endurance, and overall movement quality`,
  },
  {
    short: 'DN',
    name: 'Dry Needling Certification',
    slug: 'dn',
    angle: 300,
    radius: 330,
    image: SpecialtiesStock,
    description: `Advanced training in the use of dry needling as part of a comprehensive physical therapy
       approach to address muscle tension, trigger points, and movement limitations. 
       When clinically appropriate, Dr. Elie incorporates dry needling alongside hands-on therapy
        and targeted exercise to help reduce pain, improve mobility, and support optimal movement.`,
  },
];
