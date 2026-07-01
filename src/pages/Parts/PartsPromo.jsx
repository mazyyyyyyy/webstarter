const PartsPromo = () => (
  <section className="parts-promo">
    <div className="parts-promo__bg" aria-hidden="true" />

    <div className="container parts-promo__inner">
      <div className="parts-promo__content">
        <h1 className="parts-promo__title">
          Больше товаров <br/>на{' '}
          <span className="parts-promo__avito">Авито!</span>
        </h1>
        <p className="parts-promo__desc">
          Перейдите в наш магазин на Авито<br />
          и выбирайте из большого ассортимента<br />
          стартеров, генераторов и запчастей
        </p>
        <a
          className="parts-promo__btn"
          href="https://www.avito.ru/omsk/zapchasti_i_aksessuary/starter_12v_11_kw_chevrolet_cruze_08_opel_astra_h_z16xer_a18xerhjcorsa_d_04insignia_09m_4365364046"
          target="_blank"
          rel="noopener noreferrer"
        >
          Перейти на Авито
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none" aria-hidden="true">
            <path d="M1 7h14M9 1l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      
    </div>
  </section>
)

export default PartsPromo
