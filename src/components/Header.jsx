import { Link } from 'react-router-dom'
import { useState } from 'react'
import CallbackModal from './CallbackModal'
import LogoSVG from './Logo'
import MaxLink from './MaxLink'

const PhoneIcon = () => (
  <img
                src="/assets/phone100.svg"
            />
)

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
  <header className="site-header">
    <div className="container">

      <Link to="/" className="header-logo">
        <LogoSVG width={410} height={95} />
      </Link>

      <div className="header-contact">
        <div className="header-contact__phone">
          <PhoneIcon />
          <span className="header-contact__number">+7 (958) 583-66-45</span>
        </div>
        <span className="header-contact__hours">Ежедневно с 9:00 до 18:00</span>
      </div>

      <MaxLink variant="header" />

      <button
            className="header-cta"
            onClick={() => setIsModalOpen(true)}
            aria-label="Позвонить нам"
          >
            <PhoneIcon />
            <span className="header-cta__label">Позвонить нам!</span>
      </button>


    </div>
  </header>

   <CallbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
)
}

export default Header
