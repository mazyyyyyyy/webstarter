const SYMPTOMS = [
  
]

const Symptoms_condit = () => (
  <section className="sr-symptoms">
    <div className="line_symptoms">
        <img
          src="/assets/line_starter.png"
          />
      </div>
    <div className="container sr-symptoms__inner">
      
      {/* Left: symptom list container_sybpomes */}
      <div className="sr-symptoms__list-wrap">
        <div className="sr-symptoms__carousel">
          <div className="sr-symptoms__dots">
            <span className="sr-symptoms__dot sr-symptoms__dot--active" />
            <span className="sr-symptoms__dot" />
            <span className="sr-symptoms__dot" />
          </div>
          <div className="sr-symptoms__lines">
            <span className="sr-symptoms__line" />
            <span className="sr-symptoms__line" />
          </div>
        </div>

        <ul className="sr-symptoms__items">
          {SYMPTOMS.map((s) => (
            <li className="sr-symptoms__item" key={s}>
              <span className="sr-symptoms__bullet" aria-hidden="true" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Center: photo */}
      <div className="sr-symptoms__photo-wrap1">
        <img
          className="sr-symptoms__photo1"
          src="/assets/candi_rep.png"
          alt="Диагностика стартера"
          loading="lazy"
        />
      </div>
      <div className="sr_syptoms_box">
          <div className="sr-syptomes_ikon">
             <img
                src="/assets/finger_service.svg"
            />
          </div>
          <p className="sr-symptoms__text_serv">
            Обнаружив подобные признаки, не затягивайте с визитом в сервисный центр. У нас ремонт автокондиционеров в Омске проводится механиками, обладающими достаточным опытом работ для того, чтобы успешно справляться с любыми неисправностями.
          </p>
        </div>
      
    </div>
  </section>
)

export default Symptoms_condit
