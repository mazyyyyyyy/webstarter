// Мессенджер Max — диалог открывается по номеру основного телефона
export const MAX_URL = 'https://max.ru/+79585836645'

const MaxIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
    <path d="M12 2C6.477 2 2 5.94 2 10.8c0 2.77 1.457 5.24 3.735 6.85-.16 1.36-.69 2.62-1.53 3.66a.4.4 0 0 0 .35.66c1.98-.28 3.74-1.06 5.19-2.2.73.13 1.48.2 2.255.2 5.523 0 10-3.94 10-8.8S17.523 2 12 2z"/>
  </svg>
)

// Ссылка «Написать в Max» — пилюля в футере, рядом с кнопкой VK
const MaxLink = ({ label = 'Написать в Max' }) => (
  <a
    href={MAX_URL}
    className="max-link max-link--footer"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span className="max-link__icon">
      <MaxIcon />
    </span>
    <span className="max-link__label">{label}</span>
    <span className="max-link__arrow">→</span>
  </a>
)

export default MaxLink
