// CONTROLLER (SSR) de Produto — traduz HTTP <-> views (res.render + PRG).
// O formulário de produto tem um <select> de categorias, então o método que
// mostra o formulário precisa BUSCAR a lista de categorias e enviá-la à view
// (e também ao reexibir o form quando a validação falhar).
//
// Ações:
//   - index (GET /produtos)      -> listagem (mostrando a categoria de cada produto);
//   - novo  (GET /produtos/novo) -> formulário vazio + lista de categorias;
//   - criar (POST /produtos)     -> cria e redireciona; erro 4xx reexibe o form.
export class ProdutosController {
  constructor(produtosService, categoriasService) {
    this.service = produtosService;
    this.categoriasService = categoriasService; // para montar o <select> de categorias
    // Dica: "amarre" o this dos métodos usados como callback nas rotas.
  }
  // TODO: implemente index, novo, criar.
}
