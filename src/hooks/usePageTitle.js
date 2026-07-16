import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SUFFIX = ' — Стартер Сервис'

// Заголовок и meta description для каждого маршрута (важно для SEO SPA)
const ROUTES = {
  '/':                 { title: 'Ремонт стартеров, генераторов и турбокомпрессоров в Омске', desc: 'Профессиональный ремонт стартеров, генераторов, турбокомпрессоров и автокондиционеров с гарантией до 6 месяцев.' },
  '/starter-repair':   { title: 'Ремонт стартеров', desc: 'Ремонт стартеров любой сложности с гарантией до 6 месяцев. Диагностика и проверка на стенде.' },
  '/generator-repair': { title: 'Ремонт генераторов', desc: 'Ремонт автомобильных генераторов с гарантией до 6 месяцев. Быстрая диагностика и честные цены.' },
  '/turbo-repair':     { title: 'Ремонт турбокомпрессоров', desc: 'Ремонт турбокомпрессоров. Приём в ремонт, консультация по стоимости и срокам.' },
  '/conditioning':     { title: 'Ремонт и заправка автокондиционеров', desc: 'Ремонт и заправка автокондиционеров в Омске. Диагностика на стенде, гарантия до 6 месяцев.' },
  '/parts':            { title: 'Запчасти для стартеров и генераторов', desc: 'Запчасти для стартеров и генераторов со склада. Оригинал и аналоги.' },
  '/branches':         { title: 'Филиалы и контакты', desc: 'Адреса филиалов «Стартер Сервис» в Омске, телефоны и режим работы.' },
  '/privacy':          { title: 'Политика конфиденциальности', desc: 'Политика обработки персональных данных сайта «Стартер Сервис».' },
}

export default function usePageTitle() {
  const { pathname } = useLocation()

  useEffect(() => {
    const match = ROUTES[pathname] || ROUTES['/']
    document.title = pathname === '/' ? `${match.title}` + SUFFIX : `${match.title}${SUFFIX}`

    const meta = document.querySelector('meta[name="description"]')
    if (meta && match.desc) meta.setAttribute('content', match.desc)
  }, [pathname])
}
