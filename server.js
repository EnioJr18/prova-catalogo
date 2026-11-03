import { criarApp } from './src/app.js';

const PORT = process.env.PORT || 3000;
criarApp().listen(PORT, () => {
  console.log(`Catálogo (prova — Categoria/Produto, SSR com EJS) rodando em http://localhost:${PORT}`);
});
