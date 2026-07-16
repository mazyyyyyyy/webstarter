import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'cookieConsent' // 'accepted' | 'declined'

const CookieConsent = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Показываем баннер только если выбор ещё не сделан
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
  }, [])

  const decide = (choice) => {
    try { localStorage.setItem(STORAGE_KEY, choice) } catch { /* приватный режим */ }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Уведомление об использовании cookie">
      <p className="cookie-banner__text">
        Мы используем cookie-файлы для корректной работы сайта. Продолжая пользоваться
        сайтом, вы соглашаетесь с обработкой данных в соответствии с{' '}
        <Link to="/privacy" className="cookie-banner__link">политикой конфиденциальности</Link>.
      </p>
      <div className="cookie-banner__actions">
        <button className="cookie-banner__btn cookie-banner__btn--accept" onClick={() => decide('accepted')}>
          Принять
        </button>
        <button className="cookie-banner__btn cookie-banner__btn--decline" onClick={() => decide('declined')}>
          Отклонить
        </button>
      </div>
    </div>
  )
}

export default CookieConsent
