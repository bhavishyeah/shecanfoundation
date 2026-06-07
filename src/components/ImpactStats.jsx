import { useEffect, useRef, useState } from 'react'
import { Users, BookOpen, Heart, MapPin } from 'lucide-react'
import impactBg from '../assets/impactbg.jpg'
import { motion } from 'framer-motion'

const stats = [
  {
    icon: Users,
    value: 12000,
    suffix: '+',
    label: 'Women Empowered',
  },
  {
    icon: BookOpen,
    value: 48,
    suffix: '',
    label: 'Programs Run',
  },
  {
    icon: Heart,
    value: 200,
    suffix: '+',
    label: 'Volunteers',
  },
  {
    icon: MapPin,
    value: 18,
    suffix: '',
    label: 'Districts Covered',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.96,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

function CountUp({ end, suffix = '', duration = 1600, start }) {
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

export default function ImpactStats() {
  const sectionRef = useRef(null)
  const [startCount, setStartCount] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="section-padding"
      style={{
        backgroundImage: `linear-gradient(rgba(207, 99, 11, 0.2), rgb(0, 0, 0)), url(${impactBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container-wide">

        {/* Header */}
        <div className="mb-14 text-center">
          <span
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] mb-5"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.46) 0%, rgba(255,89,44,0.18) 100%)',
              color: '#fff4ec',
              border: '1px solid rgba(255,202,150,0.85)',
              boxShadow: '0 8px 24px rgba(255,89,44,0.12)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            Our Impact
          </span>

          <h2
            className="text-5xl md:text-7xl font-semibold leading-none"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 800,
              background: 'linear-gradient(180deg, #ffffff 0%, #ffd696 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Numbers That Tell Our Story
          </h2>
        </div>

        {/* Cards */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.22 }}
        >
          {stats.map(({ icon: Icon, value, suffix, label }) => (
            <motion.div
              key={label}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: '0 28px 52px rgba(255, 214, 150, 0.14)',
                transition: {
                  duration: 0.28,
                  ease: [0.16, 1, 0.3, 1],
                },
              }}
              className="rounded-[30px] px-6 py-8 text-center"
              style={{
                background: 'rgba(255,255,255,0.10)',
                border: '1px solid rgba(255,255,255,0.10)',
                boxShadow: '0 18px 34px rgba(160,52,20,0.10)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Icon */}
              <motion.div
                className="mb-6 flex justify-center pt-5"
                style={{ color: 'rgba(255,255,255,0.96)' }}
                whileHover={{
                  scale: 1.12,
                  rotate: -6,
                  transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1] },
                }}
              >
                <Icon
                  size={80}
                  strokeWidth={1.5}
                  style={{
                    filter: 'drop-shadow(0 10px 20px rgba(255,255,255,0.10))',
                  }}
                />
              </motion.div>

              {/* Number */}
              <motion.div
                className="mb-2 text-4xl md:text-5xl font-semibold leading-none font-stats"
                style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, #ffd696 82%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 6px 20px rgba(255,214,150,0.10)',
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
                }}
              >
                <CountUp end={value} suffix={suffix} start={startCount} />
              </motion.div>

              {/* Label */}
              <h3
                className="mb-1 text-xl font-semibold"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 700,
                  color: '#fffaf5',
                }}
              >
                {label}
              </h3>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
} 