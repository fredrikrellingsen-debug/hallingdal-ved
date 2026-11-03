import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Vedlager from './pages/Vedlager.jsx'
import Makarlaget from './pages/Makarlaget.jsx'
import Bestilling from './pages/Bestilling.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/vedlager" element={<Vedlager />} />
        <Route path="/makarlaget" element={<Makarlaget />} />
        <Route path="/bestilling" element={<Bestilling />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
