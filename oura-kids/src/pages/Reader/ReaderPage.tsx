import { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AppLayout from '../../components/Layout/AppLayout'
import PurchaseModal from '../../components/PurchaseModal/PurchaseModal'
import { getEbookById } from '../../data/ebooks'
import { useStore } from '../../store/useStore'
import type { Annotation, PageContent, TextContent, ImageContent, ActivityContent, ColoringContent } from '../../types'

const HIGHLIGHT_COLORS = ['#FCD34D', '#86EFAC', '#93C5FD', '#F9A8D4', '#C4B5FD']

export default function ReaderPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const ebook = getEbookById(id ?? '')

  const isOwned = useStore((s) => s.isOwned(id ?? ''))
  const addAnnotation = useStore((s) => s.addAnnotation)
  const getAnnotationsForPage = useStore((s) => s.getAnnotationsForPage)
  const removeAnnotation = useStore((s) => s.removeAnnotation)
  const setReadingProgress = useStore((s) => s.setReadingProgress)
  const getReadingProgress = useStore((s) => s.getReadingProgress)

  const initialPage = ebook ? getReadingProgress(ebook.id) : 1
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [showTools, setShowTools] = useState(false)
  const [selectedColor, setSelectedColor] = useState(HIGHLIGHT_COLORS[0])
  const [noteText, setNoteText] = useState('')
  const [showNoteInput, setShowNoteInput] = useState(false)
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({})
  const pageRef = useRef<HTMLDivElement>(null)

  if (!ebook) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-full py-20">
          <span className="text-5xl mb-4">📭</span>
          <p className="font-bold text-gray-700">Libro no encontrado</p>
          <button onClick={() => navigate(-1)} className="mt-4 text-purple-600 font-semibold">
            ← Volver
          </button>
        </div>
      </AppLayout>
    )
  }

  const isAccessible = ebook.isFree || isOwned
  const previewLimit = ebook.previewPages ?? 1
  const canReadPage = isAccessible || currentPage <= previewLimit

  const totalPages = ebook.pages.length
  const page = ebook.pages[currentPage - 1]
  const pageAnnotations = getAnnotationsForPage(ebook.id, currentPage)

  const goToPage = (p: number) => {
    const newPage = Math.max(1, Math.min(p, totalPages))
    if (!isAccessible && newPage > previewLimit) {
      setShowPurchaseModal(true)
      return
    }
    setCurrentPage(newPage)
    setReadingProgress(ebook.id, newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleHighlight = () => {
    const selection = window.getSelection()
    const text = selection?.toString().trim()
    if (!text) return
    const annotation: Annotation = {
      id: `ann-${Date.now()}`,
      ebookId: ebook.id,
      pageNumber: currentPage,
      text,
      color: selectedColor,
      createdAt: new Date().toISOString(),
    }
    addAnnotation(annotation)
    selection?.removeAllRanges()
  }

  const handleAddNote = () => {
    if (!noteText.trim()) return
    const annotation: Annotation = {
      id: `note-${Date.now()}`,
      ebookId: ebook.id,
      pageNumber: currentPage,
      text: noteText,
      color: selectedColor,
      createdAt: new Date().toISOString(),
      note: noteText,
    }
    addAnnotation(annotation)
    setNoteText('')
    setShowNoteInput(false)
  }

  const handlePrint = () => {
    window.print()
  }

  const toggleAnswer = (questionId: string) => {
    setShowAnswers((prev) => ({ ...prev, [questionId]: !prev[questionId] }))
  }

  const renderContent = (content: PageContent, idx: number) => {
    switch (content.type) {
      case 'text': {
        const tc = content as TextContent
        const styleClasses: Record<string, string> = {
          heading:     'text-2xl font-bold text-gray-900 mt-2',
          verse:       'text-base italic text-purple-800 bg-purple-50 border-l-4 border-purple-400 pl-4 py-3 rounded-r-xl',
          story:       'text-base text-gray-700 leading-relaxed',
          instruction: 'text-sm text-gray-700 bg-amber-50 border border-amber-100 rounded-xl p-4 whitespace-pre-line',
          'fun-fact':  'text-base font-semibold text-green-800 bg-green-50 rounded-xl p-4',
        }
        const alignClass = tc.alignment === 'center' ? 'text-center' : tc.alignment === 'right' ? 'text-right' : ''
        return (
          <p
            key={idx}
            className={`${styleClasses[tc.style ?? 'story'] ?? ''} ${alignClass}`}
          >
            {tc.text}
          </p>
        )
      }

      case 'image': {
        const ic = content as ImageContent
        const sizeClass = ic.size === 'large' ? 'text-8xl' : ic.size === 'small' ? 'text-4xl' : 'text-6xl'
        return (
          <div key={idx} className="flex flex-col items-center gap-2 my-4">
            <span className={`${sizeClass} bounce-gentle`}>{ic.emoji}</span>
            {ic.caption && <p className="text-sm text-gray-500 italic">{ic.caption}</p>}
          </div>
        )
      }

      case 'activity': {
        const ac = content as ActivityContent
        const qid = `q-${idx}`
        return (
          <div key={idx} className="bg-blue-50 border border-blue-100 rounded-2xl p-4 space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-xl">💭</span>
              <p className="font-semibold text-blue-900 text-sm leading-relaxed">{ac.question}</p>
            </div>
            {ac.hint && (
              <p className="text-xs text-blue-600 italic">💡 Pista: {ac.hint}</p>
            )}
            {ac.answer && (
              <button
                onClick={() => toggleAnswer(qid)}
                className="text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1.5 rounded-lg"
              >
                {showAnswers[qid] ? '🙈 Ocultar respuesta' : '✅ Ver respuesta'}
              </button>
            )}
            {ac.answer && showAnswers[qid] && (
              <p className="text-sm text-green-700 font-semibold bg-green-50 rounded-lg px-3 py-2 fade-in">
                Respuesta: {ac.answer}
              </p>
            )}
          </div>
        )
      }

      case 'coloring': {
        const cc = content as ColoringContent
        return (
          <div key={idx} className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center">
            <span className="text-5xl">{cc.emoji}</span>
            <p className="text-sm text-gray-600 mt-2 font-medium">{cc.description}</p>
            <p className="text-xs text-gray-400 mt-1">✏️ Imprime esta página para colorear</p>
          </div>
        )
      }

      default:
        return null
    }
  }

  const progress = Math.round((currentPage / totalPages) * 100)

  return (
    <AppLayout hideNav>
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100 safe-top no-print">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-lg"
          >
            ←
          </button>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900 text-sm truncate">{ebook.title}</p>
            <p className="text-xs text-gray-400">Página {currentPage} de {totalPages}</p>
          </div>
          <button
            onClick={() => setShowTools((v) => !v)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-colors ${
              showTools ? 'bg-purple-100 text-purple-600' : 'bg-gray-100'
            }`}
            aria-label="Herramientas"
          >
            ✏️
          </button>
          <button
            onClick={handlePrint}
            className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-lg"
            aria-label="Imprimir"
          >
            🖨️
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-violet-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Annotation toolbar (expanded) */}
      {showTools && (
        <div className="bg-purple-50 border-b border-purple-100 px-4 py-3 space-y-3 no-print fade-in">
          <div className="flex items-center gap-3 flex-wrap">
            <p className="text-xs font-bold text-purple-900">Color:</p>
            {HIGHLIGHT_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-7 h-7 rounded-full border-2 transition-transform ${
                  selectedColor === color ? 'border-purple-700 scale-125' : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
                aria-label={`Color ${color}`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleHighlight}
              className="flex-1 bg-white border border-purple-200 text-purple-700 font-semibold text-xs py-2 rounded-xl"
            >
              ✏️ Marcar texto seleccionado
            </button>
            <button
              onClick={() => setShowNoteInput((v) => !v)}
              className="flex-1 bg-white border border-purple-200 text-purple-700 font-semibold text-xs py-2 rounded-xl"
            >
              📝 Agregar nota
            </button>
          </div>

          {showNoteInput && (
            <div className="flex gap-2 items-start">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Escribe tu nota aquí..."
                rows={2}
                className="flex-1 text-sm border border-purple-200 rounded-xl p-2 resize-none outline-none focus:border-purple-400 bg-white"
              />
              <button
                onClick={handleAddNote}
                className="bg-purple-600 text-white text-xs font-bold px-3 py-2 rounded-xl"
              >
                Guardar
              </button>
            </div>
          )}

          {pageAnnotations.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-xs font-bold text-purple-900">
                📌 Anotaciones en esta página ({pageAnnotations.length}):
              </p>
              {pageAnnotations.map((ann) => (
                <div
                  key={ann.id}
                  className="flex items-start gap-2 bg-white rounded-xl px-3 py-2 border border-purple-100"
                >
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: ann.color }}
                  />
                  <p className="flex-1 text-xs text-gray-700 leading-relaxed">{ann.text}</p>
                  <button
                    onClick={() => removeAnnotation(ann.id)}
                    className="text-gray-300 hover:text-red-400 text-xs"
                    aria-label="Eliminar anotación"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Page content */}
      {canReadPage ? (
        <div
          ref={pageRef}
          className="px-5 py-6 space-y-5 fade-in"
          style={{ backgroundColor: page?.backgroundColor ?? '#FFFFFF' }}
        >
          {/* Page number indicator */}
          <div className="flex items-center justify-center">
            <span className="text-xs font-semibold text-gray-400 bg-white/70 px-3 py-1 rounded-full">
              Página {currentPage}
            </span>
          </div>

          {/* Content */}
          {page?.content.map((c, i) => renderContent(c, i))}

          {/* Page annotations */}
          {pageAnnotations.length > 0 && (
            <div className="border-t border-dashed border-gray-200 pt-4 space-y-2 print-section">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Mis notas
              </p>
              {pageAnnotations.map((ann) => (
                <div
                  key={ann.id}
                  className="flex items-start gap-2 rounded-lg px-3 py-2"
                  style={{ backgroundColor: ann.color + '33' }}
                >
                  <span className="text-xs text-gray-600 leading-relaxed italic">"{ann.text}"</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        // Locked page
        <div className="px-5 py-10 flex flex-col items-center text-center gap-4 fade-in">
          <div
            className={`w-28 h-36 rounded-2xl flex items-center justify-center bg-gradient-to-br ${ebook.coverGradient} opacity-50`}
          >
            <span className="text-6xl">{ebook.coverEmoji}</span>
          </div>
          <div>
            <p className="text-4xl mb-2">🔒</p>
            <h2 className="font-bold text-gray-900 text-xl">Contenido Bloqueado</h2>
            <p className="text-sm text-gray-500 mt-2 max-w-xs">
              Has llegado al límite de vista previa. Compra este libro para continuar leyendo.
            </p>
          </div>
          <button
            onClick={() => setShowPurchaseModal(true)}
            className="bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-purple-200 active:scale-[0.98] transition-all"
          >
            🛒 Desbloquear este libro
          </button>
          <button
            onClick={() => goToPage(previewLimit)}
            className="text-sm text-gray-400"
          >
            ← Volver a la vista previa
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-3 no-print safe-bottom">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex-1 flex items-center justify-center gap-1.5 bg-gray-100 disabled:opacity-40 py-3 rounded-xl font-semibold text-gray-700 text-sm transition-all active:scale-95"
        >
          ← Anterior
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => {
            const p = i + 1
            const isActive = p === currentPage
            const isLocked = !isAccessible && p > previewLimit
            return (
              <button
                key={i}
                onClick={() => goToPage(p)}
                className={`w-7 h-7 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white'
                    : isLocked
                      ? 'bg-gray-100 text-gray-300'
                      : 'bg-gray-100 text-gray-500'
                }`}
              >
                {isLocked ? '🔒' : p}
              </button>
            )
          })}
          {totalPages > 7 && (
            <span className="text-xs text-gray-400">…{totalPages}</span>
          )}
        </div>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex-1 flex items-center justify-center gap-1.5 bg-purple-600 disabled:opacity-40 py-3 rounded-xl font-bold text-white text-sm transition-all active:scale-95"
        >
          Siguiente →
        </button>
      </div>

      {/* Purchase modal */}
      {showPurchaseModal && (
        <PurchaseModal
          ebook={ebook}
          onClose={() => setShowPurchaseModal(false)}
        />
      )}
    </AppLayout>
  )
}
