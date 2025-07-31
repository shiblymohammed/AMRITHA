import { Routes, Route } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Home from '../pages/Home'
import About from '../pages/About'
import NotFound from '../pages/NotFound'

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
      </Route>
      {/* 404 route - outside Layout to have full screen control */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRouter