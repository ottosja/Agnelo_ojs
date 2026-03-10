import { useNavigate, useLocation } from 'react-router-dom'

const TABS = [
  { id: 'inicio',    path: '/',          emoji: '🏠', label: 'Inicio' },
  { id: 'biblioteca', path: '/biblioteca', emoji: '📚', label: 'Biblioteca' },
  { id: 'favoritos', path: '/favoritos',  emoji: '⭐', label: 'Favoritos' },
  { id: 'perfil',   path: '/perfil',     emoji: '👤', label: 'Mi perfil' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 safe-bottom no-print"
      style={{ boxShadow: '0 -4px 20px rgba(0,0,0,0.08)' }}
    >
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {TABS.map((tab) => {
          const active =
            tab.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(tab.path)
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center gap-0.5 flex-1 py-1 transition-all"
              aria-label={tab.label}
            >
              <span
                className={`text-2xl transition-transform duration-200 ${active ? 'scale-125' : 'scale-100'}`}
              >
                {tab.emoji}
              </span>
              <span
                className={`text-xs font-semibold transition-colors ${
                  active ? 'text-purple-600' : 'text-gray-400'
                }`}
              >
                {tab.label}
              </span>
              {active && (
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-0.5" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
