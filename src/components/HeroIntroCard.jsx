import { useState } from 'react'
import { ArrowRight, HeartHandshake } from 'lucide-react'

export default function HeroIntroCard() {
  const [transform, setTransform] = useState(
    'perspective(1400px) rotateX(0deg) rotateY(0deg) scale(1)'
  )
  const [glow, setGlow] = useState(
    '0 24px 60px rgba(255, 89, 44, 0.10), 0 6px 18px rgba(255, 89, 44, 0.06)'
  )

  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateY = ((x - centerX) / centerX) * 3
    const rotateX = ((centerY - y) / centerY) * 2.5

    setTransform(
      `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.012)`
    )

    const glowX = ((x - centerX) / centerX) * 20
    const glowY = ((y - centerY) / centerY) * 20

    setGlow(
      `${glowX}px ${glowY + 30}px 80px rgba(255, 89, 44, 0.18),
       0 12px 28px rgba(255, 89, 44, 0.05)`
    )
  }

  const handleMouseLeave = () => {
    setTransform('perspective(1400px) rotateX(0deg) rotateY(0deg) scale(1)')
    setGlow('0 24px 60px rgba(255, 89, 44, 0.10), 0 6px 18px rgba(255, 89, 44, 0.06)')
  }

  return (
    <section
      className="section-padding"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="container-wide">
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="mx-auto max-w-5xl rounded-[32px] px-6 py-10 md:px-12 md:py-14 text-center transition-transform duration-200 ease-out will-change-transform"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            transform,
            boxShadow: glow,
            transformStyle: 'preserve-3d',
          }}
        >
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] mb-6"
            style={{
              background: 'rgba(255,89,44,0.10)',
              color: '#FF592C',
              transform: 'translateZ(30px)',
            }}
          >
            Together We Can Change
          </span>

          <h1
            className="font-display text-5xl md:text-7xl lg:text-[84px] font-semibold leading-none mb-5"
            style={{
              color: 'var(--color-text)',
              transform: 'translateZ(45px)',
            }}
          >
            Empowering women{' '}
            <span style={{ color: '#FF592C' }}>with dignity.</span>
          </h1>

          <p
            className="mx-auto mb-8 max-w-3xl text-base md:text-xl"
            style={{
              color: 'var(--color-text-muted)',
              transform: 'translateZ(30px)',
            }}
          >
            She Can Foundation is dedicated to creating a more equitable society by
            supporting women through resources, training, advocacy, and community action.
          </p>

          <div
          className="flex flex-wrap items-center justify-center gap-4"
          style={{ transform: 'translateZ(40px)' }}
        >
          <a href="#volunteer" className="btn-primary btn-animated group">
            <span className="btn-icon btn-icon-heart">
              <HeartHandshake size={16} />
            </span>
            <span className="btn-label">Join Us</span>
          </a>

          <a href="#about" className="btn-secondary btn-animated group">
            <span className="btn-label">Learn More</span>
            <span className="btn-icon btn-icon-arrow">
              <ArrowRight size={16} />
            </span>
          </a>
        </div>
                </div>
              </div>
            </section>
          )
        }