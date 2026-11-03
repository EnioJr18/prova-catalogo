import { AppError } from '../utils/appError.js';

// SERVIÇO de Produto — REGRAS DE NEGÓCIO (inclui a regra que depende da Categoria).
// Lance `new AppError(mensagem, status)` quando uma regra for violada.
//
// Regras ao criar:
//   - o nome é OBRIGATÓRIO;
//   - o preço deve ser um número MAIOR que zero;
//   - a categoria informada precisa EXISTIR (regra do relacionamento 1-N) —
//     se não existir, rejeite (ex.: 422).
// Observação: preço chega do formulário como texto — converta para número antes.
// Métodos: criar e listar.
export class ProdutosService {
  constructor(produtosRepository, categoriasRepository) {
    this.repo = produtosRepository;
    this.categoriasRepo = categoriasRepository; // para checar se a categoria existe
  }
  // TODO: criar(dados), listar().
}
