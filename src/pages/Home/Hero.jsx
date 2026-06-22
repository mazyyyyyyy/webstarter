import { useState } from 'react'
import { Link } from 'react-router-dom'
import CallbackModal from '../../components/CallbackModal'

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <section className="hero">
        <img
          className="hero__photo"
          src="/assets/car_fo.png"
          alt=""
          aria-hidden="true"
        />
        <div className="hero__panel" aria-hidden="true" />
        <div className="hero__fade"  aria-hidden="true" />

        <div className="container">
          <span className="hero__badge">Профессиональный сервис</span>

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
