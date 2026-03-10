import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import AppLayout from '../../components/Layout/AppLayout'
import EbookCard from '../../components/EbookCard/EbookCard'
import { EBOOKS } from '../../data/ebooks'
import type { Category } from '../../types'

type Filter = 'todos' | 'gratis' | 'premium' | Category

const FILTERS: { id: Filter; label: string; emoji: string }[] = [
  { id: 'todos',        label: 'Todos',        emoji: '📚' },
  { id: 'gratis',       label: 'Gratis',       emoji: '🎁' },
  { id: 'premium',      label: 'Premium',      emoji: '⭐' },
  { id: 'biblia',       label: 'Biblia',       emoji: '✝️' },
  { id: 'manualidades', label: 'Manualidades', emoji: '✂️' },
  { id: 'canciones',    label: 'Canciones',    emoji: '🎵' },
  { id: 'actividades',  label: 'Actividades',  emoji: '🎯' },
  { id: 'colorear',     label: 'Colorear',     emoji: '🎨' },
  { id: 'cuentos',      label: 'Cuentos',      emoji: '📖' },
]

export default function LibraryPage() {
  const [searchParams] = useSearchParams()
  const [activeFilter, setActiveFilter] = useState<Filter>('todos')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<'popular' | 'rating' | 'name'>('popular')

  useEffect(() => {
    const filter = searchParams.get('filter') as Filter
    if (filter) setActiveFilter(filter)
  }, [searchParams])

  const getFilteredEbooks = () => {
    let list = EBOOKS

    // Category / type filter
    if (activeFilter === 'gratis')        list = list.filter((e) => e.isFree)
    else if (activeFilter === 'premium')  list = list.filter((e) => !e.isFree)
    else if (activeFilter !== 'todos')    list = list.filter((e) => e.category === activeFilter)

    // Search
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.subtitle.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q),
      )
    }

    // Sort
    if (sort === 'popular') list = [...list].sort((a, b) => b.reviewCount - a.reviewCount)
    if (sort === 'rating')  list = [...list].sort((a, b) => b.rating - a.rating)
    if (sort === 'name')    list = [...list].sort((a, b) => a.title.localeCompare(b.title))

    return list
  }

  const ebooks = getFilteredEbooks()

  return (
    <AppLayout>
      {/* Header */}
      <div className="bg-white px-5 pt-14 pb-4 safe-top border-b border-gray-100 sticky top-0 z-10">
        <h1 className="font-bold text-gray-900 text-2xl">📚 Biblioteca</h1>
        <p className="text-sm text-gray-500 mt-0.5">{EBOOKS.length} libros disponibles</p>

        {/* Search */}
        <div className="relative mt-3">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar en la biblioteca..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-purple-400 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="overflow-x-auto px-5 py-3 flex gap-2 scrollbar-hide bg-white border-b border-gray-100">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === f.id
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>{f.emoji}</span>
            <span>{f.label}</span>
          </button>
        ))}
      </div>

      <div className="px-5 py-4">
        {/* Sort + count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-900">{ebooks.length}</span> libros
          </p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="text-xs bg-gray-100 border-none rounded-lg px-3 py-1.5 text-gray-700 font-medium outline-none"
          >
            <option value="popular">Más populares</option>
            <option value="rating">Mejor valorados</option>
            <option value="name">Alfabético</option>
          </select>
        </div>

        {/* Book list */}
        {ebooks.length > 0 ? (
          <div className="space-y-3">
            {ebooks.map((ebook) => (
              <EbookCard key={ebook.id} ebook={ebook} size="lg" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="text-5xl mb-4">🔍</span>
            <p className="font-bold text-gray-700 text-lg">Sin resultados</p>
            <p className="text-sm text-gray-400 mt-1">
              Intenta con otra búsqueda o categoría
            </p>
            <button
              onClick={() => { setSearch(''); setActiveFilter('todos') }}
              className="mt-4 text-sm text-purple-600 font-semibold bg-purple-50 px-4 py-2 rounded-xl"
            >
              Mostrar todos
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
