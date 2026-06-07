import { useEffect, useRef, useState } from 'react'
import { Menu, X, Moon, Sun, HeartHandshake, HandCoins } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import sheCanLogo from '../assets/shecanlogo.webp'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const sectionLinks = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Programs', id: 'programs' },
  { name: 'Impact', id: 'impact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [compact, setCompact] = useState(false)
  const [expandedFromPill, setExpandedFromPill] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const collapseTimerRef = useRef(null)

  const { dark, toggle } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  const isInnerLightPage =
  location.pathname === '/donate' || location.pathname === '/volunteer'

 useEffect(() => {
  const COMPACT_SCROLL_Y = 1000

  const clearCollapseTimer = () => {
    if (collapseTimerRef.current) {
      clearTimeout(collapseTimerRef.current)
      collapseTimerRef.current = null
    }
  }

  const startCollapseTimer = () => {
    clearCollapseTimer()

    collapseTimerRef.current = setTimeout(() => {
      if (window.scrollY >= COMPACT_SCROLL_Y) {
        setExpandedFromPill(false)
        setCompact(true)
        setMobileOpen(false)
      }
    }, 5000)
  }

  const onScroll = () => {
    const currentY = window.scrollY
    const isScrolled = currentY > 28
    const shouldCompact = currentY >= COMPACT_SCROLL_Y

    setScrolled(isScrolled)

    if (currentY < 120) {
      clearCollapseTimer()
      setCompact(false)
      setExpandedFromPill(false)
      setMobileOpen(false)
      return
    }

    if (!shouldCompact) {
      clearCollapseTimer()
      setCompact(false)
      if (!expandedFromPill) {
        setExpandedFromPill(false)
      }
      return
    }

    if (shouldCompact && !expandedFromPill) {
      setCompact(true)
      clearCollapseTimer()
      return
    }

    if (shouldCompact && expandedFromPill) {
      setCompact(false)
      startCollapseTimer()
    }
  }

  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  return () => {
    clearCollapseTimer()
    window.removeEventListener('scroll', onScroll)
  }
}, [expandedFromPill])

  const smoothScrollToSection = (id) => {
    const el = document.getElementById(id)
    if (!el) return

    const offset = compact && !expandedFromPill ? 92 : 112
    const top = el.getBoundingClientRect().top + window.scrollY - offset

    window.scrollTo({
      top,
      behavior: 'smooth',
    })
  }

  const goToSection = (id) => {
    setMobileOpen(false)

    if (location.pathname === '/') {
      smoothScrollToSection(id)
      return
    }

    navigate('/', { state: { scrollTo: id } })
  }

  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo) {
      const id = location.state.scrollTo
      const timer = setTimeout(() => {
        smoothScrollToSection(id)
        navigate(location.pathname, { replace: true, state: {} })
      }, 80)

      return () => clearTimeout(timer)
    }
  }, [location, navigate, compact, expandedFromPill])

  const topTextColor = '#ffffff'
const innerPageTextColor = dark ? '#ffffff' : '#1f1a17'
const scrolledTextColor = dark ? '#ffffff' : '#2d221d'

