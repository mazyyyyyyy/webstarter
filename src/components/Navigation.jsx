import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/',                   label: 'Главная',               end: true },
  { to: '/starter-repair',     label: 'Ремонт стартеров' },
  { to: '/generator-repair',   label: 'Ремонт генераторов' },
  { to: '/parts',              label: 'Запчасти' },
  { to: '/conditioning',       label: 'Ремонт кондиционеров' },
  { to: '/branches',           label: 'Филиалы' },
]

const Navigation = () => {
  const navRef   = useRef(null)
  const location = useLocation()
  const [open, setOpen] = useState(false)

  // Close mobile menu on route change
  useEffect(() => { setOpen(false) }, [location.pathname])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Sticky/floating nav effect
  useEffect(() => {
    const nav    = navRef.current
    const header = nav?.previousElementSibling
    const threshold = () => (header ? Math.max(0, header.offsetHeight - 10) : 120)
    let isFloating = false

    const setFloating = next => {
      if (!nav || next === isFloating) return
      isFloating = next
      if (next) {
        nav.classList.add('is-entering', 'is-floating')
        requestAnimationFrame(() => nav.classList.remove('is-entering'))
      } else {
        nav.classList.remove('is-floating', 'is-entering')
      }
    }

    const onScroll = () => setFloating(window.scrollY > threshold())
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <>
      <nav className="site-nav" ref={navRef} aria-label="Основная навигация">
        <div className="nav-inner">
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}
            >
              {label}
            </NavLink>
          ))}

          <button
            className={`nav-hamburger${open ? ' nav-hamburger--open' : ''}`}
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
          >
            <span className="nav-hamburger__line" />
            <span className="nav-hamburger__line" />
            <span className="nav-hamburger__line" />
          </button>
        </div>
      </nav>

      {open && (
        <div className="mobile-menu" onClick={() => setOpen(false)}>
          <div className="mobile-menu__panel" onClick={e => e.stopPropagation()}>
            <button className="mobile-menu__close" onClick={() => setOpen(false)} aria-label="Закрыть">✕</button>
            {NAV_LINKS.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => isActive ? 'mobile-nav-link mobile-nav-link--active' : 'mobile-nav-link'}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Navigation
