import qrImage from '../assets/qr.webp'

export default function DonatePage() {
  return (
<main className="pt-16 md:pt-16">
    <section className="section-padding donate-page-section">
            <div className="container-wide">
          <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="section-tag mb-5">Donate</span>
              <h1 className="mb-5 text-4xl font-semibold md:text-6xl">
                Support the mission with generosity.
              </h1>
              <p
                className="max-w-xl text-base leading-relaxed md:text-lg"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Your contribution helps us continue education, support systems,
                and community-led initiatives for women.
              </p>
            </div>

            <div className="flex justify-center md:justify-end">
  <img
    src={qrImage}
    alt="QR code for donation"
    className="donate-qr-image"
  />
</div>
          </div>
        </div>
      </section>
    </main>
  )
}