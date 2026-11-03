#!/usr/bin/env node
// ---------------------------------------------------------------------------
// Autograder — Prova Prática (2 entidades, 1-N) · Catálogo (Categoria/Produto)
// Versão ENXUTA: apenas CRIAR + LISTAR, com foco no relacionamento 1-N.
//
// Age como um "navegador headless": status HTTP, redirect do PRG e trechos do HTML.
//
// USO:  BASE_URL=http://localhost:3000 node check.mjs
//       GRADE_JSON=/caminho/nota.json BASE_URL=... node check.mjs
// ---------------------------------------------------------------------------
import { writeFileSync } from 'node:fs';

const BASE = (process.env.BASE_URL || 'http://localhost:3000').replace(/\/$/, '');
const uniq = (p) => `${p}-${Date.now()}-${Math.floor(Math.random() * 1e4)}`;

let obtido = 0, total = 0;
const linhas = [];
function reg(nome, pts, ok, det = '') {
  total += pts; if (ok) obtido += pts;
  linhas.push({ nome, pontos: ok ? pts : 0, max: pts, ok, det });
  console.log(`${ok ? '✓' : '✗'} [${String(ok ? pts : 0).padStart(3)}/${pts}] ${nome}${ok || !det ? '' : `  — ${det}`}`);
}
async function req(metodo, caminho, { form } = {}) {
  const opts = { method: metodo, redirect: 'manual' };
  if (form) { opts.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }; opts.body = new URLSearchParams(form).toString(); }
  const res = await fetch(BASE + caminho, opts);
  return { status: res.status, location: res.headers.get('location'), corpo: await res.text().catch(() => '') };
}
const ehRedirect = (s) => s >= 300 && s < 400;

