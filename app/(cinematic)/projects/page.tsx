import type { Metadata } from 'next'
import ProjectsContent from '@/components/cinematic/ProjectsContent'

export const metadata: Metadata = {
  title: 'Projects | SRSM Group',
  description:
    '24+ delivered projects across Hyderabad, Vizag and Bangalore, three under construction — led by Nisarga, a 17+ acre forestscape villa township in Kollur — and a growing pipeline.',
  alternates: { canonical: '/projects' },
}

export default function ProjectsPage() {
  return <ProjectsContent />
}
