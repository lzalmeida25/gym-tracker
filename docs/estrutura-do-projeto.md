# Estrutura atual do Gym Tracker

Este guia apresenta os arquivos que formam a aplicação neste início do MVP. Ele
serve como mapa para localizar uma alteração sem precisar entender todo o projeto
de uma vez.

## Como a tela chega ao navegador

O fluxo principal é:

```text
index.html
  └── src/main.jsx
        └── src/App.jsx
              ├── src/App.css
              ├── src/index.css
              └── src/assets e public
```

1. `frontend/index.html` contém o elemento vazio chamado `root` e carrega o
   JavaScript da aplicação.
2. `frontend/src/main.jsx` encontra esse elemento e pede ao React para renderizar
   o componente `App` dentro dele.
3. `frontend/src/App.jsx` descreve, usando JSX, o conteúdo visível da página.
4. `frontend/src/App.css` contém estilos específicos da tela inicial.
5. `frontend/src/index.css` reúne as regras gerais, como cores, tipografia e o
   comportamento básico da página.

JSX é uma forma de escrever uma estrutura parecida com HTML dentro do JavaScript.
Um componente é uma função que devolve essa estrutura para o React exibir.

## Pastas e arquivos importantes

| Caminho | Responsabilidade atual |
| --- | --- |
| `frontend/src/main.jsx` | Ponto de entrada do React. |
| `frontend/src/App.jsx` | Componente principal e conteúdo da tela inicial. |
| `frontend/src/App.css` | Aparência específica do componente `App`. |
| `frontend/src/index.css` | Estilos e variáveis compartilhados pela aplicação. |
| `frontend/src/assets/` | Imagens importadas pelo código e processadas pelo Vite. |
| `frontend/public/` | Arquivos públicos servidos sem processamento. |
| `frontend/src/services/` | Integrações externas; hoje contém a preparação do Supabase. |
| `frontend/package.json` | Dependências e comandos disponíveis no frontend. |
| `frontend/vite.config.js` | Configuração do Vite e do suporte ao React. |
| `.github/workflows/ci.yml` | Verificações automáticas executadas pelo GitHub. |
| `docs/plano-mvp.md` | Ordem e andamento das pequenas entregas do MVP. |

O projeto ainda não possui páginas separadas, componentes reutilizáveis, banco
local ou autenticação. Essas estruturas serão criadas somente quando as próximas
tarefas precisarem delas.

## Comandos disponíveis

Execute os comandos dentro da pasta `frontend`:

```bash
cd frontend
```

| Comando | Para que serve |
| --- | --- |
| `npm run dev` | Inicia o ambiente de desenvolvimento e atualiza a tela ao salvar. |
| `npm run lint` | Procura problemas comuns no JavaScript e no React. |
| `npm run audit` | Consulta vulnerabilidades altas ou críticas nas dependências. |
| `npm run build` | Gera a versão otimizada para produção. |
| `npm run check` | Executa lint, auditoria e build na mesma ordem usada pelo CI. |
| `npm run preview` | Abre localmente o resultado produzido pelo build. |

## Exercício de localização

Para mudar um texto da tela inicial:

1. abra `frontend/src/App.jsx`;
2. encontre o texto dentro de uma tag como `<h1>...</h1>`;
3. altere o conteúdo entre as tags;
4. salve o arquivo com `npm run dev` em execução;
5. observe a atualização no navegador.

Não é necessário executar esse exercício agora. O importante é reconhecer que o
conteúdo fica em `App.jsx`, enquanto sua aparência fica principalmente nos dois
arquivos CSS.
