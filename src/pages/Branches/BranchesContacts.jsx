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

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/>
  </svg>
)

// У каждого филиала свой номер
const BRANCHES = [
  {
    id: 1,
    address: 'Дианова, 23 к.2',
    note: 'вход со стороны ул. Дергачева',
    phone: '+7 (991) 777-29-82',
    phoneHref: 'tel:+79917772982',
    img: '/assets/branch_dianova.jpg',
    imgAlt: 'Филиал на Дианова, 23 к.2',
  },
  {
    id: 2,
    address: 'ул. 10 лет Октября, 168/1',
    note: null,
    phone: '+7 (991) 777-29-83',
    phoneHref: 'tel:+79917772983',
    img: '/assets/branch_oktyabrya.jpg',
    imgAlt: 'Филиал на улице 10 лет Октября, 168/1',
  },
  {
    id: 3,
    address: '4-я Транспортная улица, 36А',
    note: null,
    phone: '+7 (991) 777-29-81',
    phoneHref: 'tel:+79917772981',
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
              {/* Без примечания адрес в одну строку — центрируем, иначе выравниваем по верху */}
              <div className={`branch-card__row${branch.note ? '' : ' branch-card__row--center'}`}>
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

              <div className="branch-card__row branch-card__row--center">
                <span className="branch-card__icon branch-card__icon--phone">
                  <PhoneIcon />
                </span>
                <p className="branch-card__phone">
                  <a href={branch.phoneHref} className="branch-card__phone-link">
                    {branch.phone}
                  </a>
                </p>
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
