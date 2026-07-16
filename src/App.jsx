import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Header      from './components/Header'
import Navigation  from './components/Navigation'
import Footer      from './components/Footer'
import FloatingCart from './components/FloatingCart'
import CookieConsent from './components/CookieConsent'
import usePageTitle from './hooks/usePageTitle'

import Home            from './pages/Home/Home'
import StarterRepair   from './pages/StarterRepair/StarterRepair'
import GeneratorRepair from './pages/GeneratorRepair/GeneratorRepair'
import Parts           from './pages/Parts/Parts'
import Conditioning    from './pages/Conditioning/Conditioning'
import TurboRepair     from './pages/TurboRepair/TurboRepair'
import Branches        from './pages/Branches/Branches'
import ProductCard     from './pages/ProductCard/ProductCard'
import Privacy         from './pages/Legal/Privacy'

// Админка грузится отдельным чанком — публичным посетителям её код не отдаётся
const AdminLogin      = lazy(() => import('./pages/Admin/AdminLogin'))
const AdminPrices     = lazy(() => import('./pages/Admin/AdminPrices'))
const AdminParts      = lazy(() => import('./pages/Admin/AdminParts'))
const AdminCategories = lazy(() => import('./pages/Admin/AdminCategories'))
const AdminNews       = lazy(() => import('./pages/Admin/AdminNews'))

const App = () => {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')

  usePageTitle()

  return (
    <>
      {!isAdmin && <Header />}
      {!isAdmin && <Navigation />}

      <main>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/"                 element={<Home />} />
            <Route path="/starter-repair"   element={<StarterRepair />} />
            <Route path="/generator-repair" element={<GeneratorRepair />} />
            <Route path="/parts"            element={<Parts />} />
            <Route path="/parts/:id"        element={<ProductCard />} />
            <Route path="/conditioning"     element={<Conditioning />} />
            <Route path="/turbo-repair"     element={<TurboRepair />} />
            <Route path="/branches"         element={<Branches />} />
            <Route path="/privacy"          element={<Privacy />} />

            <Route path="/admin/login"       element={<AdminLogin />} />
            <Route path="/admin/prices"      element={<AdminPrices />} />
            <Route path="/admin/parts"       element={<AdminParts />} />
            <Route path="/admin/categories"  element={<AdminCategories />} />
            <Route path="/admin/news"        element={<AdminNews />} />
          </Routes>
        </Suspense>
      </main>

      {!isAdmin && <Footer />}
      {!isAdmin && <FloatingCart />}
      {!isAdmin && <CookieConsent />}
    </>
  )
}

export default App
