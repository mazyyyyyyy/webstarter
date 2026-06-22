const PinIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" fill="currentColor"/>
  </svg>
)

const ClockIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 11H11V7h1.5v5.25l4.5 2.67-.75 1.23L12.5 13z" fill="currentColor"/>
  </svg>
)

const BRANCHES = [
  {
    id: 1,
    address: 'Дианова, 23 к.2',
    note: 'вход со стороны ул. Дергачева',
    img: '/assets/branch_dianova.jpg',
    imgAlt: 'Филиал на Дианова, 23 к.2',
  },
  {
    id: 2,
    address: 'ул. 10 лет Октября, 168/1',
    note: null,
    img: '/assets/branch_oktyabrya.jpg',
    imgAlt: 'Филиал на улице 10 лет Октября, 168/1',
  },
  {
    id: 3,
    address: '4-я Транспортная улица, 36А',
    note: null,
    img: '/assets/branch_transportnaya.jpg',
    imgAlt: 'Филиал на 4-й Транспортной улице, 36А',
  },
]

const BranchesContacts = () => (
  <section className="branches-contacts">
    <div className="container">
      <h1 className="branches-contacts__title">КОНТАКТЫ</h1>
      <div className="branches-contacts__line" />

      <div className="branches-grid">
        {BRANCHES.map(branch => (
          <article key={branch.id} className="branch-card">
            <div className="branch-card__img-wrap">
              <img
                className="branch-card__img"
                src={branch.img}
                alt={branch.imgAlt}
                loading="lazy"
              />
            </div>

            <div className="branch-card__info">
              <div className="branch-card__row">
                <span className="branch-card__icon branch-card__icon--pin">
                  <PinIcon />
                </span>
                <div>
                  <h2 className="branch-card__address">{branch.address}</h2>
                  {branch.note && (
                    <p className="branch-card__note">({branch.note})</p>
                  )}
                </div>
              </div>

              <div className="branch-card__row">
                <span className="branch-card__icon branch-card__icon--clock">
                  <ClockIcon />
                </span>
                <p className="branch-card__hours">
                  Пн–Пт: 09:00–20:00<br />
                  Сб–Вс: 10:00–18:00
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
)

export default BranchesContacts
