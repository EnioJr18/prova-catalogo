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
  
  async criar(dados) {
    if (!dados.nome || dados.nome.trim() === '') {
      throw new Error('O nome do produto é obrigatório.');
    }
    const preco = parseFloat(dados.preco);
    if (isNaN(preco) || preco <= 0) {
      throw new Error('O preço deve ser maior que 0.');
    }
    const categoria = await this.categoriasRepository.buscarPorId(dados.categoriaId);
    if (!categoria) {
      throw new Error('A categoria informada não existe.');
    }
    return await this.produtosRepository.criar({
      nome: dados.nome,
      preco: preco,
      categoriaId: Number(dados.categoriaId)
    });
  }
}
