import { useEffect, useRef, useState } from 'react'
import { Users, BookOpen, Heart, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

// Marquee images — using your existing program photos
import prgm1 from '../assets/prgm1.webp'
import prgm2 from '../assets/prgm2.webp'
import prgm3 from '../assets/prgm3.webp'
import prgm4 from '../assets/prgm4.webp'
import prgm5 from '../assets/prgm5.webp'
import prgm6 from '../assets/prgm6.webp'

const stats = [
  { icon: Users,     value: 12000, suffix: '+', label: 'Women Empowered' },
  { icon: BookOpen,  value: 48,    suffix: '',  label: 'Programs Run'    },
  { icon: Heart,     value: 200,   suffix: '+', label: 'Volunteers'      },
  { icon: MapPin,    value: 18,    suffix: '',  label: 'Districts Covered'},
]

const marqueeImages = [prgm1, prgm2, prgm3, prgm4, prgm5, prgm6]

// Warm phrase separators between images
const phrases = [
  '✦ Strength in Sisterhood',
  '✦ 12,000+ Lives Changed',
  '✦ Community First',
  '✦ She Can. She Will.',
  '✦ Rooted in Dignity',
  '✦ Empowered Together',
]

function CountUp({ end, suffix = '', duration = 1800, start }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTimestamp = null
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(end)
    }
    requestAnimationFrame(step)
  }, [end, duration, start])
  return <>{count.toLocaleString()}{suffix}</>
}

const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function ImpactStats() {
  const sectionRef = useRef(null)
  const [startCount, setStartCount] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStartCount(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* ── TOP MARQUEE BANNER ─────────────────────────────── */}
      <div className="relative w-full overflow-hidden py-3" style={{ background: 'var(--color-surface-offset, #f3ede4)' }}>
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
          style={{ background: 'linear-gradient(to right, var(--color-surface-offset, #f3ede4), transparent)' }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
          style={{ background: 'linear-gradient(to left, var(--color-surface-offset, #f3ede4), transparent)' }} />

        <div className="marquee-track flex gap-6 w-max">
          {[...marqueeImages, ...marqueeImages].map((src, i) => (
            <div key={i} className="flex items-center gap-6 flex-shrink-0">
              <div className="overflow-hidden rounded-2xl flex-shrink-0"
                style={{ width: 180, height: 110, border: '1.5px solid var(--color-border)' }}>
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  width={180}
                  height={110}
                  className="w-full h-full object-cover"
                  style={{ transition: 'transform 0.4s ease' }}
                />
              </div>
              <span
                className="flex-shrink-0 text-xs font-semibold uppercase tracking-[0.18em] whitespace-nowrap"
                style={{ color: '#C06A35' }}
              >
                {phrases[i % phrases.length]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN SECTION ───────────────────────────────────── */}
      <div className="pt-8 pb-0">
        <div className="container-wide">

          {/* Header */}
          <div className="mb-7 text-center">
            <span className="section-tag mb-5">Our Impact</span>
            <h2
              className="text-5xl md:text-7xl font-semibold leading-none"
              style={{ color: 'var(--color-text)' }}
            >
              Numbers that tell{' '}
              <span style={{ color: '#FF592C' }}>our story.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base md:text-lg"
              style={{ color: 'var(--color-text-muted)' }}>
              Every number here is a woman supported, a community strengthened,
              a life transformed with care.
            </p>
          </div>

          {/* Stat Cards */}
          <motion.div
            className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {stats.map(({ icon: Icon, value, suffix, label }, i) => {
  const accentColors = ['#FF592C', '#C06A35', '#8B5A3C', '#FF592C']
  const accent = accentColors[i]

  return (
    <motion.div
      key={label}
      variants={cardVariants}
      className="flex flex-col items-center text-center gap-3 py-6"
    >
      {/* Icon */}
      <Icon size={38} strokeWidth={1.6} style={{ color: accent }} />

      {/* Number */}
      <div
        className="leading-none tabular-nums"
        style={{
          fontSize: 'clamp(2.6rem, 4vw, 3.4rem)',
          color: 'var(--color-text)',
          fontFamily: 'Agrandir Grand, sans-serif',
        }}
      >
        <CountUp end={value} suffix={suffix} start={startCount} />
      </div>

      {/* Label */}
      <p
        className="text-sm font-semibold uppercase tracking-[0.14em]"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {label}
      </p>
    </motion.div>
  )
})}
          </motion.div>

        </div>
      </div>

      {/* ── BOTTOM MARQUEE (reverse direction) ─────────────── */}
      <div className="relative w-full overflow-hidden py-3" style={{ background: 'var(--color-surface-offset, #f3ede4)' }}>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
          style={{ background: 'linear-gradient(to right, var(--color-surface-offset, #f3ede4), transparent)' }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
          style={{ background: 'linear-gradient(to left, var(--color-surface-offset, #f3ede4), transparent)' }} />

        <div className="marquee-track marquee-track--reverse flex gap-6 w-max">
          {[...marqueeImages, ...marqueeImages].reverse().map((src, i) => (
            <div key={i} className="flex items-center gap-6 flex-shrink-0">
              <span
                className="flex-shrink-0 text-xs font-semibold uppercase tracking-[0.18em] whitespace-nowrap"
                style={{ color: '#8B5A3C' }}
              >
                {phrases[(i + 3) % phrases.length]}
              </span>
              <div className="overflow-hidden rounded-2xl flex-shrink-0"
                style={{ width: 180, height: 110, border: '1.5px solid var(--color-border)' }}>
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  width={180}
                  height={110}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}