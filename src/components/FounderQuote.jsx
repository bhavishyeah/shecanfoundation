import { motion, useReducedMotion } from 'framer-motion'

export default function FounderQuote() {
  const reduceMotion = useReducedMotion()

  const container = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: reduceMotion ? 0 : 0.12,
        delayChildren: reduceMotion ? 0 : 0.08,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const flowerFloatLeft = reduceMotion
    ? {}
    : {
        y: [0, -8, 0],
        rotate: [-2, 2, -2],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }

  const flowerFloatRight = reduceMotion
    ? {}
    : {
        y: [0, 10, 0],
        rotate: [8, 12, 8],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }

  const quotePulse = reduceMotion
    ? {}
    : {
        y: [0, -4, 0],
        rotate: [-3, -6, -3],
        transition: {
          duration: 4.2,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }

  const quotePulseEnd = reduceMotion
    ? {}
    : {
        y: [0, 4, 0],
        rotate: [8, 12, 8],
        transition: {
          duration: 4.6,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }

  return (
<section className="section-padding founder-section">    
      <div className="container-default">
        <motion.div
          className="founder-final-wrap"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="founder-final-inner">
            <motion.img
              src="/brwn.png"
              alt=""
              aria-hidden="true"
              className="founder-final-flower founder-final-flower-top"
              variants={item}
              animate={flowerFloatLeft}
            />

            <motion.div className="founder-quote-panel" variants={item}>
              <motion.div
                className="founder-quote-opening"
                aria-hidden="true"
                animate={quotePulse}
              >
                ❝
              </motion.div>

              <motion.p className="founder-quote-copy" variants={item}>
                Together, we can break down barriers and empower women. At She Can
                Foundation, we believe that if we all do our part, there is no challenge
                too great to overcome. Join us in our mission to create a world where every
                woman has the opportunity to thrive and succeed.
              </motion.p>

              <motion.div
                className="founder-quote-closing"
                aria-hidden="true"
                animate={quotePulseEnd}
              >
                ❞
              </motion.div>
            </motion.div>

            <motion.div className="founder-identity" variants={item}>
              <div className="founder-identity-card">
                <div className="founder-identity-name">REETA MISHRA</div>
                <div className="founder-identity-role">Founder &amp; President</div>
              </div>

              <motion.img
                src="/orng.png"
                alt=""
                aria-hidden="true"
                className="founder-final-flower founder-final-flower-mid"
                variants={item}
                animate={flowerFloatRight}
              />
            </motion.div>

            <motion.div className="founder-brand-bar" variants={item}>
              <motion.h2
                className="founder-brand-line"
                whileHover={
                  reduceMotion
                    ? {}
                    : {
                        y: -2,
                        transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                      }
                }
              >
                <span className="founder-brand-she">She</span>
                <span className="founder-brand-can">Can !</span>
                <span className="founder-brand-foundation">Foundation</span>
              </motion.h2>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}