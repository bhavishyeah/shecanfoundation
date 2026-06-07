import { useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, BriefcaseBusiness, HeartHandshake, Megaphone } from 'lucide-react'
import prgm1 from '../assets/prgm1.webp'
import prgm2 from '../assets/prgm2.webp'
import prgm3 from '../assets/prgm3.webp'
import prgm4 from '../assets/prgm4.webp'
import prgm5 from '../assets/prgm5.webp'
import prgm6 from '../assets/prgm6.webp'

const programImages = [
  { src: prgm1, alt: 'Program activity 1' },
  { src: prgm2, alt: 'Program activity 2' },
  { src: prgm3, alt: 'Program activity 3' },
  { src: prgm4, alt: 'Program activity 4' },
  { src: prgm5, alt: 'Program activity 5' },
  { src: prgm6, alt: 'Program activity 6' },
]

const imageContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
}

const imageCardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.94,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const programs = [
  {
    icon: GraduationCap,
    title: 'Education',
    text: 'Helping women access learning, awareness, and opportunities that strengthen long-term independence.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Training & livelihood',
    text: 'Skill-building and practical support that improve employability and economic resilience.',
  },
  {
    icon: HeartHandshake,
    title: 'Care & community support',
    text: 'Creating safe spaces, emotional support systems, and community-led initiatives that restore dignity.',
  },
  {
    icon: Megaphone,
    title: 'Advocacy & awareness',
    text: 'Driving conversations and action around equity, access, rights, and long-term social change.',
  },
]
function TiltProgramCard({ icon: Icon, title, text }) {
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
            transform: `translateX(-35%) translateY(-70%) ${iconTransform}`,
            transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
            rotate: '-6deg',
            zIndex: 3,
          }}
        >
          <Icon
            size={92}
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

export default function Programs() {
  return (
    <section id="programs" className="section-padding pt-14 md:pt-20">
      <div className="container-wide">
        <div className="max-w-4xl mb-12 md:mb-16">
          <span className="section-tag mb-5">What We Do</span>

          <h2 className="max-w-[700px] mb-5 text-5xl md:text-7xl font-semibold leading-none">
            Thoughtful programs. Real community impact.
          </h2>

         <p
          className="max-w-[550px] text-base md:text-lg leading-relaxed"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Our work is shaped by dignity, relevance and long-term change, not one-time gestures.
        </p>
                </div>

                <div className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
                  {/* Left cards list */}
                  <div className="space-y-5">
                  {programs.map((card) => (
                    <TiltProgramCard key={card.title} {...card} />
                  ))}
                </div>

          {/* Right zig-zag images */}
            <div className="grid grid-cols-2 gap-5 md:gap-6 xl:pl-6 xl:-mt-24">
  {programImages.map(({ src, alt }, index) => {
    const imageTransforms = [
      'rotate(-6deg) translateY(4px)',
      'rotate(-6deg) translateY(28px)',
      'rotate(-6deg) translateY(6px)',
      'rotate(-6deg) translateY(28px)',
      'rotate(-6deg) translateY(8px)',
      'rotate(-6deg) translateY(30px)',
    ]

    return (
      <motion.div
        key={alt}
        initial={{ opacity: 0, y: 42, scale: 0.94, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 0.7,
          delay: index * 0.04,
          ease: [0.16, 1, 0.3, 1],
        }}
        whileHover={{
          y: -6,
          scale: 1.03,
          transition: {
            duration: 0.28,
            ease: [0.16, 1, 0.3, 1],
          },
        }}
      >
        <div
          className="overflow-hidden rounded-[34px]"
          style={{
            transform: imageTransforms[index],
            boxShadow: '0 20px 36px rgba(80, 40, 10, 0.12)',
            background: 'var(--color-surface)',
          }}
        >
          <img
            src={src}
            alt={alt}
            className="aspect-[1/1] w-full object-cover"
            loading="lazy"
          />
        </div>
      </motion.div>
    )
  })}
  </div>

</div>
      </div>
    </section>
  )
}