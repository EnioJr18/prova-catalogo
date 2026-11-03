import { Router } from 'express';

// COMPOSITION ROOT + ROTAS SSR.
// Monte a cadeia de dependências (repositório -> service -> controller) das duas
// entidades e declare as rotas.
//
// Rotas que a aplicação precisa ter:
//   GET  /                   -> redireciona para /produtos
//   -- Categorias --
//   GET  /categorias         -> listagem
//   GET  /categorias/nova    -> formulário de nova categoria (declare ANTES de rotas com :id, se houver)
//   POST /categorias         -> validar entrada e criar
//   -- Produtos --
//   GET  /produtos           -> listagem
//   GET  /produtos/novo      -> formulário de novo produto
//   POST /produtos           -> validar entrada e criar
export function criarRotas() {
  const router = Router();

  // TODO: instanciar repositórios, services e controllers; declarar as rotas acima.

  return router;
}
