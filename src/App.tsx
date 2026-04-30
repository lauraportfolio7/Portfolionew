import { Routes, Route, useLocation } from 'react-router'
import { Navigation } from '@/components/Navigation'
import { Home } from '@/routes/Home'
import { HomeV2 } from '@/routes/HomeV2'

export function App() {
  const location = useLocation()
  const isV2 = location.pathname.startsWith('/nouveau')

  return (
    <>
      {!isV2 && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nouveau" element={<HomeV2 />} />
      </Routes>
    </>
  )
}
