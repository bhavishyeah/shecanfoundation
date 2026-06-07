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
    </section>
  )
}