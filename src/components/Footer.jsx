import { Link } from 'react-router-dom'
import LogoSVG from './Logo'

const Footer = () => (
  <footer className="site-footer">
    <div className="container">

      <div className="footer-brand">
        <div className="footer-brand__logo">
          <LogoSVG width={300} height={72} />
        </div>
        <a
          href="https://vk.com/starterservice"
          className="footer-vk"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="footer-vk__icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
              <path d="M21.547 7h-3.29a.743.743 0 0 0-.655.392s-1.312 2.416-1.734 3.23C14.734 12.813 14 12.126 14 11.11V7.603A1.104 1.104 0 0 0 12.896 6.5h-2.474a1.982 1.982 0 0 0-1.75.813s1.255-.204 1.255 1.49c0 .42.022 1.626.04 2.64a.73.73 0 0 1-1.272.503 21.54 21.54 0 0 1-2.498-4.543.693.693 0 0 0-.63-.403h-2.99a.508.508 0 0 0-.48.685C3.005 10.175 6.918 18 11.38 18h1.878a.742.742 0 0 0 .742-.742v-1.135a.73.73 0 0 1 1.23-.53l2.247 2.112a1.09 1.09 0 0 0 .746.295h2.953c1.424 0 1.424-.988.647-1.753-.546-.538-2.518-2.617-2.518-2.617a1.02 1.02 0 0 1-.078-1.323c.637-.84 1.68-2.212 2.122-2.8.603-.804 1.697-2.507.197-2.507z"/>
            </svg>
          </span>
          Переходите в VK
          <span className="footer-vk__arrow">→</span>
        </a>
      </div>

      <nav className="footer-col" aria-label="Навигация в футере">
        <p className="footer-col__heading">Меню</p>
        <ul className="footer-col__links">
          <li><Link to="/starter-repair"   className="footer-col__link">Ремонт стартеров</Link></li>
          <li><Link to="/generator-repair" className="footer-col__link">Ремонт генераторов</Link></li>
          <li><Link to="/conditioning"     className="footer-col__link">Заправка кондиционеров</Link></li>
          <li><Link to="/parts"            className="footer-col__link">Запчасти</Link></li>
          <li><Link to="/branches"         className="footer-col__link">Филиалы</Link></li>
        </ul>
      </nav>

      <nav className="footer-col" aria-label="Запчасти">
        <p className="footer-col__heading">Запчасти</p>
        <ul className="footer-col__links">
          <li><Link to="/parts?categoryId=1" className="footer-col__link">Стартеры</Link></li>
          <li><Link to="/parts?categoryId=3" className="footer-col__link">Генераторы</Link></li>
        </ul>
      </nav>

      <address className="footer-col" style={{ fontStyle: 'normal' }}>
        <p className="footer-col__heading">Контакты</p>
        <p className="footer-col__contact">
          © 2020г. «Стартер Сервис»<br/>
          ул. 10 лет Октября 168/1<br/>
          ул. Дианова 23 корп. 2<br/>
          ул. 4-я Транспортная, 36А
        </p>
        <p className="footer-col__contact">
          <a href="tel:+79585836645" className="footer-col__link">+7 (958) 583-66-45</a>
        </p>
        <p className="footer-col__contact">
          <a href="mailto:info@starterservice.ru" className="footer-col__link">info@starterservice.ru</a>
        </p>
      </address>

    </div>
  </footer>
)

export default Footer
