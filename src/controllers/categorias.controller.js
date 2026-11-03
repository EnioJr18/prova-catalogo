// CONTROLLER (SSR) de Categoria — traduz HTTP <-> views (res.render + PRG).
// NÃO coloque regra de negócio aqui (isso é do service).
//
// Ações:
//   - index (GET /categorias)      -> renderiza a listagem;
//   - nova  (GET /categorias/nova) -> renderiza o formulário vazio;
//   - criar (POST /categorias)     -> cria e redireciona; se der erro de negócio
//                                     (4xx), reexiba o formulário com a mensagem.
export class CategoriasController {
  constructor(categoriasService) {
    this.service = categoriasService;
    // Dica: "amarre" o this dos métodos usados como callback nas rotas.
  }
  // TODO: implemente index, nova, criar.
}
