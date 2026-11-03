import { AppError } from '../utils/appError.js';

// SERVIÇO de Categoria — REGRAS DE NEGÓCIO.
// Lance `new AppError(mensagem, status)` quando uma regra for violada.
//
// Regras:
//   - o nome da categoria é OBRIGATÓRIO (ex.: 400 se faltar).
// Métodos: criar e listar.
export class CategoriasService {
  constructor(categoriasRepository) {
    this.repo = categoriasRepository;
  }

  async listarTodos() {
    return await this.repository.listarTodos()
  }

  async criar(dados) {
    if (!dados.nome || dados.nome.trim() === '') {
      throw new Error('O nome da categoria é obrigatório.');
    }
    return await this.repository.criar(dados);
  }
}
