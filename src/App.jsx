import { Routes, Route, useLocation } from 'react-router-dom'

import Header      from './components/Header'
import Navigation  from './components/Navigation'
import Footer      from './components/Footer'

import Home            from './pages/Home/Home'
import StarterRepair   from './pages/StarterRepair/StarterRepair'
import GeneratorRepair from './pages/GeneratorRepair/GeneratorRepair'
import Parts           from './pages/Parts/Parts'
import Conditioning    from './pages/Conditioning/Conditioning'
import Branches        from './pages/Branches/Branches'
import ProductCard     from './pages/ProductCard/ProductCard'

import AdminLogin      from './pages/Admin/AdminLogin'
import AdminPrices     from './pages/Admin/AdminPrices'
import AdminParts      from './pages/Admin/AdminParts'
import AdminCategories from './pages/Admin/AdminCategories'

const App = () => {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <>
      {!isAdmin && <Header />}
      {!isAdmin && <Navigation />}

      <main>
        <Routes>
          <Route path="/"                 element={<Home />} />
          <Route path="/starter-repair"   element={<StarterRepair />} />
          <Route path="/generator-repair" element={<GeneratorRepair />} />
          <Route path="/parts"            element={<Parts />} />
          <Route path="/parts/:id"        element={<ProductCard />} />
          <Route path="/conditioning"     element={<Conditioning />} />
          <Route path="/branches"         element={<Branches />} />

          <Route path="/admin/login"       element={<AdminLogin />} />
          <Route path="/admin/prices"      element={<AdminPrices />} />
          <Route path="/admin/parts"       element={<AdminParts />} />
          <Route path="/admin/categories"  element={<AdminCategories />} />
        </Routes>
      </main>

      {!isAdmin && <Footer />}
    </>
  )
}

export default App
