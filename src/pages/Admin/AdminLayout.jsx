import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const AdminLayout = ({ children }) => {
  const location = useLocation()
  const navigate  = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) navigate('/admin/login')
  }, [])

  const logout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin/login')
  }

  const active = path => location.pathname === path ? 'admin-nav-link--active' : ''

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__logo">
          <span className="admin-sidebar__brand">Стартер Сервис</span>
          <span className="admin-sidebar__sub">Администрация</span>
        </div>
        <nav className="admin-sidebar__nav">
          <Link to="/admin/prices" className={`admin-nav-link ${active('/admin/prices')}`}>
            Прайс-листы
          </Link>
          <Link to="/admin/parts" className={`admin-nav-link ${active('/admin/parts')}`}>
            Запчасти
          </Link>
          <Link to="/admin/categories" className={`admin-nav-link ${active('/admin/categories')}`}>
            Категории
          </Link>
          <Link to="/admin/news" className={`admin-nav-link ${active('/admin/news')}`}>
            Новости
          </Link>
        </nav>
        <button className="admin-logout" onClick={logout}>
          Выйти
        </button>
      </aside>
      <main className="admin-content">
        {children}
      </main>
    </div>
  )
}

export default AdminLayout
