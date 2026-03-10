import type { Ebook } from '../../types'
import { useStore } from '../../store/useStore'

interface Props {
  ebook: Ebook
  onClose: () => void
}

export default function PurchaseModal({ ebook, onClose }: Props) {
  const isLoggedIn = useStore((s) => s.isLoggedIn)

  const handlePurchase = () => {
    if (!ebook.hotmartUrl) return
    // Open Hotmart in a new tab/window
    // After purchase, user returns and can use the "I already purchased" flow
    window.open(ebook.hotmartUrl, '_blank', 'noopener,noreferrer')
    onClose()
  }

  const handleAlreadyPurchased = () => {
    // In production this would verify via Hotmart API/webhook
    // For demo: allow manual unlock
    const store = useStore.getState()
    store.addPurchase({
      ebookId: ebook.id,
      purchasedAt: new Date().toISOString(),
    })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-3xl w-full max-w-lg p-6 pb-8 fade-in"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: '0 -8px 40px rgba(0,0,0,0.15)' }}
      >
        {/* Handle bar */}
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />

        {/* Cover preview */}
        <div className="flex gap-4 mb-6">
          <div
            className={`w-20 h-28 rounded-xl flex-shrink-0 flex items-center justify-center bg-gradient-to-br ${ebook.coverGradient}`}
          >
            <span className="text-4xl">{ebook.coverEmoji}</span>
          </div>
          <div>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              🔒 Contenido Premium
            </span>
            <h2 className="font-bold text-gray-900 text-lg mt-1 leading-tight">{ebook.title}</h2>
            <p className="text-sm text-gray-500">{ebook.subtitle}</p>
            <p className="text-xs text-gray-400 mt-1">👶 {ebook.ageRange} · ⭐ {ebook.rating} ({ebook.reviewCount} reseñas)</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">{ebook.description}</p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {[
            { emoji: '📖', text: 'Lectura interactiva' },
            { emoji: '✏️', text: 'Notas y marcadores' },
            { emoji: '🖨️', text: 'Impresión incluida' },
            { emoji: '📥', text: 'Acceso permanente' },
          ].map((f) => (
            <div key={f.text} className="flex items-center gap-2 bg-purple-50 rounded-xl px-3 py-2">
              <span>{f.emoji}</span>
              <span className="text-xs font-medium text-purple-800">{f.text}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={handlePurchase}
          className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold py-4 rounded-2xl text-base shadow-lg shadow-purple-200 active:scale-[0.98] transition-all"
        >
          🛒 Comprar en Hotmart
        </button>

        {isLoggedIn && (
          <button
            onClick={handleAlreadyPurchased}
            className="w-full mt-3 text-sm text-purple-600 font-semibold py-2"
          >
            Ya compré este libro — Activar acceso
          </button>
        )}

        {!isLoggedIn && (
          <p className="text-center text-xs text-gray-400 mt-3">
            Después de comprar, inicia sesión para activar tu libro
          </p>
        )}

        <p className="text-center text-xs text-gray-400 mt-2">
          Pago seguro · Acceso inmediato · Hotmart
        </p>

        <button
          onClick={onClose}
          className="w-full mt-4 text-sm text-gray-400 py-1"
        >
          Cerrar
        </button>
      </div>
    </div>
  )
}
