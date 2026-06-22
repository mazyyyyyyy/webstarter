import { useState } from 'react'
import { Link } from 'react-router-dom'
import CallbackStarterModal from './CallbackStarterModal'

const Hero_starter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="hero">
      <img
        className="hero__photo"
        src="/assets/starter_fo.png"
        alt=""
        aria-hidden="true"
      />

      <div className="hero__panel" aria-hidden="true" />
      <div className="hero__fade" aria-hidden="true" />

      <div className="container">
        <span className="hero__badge">
          Профессиональный сервис
        </span>

        <h1 className="hero__title">
          Ремонт стартеров
        </h1>

        <p className="hero__sub1">
          Поможем Вам купить или отремонтировать
        </p>

        <p className="hero__sub2">
          стартер с <em>гарантией до 6 месяцев</em>
        </p>

        <p className="hero__desc">
          Качественный ремонт с гарантией до 6 месяцев.
          <br />
          Быстрая диагностика и честные цены.
        </p>

        <div className="hero__actions">
          <button
            className="btn-cta"
            onClick={() => setIsModalOpen(true)}
          >
            <img
              src="/assets/calendar.svg"
              alt=""
              width={18}
              height={18}
            />
            Оставить заявку
          </button>
        </div>
      </div>

      <CallbackStarterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  )
}

export default Hero_starter