// Encontra o id da linha (em /categorias) cujo texto contém `nome`.
function idDaLinha(corpo, entidade, nome) {
  for (const row of corpo.split(/<tr[ >]/)) {
    if (row.includes(nome)) {
      const m = row.match(new RegExp(`${entidade}/(\\d+)`));
      if (m) return Number(m[1]);
      const h = row.match(/#(\d+)/); // fallback: coluna "#id"
      if (h) return Number(h[1]);
    }
  }
  return null;
}

async function main() {
  console.log(`\nAutograder — Prova · Catálogo (Categoria 1-N Produto) [enxuta]\nBASE_URL: ${BASE}\n`);

  // 1) listagem de categorias
  try { const r = await req('GET', '/categorias');
    reg('GET /categorias — listagem (200, link "Nova Categoria")', 10, r.status === 200 && /nova categoria/i.test(r.corpo), `status ${r.status}`);
  } catch (e) { reg('GET /categorias', 10, false, e.message); }

  // 2) criar categoria (PRG) + aparece na lista
  const catNome = uniq('Cat');
  let catId = null;
  try {
    const r = await req('POST', '/categorias', { form: { nome: catNome } });
    const lista = await req('GET', '/categorias');
    catId = idDaLinha(lista.corpo, 'categorias', catNome);
    reg('POST /categorias — cria e redireciona (PRG) e aparece na lista', 15, ehRedirect(r.status) && !!catId && lista.corpo.includes(catNome), `status ${r.status}`);
  } catch (e) { reg('POST /categorias', 15, false, e.message); }

  // 3) validação: categoria sem nome (deve REEXIBIR o form, não um 404)
  try { const r = await req('POST', '/categorias', { form: { nome: '' } });
    const reexibiu = r.status >= 400 && r.status < 500 && /name="nome"/.test(r.corpo);
    reg('POST /categorias sem nome — reexibe o form (4xx, não cria)', 10, reexibiu, `status ${r.status}`);
  } catch (e) { reg('categoria sem nome', 10, false, e.message); }

  // 4) listagem de produtos
  try { const r = await req('GET', '/produtos');
    reg('GET /produtos — listagem (200, link "Novo Produto")', 10, r.status === 200 && /novo produto/i.test(r.corpo), `status ${r.status}`);
  } catch (e) { reg('GET /produtos', 10, false, e.message); }

  // 5) formulário de produto com <select> de categoria
  try { const r = await req('GET', '/produtos/novo');
    const campos = ['nome', 'preco', 'categoriaId'].every((n) => r.corpo.includes(`name="${n}"`));
    reg('GET /produtos/novo — form com nome/preco + <select> de categoria', 10, r.status === 200 && campos, `status ${r.status}`);
  } catch (e) { reg('GET /produtos/novo', 10, false, e.message); }

  // 6) criar produto válido (PRG)
  const prodNome = uniq('Prod');
  let listaProd = '';
  try {
    if (!catId) throw new Error('sem categoria');
    const r = await req('POST', '/produtos', { form: { nome: prodNome, preco: '9.90', categoriaId: String(catId) } });
    listaProd = (await req('GET', '/produtos')).corpo;
    reg('POST /produtos — cria produto válido e redireciona (PRG)', 15, ehRedirect(r.status) && listaProd.includes(prodNome), `status ${r.status}`);
  } catch (e) { reg('POST /produtos', 15, false, e.message); }

  // 7) RELACIONAMENTO: a lista de produtos mostra o NOME da categoria (join)
  try {
    const row = (listaProd || (await req('GET', '/produtos')).corpo).split(/<tr[ >]/).find((r) => r.includes(prodNome)) || '';
    reg('Relacionamento — a lista de produtos mostra o NOME da categoria (join 1-N)', 15, row.includes(catNome), 'o nome da categoria não aparece na linha do produto');
  } catch (e) { reg('join categoria', 15, false, e.message); }

  // 8) validação: preço <= 0 (deve REEXIBIR o form, não um 404)
  try { const r = await req('POST', '/produtos', { form: { nome: uniq('P'), preco: '0', categoriaId: String(catId) } });
    const reexibiu = r.status >= 400 && r.status < 500 && /name="categoriaId"/.test(r.corpo);
    reg('POST /produtos preço <= 0 — rejeita e reexibe o form (4xx)', 8, reexibiu, `status ${r.status}`);
  } catch (e) { reg('preco<=0', 8, false, e.message); }

  // 9) RELACIONAMENTO: produto exige categoria EXISTENTE (rejeita e reexibe o form)
  try { const r = await req('POST', '/produtos', { form: { nome: uniq('P'), preco: '5', categoriaId: '999999' } });
    const reexibiu = r.status >= 400 && r.status < 500 && /name="categoriaId"/.test(r.corpo);
    reg('Relacionamento — produto com categoria INEXISTENTE é rejeitado (4xx)', 12, reexibiu, `status ${r.status}`);
  } catch (e) { reg('categoria inexistente', 12, false, e.message); }

  const pct = total ? Math.round((obtido / total) * 100) : 0;
  console.log(`\nNOTA: ${obtido}/${total}  (${pct}%)\n`);

  if (process.env.GITHUB_STEP_SUMMARY) {
    const md = [`## Autograder — Prova · Catálogo (1-N, enxuta)`, ``, `**Nota: ${obtido}/${total} (${pct}%)**`, ``,
      `| Checagem | Pontos |`, `|---|---:|`, ...linhas.map((l) => `| ${l.ok ? '✓' : '✗'} ${l.nome} | ${l.pontos}/${l.max} |`)].join('\n');
    try { writeFileSync(process.env.GITHUB_STEP_SUMMARY, md + '\n', { flag: 'a' }); } catch {}
  }
  if (process.env.GRADE_JSON) { try { writeFileSync(process.env.GRADE_JSON, JSON.stringify({ obtido, total, pct, linhas }, null, 2)); } catch {} }
  process.exit(obtido === total ? 0 : 1);
}
main().catch((e) => { console.error('Falha geral do autograder:', e); process.exit(1); });