const activeTextColor = isInnerLightPage
  ? innerPageTextColor
  : !scrolled
  ? topTextColor
  : scrolledTextColor

  const showFullNavbar = !compact || expandedFromPill
  const isCompactOnly = compact && !expandedFromPill

  return (
    <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <div className="container-wide pt-5 md:pt-6">
        <div className="flex justify-center md:justify-start">
          <div
            className={`navbar-shell ${
            showFullNavbar ? 'navbar-shell-full' : 'navbar-shell-compact'
          } ${scrolled || isInnerLightPage ? 'navbar-shell-scrolled' : ''}`}
          >
            <div className="navbar-shell-blur" />

            {isCompactOnly ? (
              <button
              type="button"
              onClick={() => {
                setExpandedFromPill(true)
                setCompact(false)
                setMobileOpen(false)
              }}
              className="navbar-compact-trigger"
              aria-label="Expand navigation"
            >
              <img
                src={sheCanLogo}
                alt="She Can Foundation logo"
                className="navbar-logo-img"
              />
            </button>
            ) : (
              <>
                <div className="navbar-pill-brand-wrap">
                  <button
                    type="button"
                    onClick={() => goToSection('home')}
                    className="navbar-brand-btn navbar-brand-btn-full"
                  >
                    <img
                      src={sheCanLogo}
                      alt="She Can Foundation logo"
                      className="navbar-logo-img"
                    />

                    <div className="navbar-brand-copy navbar-brand-copy-visible">
                    <div
                      className={`navbar-brand-title ${
                        isInnerLightPage
                          ? 'navbar-brand-title-scrolled'
                          : !scrolled
                          ? 'navbar-brand-title-top'
                          : 'navbar-brand-title-scrolled'
                      }`}
                    >              
                        <span className="brand-she">She</span>
                        <span className="brand-can">Can !</span>
                        <span className="brand-foundation">Foundation</span>
                      </div>
                    </div>
                  </button>
                </div>

                <div className="navbar-reveal">
                  <nav className="hidden items-center navbar-links-row md:flex">
                    {sectionLinks.map((link) => (
                      <button
                        key={link.name}
                        type="button"
                        onClick={() => goToSection(link.id)}
                        className="navbar-link"
                        style={{ color: activeTextColor }}
                      >
                        {link.name}
                      </button>
                    ))}

                    <Link
                      to="/volunteer"
                      className="navbar-link"
                      style={{ color: activeTextColor }}
                    >
                      Volunteer
                    </Link>
                  </nav>

                  <div className="hidden items-center gap-2.5 md:flex">
                      <button
                      onClick={toggle}
                      className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300"
                      style={{
                          borderColor: isInnerLightPage
                            ? dark
                              ? 'rgba(255,255,255,0.18)'
                              : 'rgba(47,35,31,0.14)'
                            : !scrolled
                            ? 'rgba(255,255,255,0.36)'
                            : dark
                            ? 'rgba(255,255,255,0.18)'
                            : 'rgba(47,35,31,0.14)',
                          background: isInnerLightPage
                            ? dark
                              ? 'rgba(255,255,255,0.08)'
                              : 'rgba(255,255,255,0.28)'
                            : !scrolled
                            ? 'rgba(255,255,255,0.08)'
                            : dark
                            ? 'rgba(255,255,255,0.08)'
                            : 'rgba(255,255,255,0.28)',
                          color: activeTextColor,
                        }}
                      aria-label="Toggle theme"
                    >
                      {dark ? <Sun size={17} /> : <Moon size={17} />}
                    </button>

                    <Link
                      to="/donate"
                      className="navbar-pill-btn navbar-pill-secondary"
                      style={{
                        color: isInnerLightPage ? activeTextColor : !scrolled ? '#ffffff' : activeTextColor,
                        borderColor: isInnerLightPage ? 'currentColor' : !scrolled ? '#ffffff' : 'currentColor',
                      }}
                    >
                      <HandCoins size={16} />
                      <span>Donate</span>
                    </Link>

                    <Link to="/volunteer" className="navbar-pill-btn navbar-pill-primary">
                      <HeartHandshake size={16} />
                      <span>Join Us</span>
                    </Link>
                  </div>

                  <button
                    className="md:hidden"
                    onClick={() => setMobileOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                    style={{ color: activeTextColor }}
                  >
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {mobileOpen && showFullNavbar && (
          <div
            className="mx-1 mt-3 rounded-[28px] border p-5 shadow-lg md:hidden"
            style={{
              background: dark ? 'rgba(58, 41, 33, 0.72)' : 'rgba(255,255,255,0.38)',
              borderColor: dark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.24)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            <div className="flex flex-col gap-4">
              {sectionLinks.map((link) => (
                <button
                  key={link.name}
                  type="button"
                  onClick={() => goToSection(link.id)}
                  className="text-left text-sm font-medium"
                  style={{ color: dark ? '#fff' : 'var(--color-text)' }}
                >
                  {link.name}
                </button>
              ))}

              <Link
                to="/volunteer"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium"
                style={{ color: dark ? '#fff' : 'var(--color-text)' }}
              >
                Volunteer
              </Link>

              <Link
                to="/donate"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium"
                style={{ color: dark ? '#fff' : 'var(--color-text)' }}
              >
                Donate
              </Link>

              <div className="mt-2 flex gap-3">
                <button
                  onClick={toggle}
                  className="flex h-11 w-11 items-center justify-center rounded-full border"
                  style={{
                    borderColor: dark ? 'rgba(255,255,255,0.12)' : 'rgba(47,35,31,0.12)',
                    background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.55)',
                    color: dark ? '#fff' : 'var(--color-text)',
                  }}
                >
                  {dark ? <Sun size={17} /> : <Moon size={17} />}
                </button>

                <Link
                  to="/donate"
                  onClick={() => setMobileOpen(false)}
                  className="navbar-pill-btn navbar-pill-secondary flex-1 justify-center"
                  style={{
                    color: dark ? '#fff' : 'var(--color-text)',
                    borderColor: dark ? 'rgba(255,255,255,0.18)' : 'rgba(47,35,31,0.14)',
                  }}
                >
                  Donate
                </Link>

                <Link
                  to="/volunteer"
                  onClick={() => setMobileOpen(false)}
                  className="navbar-pill-btn navbar-pill-primary flex-1 justify-center"
                >
                  Join Us
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}