import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/Layout/AppLayout'
import { useStore } from '../../store/useStore'
import { getEbookById } from '../../data/ebooks'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { name, email, isLoggedIn, purchases, annotations, notes, readingProgress, favorites, login, logout } =
    useStore()

  const [showLoginForm, setShowLoginForm] = useState(false)
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')

  const handleLogin = () => {
    if (!formName.trim() || !formEmail.trim()) return
    login(formName.trim(), formEmail.trim())
    setShowLoginForm(false)
    setFormName('')
    setFormEmail('')
  }

  const purchasedEbooks = purchases.map((p) => getEbookById(p.ebookId)).filter(Boolean)
  const inProgressEbooks = Object.entries(readingProgress)
    .filter(([, page]) => page > 1)
    .map(([id]) => getEbookById(id))
    .filter(Boolean)

  const totalAnnotations = annotations.length + notes.length

  if (!isLoggedIn) {
    return (
      <AppLayout>
        <div className="px-5 pt-14 pb-6 safe-top">
          <h1 className="font-bold text-gray-900 text-2xl">👤 Mi Perfil</h1>
        </div>

        <div className="px-5 space-y-4">
          {/* Guest state */}
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 text-center border border-purple-100">
            <span className="text-5xl">👋</span>
            <h2 className="font-bold text-purple-900 text-lg mt-3">¡Inicia sesión!</h2>
            <p className="text-sm text-purple-600 mt-1">
              Guarda tu progreso, anotaciones y libros comprados en cualquier dispositivo.
            </p>
          </div>

          {!showLoginForm ? (
            <button
              onClick={() => setShowLoginForm(true)}
              className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold py-4 rounded-2xl shadow-md shadow-purple-200"
            >
              🔑 Iniciar sesión
            </button>
          ) : (
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-900">Ingresa tus datos</h3>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                  Tu nombre
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Ej: María"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-400 transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-400 transition-all"
                />
              </div>
              <button
                onClick={handleLogin}
                disabled={!formName.trim() || !formEmail.trim()}
                className="w-full bg-purple-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl"
              >
                Entrar
              </button>
              <button
                onClick={() => setShowLoginForm(false)}
                className="w-full text-sm text-gray-400"
              >
                Cancelar
              </button>
            </div>
          )}

          {/* What you get */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-gray-900 text-sm mb-3">¿Qué obtienes al registrarte?</h3>
            <div className="space-y-2">
              {[
                { emoji: '📚', text: 'Acceso a todos los libros gratuitos' },
                { emoji: '✏️', text: 'Guarda tus notas y anotaciones' },
                { emoji: '📖', text: 'Sigue tu progreso de lectura' },
                { emoji: '🛒', text: 'Activa tus compras de Hotmart' },
                { emoji: '⭐', text: 'Lista de favoritos' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <span className="text-xl">{item.emoji}</span>
                  <span className="text-sm text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-violet-700 px-5 pt-14 pb-8 safe-top">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">
            👤
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">{name}</h1>
            <p className="text-purple-200 text-sm">{email}</p>
            <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full mt-1 inline-block">
              ✅ Cuenta activa
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-5">
          {[
            { value: purchasedEbooks.length, label: 'Comprados', emoji: '🛒' },
            { value: favorites.length,       label: 'Favoritos', emoji: '⭐' },
            { value: totalAnnotations,       label: 'Notas',     emoji: '📝' },
          ].map((s) => (
            <div key={s.label} className="bg-white/15 rounded-xl p-3 text-center">
              <span className="text-xl">{s.emoji}</span>
              <p className="text-white font-bold text-lg leading-tight">{s.value}</p>
              <p className="text-purple-200 text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 py-5 space-y-6">
        {/* Continue reading */}
        {inProgressEbooks.length > 0 && (
          <section>
            <h2 className="font-bold text-gray-900 text-base mb-3">📖 Continuar leyendo</h2>
            <div className="space-y-3">
              {inProgressEbooks.map((ebook) => ebook && (
                <button
                  key={ebook.id}
                  onClick={() => navigate(`/libro/${ebook.id}`)}
                  className="w-full flex items-center gap-3 bg-white rounded-2xl p-3 shadow-sm border border-gray-100 text-left"
                >
                  <div
                    className={`w-12 h-16 rounded-xl flex items-center justify-center bg-gradient-to-br ${ebook.coverGradient} flex-shrink-0`}
                  >
                    <span className="text-2xl">{ebook.coverEmoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{ebook.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Página {readingProgress[ebook.id]}
                    </p>
                    <div className="mt-1.5 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full"
                        style={{
                          width: `${Math.round((readingProgress[ebook.id] / ebook.pages.length) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-purple-600 text-sm">→</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Purchased books */}
        {purchasedEbooks.length > 0 && (
          <section>
            <h2 className="font-bold text-gray-900 text-base mb-3">🛒 Mis Compras</h2>
            <div className="space-y-2">
              {purchasedEbooks.map((ebook) => ebook && (
                <button
                  key={ebook.id}
                  onClick={() => navigate(`/libro/${ebook.id}`)}
                  className="w-full flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-left"
                >
                  <div
                    className={`w-10 h-14 rounded-lg flex items-center justify-center bg-gradient-to-br ${ebook.coverGradient} flex-shrink-0`}
                  >
                    <span className="text-xl">{ebook.coverEmoji}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{ebook.title}</p>
                    <p className="text-xs text-green-600 font-medium">✅ Acceso completo</p>
                  </div>
                  <span className="ml-auto text-purple-600 text-sm">→</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Annotations summary */}
        {annotations.length > 0 && (
          <section>
            <h2 className="font-bold text-gray-900 text-base mb-3">📌 Mis Anotaciones</h2>
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-2">
              {annotations.slice(0, 5).map((ann) => {
                const ebook = getEbookById(ann.ebookId)
                return (
                  <div key={ann.id} className="flex items-start gap-2">
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                      style={{ backgroundColor: ann.color }}
                    />
                    <div>
                      <p className="text-xs text-gray-600 leading-relaxed">"{ann.text}"</p>
                      {ebook && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          {ebook.title} · Pág. {ann.pageNumber}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
              {annotations.length > 5 && (
                <p className="text-xs text-gray-400 text-center">
                  +{annotations.length - 5} más...
                </p>
              )}
            </div>
          </section>
        )}

        {/* Settings */}
        <section>
          <h2 className="font-bold text-gray-900 text-base mb-3">⚙️ Configuración</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
            {[
              { emoji: '📱', label: 'Instalar la aplicación', action: () => {} },
              { emoji: '🔔', label: 'Notificaciones', action: () => {} },
              { emoji: '🌐', label: 'Idioma: Español', action: () => {} },
              { emoji: '❤️', label: 'Califica la aplicación', action: () => {} },
              { emoji: '💬', label: 'Soporte / Contacto', action: () => {} },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left"
              >
                <span className="text-xl">{item.emoji}</span>
                <span className="text-sm text-gray-700 font-medium">{item.label}</span>
                <span className="ml-auto text-gray-300">›</span>
              </button>
            ))}
          </div>
        </section>

        {/* Logout */}
        <button
          onClick={() => {
            if (confirm('¿Cerrar sesión? Tu progreso quedará guardado.')) logout()
          }}
          className="w-full border border-red-200 text-red-500 font-semibold py-3.5 rounded-2xl text-sm"
        >
          🚪 Cerrar sesión
        </button>
      </div>
    </AppLayout>
  )
}
