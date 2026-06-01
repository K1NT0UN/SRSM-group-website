export type ProjectStatus = 'ONGOING' | 'COMPLETED' | 'PIPELINE'
export type ProjectType = 'Residential' | 'Commercial' | 'RE & Comm' | 'Integrated Township — Villas'

export interface Project {
  company: string
  name: string
  location: string
  status: ProjectStatus
  type: ProjectType | string
  description?: string
  targetCompletion?: string
  slug?: string
  brochure?: string
  image?: string
}

export const currentProjects: Project[] = [
  {
    company: 'SR Builders and Developers',
    name: 'Nisarga',
    location: 'Kollur, Hyderabad',
    status: 'ONGOING',
    type: 'Integrated Township — Villas',
    description:
      'A landmark gated township offering premium 4 & 5 BHK forestscape villas on 17+ acres in Kollur, one of Hyderabad\'s fastest-growing corridors. 50+ amenities, 2 exclusive clubhouses. RERA: PO22000007723.',
    targetCompletion: 'End of 2028',
    slug: 'nisarga',
  },
  {
    company: 'SRSM Group',
    name: 'Nagole Villas',
    location: 'Nagole, Hyderabad',
    status: 'ONGOING',
    type: 'Residential',
    description: '~10 acres of residential villa development in Nagole, Hyderabad.',
  },
  {
    company: 'SRSM Group',
    name: 'Medchal Commercial',
    location: 'Medchal, Hyderabad',
    status: 'ONGOING',
    type: 'Commercial',
    description: '~1+ acre commercial development in Medchal, one of Hyderabad\'s fastest-growing corridors.',
  },
]

export const pipelineProjects: Project[] = [
  {
    company: 'SR Builders and Developers',
    name: 'Highrise Apartments',
    location: 'Kollur, Hyderabad',
    status: 'PIPELINE',
    type: 'Residential',
    description:
      'A premium high-rise residential development within the Nisarga township — Hyderabad\'s fastest-growing corridor. Designed for modern urban living with shared access to Nisarga township infrastructure, proximity to Pharma City, Metro Phase-2, and major IT hubs.',
    targetCompletion: 'End of 2030',
  },
  {
    company: 'SRSM Group',
    name: 'Borampet Villas',
    location: 'Borampet, Hyderabad',
    status: 'PIPELINE',
    type: 'Residential',
    description: '~30 acres of residential villa development.',
  },
  {
    company: 'SRSM Group',
    name: 'Bashirbag Commercial',
    location: 'Bashirbag, Hyderabad',
    status: 'PIPELINE',
    type: 'Commercial',
    description: '60,000 sq ft constructed area on 0.5 acres.',
  },
  {
    company: 'SRSM Group',
    name: 'Chandanagar Commercial',
    location: 'Chandanagar, Hyderabad',
    status: 'PIPELINE',
    type: 'Commercial',
    description: '30,000 sq ft commercial space on 1,200 sq yards.',
  },
  {
    company: 'SRSM Group',
    name: 'Lingampally Residences',
    location: 'Lingampally (opp. Railway Station), Hyderabad',
    status: 'PIPELINE',
    type: 'Residential',
    description: '120 residential flats on 6,000 sq yards, opposite Lingampally Railway Station.',
  },
]

export const completedProjects: Project[] = [
  { company: 'SR Builders and Developers', name: "MSR's Serene City", location: 'Miyapur', status: 'COMPLETED', type: 'Residential' },
  { company: 'SM Builders', name: 'SM Classic', location: 'Kondapur', status: 'COMPLETED', type: 'Residential' },
  { company: 'SM Builders', name: 'SM Sapphire', location: 'Chandanagar', status: 'COMPLETED', type: 'RE & Comm' },
  { company: 'SM Builders', name: 'SM Srinivasa Nilayam', location: 'Madeenaguda', status: 'COMPLETED', type: 'Residential' },
  { company: 'SM Builders', name: 'SM Plaza', location: 'Miyapur', status: 'COMPLETED', type: 'Commercial' },
  { company: 'SM Builders and Developers', name: 'SM Classe', location: 'Chandanagar', status: 'COMPLETED', type: 'Residential' },
  { company: 'SM Projects', name: 'Rajeshwari Residency', location: 'Bachupally', status: 'COMPLETED', type: 'Residential' },
  { company: 'SM Projects', name: 'SM Pride', location: 'Nacharam', status: 'COMPLETED', type: 'Residential' },
  { company: 'SM Projects', name: 'SM Fortunate', location: 'A.S. Rao Nagar', status: 'COMPLETED', type: 'Residential' },
  { company: 'SM Projects', name: 'SM Vally', location: 'ECIL', status: 'COMPLETED', type: 'Residential' },
  { company: 'SM Projects', name: 'SM Plaza', location: 'A.S. Rao Nagar', status: 'COMPLETED', type: 'RE & Comm' },
  { company: 'SM Projects', name: 'SM Elegance', location: 'Vizag', status: 'COMPLETED', type: 'Residential' },
  { company: 'SM Constructions', name: 'SM Arcade', location: 'Chandanagar', status: 'COMPLETED', type: 'Residential' },
  { company: 'SM Constructions', name: 'SM Royal', location: 'Chandanagar', status: 'COMPLETED', type: 'RE & Comm' },
  { company: 'SM Constructions', name: 'SM Sai Hills', location: 'Manikonda', status: 'COMPLETED', type: 'Residential' },
  { company: 'SM Constructions', name: 'SM Central', location: 'Manikonda', status: 'COMPLETED', type: 'Commercial' },
  { company: 'SM Constructions', name: 'Crystal Habitat', location: 'Manikonda', status: 'COMPLETED', type: 'RE & Comm' },
  { company: 'SM Constructions', name: 'Madhavi Classic', location: 'Manikonda', status: 'COMPLETED', type: 'Residential' },
  { company: 'SM Constructions', name: 'Madhavi Nest', location: 'Manikonda', status: 'COMPLETED', type: 'Residential' },
  { company: 'SM Constructions', name: 'Sai Chidvilas', location: 'Manikonda', status: 'COMPLETED', type: 'Residential' },
  { company: 'SM Constructions', name: 'Madhavi Enclave', location: 'Manikonda', status: 'COMPLETED', type: 'Residential' },
  { company: 'SM Constructions', name: 'Madhavi Residency', location: 'Manikonda', status: 'COMPLETED', type: 'Residential' },
  { company: 'SM Constructions', name: 'Madhavi Medows', location: 'Manikonda', status: 'COMPLETED', type: 'Residential' },
  { company: 'SM Infra Developers', name: 'SM Platina', location: 'Bangalore', status: 'COMPLETED', type: 'Residential' },
]
