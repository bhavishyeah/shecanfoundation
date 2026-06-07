import { useState } from 'react'
import { ArrowRight, HeartHandshake } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { useTheme } from '../context/ThemeContext'


export default function HeroIntroCard() {
  const [transform, setTransform] = useState(
    'perspective(1400px) rotateX(0deg) rotateY(0deg) scale(1)'
  )
  const [glow, setGlow] = useState(
  '0 24px 60px rgba(255, 255, 255, 0.08), 0 6px 18px rgba(255, 255, 255, 0.04)'
) 
const { dark } = useTheme()
  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateY = ((x - centerX) / centerX) * 3
    const rotateX = ((centerY - y) / centerY) * 2.5
    setTransform(`perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.012)`)
    const glowX = ((x - centerX) / centerX) * 20
    const glowY = ((y - centerY) / centerY) * 20
const [glow, setGlow] = useState(
  '0 24px 60px rgba(255, 255, 255, 0.08), 0 6px 18px rgba(255, 255, 255, 0.04)'
)  }

  const handleMouseLeave = () => {
    setTransform('perspective(1400px) rotateX(0deg) rotateY(0deg) scale(1)')
const [glow, setGlow] = useState(
  '0 24px 60px rgba(255, 255, 255, 0.08), 0 6px 18px rgba(255, 255, 255, 0.04)'
)  }
 const { ref: sectionRef, inView } = useInView({
    threshold: 0.2,      // fires when 20% of the section is visible
    triggerOnce: true,   // pop-in only once, not every time user scrolls back
  })
  return (
    <section       ref={sectionRef}          // 👈 attach observer to the section
      className="section-padding overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      <div className="container-wide">

        {/* Relative wrapper — anchors the decorative images to the card */}
        <div className="relative mx-auto max-w-5xl">

          {/* 🟤 Brown heart — bottom-left, peeking behind */}
          
          <img
  src={dark ? '/creme.png' : '/brwn.png'}
  alt=""
  aria-hidden="true"
  className={`absolute pointer-events-none select-none hero-heart-brwn ${inView ? 'heart-visible' : 'heart-hidden'}`}
  style={{ zIndex: 0, opacity: 0.92 }}
/>
          {/* Orange heart */}
          <img
            src="/orng.png"
            alt=""
            aria-hidden="true"
            className={`absolute pointer-events-none select-none hero-heart-orng ${inView ? 'heart-visible' : 'heart-hidden'}`}
            style={{ zIndex: 0, opacity: 0.95 }}
          />

          {/* Card — sits above the decorative images via z-index: 1 */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative rounded-[32px] px-5 py-8 md:px-10 md:py-11 text-center transition-transform duration-200 ease-out will-change-transform"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              transform,
              boxShadow: glow,
              transformStyle: 'preserve-3d',
              zIndex: 1,
            }}
          >
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] mb-6"
              style={{ background: 'rgba(255,89,44,0.10)', color: '#FF592C', transform: 'translateZ(30px)' }}
            >
              Together We Can Change
            </span>

            <h1
              className="font-display text-4xl md:text-6xl lg:text-[72px] font-semibold leading-none mb-5"
              style={{ color: 'var(--color-text)', transform: 'translateZ(45px)' }}
            >
              Empowering women{' '}
              <span style={{ color: '#FF592C' }}>with dignity.</span>
            </h1>

            <p
              className="mx-auto mb-8 max-w-3xl text-base md:text-xl"
              style={{ color: 'var(--color-text-muted)', transform: 'translateZ(30px)' }}
            >
              She Can Foundation is dedicated to creating a more equitable society by
              supporting women through resources, training, advocacy, and community action.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4" style={{ transform: 'translateZ(40px)' }}>
              <a href="#volunteer" className="btn-primary btn-animated group">
                <span className="btn-icon btn-icon-heart"><HeartHandshake size={16} /></span>
                <span className="btn-label">Join Us</span>
              </a>
              <a href="#about" className="btn-secondary btn-animated group">
                <span className="btn-label">Learn More</span>
                <span className="btn-icon btn-icon-arrow"><ArrowRight size={16} /></span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}