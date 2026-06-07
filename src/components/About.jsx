import { useState } from 'react'
import { Globe2, HandHeart, ShieldCheck } from 'lucide-react'

const aboutCards = [
  {
    icon: Globe2,
    title: 'Community-centered action',
    text: 'We work closely with local communities so support stays relevant and lasting.',
  },
  {
    icon: HandHeart,
    title: 'Support through skills and care',
    text: 'From training to advocacy, our programs focus on practical and meaningful change.',
  },
  {
    icon: ShieldCheck,
    title: 'Trust and credibility',
    text: 'We present our mission, registration, and work clearly to build confidence.',
  },
]

function TiltAboutCard({ icon: Icon, title, text }) {
  const [transform, setTransform] = useState(
    'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)'
  )
  const [iconTransform, setIconTransform] = useState(
    'translate3d(0, 0, 0) rotate(0deg) scale(1)'
  )
  const [shadow, setShadow] = useState(
    '0 14px 28px rgba(255, 89, 44, 0.08), 0 4px 10px rgba(255, 89, 44, 0.04)'
  )

  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateY = ((x - centerX) / centerX) * 2.5
    const rotateX = ((centerY - y) / centerY) * 2

    setTransform(
      `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.008)`
    )

    setIconTransform(
      `translate3d(${rotateY * 1.6}px, ${-rotateX * 1.6}px, 0) rotate(${rotateY}deg) scale(1.04)`
    )

    setShadow(
      `${rotateY * 3}px ${18 + Math.abs(rotateX * 2)}px 36px rgba(255, 89, 44, 0.14),
       0 8px 18px rgba(255, 89, 44, 0.06)`
    )
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
        className="relative rounded-[28px] border px-7 py-6 md:px-8 md:py-6 transition-transform duration-200 ease-out will-change-transform"
        style={{
          background: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
          transform,
          boxShadow: shadow,
          transformStyle: 'preserve-3d',
          
        }}
      >
        <div
className="absolute left-0 top-[25%] -translate-y-1/2 pointer-events-none"
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
            color: '#FF592C',
            filter: 'drop-shadow(0 10px 16px rgba(255, 89, 44, 0.14))',
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
  return (
    <section id="about" className="section-padding pt-14 md:pt-16">
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
            {aboutCards.map((card) => (
              <TiltAboutCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}