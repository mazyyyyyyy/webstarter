// Мессенджер Max — диалог открывается по номеру основного телефона
export const MAX_URL = 'https://max.ru/+79585836645'

const MaxIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
    <path d="M12 2C6.477 2 2 5.94 2 10.8c0 2.77 1.457 5.24 3.735 6.85-.16 1.36-.69 2.62-1.53 3.66a.4.4 0 0 0 .35.66c1.98-.28 3.74-1.06 5.19-2.2.73.13 1.48.2 2.255.2 5.523 0 10-3.94 10-8.8S17.523 2 12 2z"/>
  </svg>
)

/**
 * Ссылка «Написать в Max».
 * variant='footer' — пилюля в футере, variant='header' — компактная кнопка в шапке.
 */
const MaxLink = ({ variant = 'footer', label = 'Написать в Max' }) => (
  <a
    href={MAX_URL}
    className={`max-link max-link--${variant}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    title={label}
  >
    <span className="max-link__icon">
      <MaxIcon size={variant === 'header' ? 20 : 18} />
    </span>
    <span className="max-link__label">{label}</span>
  </a>
)

export default MaxLink
