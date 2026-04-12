import { Routes, Route } from 'react-router'
import { Navigation } from '@/components/Navigation'
import { Home } from '@/routes/Home'

export function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}
