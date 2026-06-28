# DeckBot — arquivos reais do template Commercial Sober Mono

Use estes arquivos como a base exata do template validado na conversa.

## O que este pacote contém

```text
templates/commercial-sober-mono/
  template.html
  style.css
  schema.json
  example.json

lib/
  render-template.ts
  pdf-generator.ts
  validators.ts
  types.ts
```

## Regra principal

A IA não edita HTML, CSS, grid, cards, cores ou layout.

A IA deve preencher somente o JSON baseado no `schema.json` e no `example.json`.

O renderizador substitui os placeholders no `template.html`.

O Puppeteer gera o PDF final em 1280x720.

## Como usar no projeto

1. Copie a pasta `templates/commercial-sober-mono` para o projeto Next.js.
2. Copie os arquivos de `lib/` para a pasta `lib/` do projeto.
3. Instale Puppeteer:

```bash
npm install puppeteer
```

4. Use o `example.json` para testar a renderização.
5. O HTML final deve manter slides fixos em 16:9.

## Regras de design validadas

- Template oficial: `commercial-sober-mono`
- Visual: preto, branco e cinza
- Sem ícones
- Sem imagens geradas por IA
- Cards pretos quando o fundo for claro
- Cards translúcidos quando o fundo for escuro
- Fonte fina, mas impactante
- Slide fixo: 1280x720
- Títulos de slide com no máximo 2 linhas
- Cards dentro da margem inferior
- Não alterar CSS para cada proposta

## Próximo passo no Codex

Peça para o Codex criar uma rota ou script que:

1. Carregue `example.json`
2. Renderize `template.html` com `style.css`
3. Gere HTML final
4. Gere PDF com Puppeteer
5. Salve em `outputs/pdfs/example.pdf`


```
