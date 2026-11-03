# Prova Prática — Catálogo (Categoria 1-N Produto)

Você recebe este **esqueleto já configurado** (Express + EJS + middlewares + layout).
Seu trabalho é **preencher os módulos marcados com comentários/`TODO`** e **modelar o
banco** com Prisma, implementando um CRUD das **duas entidades** com o relacionamento
**1-N** (uma Categoria tem vários Produtos).

## Primeiros passos

```bash
npm install                    # instala as dependências (já listadas)
cp .env.example .env           # DATABASE_URL="file:./dev.db"
# 1) modele prisma/schema.prisma (as duas entidades e o relacionamento)
npx prisma migrate dev --name init   # cria o banco e gera o Prisma Client
npm run dev                    # http://localhost:3000
```

> O servidor **sobe** assim que você roda `npm run dev` — mas as páginas só
> funcionam conforme você implementa os módulos. Comece pelo schema + migração.

## Onde trabalhar (procure os comentários e `TODO`)

- `prisma/schema.prisma` — **modele** Categoria e Produto e o relacionamento 1-N.
- `src/repositories/*.prisma.js` — acesso ao banco (Prisma).
- `src/services/*.service.js` — regras de negócio e validações.
- `src/middlewares/validacao.middleware.js` — validação dos formulários.
- `src/controllers/*.controller.js` — renderização das telas (SSR) + redirecionamentos.
- `src/routes/index.js` — composition root + rotas.
- `src/views/categorias/*.ejs` e `src/views/produtos/*.ejs` — as telas.

## Autocorreção

Com o servidor no ar, em outro terminal:

```bash
BASE_URL=http://localhost:3000 node autograder/check.mjs
```

O autograder mostra sua nota e o que falta. Rode quantas vezes quiser.
