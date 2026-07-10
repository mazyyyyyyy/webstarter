import { useState, useEffect } from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const FALLBACK = [
  { day: '27', month: 'сен', title: 'Снимаем агрегаты сами!', text: 'Напоминаем, что мы сами производим демонтаж агрегатов, вам нужно только приехать к нам.' },
  { day: '1',  month: 'июл', title: 'Нашим филиалам нужны сотрудники', text: 'Дорогие друзья! У нас открыты вакансии мастеров-механиков и мастеров-приемщиков.' },
  { day: '21', month: 'окт', title: 'Конструктивные особенности', text: 'Некоторые модели автомобилей имеют генераторы с водяным охлаждением, ремонт которых производят наши мастерские.' },
]

function NewsModal({ item, onClose }) {
  if (!item) return null
  return (
    <Modal
      isOpen={!!item}
      onRequestClose={onClose}
      className="news-modal"
      overlayClassName="callback-overlay"
    >
      <div className="news-modal__header">
        <button className="news-modal__close" onClick={onClose} aria-label="Закрыть">✕</button>
        <div className="news-modal__date">
          <span className="news-modal__day">{item.day}</span>
          <span className="news-modal__month">{item.month}</span>
        </div>
        <h2 className="news-modal__title">{item.title}</h2>
      </div>

      <div className="news-modal__body">
        <div className="news-modal__text">
          {item.text.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>
    </Modal>
  )
}

function NewsCard({ n, onClick }) {
  const preview = n.text.length > 100 ? n.text.slice(0, 100) + '…' : n.text
  return (
    <article className="news-card news-card--clickable" onClick={onClick}>
      <div className="news-card__date">
        <span className="news-card__day">{n.day}</span>
        <span className="news-card__month">{n.month}</span>
      </div>
      <h3 className="news-card__title">{n.title}</h3>
      <p className="news-card__text">{preview}</p>
      <span className="news-card__more">
        Подробнее&nbsp;
        <span className="icon-arrow" style={{ borderColor: 'var(--blue)' }} />
      </span>
    </article>
  )
}

const News = () => {
  const [items, setItems]     = useState([])
  const [active, setActive]   = useState(null)

  useEffect(() => {
    fetch('/api/news')
      .then(r => r.json())
      .then(d => setItems(Array.isArray(d) && d.length ? d : FALLBACK))
      .catch(() => setItems(FALLBACK))
  }, [])

  return (
    <section className="section news">
      <div className="section__head">
        <h2 className="section__title">Новости</h2>
        <div className="section__line" />
      </div>

      <div className="news-grid">
        {items.map((n, i) => (
          <NewsCard key={n.id ?? i} n={n} onClick={() => setActive(n)} />
        ))}
      </div>

      <NewsModal item={active} onClose={() => setActive(null)} />
    </section>
  )
}

export default News
