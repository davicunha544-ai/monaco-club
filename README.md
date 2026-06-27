# Monaco Club

Marca de moda clássica fina — _para ela e para ele_. Luxo discreto.

> As imagens editoriais ficam em `public/editorial/` (`hero.jpg`, `riva.jpg`, `monte-carlo.jpg`, `porto.jpg`, `quem-somos.jpg`, `polo.jpg`, `loja.jpg`). Troque pelos seus arquivos para mudar as fotos.

**Next.js (App Router) · TypeScript · Tailwind CSS · PT-BR · mobile-first.**

---

## Rodando localmente

```bash
npm install            # dependências
cp .env.example .env   # variáveis de ambiente (ajuste se quiser)
npx prisma db push     # cria o banco local (SQLite) e o Prisma Client
npm run db:seed        # popula os produtos + cria o admin (admin@monacoclub.com / monacoadmin)
npm run dev
```

Abra **http://localhost:3000**.

Outros comandos:

```bash
npm run build   # build de produção
npm run start   # roda o build localmente
npm run lint    # checagem de lint
npm run db:studio  # abre o Prisma Studio (ver o banco)
```

## Conta, pedidos e checkout (backend)

A loja tem backend próprio (sem serviço externo no dev):

- **Banco:** Prisma + **SQLite** local (`prisma/dev.db`). Schema em `prisma/schema.prisma`.
- **Autenticação:** Auth.js (e-mail + senha), senha com hash (bcrypt), sessão JWT. Config em `src/auth.ts` / `src/auth.config.ts`; rotas protegidas por `src/middleware.ts` (`/conta`, `/checkout`).
- **Páginas:** `/cadastro`, `/entrar`, `/conta` (dados, endereços, histórico), `/checkout`, `/conta/pedidos/[id]`, `/termos`, `/privacidade`.
- **Pedidos:** o checkout grava o pedido no banco **recalculando** preço/desconto/frete no servidor (não confia no cliente).
- **Pagamento:** abstração em `src/lib/payments/` (provider _stub_ por enquanto). Para plugar um gateway real, implemente um `PaymentProvider` (ex.: `stripe.ts`) e selecione em `src/lib/payments/index.ts`.

Variáveis de ambiente (`.env`): `DATABASE_URL` e `AUTH_SECRET` (gere com `openssl rand -base64 32`).

### Deploy com banco real (Vercel)
1. Em `prisma/schema.prisma`, troque o `provider` de `sqlite` para `postgresql`.
2. Crie um Postgres (Neon / Vercel / Supabase) e use a connection string em `DATABASE_URL`.
3. Defina `DATABASE_URL` e `AUTH_SECRET` nas variáveis de ambiente da Vercel.
4. Aplique o schema no deploy: `prisma migrate deploy` (ou `prisma db push`).

## Painel admin

Os produtos ficam no **banco** (modelo `Product`). Gerencie em **`/admin`** — protegido (só usuários com `role: "admin"`).

- **Login admin (seed):** `admin@monacoclub.com` / `monacoadmin` — troque a senha e/ou promova sua própria conta a admin em produção.
- **`/admin/produtos`**: listar, adicionar, editar e excluir peças — com **upload de imagem**, **cores** e **preço atual + preço antigo** (riscado na loja quando houver promoção).
- Popular produtos + admin: `npm run db:seed`.
- **Upload**: imagens vão para `public/uploads/` (local). Em produção (Vercel, fs read-only) → trocar `src/lib/upload.ts` por Vercel Blob.

> Em breve no admin: **Vendas** (tickets de despacho) e **Dashboard** (faturamento).

## Estrutura

```
src/
  app/
    layout.tsx        # layout raiz (fontes, header, footer, metadata PT-BR)
    page.tsx          # home (hero escuro + seleção)
    loja/page.tsx     # loja com filtros de gênero e categoria
    globals.css       # estilos base + Tailwind
  components/         # Header, Footer, Hero, ShopTabs, ProductCard, ...
  data/products.ts    # catálogo (fonte única, sem backend)
  lib/                # utilitários (formatBRL, cn)
public/
  logo-monaco-white.png   # wordmark (usado sobre fundo escuro)
  products/               # imagens das peças
```

## Design system

- **Cores** (`tailwind.config.ts`): `ink`/`midnight` (fundos escuros), `bone`/`mist` (off-white) e `bordo` (vermelho profundo) como único acento, usado com parcimônia. Visual liso e monocromático.
- **Tipografia**: títulos em serifa elegante e fluida (Cormorant Garamond) e interface/corpo em sans (Inter).

## Como adicionar um produto

Edite **`src/data/products.ts`** e inclua um item no array `products`:

```ts
{
  id: "10",
  slug: "nome-da-peca",
  nome: "Nome da Peça",
  preco: 990,                       // em reais (R$)
  descricao: "Descrição curta da peça.",
  imagens: ["/products/nome-da-peca.jpg"],
  tamanhos: ["P", "M", "G", "GG"],
  genero: "masculino",              // ou "feminino"
  categoria: "Camisa",              // tipo da peça (Camisa, Calça, Vestido, Sapato, ...)
}
```

1. Coloque as fotos em **`public/products/`** e referencie em `imagens[]`.
2. `genero` e `categoria` alimentam os filtros da loja (Masculino / Feminino → Camisa, Vestido, Blazer, Sapato…). As categorias aparecem automaticamente conforme os produtos cadastrados — basta usar o mesmo texto para agrupar.
3. Salve — com `npm run dev` o site recarrega sozinho.

> As imagens de exemplo são placeholders `.svg`. Para produção, troque por fotos reais (`.jpg`/`.webp`) e, se quiser otimização automática, use `next/image` no lugar do `<img>` em `src/components/ProductCard.tsx`.

## Deploy na Vercel

1. Suba o projeto para um repositório no GitHub:

   ```bash
   git init
   git add .
   git commit -m "Monaco Club"
   git branch -M main
   git remote add origin <url-do-seu-repo>
   git push -u origin main
   ```

2. Em **[vercel.com/new](https://vercel.com/new)**, clique em **Add New → Project**, importe o repositório e clique em **Deploy**. Não há variáveis de ambiente nem configuração extra — a Vercel detecta o Next.js automaticamente.

Ou pelo CLI:

```bash
npm i -g vercel
vercel          # deploy de preview
vercel --prod   # deploy de produção
```

## Próximos passos (fora deste primeiro entregável)

Página de detalhe do produto (`/produto/[slug]`), carrinho, checkout/pagamento, busca e login.
