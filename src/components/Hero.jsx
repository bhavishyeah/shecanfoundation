import heroBg from '../assets/shecanhero.png'

export default function Hero() {
  return (
    <section id="home" className="relative h-screen overflow-hidden">
      <img
        src={heroBg}
        alt="She Can Foundation hero"
        className="h-full w-full object-cover"
        loading="eager"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(25, 10, 5, 0.18)' }}
      />
    </section>
  )
}