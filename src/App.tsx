import { Routes, Route, useLocation } from 'react-router'
import { Navigation } from '@/components/Navigation'
import { Home } from '@/routes/Home'
import { Project } from '@/routes/Project'

export function App() {
  const location = useLocation()
  const isProjectPage = location.pathname.startsWith('/projet/')

  return (
    <>
      {!isProjectPage && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projet/:slug" element={<Project />} />
      </Routes>
    </>
  )
}
