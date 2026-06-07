import { useState, useEffect, useRef } from 'react'
import { Globe2, HandHeart, ShieldCheck } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { useTheme } from '../context/ThemeContext'
const aboutCards = [
  {
    icon: Globe2,
    lightColor: '#FF592C',    
        darkColor: '#ff8a5b',   // bright orange

    title: 'Community-centered action',
    text: 'We work closely with local communities so support stays relevant and lasting.',
  },
  {
    icon: HandHeart,
    lightColor: '#8B5A3C', 
        darkColor: '#f4a96a',   // warm golden orange
     
    title: 'Support through skills and care',
    text: 'From training to advocacy, our programs focus on practical and meaningful change.',
  },
  {
    icon: ShieldCheck,
    lightColor: '#C06A35',
        darkColor: '#d4895a',   // soft terracotta

    title: 'Trust and credibility',
    text: 'We present our mission, registration, and work clearly to build confidence.',
  },
]

function TiltAboutCard({ icon: Icon, title, text, mobileActive,  lightColor, darkColor }) {
  const [transform, setTransform] = useState(
    'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)'
  )
  const [iconTransform, setIconTransform] = useState(
    'translate3d(0, 0, 0) rotate(0deg) scale(1)'
  )
  const [shadow, setShadow] = useState(
    '0 14px 28px rgba(255, 89, 44, 0.08), 0 4px 10px rgba(255, 89, 44, 0.04)'
  )
  const { dark } = useTheme()

  // Desktop hover handlers — unchanged
  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateY = ((x - centerX) / centerX) * 2.5
    const rotateX = ((centerY - y) / centerY) * 2
    setTransform(`perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.008)`)
    setIconTransform(`translate3d(${rotateY * 1.6}px, ${-rotateX * 1.6}px, 0) rotate(${rotateY}deg) scale(1.04)`)
    setShadow(`${rotateY * 3}px ${18 + Math.abs(rotateX * 2)}px 36px rgba(255, 89, 44, 0.14), 0 8px 18px rgba(255, 89, 44, 0.06)`)
  }

  const handleMouseLeave = () => {
    setTransform('perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)')
    setIconTransform('translate3d(0, 0, 0) rotate(0deg) scale(1)')
    setShadow('0 14px 28px rgba(255, 89, 44, 0.08), 0 4px 10px rgba(255, 89, 44, 0.04)')
  }

  return (
    <div className="relative pl-8 md:pl-10">
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`about-card relative rounded-[28px] border px-7 py-6 md:px-8 md:py-6 transition-transform duration-200 ease-out will-change-transform${mobileActive ? ' about-card--active' : ''}`}
        style={{
          background: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
          transform,
          boxShadow: shadow,
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="absolute left-0 top-[25%] -translate-y-1/2 pointer-events-none about-card-icon"
          style={{
            transform: `translateX(-35%) translateY(-50%) ${iconTransform}`,
            transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 3,
            rotate: '-6deg',
          }}
        >
         <Icon
    size={100}
    strokeWidth={1.9}
    style={{
  color: dark ? darkColor : lightColor,
  filter: `drop-shadow(0 10px 18px ${dark ? darkColor : lightColor}44)`,
}}
  />
        </div>

        <div className="pl-12 md:pl-14" style={{ transform: 'translateZ(24px)' }}>
          <h3
            className="mb-1 text-[1.9rem] leading-tight font-semibold"
            style={{ color: 'var(--color-text)' }}
          >
            {title}
          </h3>
          <p
            className="max-w-2xl text-sm md:text-[15px] leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  const [activeCard, setActiveCard] = useState(null)
  const intervalRef = useRef(null)
  const isTouchDevice = useRef(
    typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches
  )

  const { ref: sectionRef, inView } = useInView({
    threshold: 0.25,      // section must be 25% visible to start
    triggerOnce: false,   // restart every time user scrolls back
  })

  useEffect(() => {
    // Only run auto-animation on touch devices
    if (!isTouchDevice.current) return

    if (inView) {
      // Start cycling through cards: 0 → 1 → 2 → 0 → ...
      let index = 0
      setActiveCard(0)
      intervalRef.current = setInterval(() => {
        index = (index + 1) % aboutCards.length
        setActiveCard(index)
      }, 1800) // each card gets 1.8s spotlight
    } else {
      // Section left viewport — stop immediately, reset
      clearInterval(intervalRef.current)
      setActiveCard(null)
    }

    return () => clearInterval(intervalRef.current)
  }, [inView])

  return (
    <section ref={sectionRef} id="about" className="section-padding pt-14 md:pt-16">
      <div className="container-wide">
        <div className="grid gap-10 xl:grid-cols-[0.78fr_1.22fr] xl:items-start">
          <div>
            <span className="section-tag mb-5">About Us</span>
            <h2 className="mb-5 text-5xl md:text-7xl font-semibold leading-none">
              Global vision, local action.
            </h2>
            <p
              className="max-w-xl text-base md:text-lg leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              She Can Foundation is a women-focused NGO building a fairer society through
              education, support systems, training, advocacy, and community-led change.
            </p>
          </div>

          <div className="space-y-5">
            {aboutCards.map((card, i) => (
              <TiltAboutCard
                key={card.title}
                {...card}
                mobileActive={activeCard === i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}