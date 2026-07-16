import { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const branches = [
  'Дианова, 23 к.2',
  '10 лет Октября, 168/1',
  '4-я Транспортная улица, 36А',
]

/**
 * Единая модалка заявки для всех страниц.
 * @param {string} service — какая услуга (уходит в Telegram и в заголовок)
 * @param {string} title   — заголовок модалки (по умолчанию = service)
 */
export default function CallbackModal({ isOpen, onClose, service = 'Заказать звонок', title }) {
  const [branch, setBranch] = useState(branches[0])
  const [phone, setPhone] = useState('')
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [hp, setHp] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!consent) return

    setLoading(true)

    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service, branch, phone, website: hp }),
      })

      if (res.ok) {
        alert('Заявка отправлена')
        setPhone('')
        setConsent(false)
        onClose()
      }
    } catch (err) {
      console.error(err)
      alert('Ошибка отправки')
    }

    setLoading(false)
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="callback-modal"
      overlayClassName="callback-overlay"
    >
      <div className="callback-header">
        <button className="callback-close" onClick={onClose} aria-label="Закрыть">✕</button>
      </div>

      <h2 className="callback-title">{title || service}</h2>

      <p className="callback-description">
        Выберите филиал и оставьте номер телефона.
        Наш специалист свяжется с вами в ближайшее время.
      </p>

      <form className="callback-form" onSubmit={handleSubmit}>
        {/* honeypot от ботов */}
        <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
          <input tabIndex={-1} autoComplete="off" value={hp} onChange={e => setHp(e.target.value)} />
        </div>

        <div className="callback-field">
          <label>Филиал</label>
          <select value={branch} onChange={(e) => setBranch(e.target.value)}>
            {branches.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="callback-field">
          <label>Ваш номер телефона</label>
          <input
            type="tel"
            placeholder="+7 (999) 999-99-99"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <label className="callback-consent">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
          />
          <span>
            Я согласен(-на) на обработку персональных данных и принимаю условия{' '}
            <Link to="/privacy" target="_blank" rel="noopener noreferrer">
              политики конфиденциальности
            </Link>.
          </span>
        </label>

        <button
          className="callback-submit"
          type="submit"
          disabled={loading || !consent}
        >
          {loading ? 'Отправка...' : 'Заказать звонок'}
        </button>
      </form>
    </Modal>
  )
}
