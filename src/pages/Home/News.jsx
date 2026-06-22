const NEWS = [
  {
    day: '27', month: 'сен',
    title: 'Снимаем агрегаты сами!',
    text:  'Напоминаем, что мы сами производим демонтаж агрегатов, вам нужно только приехать к нам.',
  },
  {
    day: '1',  month: 'июл',
    title: 'Нашим филиалам нужны сотрудники',
    text:  'Дорогие друзья! У нас открыты вакансии мастеров-механиков и мастеров-приемщиков.',
  },
  {
    day: '21', month: 'окт',
    title: 'Конструктивные особенности',
    text:  'Некоторые модели автомобилей имеют генераторы с водяным охлаждением, ремонт которых производят наши мастерские.',
  },
]

const News = () => (
  <section className="section news">
    <div className="section__head">
      <h2 className="section__title">Новости</h2>
      <div className="section__line" />
    </div>

    <div className="news-grid">
      {NEWS.map((n) => (
        <article className="news-card" key={n.title}>
          <div className="news-card__date">
            <span className="news-card__day">{n.day}</span>
            <span className="news-card__month">{n.month}</span>
          </div>
          <h3 className="news-card__title">{n.title}</h3>
          <p className="news-card__text">{n.text}</p>
          <a href="#" className="news-card__more">
            Подробнее&nbsp;
            <span className="icon-arrow" style={{ borderColor: 'var(--blue)' }} />
          </a>
        </article>
      ))}
    </div>
  </section>
)

export default News
