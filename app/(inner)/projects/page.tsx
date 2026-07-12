import FadeInView from '@/components/FadeInView'
import ProjectsTabs from '@/components/ProjectsTabs'
import { currentProjects, pipelineProjects, completedProjects } from '@/lib/projects'

export default function ProjectsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-forest pt-36 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInView>
            <p className="text-xs tracking-[0.5em] uppercase text-gold mb-4">Our Portfolio</p>
            <h1 className="font-serif text-5xl md:text-7xl text-parchment leading-tight">
              Every Project, <span className="font-light text-gold">a Legacy</span>
            </h1>
            <p className="text-parchment/60 mt-6 text-base max-w-xl mx-auto leading-relaxed">
              From Hyderabad to Vizag to Bangalore — 24+ delivered projects across residential and
              commercial segments, and a pipeline that keeps growing.
            </p>
          </FadeInView>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-gold py-8 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '3', label: 'Ongoing' },
            { value: '5', label: 'Pipeline' },
            { value: '24+', label: 'Completed' },
            { value: '3', label: 'Cities' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="font-serif text-3xl text-forest font-bold">{value}</p>
              <p className="text-xs tracking-widest uppercase text-forest/70">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tabs + Content */}
      <section className="bg-parchment py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <ProjectsTabs
            current={currentProjects}
            pipeline={pipelineProjects}
            completed={completedProjects}
          />
        </div>
      </section>
    </>
  )
}
