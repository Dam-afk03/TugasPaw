import { HashRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from './components/mainLayout'
import { StoreProvider } from './context/storeContext'
import { CatalogPage } from './pages/CatalogPage'
import { DetailPage } from './pages/detailPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { WishlistPage } from './pages/WhislistPage'

export function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="katalog" element={<CatalogPage />} />
            <Route path="katalog/:id" element={<DetailPage />} />
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </StoreProvider>
  )
}

export default App