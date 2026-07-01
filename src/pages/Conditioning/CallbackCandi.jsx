import { useState } from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root')


const branches = [
  'Дианова, 23 к.2',
  '10 лет Октября, 168/1',
  '4-я Транспортная улица, 36А',
]

export default function CallbackCandi({ isOpen, onClose }) {
  const [branch, setBranch] = useState(branches[0])
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [hp, setHp] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service: 'Ремонт автокондиционеров',
          branch,
          phone,
          website: hp,
        })
      })

      if (res.ok) {
        alert('Заявка отправлена')
        setPhone('')
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
        
        <button
          className="callback-close"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <h2 className="callback-title">
        Ремонт автокондиционеров
      </h2>

      <p className="callback-description">
        Выберите филиал и оставьте номер телефона.
        Наш специалист свяжется с вами в ближайшее время.
      </p>

      <form
        className="callback-form"
        onSubmit={handleSubmit}
      >
        <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
          <input tabIndex={-1} autoComplete="off" value={hp} onChange={e => setHp(e.target.value)} />
        </div>
        <div className="callback-field">
          <label>Филиал</label>

          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          >
            {branches.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
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

        <button
          className="callback-submit"
          
          type="submit"
          disabled={loading}
        >
            
          {loading
            ? 'Отправка...'
            : 'Заказать звонок'}
        </button>
      </form>
    </Modal>
  )
}