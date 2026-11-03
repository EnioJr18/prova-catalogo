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
  async listar(req, res) {
    const categorias = await this.service.listarTodos();
    res.render('categorias/index', {categorias});
  }
  novo(req, res) {
    res.render('categorias/form', {error: null});
  }

  async criar(req, res) {
    try {
      await this.service.criar(req.body);
      res.redirect('/categorias');
    } catch (erro) {
      res.status(400).render('categorias/form', {erro: erro.message})
    }
  }
}
