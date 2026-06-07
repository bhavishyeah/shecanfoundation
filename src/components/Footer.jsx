import { Heart, Mail, MapPin, Phone } from 'lucide-react'
import sheCanLogo from '../assets/shecanlogo.webp'
import footerbrwnheart from '../assets/footerbrwnheart.png'
import footerorngheart from '../assets/footerorngheart.png'

export default function Footer() {
  return (
    <footer
      className="mt-10 border-t footer-with-decor"
      style={{
        background: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="container-wide py-14">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.8fr_0.9fr]">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <img
                src={sheCanLogo}
                alt="She Can Foundation logo"
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <div className="text-lg font-semibold" style={{ color: 'var(--color-text)' }}>
                  She Can Foundation
                </div>
                <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  Together we can change
                </div>
              </div>
            </div>

            <p className="max-w-md text-sm" style={{ color: 'var(--color-text-muted)' }}>
              A warm, people-first initiative focused on women’s empowerment through
              support, opportunity, dignity, and meaningful community action.
            </p>

<div className="mt-5 flex items-center gap-4 footer-social-row">
          <a
  href="https://www.linkedin.com/company/shecanfoundation"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Visit She Can Foundation LinkedIn"
  className="footer-social-plain"
  style={{ color: '#ff5a2f' }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="21"
    viewBox="0 0 512 509.64"
    aria-hidden="true"
  >
    <rect
      width="512"
      height="509.64"
      rx="115.61"
      ry="115.61"
      fill="currentColor"
    />
    <path
      fill="#fff"
      d="M204.97 197.54h64.69v33.16h.94c9.01-16.16 31.04-33.16 63.89-33.16 68.31 0 80.94 42.51 80.94 97.81v116.92h-67.46l-.01-104.13c0-23.81-.49-54.45-35.08-54.45-35.12 0-40.51 25.91-40.51 52.72v105.86h-67.4V197.54zm-38.23-65.09c0 19.36-15.72 35.08-35.08 35.08-19.37 0-35.09-15.72-35.09-35.08 0-19.37 15.72-35.08 35.09-35.08 19.36 0 35.08 15.71 35.08 35.08zm-70.17 65.09h70.17v214.73H96.57V197.54z"
    />
  </svg>
</a>

<a
  href="https://www.instagram.com/shecanfoundation.ngo/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Visit She Can Foundation Instagram"
  className="footer-social-plain"
  style={{ color: '#ff5a2f' }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="21"
    viewBox="0 0 512 512"
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      fillRule="nonzero"
      d="M170.663 256.157c-.083-47.121 38.055-85.4 85.167-85.482 47.121-.092 85.407 38.029 85.499 85.159.091 47.13-38.047 85.4-85.176 85.492-47.112.09-85.399-38.039-85.49-85.169zm-46.108.092c.141 72.602 59.106 131.327 131.69 131.185 72.592-.14 131.35-59.089 131.209-131.691-.141-72.577-59.114-131.336-131.715-131.194-72.585.141-131.325 59.114-131.184 131.7zm237.104-137.092c.033 16.954 13.817 30.682 30.772 30.649 16.961-.034 30.689-13.811 30.664-30.765-.033-16.954-13.818-30.69-30.78-30.656-16.962.033-30.689 13.818-30.656 30.772zm-208.696 345.4c-24.958-1.086-38.511-5.234-47.543-8.709-11.961-4.628-20.496-10.177-29.479-19.093-8.966-8.951-14.532-17.461-19.202-29.397-3.508-9.033-7.73-22.569-8.9-47.527-1.269-26.983-1.559-35.078-1.683-103.433-.133-68.338.116-76.434 1.294-103.441 1.069-24.941 5.242-38.512 8.709-47.536 4.628-11.977 10.161-20.496 19.094-29.478 8.949-8.983 17.459-14.532 29.403-19.202 9.025-3.526 22.561-7.715 47.511-8.9 26.998-1.278 35.085-1.551 103.423-1.684 68.353-.133 76.448.108 103.456 1.294 24.94 1.086 38.51 5.217 47.527 8.709 11.968 4.628 20.503 10.145 29.478 19.094 8.974 8.95 14.54 17.443 19.21 29.413 3.524 8.999 7.714 22.552 8.892 47.494 1.285 26.998 1.576 35.094 1.7 103.432.132 68.355-.117 76.451-1.302 103.442-1.087 24.957-5.226 38.52-8.709 47.56-4.629 11.953-10.161 20.488-19.103 29.471-8.941 8.949-17.451 14.531-29.403 19.201-9.009 3.517-22.561 7.714-47.494 8.9-26.998 1.269-35.086 1.56-103.448 1.684-68.338.133-76.424-.124-103.431-1.294zM149.977 1.773c-27.239 1.286-45.843 5.648-62.101 12.019-16.829 6.561-31.095 15.353-45.286 29.603C28.381 57.653 19.655 71.944 13.144 88.79c-6.303 16.299-10.575 34.912-11.778 62.168C.172 178.264-.102 186.973.031 256.489c.133 69.508.439 78.234 1.741 105.548 1.302 27.231 5.649 45.827 12.019 62.092 6.569 16.83 15.353 31.089 29.611 45.289 14.25 14.2 28.55 22.918 45.404 29.438 16.282 6.294 34.902 10.583 62.15 11.777 27.305 1.203 36.022 1.468 105.521 1.336 69.532-.133 78.25-.44 105.555-1.734 27.239-1.302 45.826-5.664 62.1-12.019 16.829-6.585 31.095-15.353 45.288-29.611 14.191-14.251 22.917-28.55 29.428-45.404 6.304-16.282 10.592-34.904 11.777-62.134 1.195-27.323 1.478-36.049 1.344-105.557-.133-69.516-.447-78.225-1.741-105.522-1.294-27.256-5.657-45.844-12.019-62.118-6.577-16.829-15.352-31.08-29.602-45.288-14.25-14.192-28.55-22.935-45.404-29.429-16.29-6.304-34.903-10.6-62.15-11.778C333.747.164 325.03-.101 255.506.031c-69.507.133-78.224.431-105.529 1.742z"
    />
  </svg>
</a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold" style={{ color: 'var(--color-text)' }}>
              Quick Links
            </h4>
            <div className="flex flex-col gap-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#programs">Programs</a>
              <a href="#impact">Impact</a>
              <a href="#volunteer">Volunteer</a>
              <a href="#contact">Contact</a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold" style={{ color: 'var(--color-text)' }}>
              Contact
            </h4>
            <div className="flex flex-col gap-4 text-sm" style={{ color: 'var(--color-text-muted)' }}>
              <div className="flex items-start gap-3">
                <Mail size={16} style={{ color: 'var(--color-primary)' }} />
                <span>president@shecanfoundation.org</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} style={{ color: 'var(--color-primary)' }} />
                <span>+91 82 83 84 18 30</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} style={{ color: 'var(--color-primary)' }} />
                <span>INDIA</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-10 flex flex-col gap-3 border-t pt-6 text-sm md:flex-row md:items-center md:justify-between"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
        >
          <p>© 2026 She Can Foundation. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Made with <Heart size={14} fill="var(--color-primary)" style={{ color: 'var(--color-primary)' }} /> for women everywhere.
          </p>
        </div>

        <div className="footer-bottom-left-decor" aria-hidden="true">
          <img src={footerorngheart} alt="" className="footer-heart footer-heart-orng" />
                    <img src={footerbrwnheart} alt="" className="footer-heart footer-heart-brwn" />

        </div>
      </div>
    </footer>
  )
}