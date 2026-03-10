import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/Layout/AppLayout'
import EbookCard from '../../components/EbookCard/EbookCard'
import { EBOOKS, getFreeEbooks, getPremiumEbooks } from '../../data/ebooks'
import { useStore } from '../../store/useStore'

export default function HomePage() {
  const navigate = useNavigate()
  const name = useStore((s) => s.name)
  const isLoggedIn = useStore((s) => s.isLoggedIn)
  const [searchQuery, setSearchQuery] = useState('')

  const greeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return '¡Buenos días'
    if (hour < 18) return '¡Buenas tardes'
    return '¡Buenas noches'
  }

  const freeEbooks = getFreeEbooks()
  const premiumEbooks = getPremiumEbooks()
  const featuredEbook = EBOOKS[0]

  const filteredEbooks = searchQuery.trim()
    ? EBOOKS.filter(
        (e) =>
          e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : null

  return (
    <AppLayout>
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-violet-700 px-5 pt-12 pb-8 safe-top">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-purple-200 text-sm font-medium">
              {isLoggedIn ? `${greeting()}, ${name}! 👋` : '¡Hola! 👋'}
            </p>
            <h1 className="text-white text-2xl font-bold mt-0.5">
              Oura Kids
            </h1>
            <p className="text-purple-200 text-xs mt-0.5">Actividades bíblicas para niños</p>
          </div>
          <button
            onClick={() => navigate('/perfil')}
            className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl"
            aria-label="Perfil"
          >
            {isLoggedIn ? '👤' : '🔑'}
          </button>
        </div>

        {/* Search bar */}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar libros, actividades..."
            className="w-full bg-white rounded-2xl py-3 pl-11 pr-4 text-sm text-gray-700 placeholder-gray-400 outline-none shadow-sm"
          />
        </div>
      </div>

      <div className="px-5 py-5 space-y-7">
        {/* Search results */}
        {filteredEbooks && (
          <section>
            <h2 className="font-bold text-gray-900 text-lg mb-3">
              {filteredEbooks.length > 0
                ? `${filteredEbooks.length} resultado(s) para "${searchQuery}"`
                : `Sin resultados para "${searchQuery}"`}
            </h2>
            <div className="space-y-3">
              {filteredEbooks.map((ebook) => (
                <EbookCard key={ebook.id} ebook={ebook} size="lg" />
              ))}
            </div>
          </section>
        )}

        {!filteredEbooks && (
          <>
            {/* Featured */}
            <section>
              <div
                onClick={() => navigate(`/libro/${featuredEbook.id}`)}
                className={`relative rounded-3xl overflow-hidden cursor-pointer bg-gradient-to-br ${featuredEbook.coverGradient} p-5 active:scale-[0.98] transition-all shadow-lg`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <span className="inline-block text-xs font-bold bg-white/30 text-white px-2 py-0.5 rounded-full mb-2">
                      ⭐ Destacado
                    </span>
                    <h3 className="text-white font-bold text-xl leading-tight">{featuredEbook.title}</h3>
                    <p className="text-white/80 text-sm mt-1">{featuredEbook.subtitle}</p>
                    <div className="mt-3 inline-flex items-center gap-2 bg-white text-purple-700 font-bold text-sm px-4 py-2 rounded-xl">
                      📖 Leer gratis
                    </div>
                  </div>
                  <span className="text-7xl ml-4">{featuredEbook.coverEmoji}</span>
                </div>
              </div>
            </section>

            {/* Stats bar */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { emoji: '📚', value: `${EBOOKS.length}`, label: 'E-books' },
                { emoji: '🎁', value: `${freeEbooks.length}`, label: 'Gratis' },
                { emoji: '✝️', value: '100%', label: 'Bíblico' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-2xl p-3 text-center shadow-sm border border-gray-100"
                >
                  <span className="text-2xl">{stat.emoji}</span>
                  <p className="font-bold text-gray-900 text-lg leading-tight mt-1">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Free books */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-gray-900 text-lg">📖 Libros Gratuitos</h2>
                <button
                  onClick={() => navigate('/biblioteca?filter=gratis')}
                  className="text-sm text-purple-600 font-semibold"
                >
                  Ver todos
                </button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
                {freeEbooks.map((ebook) => (
                  <EbookCard key={ebook.id} ebook={ebook} size="md" />
                ))}
              </div>
            </section>

            {/* Premium books */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-gray-900 text-lg">🔒 Contenido Premium</h2>
                <button
                  onClick={() => navigate('/biblioteca?filter=premium')}
                  className="text-sm text-purple-600 font-semibold"
                >
                  Ver todos
                </button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
                {premiumEbooks.map((ebook) => (
                  <EbookCard key={ebook.id} ebook={ebook} size="md" />
                ))}
              </div>
            </section>

            {/* Categories */}
            <section>
              <h2 className="font-bold text-gray-900 text-lg mb-3">🗂️ Explorar por Categoría</h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { emoji: '✝️', label: 'Biblia', filter: 'biblia', color: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
                  { emoji: '✂️', label: 'Manualidades', filter: 'manualidades', color: 'bg-green-50 text-green-700 border-green-100' },
                  { emoji: '🎵', label: 'Canciones', filter: 'canciones', color: 'bg-pink-50 text-pink-700 border-pink-100' },
                  { emoji: '🎨', label: 'Colorear', filter: 'colorear', color: 'bg-yellow-50 text-yellow-700 border-yellow-100' },
                  { emoji: '📖', label: 'Cuentos', filter: 'cuentos', color: 'bg-orange-50 text-orange-700 border-orange-100' },
                  { emoji: '🎯', label: 'Actividades', filter: 'actividades', color: 'bg-sky-50 text-sky-700 border-sky-100' },
                ].map((cat) => (
                  <button
                    key={cat.filter}
                    onClick={() => navigate(`/biblioteca?filter=${cat.filter}`)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border ${cat.color} transition-all active:scale-95`}
                  >
                    <span className="text-2xl">{cat.emoji}</span>
                    <span className="text-xs font-semibold">{cat.label}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Install app banner */}
            <section className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl p-4 border border-purple-100">
              <div className="flex items-center gap-3">
                <span className="text-3xl">📱</span>
                <div>
                  <h3 className="font-bold text-purple-900 text-sm">¡Instala la aplicación!</h3>
                  <p className="text-xs text-purple-600 mt-0.5">
                    Accede a tus libros sin internet. Toca "Agregar a inicio" en tu navegador.
                  </p>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </AppLayout>
  )
}
