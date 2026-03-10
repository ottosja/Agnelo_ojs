import AppLayout from '../../components/Layout/AppLayout'
import EbookCard from '../../components/EbookCard/EbookCard'
import { useStore } from '../../store/useStore'
import { getEbookById } from '../../data/ebooks'
import { useNavigate } from 'react-router-dom'

export default function FavoritesPage() {
  const navigate = useNavigate()
  const favorites = useStore((s) => s.favorites)
  const favoriteEbooks = favorites.map(getEbookById).filter(Boolean)

  return (
    <AppLayout>
      <div className="px-5 pt-14 pb-4 safe-top">
        <h1 className="font-bold text-gray-900 text-2xl">⭐ Favoritos</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {favoriteEbooks.length} libro{favoriteEbooks.length !== 1 ? 's' : ''} guardado{favoriteEbooks.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="px-5 pb-6">
        {favoriteEbooks.length > 0 ? (
          <div className="space-y-3">
            {favoriteEbooks.map((ebook) => ebook && (
              <EbookCard key={ebook.id} ebook={ebook} size="lg" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-6xl mb-4">⭐</span>
            <h2 className="font-bold text-gray-700 text-lg">Sin favoritos aún</h2>
            <p className="text-sm text-gray-400 mt-2 max-w-xs">
              Toca la estrella (☆) en cualquier libro para guardarlo aquí
            </p>
            <button
              onClick={() => navigate('/biblioteca')}
              className="mt-6 bg-purple-600 text-white font-bold px-6 py-3 rounded-xl"
            >
              📚 Explorar biblioteca
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
