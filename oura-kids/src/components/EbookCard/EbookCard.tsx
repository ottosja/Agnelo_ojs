import { useNavigate } from 'react-router-dom'
import type { Ebook } from '../../types'
import { useStore } from '../../store/useStore'
import { CATEGORY_LABELS } from '../../data/ebooks'

interface Props {
  ebook: Ebook
  size?: 'sm' | 'md' | 'lg'
  showBadge?: boolean
}

export default function EbookCard({ ebook, size = 'md', showBadge = true }: Props) {
  const navigate = useNavigate()
  const isOwned = useStore((s) => s.isOwned(ebook.id))
  const isFavorite = useStore((s) => s.isFavorite(ebook.id))
  const toggleFavorite = useStore((s) => s.toggleFavorite)

  const unlocked = ebook.isFree || isOwned

  const cardSizes = {
    sm: 'w-36',
    md: 'w-44',
    lg: 'w-full',
  }

  const coverSizes = {
    sm: 'h-44',
    md: 'h-52',
    lg: 'h-48',
  }

  const handleCardClick = () => {
    navigate(`/libro/${ebook.id}`)
  }

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavorite(ebook.id)
  }

  if (size === 'lg') {
    return (
      <div
        onClick={handleCardClick}
        className="flex gap-4 bg-white rounded-2xl p-4 cursor-pointer shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-[0.98] fade-in"
      >
        {/* Cover */}
        <div
          className={`relative flex-shrink-0 w-24 h-32 rounded-xl flex items-center justify-center bg-gradient-to-br ${ebook.coverGradient}`}
        >
          <span className="text-5xl">{ebook.coverEmoji}</span>
          {!unlocked && (
            <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-end p-1.5 flex-col">
              <span className="text-lg">🔒</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              {showBadge && (
                <span
                  className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-1 ${
                    ebook.isFree
                      ? 'bg-green-100 text-green-700'
                      : isOwned
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {ebook.isFree ? '✅ Gratis' : isOwned ? '✅ Comprado' : '🔒 Premium'}
                </span>
              )}
              <h3 className="font-bold text-gray-900 text-sm leading-tight">{ebook.title}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{ebook.subtitle}</p>
            </div>
            <button
              onClick={handleFavorite}
              className="flex-shrink-0 text-xl p-0.5"
              aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              {isFavorite ? '⭐' : '☆'}
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">{ebook.description}</p>

          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-gray-400">👶 {ebook.ageRange}</span>
            <span className="text-xs text-gray-400">⭐ {ebook.rating}</span>
            <span className="text-xs text-gray-400">
              {CATEGORY_LABELS[ebook.category]}
            </span>
          </div>

          <div className="mt-2">
            {unlocked ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-lg">
                📖 Leer ahora
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
                🛒 Desbloquear
              </span>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={handleCardClick}
      className={`${cardSizes[size]} flex-shrink-0 cursor-pointer group fade-in`}
    >
      {/* Cover */}
      <div className={`relative ${coverSizes[size]} rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-all group-active:scale-95`}>
        <div
          className={`w-full h-full bg-gradient-to-br ${ebook.coverGradient} flex items-center justify-center`}
        >
          <span className={size === 'sm' ? 'text-5xl' : 'text-6xl'}>{ebook.coverEmoji}</span>
        </div>

        {/* Lock overlay */}
        {!unlocked && (
          <div className="lock-overlay">
            <span className="text-2xl mb-1">🔒</span>
            <span className="text-white text-xs font-bold text-center">Toca para desbloquear</span>
          </div>
        )}

        {/* Free badge */}
        {ebook.isFree && showBadge && (
          <span className="absolute top-2 left-2 text-xs font-bold bg-green-500 text-white px-2 py-0.5 rounded-full">
            GRATIS
          </span>
        )}

        {/* Favorite */}
        <button
          onClick={handleFavorite}
          className="absolute top-2 right-2 text-lg bg-white/80 rounded-full w-7 h-7 flex items-center justify-center"
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          {isFavorite ? '⭐' : '☆'}
        </button>
      </div>

      {/* Info */}
      <div className="mt-2 px-1">
        <h3 className="font-bold text-gray-900 text-xs leading-tight truncate">{ebook.title}</h3>
        <p className="text-xs text-gray-400 mt-0.5 truncate">{ebook.ageRange}</p>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-xs text-amber-500">⭐</span>
          <span className="text-xs text-gray-500">{ebook.rating}</span>
        </div>
      </div>
    </div>
  )
}
