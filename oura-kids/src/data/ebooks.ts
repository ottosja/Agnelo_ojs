import type { Ebook } from '../types'

export const EBOOKS: Ebook[] = [
  // ─── FREE BOOKS ─────────────────────────────────────────────────
  {
    id: 'genesis-kids-1',
    title: 'Génesis para Niños',
    subtitle: 'El Libro de la Creación',
    description:
      'Descubre cómo Dios creó el mundo en 7 días con historias divertidas, actividades y versículos bíblicos fáciles de entender para los más pequeños.',
    category: 'biblia',
    coverColor: '#6366F1',
    coverEmoji: '🌍',
    coverGradient: 'from-indigo-400 to-purple-500',
    isFree: true,
    pages: [
      {
        id: 'p1',
        pageNumber: 1,
        backgroundColor: '#FEF9C3',
        content: [
          { type: 'text', text: '¡Bienvenido a Génesis!', style: 'heading', alignment: 'center' },
          { type: 'image', emoji: '🌟', caption: 'En el principio...', size: 'large' },
          {
            type: 'text',
            text: '"En el principio, Dios creó los cielos y la tierra." — Génesis 1:1',
            style: 'verse',
            alignment: 'center',
          },
          {
            type: 'text',
            text: 'Antes de que existiera todo — el sol, las estrellas, los animales y tú — solo existía Dios. Y Dios tenía un plan maravilloso...',
            style: 'story',
          },
        ],
      },
      {
        id: 'p2',
        pageNumber: 2,
        backgroundColor: '#DCFCE7',
        content: [
          { type: 'text', text: 'Día 1: ¡Que haya luz! 💡', style: 'heading', alignment: 'center' },
          { type: 'image', emoji: '☀️', caption: 'Dios creó la luz', size: 'large' },
          {
            type: 'text',
            text: 'Dios dijo: "¡Que haya luz!" Y la luz apareció. Dios vio que la luz era buena, y la separó de la oscuridad.',
            style: 'story',
          },
          {
            type: 'activity',
            question: '¿Cuántos días tardó Dios en crear el mundo?',
            answer: '7 días',
            hint: 'Piensa en la semana... ¿cuántos días tiene?',
          },
        ],
      },
      {
        id: 'p3',
        pageNumber: 3,
        backgroundColor: '#DBEAFE',
        content: [
          { type: 'text', text: 'Día 2 y 3: Cielo y Tierra 🌊🌿', style: 'heading', alignment: 'center' },
          { type: 'image', emoji: '🌊', caption: 'Los mares y la tierra seca', size: 'medium' },
          {
            type: 'text',
            text: 'Dios separó el agua y creó el cielo. Luego reunió las aguas en un lugar y apareció la tierra seca. ¡Y Dios plantó árboles, flores y frutas de todos los colores!',
            style: 'story',
          },
          {
            type: 'coloring',
            description: 'Colorea el mar y la tierra como tú los imaginas',
            emoji: '🎨',
          },
        ],
      },
      {
        id: 'p4',
        pageNumber: 4,
        backgroundColor: '#FEF3C7',
        content: [
          { type: 'text', text: 'Día 4, 5 y 6: ¡Los Animales! 🦁🐠🦋', style: 'heading', alignment: 'center' },
          { type: 'image', emoji: '🐘', caption: '¡Dios hizo todos los animales!', size: 'large' },
          {
            type: 'text',
            text: 'Dios creó el sol, la luna y las estrellas. Después llenó el mar de peces, el cielo de pájaros, y la tierra de animales. ¡Cada uno es especial para Dios!',
            style: 'story',
          },
          {
            type: 'activity',
            question: '¿Cuál es tu animal favorito que Dios creó?',
            hint: 'No hay respuesta incorrecta. ¡Todos los animales son creaciones de Dios!',
          },
        ],
      },
      {
        id: 'p5',
        pageNumber: 5,
        backgroundColor: '#FCE7F3',
        content: [
          { type: 'text', text: '¡Dios te creó a ti! 🧒👧', style: 'heading', alignment: 'center' },
          { type: 'image', emoji: '🤗', caption: '¡Eres especial!', size: 'large' },
          {
            type: 'text',
            text: '"Y creó Dios al ser humano a su imagen." — Génesis 1:27\n\nDe todo lo que Dios hizo, ¡tú eres su creación favorita! Fuiste hecho con amor especial.',
            style: 'verse',
            alignment: 'center',
          },
          {
            type: 'text',
            text: '¡Recuerda siempre: Dios te creó, te conoce y te ama muchísimo! 💜',
            style: 'fun-fact',
            alignment: 'center',
          },
        ],
      },
    ],
    ageRange: '4–8 años',
    rating: 4.9,
    reviewCount: 234,
    language: 'es',
    author: 'Equipo Oura Kids',
    previewPages: 5,
    fileSize: '2.1 MB',
  },

  {
    id: 'manualidades-pascua',
    title: 'Manualidades de Pascua',
    subtitle: '10 Actividades Creativas',
    description:
      'Celebra la Resurrección de Jesús con 10 manualidades divertidas para hacer en familia. Materiales fáciles de conseguir, perfectas para niños.',
    category: 'manualidades',
    coverColor: '#10B981',
    coverEmoji: '✂️',
    coverGradient: 'from-green-400 to-teal-500',
    isFree: true,
    pages: [
      {
        id: 'p1',
        pageNumber: 1,
        backgroundColor: '#ECFDF5',
        content: [
          { type: 'text', text: '¡Semana Santa Creativa! ✝️', style: 'heading', alignment: 'center' },
          { type: 'image', emoji: '✂️', caption: '¡Manos a la obra!', size: 'large' },
          {
            type: 'text',
            text: 'En este cuadernillo encontrarás 10 manualidades especiales para celebrar la Pascua de Resurrección con tu familia.',
            style: 'story',
          },
        ],
      },
      {
        id: 'p2',
        pageNumber: 2,
        backgroundColor: '#FFF7ED',
        content: [
          { type: 'text', text: 'Manualidad 1: Cruz de Papel 🎨', style: 'heading', alignment: 'center' },
          { type: 'image', emoji: '✝️', caption: 'Cruz colorida', size: 'medium' },
          {
            type: 'text',
            text: 'Materiales: Papel de colores, tijeras, pegamento\n\nPasos:\n1. Dobla el papel por la mitad\n2. Corta la forma de una cruz\n3. Decórala con colores vivos\n4. ¡Escribe una palabra especial en ella!',
            style: 'instruction',
          },
        ],
      },
    ],
    ageRange: '5–10 años',
    rating: 4.8,
    reviewCount: 189,
    language: 'es',
    author: 'Equipo Oura Kids',
    previewPages: 2,
    fileSize: '3.4 MB',
  },

  // ─── PREMIUM BOOKS ──────────────────────────────────────────────
  {
    id: 'salmos-kids',
    title: 'Los Salmos para Niños',
    subtitle: 'Oraciones y Alabanzas',
    description:
      'Los 10 Salmos más amados en versión para niños, con actividades, juegos, canciones y páginas para colorear. Una guía completa para enseñar a orar.',
    category: 'biblia',
    coverColor: '#8B5CF6',
    coverEmoji: '🎵',
    coverGradient: 'from-violet-500 to-purple-600',
    isFree: false,
    hotmartUrl: 'https://pay.hotmart.com/PLACEHOLDER_SALMOS',
    hotmartProductId: 'SALMOS001',
    pages: [
      {
        id: 'p1',
        pageNumber: 1,
        backgroundColor: '#F5F3FF',
        content: [
          { type: 'text', text: '¡Los Salmos te hablan a ti! 🎶', style: 'heading', alignment: 'center' },
          { type: 'image', emoji: '📖', caption: 'Salmos para el corazón', size: 'large' },
          {
            type: 'text',
            text: '"El Señor es mi pastor; nada me faltará." — Salmo 23:1',
            style: 'verse',
            alignment: 'center',
          },
        ],
      },
    ],
    ageRange: '6–12 años',
    rating: 4.9,
    reviewCount: 312,
    language: 'es',
    author: 'Equipo Oura Kids',
    previewPages: 1,
    fileSize: '4.2 MB',
  },

  {
    id: 'colorear-biblia',
    title: 'Colorea la Biblia',
    subtitle: '30 Láminas para Colorear',
    description:
      '30 páginas para colorear con las historias más importantes de la Biblia: Noé, David, Jonás, la Natividad, y más. Con versículos bíblicos incluidos.',
    category: 'colorear',
    coverColor: '#F59E0B',
    coverEmoji: '🖍️',
    coverGradient: 'from-yellow-400 to-orange-500',
    isFree: false,
    hotmartUrl: 'https://pay.hotmart.com/PLACEHOLDER_COLOREAR',
    hotmartProductId: 'COLOR001',
    pages: [
      {
        id: 'p1',
        pageNumber: 1,
        backgroundColor: '#FFFBEB',
        content: [
          { type: 'text', text: '¡Colorea con Fe! 🎨', style: 'heading', alignment: 'center' },
          { type: 'image', emoji: '🌈', caption: 'El arco iris de Noé', size: 'large' },
          {
            type: 'text',
            text: '30 láminas para colorear con las historias más emocionantes de la Biblia. ¡Cada página tiene un versículo especial!',
            style: 'story',
          },
        ],
      },
    ],
    ageRange: '3–8 años',
    rating: 4.7,
    reviewCount: 456,
    language: 'es',
    author: 'Equipo Oura Kids',
    previewPages: 1,
    fileSize: '8.1 MB',
  },

  {
    id: 'cuentos-heroes-fe',
    title: 'Héroes de la Fe',
    subtitle: '12 Historias Bíblicas',
    description:
      'Conoce a los héroes de la Biblia: Abraham, Moisés, Ester, Daniel y más. Cada historia incluye actividades, preguntas de reflexión y páginas interactivas.',
    category: 'cuentos',
    coverColor: '#EF4444',
    coverEmoji: '⚔️',
    coverGradient: 'from-red-400 to-rose-500',
    isFree: false,
    hotmartUrl: 'https://pay.hotmart.com/PLACEHOLDER_HEROES',
    hotmartProductId: 'HEROES001',
    pages: [
      {
        id: 'p1',
        pageNumber: 1,
        backgroundColor: '#FFF1F2',
        content: [
          { type: 'text', text: '¡Los Héroes de Dios! ⚔️', style: 'heading', alignment: 'center' },
          { type: 'image', emoji: '🦁', caption: 'Daniel y los leones', size: 'large' },
          {
            type: 'text',
            text: 'Estos no son superhéroes de película — ¡son personas reales que confiaron en Dios y cambiaron el mundo!',
            style: 'story',
          },
        ],
      },
    ],
    ageRange: '7–12 años',
    rating: 4.8,
    reviewCount: 278,
    language: 'es',
    author: 'Equipo Oura Kids',
    previewPages: 1,
    fileSize: '5.6 MB',
  },

  {
    id: 'canciones-alabanza',
    title: 'Canciones de Alabanza',
    subtitle: 'Letras y Actividades Musicales',
    description:
      'Las 20 canciones infantiles de adoración más amadas en América Latina, con letras, acordes simples, juegos musicales y actividades para aprender cantando.',
    category: 'canciones',
    coverColor: '#EC4899',
    coverEmoji: '🎤',
    coverGradient: 'from-pink-400 to-fuchsia-500',
    isFree: false,
    hotmartUrl: 'https://pay.hotmart.com/PLACEHOLDER_CANCIONES',
    hotmartProductId: 'MUSIC001',
    pages: [
      {
        id: 'p1',
        pageNumber: 1,
        backgroundColor: '#FDF4FF',
        content: [
          { type: 'text', text: '¡Canta para el Señor! 🎤', style: 'heading', alignment: 'center' },
          { type: 'image', emoji: '🎵', caption: '20 canciones para alabar', size: 'large' },
          {
            type: 'text',
            text: '"Cantad a Jehová un nuevo cántico." — Salmo 96:1\n\n¡La mejor forma de aprender sobre Dios es cantando!',
            style: 'verse',
            alignment: 'center',
          },
        ],
      },
    ],
    ageRange: '4–10 años',
    rating: 4.9,
    reviewCount: 521,
    language: 'es',
    author: 'Equipo Oura Kids',
    previewPages: 1,
    fileSize: '3.8 MB',
  },

  {
    id: 'actividades-adviento',
    title: 'Adviento para Niños',
    subtitle: 'Calendario de Actividades',
    description:
      'Calendario de Adviento con 24 actividades, historias y reflexiones para preparar el corazón de los niños para la Navidad. ¡Una actividad por día!',
    category: 'actividades',
    coverColor: '#0EA5E9',
    coverEmoji: '🎄',
    coverGradient: 'from-sky-400 to-blue-500',
    isFree: false,
    hotmartUrl: 'https://pay.hotmart.com/PLACEHOLDER_ADVIENTO',
    hotmartProductId: 'ADVIENTO001',
    pages: [
      {
        id: 'p1',
        pageNumber: 1,
        backgroundColor: '#F0F9FF',
        content: [
          { type: 'text', text: '¡Cuenta los días hasta Jesús! 🎄', style: 'heading', alignment: 'center' },
          { type: 'image', emoji: '⭐', caption: 'La estrella de Belén', size: 'large' },
          {
            type: 'text',
            text: '24 actividades especiales para los 24 días antes de Navidad. ¡Una sorpresa cada día para preparar el corazón!',
            style: 'story',
          },
        ],
      },
    ],
    ageRange: '4–12 años',
    rating: 4.9,
    reviewCount: 398,
    language: 'es',
    author: 'Equipo Oura Kids',
    previewPages: 1,
    fileSize: '6.3 MB',
  },
]

export const CATEGORY_LABELS: Record<string, string> = {
  todos: 'Todos',
  biblia: 'Biblia',
  manualidades: 'Manualidades',
  canciones: 'Canciones',
  actividades: 'Actividades',
  colorear: 'Colorear',
  cuentos: 'Cuentos',
}

export const CATEGORY_EMOJIS: Record<string, string> = {
  todos: '📚',
  biblia: '✝️',
  manualidades: '✂️',
  canciones: '🎵',
  actividades: '🎯',
  colorear: '🎨',
  cuentos: '📖',
}

export function getEbookById(id: string): Ebook | undefined {
  return EBOOKS.find((e) => e.id === id)
}

export function getFreeEbooks(): Ebook[] {
  return EBOOKS.filter((e) => e.isFree)
}

export function getPremiumEbooks(): Ebook[] {
  return EBOOKS.filter((e) => !e.isFree)
}

export function getEbooksByCategory(category: string): Ebook[] {
  if (category === 'todos') return EBOOKS
  return EBOOKS.filter((e) => e.category === category)
}
