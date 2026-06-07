import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { HeartHandshake, Users2, Sparkles, ArrowRight } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
const volunteerCards = [
  {
    icon: HeartHandshake,
    title: 'Why volunteer with us?',
    text: 'Build real community impact, support meaningful causes, and become part of a mission rooted in warmth, trust, and dignity.',
    iconColor: '#FF592C',
        darkColor: '#ff8a5b',      // bright orange

    shadowBase:
      '0 14px 28px rgba(255, 89, 44, 0.08), 0 4px 10px rgba(255, 89, 44, 0.04)',
    shadowHover: 'rgba(255, 89, 44, 0.14)',
  },
  {
    icon: Users2,
    title: 'Community-led impact',
    text: 'Work directly with communities and programs that need consistency, trust, and care on the ground.',
    iconColor: '#8B5A3C',
        darkColor: '#d4895a',      // soft terracotta

    shadowBase:
      '0 14px 28px rgba(139, 90, 60, 0.08), 0 4px 10px rgba(139, 90, 60, 0.04)',
    shadowHover: 'rgba(139, 90, 60, 0.15)',
  },
  {
    icon: Sparkles,
    title: 'Meaningful contribution',
    text: 'Bring your energy, time, and skills into work that creates visible and lasting change for women.',
    iconColor: '#C06A35',
        darkColor: '#f4a96a',      // golden peach

    shadowBase:
      '0 14px 28px rgba(192, 106, 53, 0.08), 0 4px 10px rgba(192, 106, 53, 0.04)',
    shadowHover: 'rgba(192, 106, 53, 0.15)',
  },
]

const interestOptions = [
  { label: 'Community work', value: 'community' },
  { label: 'Events', value: 'events' },
  { label: 'Training', value: 'training' },
  { label: 'Outreach', value: 'outreach' },
  { label: 'Other', value: 'other' },
]

function TiltVolunteerCard({
  icon: Icon,
  title,
  text,
  iconColor,
  shadowBase,
  shadowHover,
  darkColor,
  dark,
}) {

  const [transform, setTransform] = useState(
    'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)'
  )
  const [iconTransform, setIconTransform] = useState(
    'translate3d(0, 0, 0) rotate(0deg) scale(1)'
  )
  const [shadow, setShadow] = useState(shadowBase)

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
      `${rotateY * 3}px ${18 + Math.abs(rotateX * 2)}px 36px ${shadowHover},
       0 8px 18px rgba(255, 89, 44, 0.06)`
    )
  }

  const handleMouseLeave = () => {
    setTransform('perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)')
    setIconTransform('translate3d(0, 0, 0) rotate(0deg) scale(1)')
    setShadow(shadowBase)
  }

  return (
    <div className="relative pl-8 md:pl-10">
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-[28px] border px-7 py-6 transition-transform duration-200 ease-out will-change-transform md:px-8 md:py-6"
        style={{
    background: dark
      ? 'linear-gradient(180deg, rgba(44,28,18,0.95), rgba(36,22,14,0.97))'
      : 'linear-gradient(180deg, rgba(255,248,241,0.98), rgba(250,243,236,0.98))',
    borderColor: dark ? 'rgba(192,142,100,0.16)' : 'rgba(163, 113, 82, 0.15)',
    transform,
    boxShadow: shadow,
    transformStyle: 'preserve-3d',
  }}
  >
        <div
          className="pointer-events-none absolute left-0 top-[25%] -translate-y-1/2"
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
    color: dark ? darkColor : iconColor,
    filter: `drop-shadow(0 10px 16px ${dark ? darkColor : iconColor}40)`,
  }}
/>
        </div>

        <div className="pl-12 md:pl-14" style={{ transform: 'translateZ(24px)' }}>
          <h3
            className="mb-1 text-[1.7rem] font-semibold leading-tight md:text-[1.9rem]"
            style={{ color: 'var(--color-text)' }}
          >
            {title}
          </h3>
          <p
            className="max-w-2xl text-sm leading-relaxed md:text-[15px]"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function VolunteerSection() {
  const [submitted, setSubmitted] = useState(false)
  const [selectOpen, setSelectOpen] = useState(false)
  const [selectedInterest, setSelectedInterest] = useState('')
    const { dark } = useTheme()

  const selectRef = useRef(null)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      interest: '',
      message: '',
    },
  })

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setSelectOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const selectedInterestLabel =
    interestOptions.find((item) => item.value === selectedInterest)?.label || ''

  const onSubmit = (data) => {
    console.log('Volunteer form:', data)
    setSubmitted(true)
    reset()
    setSelectedInterest('')
    setSelectOpen(false)
  }

const leftCardsWrap = {
  hidden: {},
  show: {
    transition: {
      when: 'beforeChildren',
      delayChildren: 0.2,
      staggerChildren: 0.38,
    },
  },
}

