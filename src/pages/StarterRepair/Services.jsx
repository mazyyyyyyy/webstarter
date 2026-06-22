

const Services = () => (
  <section className="sr-services">
    <div className="container">
      <div className="section__head">
        <h2 className="section__title">Наши услуги</h2>
        <div className="section__line" />
      </div>

      
      <div className="container_service">
      <div className="features__card_starter_service">
      <div className="sr-service__grid">
        
          <div className="sr-benefits__card sr-benefits__card--dark">
          <div className="sr-benefits__icon" aria-hidden="true">

            <img
                src="/assets/service_ikon1.svg"
            />

          </div>
          <p className="sr-benefits__text">
            Работа с частными автолюбителями<br/>
            и корпоративными клиентами<br/>
            индивидуальный подход к каждому заказчику
          </p>
        </div>

        <div className="sr-benefits__card sr-benefits__card--light">
          <div className="sr-benefits__icon" aria-hidden="true">
            
            <img
                src="/assets/service_ikon2.svg"
            />
             
            
          </div>
          <p className="sr-benefits__text sr-benefits__text--dark">
            Наличие собственного склада комплектующих,<br/>
            получаемых непосредственно от производителей,<br/>
            открывают возможности для экономии
          </p>
        </div>
          
        
      </div>
    </div>
      
      </div>
    </div>
  </section>
)

export default Services
