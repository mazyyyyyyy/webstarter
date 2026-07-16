import { useState } from 'react'
import { Link } from 'react-router-dom'
import CallbackModal from '../../components/CallbackModal'

const ShieldIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

const WrenchIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
)

const PinIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

const Hero = ({ audience, setAudience }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isBusiness = audience === 'business'

  return (
    <>
      <section className="hero hero--toggle">
        <img
          className="hero__photo"
          src={isBusiness ? '/assets/imgbiz.webp' : '/assets/car_fo.webp'}
          alt=""
          aria-hidden="true"
        />
        <div className="hero__panel" aria-hidden="true" />
        <div className="hero__fade"  aria-hidden="true" />

        <div className="hero__toggle-wrap">
          <div className="hero__toggle" role="tablist" aria-label="Тип клиента">
            <button
              role="tab"
              aria-selected={!isBusiness}
              className={`hero__toggle-btn${!isBusiness ? ' hero__toggle-btn--active' : ''}`}
              onClick={() => setAudience('individual')}
            >
              Физ. лицам
            </button>
            <button
              role="tab"
              aria-selected={isBusiness}
              className={`hero__toggle-btn${isBusiness ? ' hero__toggle-btn--active' : ''}`}
              onClick={() => setAudience('business')}
            >
              Организациям
            </button>
          </div>
        </div>

        <div className="container">
          {isBusiness ? (
            <>
              <h1 className="hero__title hero__title--business">
                Ремонт стартеров, генераторов, турбин<br/>
                и компрессоров кондиционеров
              </h1>

              <p className="hero__sub1">Разных уровней сложности</p>

              <div className="hero__stats">
                <div className="hero__stat">
                  <ShieldIcon />
                  <span>
                    <span className="hero__stat-label">Гарантия</span>
                    <span className="hero__stat-value">6 месяцев</span>
                  </span>
                </div>
                <div className="hero__stat">
                  <WrenchIcon />
                  <span>
                    <span className="hero__stat-label">Ремонт</span>
                    <span className="hero__stat-value">от 2 часов</span>
                  </span>
                </div>
                <div className="hero__stat">
                  <PinIcon />
                  <span>
                    <span className="hero__stat-label">3 филиала</span>
                    <span className="hero__stat-value">рядом с вами</span>
                  </span>
                </div>
              </div>

              <div className="hero__actions">
                <button className="btn-cta" onClick={() => setIsModalOpen(true)}>
                  <img src="/assets/phone.svg" alt="" width={18} height={18} />
                  Связаться с нами
                </button>
              </div>
            </>
          ) : (
            <>
              

              <h1 className="hero__title">
                Профессиональный ремонт <em>стартеров</em> и генераторов
              </h1>

              <p className="hero__sub1">Разных уровней сложности</p>
              <p className="hero__sub2"><em>7 дней</em> в неделю!</p>

              <p className="hero__desc">
                Качественный ремонт с гарантией до 6 месяцев.<br/>
                Быстрая диагностика и честные цены.
              </p>

              <div className="hero__actions">
                <Link to="/starter-repair" className="btn-cta">
                  Наши услуги
                  <span className="icon-arrow" aria-hidden="true" />
                </Link>
                <button className="btn-ghost" onClick={() => setIsModalOpen(true)}>
                  <img
                    src="/assets/phone.svg"
                    alt="Phone"
                    width={18}
                    height={18}
                  />
                  Связаться с нами
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <CallbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

export default Hero
