import { Link } from 'react-router-dom'

export default function JoinSupportSection() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="join-support-minimal">
          <Link to="/volunteer" className="join-cta join-cta-primary">
            <span className="join-cta-icon" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11.5 1.246c.832-.855 2.913.642 0 2.566-2.913-1.924-.832-3.421 0-2.566M9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h10s1 0 1-1-1-4-6-4-6 3-6 4m13.5-8.09c1.387-1.425 4.855 1.07 0 4.277-4.854-3.207-1.387-5.702 0-4.276ZM15 2.165c.555-.57 1.942.428 0 1.711-1.942-1.283-.555-2.281 0-1.71Z"
                />
              </svg>
            </span>
            <span className="join-cta-text">Join Us</span>
          </Link>

          <Link to="/donate" className="join-cta join-cta-secondary">
            <span className="join-cta-icon" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
              </svg>
            </span>
            <span className="join-cta-text">Donate Us!</span>
          </Link>
        </div>
      </div>
    </section>
  )
}