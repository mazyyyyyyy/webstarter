import { useState } from 'react'
import CallbackModal from '../../components/CallbackModal'


const Hero_Generator = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="hero">
      <img
        className="hero__photo"
        src="/assets/generator_fo.webp"
        alt=""
        aria-hidden="true"
      />
      <div className="hero__panel" aria-hidden="true" />
      <div className="hero__fade"  aria-hidden="true" />

      <div className="container">
        <span className="hero__badge">Профессиональный сервис</span>

        <h1 className="hero__title">
          Ремонт генераторов
        </h1>

        <p className="hero__sub1">Поможем Вам купить или отремонтировать </p>
        <p className="hero__sub2">генератор с <em>гарантией до 6 месяцев</em></p>

        <p className="hero__desc">
          Качественный ремонт с гарантией до 6 месяцев.<br/>
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

      <CallbackModal
      service="Ремонт генераторов"
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      />

    </section>
  )
}

export default Hero_Generator
