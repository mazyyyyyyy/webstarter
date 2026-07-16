import { useState } from 'react'
import { Link } from 'react-router-dom'
import CallbackModal from '../../components/CallbackModal'

const TurboRepair = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="turbo-soon">
      <div className="container turbo-soon__inner">
        <span className="hero__badge">Страница в разработке</span>

        <h1 className="turbo-soon__title">Ремонт турбокомпрессоров</h1>

        <div className="section__line turbo-soon__line" />

        <p className="turbo-soon__desc">
          Мы готовим подробное описание услуги. А пока — звоните, наши
          мастера уже принимают турбокомпрессоры в ремонт и проконсультируют
          по стоимости и срокам.
        </p>

        <div className="turbo-soon__actions">
          <a href="tel:+79585836645" className="btn-cta">
            <img src="/assets/phone.svg" alt="" width={18} height={18} />
            +7 (958) 583-66-45
          </a>
          <button className="btn-ghost" onClick={() => setIsModalOpen(true)}>
            Оставить заявку
          </button>
        </div>

        <p className="turbo-soon__links">
          Пока страница готовится, посмотрите другие наши услуги:{' '}
          <Link to="/starter-repair">ремонт стартеров</Link>,{' '}
          <Link to="/generator-repair">ремонт генераторов</Link>,{' '}
          <Link to="/conditioning">ремонт кондиционеров</Link>.
        </p>
      </div>

      <CallbackModal
        service="Ремонт турбокомпрессоров"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  )
}

export default TurboRepair
