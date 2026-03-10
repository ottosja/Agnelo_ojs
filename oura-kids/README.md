# 📖 Oura Kids — Actividades Bíblicas

PWA (Progressive Web App) de e-books interactivos de actividades bíblicas para el mercado LATAM.

## ✨ Funcionalidades

- **Biblioteca** de e-books gratuitos e premium com filtros por categoria
- **Leitor interativo** com navegação por páginas, conteúdo rico (versículos, atividades, colorir)
- **Anotações e marcadores** com 5 cores, persistidas localmente
- **Impressão** (botão 🖨️ no leitor, CSS otimizado para print)
- **Integração Hotmart** — preview gratuito → modal de compra → redirect para pagamento
- **Desbloqueio pós-compra** via botão "Ya compré"
- **Favoritos**, progresso de leitura, perfil do usuário
- **PWA instalável** com service worker (offline-first)

## 🏗️ Stack

- React 19 + TypeScript + Vite 7
- Tailwind CSS 4
- React Router 7
- Zustand 5 (estado global + localStorage)
- vite-plugin-pwa + Workbox

## 🚀 Rodando

```bash
npm install
npm run dev      # dev server em localhost:5173
npm run build    # build de produção
```

## 🔧 Configurar Hotmart

Em `src/data/ebooks.ts`, substitua as URLs dos livros premium:

```ts
hotmartUrl: 'https://pay.hotmart.com/SEU_PRODUTO'
```

Para unlock automático após pagamento, configure um webhook backend que chame `registerHotmartPurchase(ebookId)`.

## 📦 Deploy

Gera arquivos estáticos em `/dist`. Deploy em Vercel, Netlify, Cloudflare Pages ou qualquer CDN.

## 🗺️ Próximos Passos

- Backend com autenticação (Supabase/Firebase)
- Webhook Hotmart para unlock automático
- PDFs reais dos e-books
- Notificações push
- Analytics
