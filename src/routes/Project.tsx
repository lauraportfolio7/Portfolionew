import { useNavigate, useParams, Link } from 'react-router'
import { useEffect } from 'react'
import { ProjectView } from '@/components/ProjectView'
import { featuredProjects, otherProjects } from '@/data/projects'
import { Cursor } from '@/components/Cursor'

const allProjects = [...featuredProjects, ...otherProjects]

export function Project() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const project = allProjects.find((p) => p.id === slug)

  useEffect(() => {
    if (!project) return
    document.title = `${project.title} — Laura Cerveaux`
    return () => {
      document.title = 'Laura Cerveaux'
    }
  }, [project])

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-ivory text-night px-6 text-center">
        <Cursor />
        <h1
          className="text-3xl md:text-4xl mb-4"
          style={{ fontFamily: 'var(--font-serif)', fontWeight: 700 }}
        >
          Projet introuvable
        </h1>
        <p className="text-text-muted mb-8 max-w-md">
          Le projet que tu cherches n'existe pas ou a été déplacé.
        </p>
        <Link
          to="/#projets"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-night text-ivory text-[12px] uppercase tracking-[0.25em] hover:bg-accent hover:text-night transition-colors"
          style={{ fontWeight: 600 }}
        >
          Retour aux projets
        </Link>
      </div>
    )
  }

  return (
    <>
      <Cursor />
      <ProjectView
        project={project}
        onBack={() => {
          if (window.history.length > 1) {
            navigate(-1)
          } else {
            navigate('/#projets')
          }
        }}
      />
    </>
  )
}
