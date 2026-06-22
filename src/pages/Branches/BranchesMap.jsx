const BranchesMap = () => (
  <section className="branches-map">
    <div className="container">
      <div className="branches-map__frame">
        <iframe
          className="branches-map__iframe"
          title="Карта филиалов Стартер Сервис в Омске"
          src="https://yandex.ru/map-widget/v1/?ll=73.3669%2C54.9771&z=11&pt=73.248664%2C54.993319%2Cpm2rdl1~73.428444%2C54.985359%2Cpm2rdl2~73.423467%2C54.951907%2Cpm2rdl3"
          allowFullScreen
        />
      </div>
    </div>
  </section>
)

export default BranchesMap
