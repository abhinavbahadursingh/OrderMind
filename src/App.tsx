import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { ThemeProvider } from './lib/theme'
import { Home } from './pages/Home'
import { HowItWorks } from './pages/HowItWorks'
import { Features } from './pages/Features'
import { Dashboard } from './pages/Dashboard'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Stats } from './pages/Stats'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

function Shell() {
  const location = useLocation()
  const isStats = location.pathname === '/stats'

  return (
    <div className={`app${isStats ? ' app--stats' : ''}`}>
      <ScrollToTop />
      {!isStats && (
        <a className="skip-link" href="#main">
          Skip to content
        </a>
      )}
      {!isStats && <Navbar />}
      <main id="main" className="app__main">
        <div className="route-shell" key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/features" element={<Features />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </main>
      {!isStats && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </ThemeProvider>
  )
}
