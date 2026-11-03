// VALIDAÇÃO DE ENTRADA dos formulários (express-validator).
//
// Crie as regras de cada formulário e um verificador que, havendo erros,
// REEXIBE o formulário (status 4xx) com os dados digitados e as mensagens —
// em vez de redirecionar.
//
// Regras esperadas:
//   - Categoria: nome obrigatório.
//   - Produto:   nome obrigatório; preço numérico > 0; categoria selecionada.
//
// Dica: `body('campo')...withMessage(...)` define as regras; `validationResult(req)`
// lê o resultado. O formulário de produto precisa da lista de categorias ao ser
// reexibido — pense em como passar esses dados extras para a view.

// TODO: export const regrasCategoria = [...]
// TODO: export const regrasProduto = [...]
// TODO: export function verificar(view, montarDadosDaView) { ... }
