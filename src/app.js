import express from 'express';                    // framework web
import expressLayouts from 'express-ejs-layouts'; // layout único reaproveitado por todas as páginas
import session from 'express-session';            // guarda dados entre requisições (necessário p/ flash)
import flash from 'connect-flash';                // mensagens "flash" (aparecem uma vez após o redirect)
import methodOverride from 'method-override';     // deixa um <form> enviar PATCH/PUT/DELETE
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { criarRotas } from './routes/index.js';
import { naoEncontrado, middlewareDeErros } from './middlewares/erros.middleware.js';

// __dirname não existe em ES Modules — recriamos a partir da URL deste arquivo.
const __dirname = dirname(fileURLToPath(import.meta.url));

export function criarApp() {
  const app = express();

  // ── Motor de templates (EJS + layouts) ───────────────
  app.set('view engine', 'ejs');
  app.set('views', join(__dirname, 'views'));
  app.use(expressLayouts);
  app.set('layout', 'layouts/base');

  // ── Middlewares (ordem importa) ───────────────────────
  app.use(express.urlencoded({ extended: true })); // lê formulários HTML -> req.body
  app.use(methodOverride('_method'));               // POST com ?_method=PATCH vira PATCH
  app.use(express.static(join(__dirname, '..', 'public')));

  app.use(session({
    secret: process.env.SESSION_SECRET || 'segredo-de-desenvolvimento',
    resave: false,
    saveUninitialized: false,
  }));
  app.use(flash());

  // Disponibiliza as mensagens flash para todas as views.
  app.use((req, res, next) => {
    res.locals.flash = { sucesso: req.flash('sucesso'), erro: req.flash('erro') };
    next();
  });

  // Endpoint de saúde (readiness/deploy) — continua em JSON.
  app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

  // ── Rotas SSR ─────────────────────────────────────────
  app.use('/', criarRotas());

  // ── Erros (sempre por último) ─────────────────────────
  app.use(naoEncontrado);
  app.use(middlewareDeErros);

  return app;
}