const leftCardReveal = {
  hidden: {
    opacity: 0,
    y: 34,
    scale: 0.98,
    filter: 'blur(8px)',
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.82,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

  return (
   <section
  id="volunteer"
  className="section-padding volunteer-main-section"
  style={{
    background: dark
      ? 'radial-gradient(circle at 8% 20%, rgba(80,45,25,0.18), transparent 22%), radial-gradient(circle at 92% 78%, rgba(120,55,20,0.14), transparent 20%), linear-gradient(180deg, #1e120c, #221510)'
      : 'radial-gradient(circle at 8% 20%, rgba(139,90,60,0.08), transparent 22%), radial-gradient(circle at 92% 78%, rgba(255,89,44,0.10), transparent 20%), linear-gradient(180deg, rgba(248,241,232,0.75), rgba(255,248,241,0.96))',
  }}
>
      <img
        src="/vlntrh1.webp"
        alt=""
        aria-hidden="true"
        className="volunteer-deco volunteer-deco-top-one"
      />
      
      <img
        src="/vlntrh3.webp"
        alt=""
        aria-hidden="true"
        className="volunteer-deco volunteer-deco-bottom"
      />

      <div className="container-wide relative z-[1]">
        <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag mb-5">Join Us</span>

            <h2 className="mb-5 text-4xl font-semibold md:text-6xl">
              Lend your time. Share your heart.
            </h2>

            <p className="mb-6 max-w-xl text-base" style={{ color: 'var(--color-text-muted)' }}>
              Volunteers are a big part of how our work reaches more women with care,
              confidence, and opportunity. Whether you contribute time, skills, or energy,
              your support matters.
            </p>

            <motion.div
            className="space-y-5"
            variants={leftCardsWrap}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
          >
            {volunteerCards.map((card) => (
              <motion.div key={card.title} variants={leftCardReveal}>
                <TiltVolunteerCard {...card} dark={dark}/>
              </motion.div>
            ))}
          </motion.div>

          </motion.div>

          <motion.div
            className="relative self-start rounded-[30px] border p-6 md:mt-10 md:p-7 xl:mt-14"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            style={{
  background: dark
    ? 'linear-gradient(180deg, rgba(38,24,16,0.97), rgba(30,18,12,0.99))'
    : 'linear-gradient(180deg, rgba(255,250,245,0.96), rgba(249,242,234,0.98))',
  borderColor: dark ? 'rgba(192,142,100,0.16)' : 'rgba(163, 113, 82, 0.14)',
  boxShadow: dark
    ? '0 18px 44px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.05)'
    : '0 18px 44px rgba(88, 52, 32, 0.08)',
}}
          >
            <img
  src={dark ? '/creme.png' : '/brwn.png'}
  alt=""
  aria-hidden="true"
  className="volunteer-form-deco"
/>

            {!submitted ? (
              <form onSubmit={handleSubmit(onSubmit)} className="relative z-[1] space-y-5">
                <input type="hidden" {...register('interest')} />

                <div>
                  <label className="label">Full Name</label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className="input-field"
                    placeholder="Enter your name"
                  />
                  {errors.name && <p className="error-msg">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="label">Email</label>
                  <input
                    {...register('email', { required: 'Email is required' })}
                    className="input-field"
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="error-msg">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="label">Phone</label>
                  <input
                    {...register('phone')}
                    className="input-field"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="label">Area of Interest</label>

                  <div className="volunteer-custom-select" ref={selectRef}>
                    <button
                      type="button"
                      className="volunteer-select-trigger"
                      onClick={() => setSelectOpen((prev) => !prev)}
                    >
                      <span>{selectedInterestLabel || 'Select interest'}</span>

                      <span
                        className={`volunteer-select-icon ${selectOpen ? 'is-open' : ''}`}
                        aria-hidden="true"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M6 9L12 15L18 9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>

                    {selectOpen && (
                      <div className="volunteer-select-menu">
                        {interestOptions.map((item) => (
                          <button
                            key={item.value}
                            type="button"
                            className={`volunteer-select-option ${
                              selectedInterest === item.value ? 'is-selected' : ''
                            }`}
                            onClick={() => {
                              setValue('interest', item.value, { shouldValidate: true })
                              setSelectedInterest(item.value)
                              setSelectOpen(false)
                            }}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="label">Message</label>
                  <textarea
                    {...register('message')}
                    rows="4"
                    className="input-field"
                    placeholder="Tell us how you’d like to contribute"
                  />
                </div>

                <motion.button
                  type="submit"
                  className="btn-primary inline-flex w-full items-center justify-center gap-2"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.985 }}
                  style={{
                    background: 'linear-gradient(135deg, #8B5A3C 0%, #FF592C 85%)',
                    boxShadow: '0 14px 28px rgba(255, 89, 44, 0.18)',
                  }}
                >
                  <span>Become a Volunteer</span>
                  <ArrowRight size={18} />
                </motion.button>
              </form>
            ) : (
              <div
              className="relative z-[1] text-center volunteer-success-state"
              style={{ paddingTop: '10rem', paddingBottom: '10rem' }}
            >
              <div
                className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full"
                style={{
                  color: '#ff6f00',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="200"
                  height="200"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.5 1.246c.832-.855 2.913.642 0 2.566-2.913-1.924-.832-3.421 0-2.566M9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h10s1 0 1-1-1-4-6-4-6 3-6 4m13.5-8.09c1.387-1.425 4.855 1.07 0 4.277-4.854-3.207-1.387-5.702 0-4.276ZM15 2.165c.555-.57 1.942.428 0 1.711-1.942-1.283-.555-2.281 0-1.71Z"
                  />
                </svg>
              </div>

              <h3 className="mb-3 text-3xl font-semibold md:text-4xl">
                Thank you for joining us
              </h3>

              <p
                className="mx-auto max-w-[32rem] text-lg leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Your interest has been received. Our team will connect with you soon.
              </p>
            </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}