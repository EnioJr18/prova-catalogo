import { AppError } from '../utils/appError.js'; // distingue erro "esperado" de bug inesperado

// 404 — renderiza uma página amigável (SSR), não JSON.
// Montado DEPOIS de todas as rotas: se chegou aqui, nenhuma rota casou com a URL.
export const naoEncontrado = (req, res) => {
  res.status(404).render('erros/erro', {
    titulo: 'Página não encontrada',
    codigo: 404,
    mensagem: `A página "${req.path}" não existe.`,
  });
};

// Erro geral — o Express o reconhece como middleware de erro porque tem 4
// parâmetros (err, req, res, next). É acionado por qualquer next(err).
export const middlewareDeErros = (err, req, res, next) => {
  const codigo = err instanceof AppError ? err.status : 500;
  if (codigo >= 500) console.error(err); // loga só os erros realmente inesperados

  res.status(codigo).render('erros/erro', {
    titulo: `Erro ${codigo}`,
    codigo,
    mensagem: err instanceof AppError
      ? err.message
      : (process.env.NODE_ENV === 'production' ? 'Ocorreu um erro inesperado.' : err.message),
  });
};
