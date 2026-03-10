import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import LibraryPage from './pages/Library/LibraryPage'
import ReaderPage from './pages/Reader/ReaderPage'
import FavoritesPage from './pages/Favorites/FavoritesPage'
import ProfilePage from './pages/Profile/ProfilePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"            element={<HomePage />} />
        <Route path="/biblioteca"  element={<LibraryPage />} />
        <Route path="/libro/:id"   element={<ReaderPage />} />
        <Route path="/favoritos"   element={<FavoritesPage />} />
        <Route path="/perfil"      element={<ProfilePage />} />
        <Route path="*"            element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
