// Erro de aplicação com código HTTP associado. O middleware de erros o traduz
// para { erro: mensagem } com o status correspondente.
export class AppError extends Error {
  constructor(mensagem, status = 400) {
    super(mensagem);
    this.name = 'AppError';
    this.status = status;
  }
}
