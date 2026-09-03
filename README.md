# Gym Tracker

Aplicativo de controle de treinos de hipertrofia, com foco no registro de cargas,
repetições e consulta do desempenho anterior — inclusive sem internet.

## Estado atual

O projeto está no início do desenvolvimento. A base React/Vite e o workflow de
CI estão configurados, mas a interface ainda é a demonstração do Vite. Existe um
arquivo de conexão com o Supabase, porém sua biblioteca ainda não está instalada.

As funcionalidades descritas abaixo são o **escopo planejado**, não recursos já
disponíveis. A implementação acontecerá uma microtarefa por vez.

Consulte o [plano e checklist do MVP](docs/plano-mvp.md) para acompanhar as entregas
e os critérios de verificação.

## Objetivo do MVP

Substituir anotações físicas ou dispersas por uma ferramenta simples para montar
fichas, registrar treinos e comparar o desempenho atual com o anterior. MVP é a
primeira versão utilizável, com um conjunto limitado de funcionalidades.

## Funcionalidades planejadas para o MVP

- **Conta pessoal:** cadastro, confirmação de e-mail, login, saída e recuperação
  de senha. Cada usuário terá acesso apenas aos seus próprios dados.
- **Exercícios:** cadastrar e editar nome e grupo muscular; arquivar movimentos
  que não serão mais usados.
- **Fichas:** agrupar exercícios, definir sua ordem, editar e arquivar rotinas.
- **Sessão de treino:** iniciar pela ficha, registrar séries, corrigir registros,
  retomar uma sessão interrompida e finalizar ou descartar o treino.
- **Tipos de série:** aquecimento, trabalho e manutenção, com carga em kg e
  quantidade de repetições.
- **Histórico:** consultar treinos finalizados e ver o último desempenho de um
  exercício durante o treino atual, independentemente da ficha utilizada.
- **Uso offline:** criar e editar exercícios e fichas, registrar treinos e
  consultar dados já disponíveis no aparelho sem conexão.
- **Sincronização:** enviar alterações ao Supabase, sem duplicações, e consultar
  o histórico em outros aparelhos. Em conflitos, escolher entre a versão local
  e a do servidor.
- **Aplicativo instalável:** interface em português, com prioridade para celular,
  também utilizável no computador como PWA (aplicativo web instalável).

## Regras principais

- Carga aceita zero e valores decimais não negativos; repetições são inteiros
  positivos.
- Um exercício não se repete dentro da mesma ficha.
- Cada sessão é registrada em um único aparelho, com uma sessão ativa por
  aparelho. Não será possível continuar a mesma sessão em outro dispositivo.
- Ao iniciar uma sessão, guardar uma cópia da estrutura e dos nomes da ficha.
  Alterações posteriores não reescrevem treinos antigos.
- Séries podem ser corrigidas ou removidas antes da finalização. Treinos
  finalizados ficam somente para consulta neste MVP.
- Finalizar exige pelo menos uma série e permite treino parcial. Descartar exige
  confirmação; sessões descartadas não entram no histórico de desempenho.
- Exercícios e fichas são arquivados, não apagados definitivamente. Itens
  arquivados não são oferecidos para novas seleções ou início de treinos.
- O desempenho anterior é o da última sessão anterior finalizada contendo
  aquele exercício, com as séries mostradas individualmente. Não haverá sugestão
  automática de aumento de carga.

## Offline, privacidade e limites

Cadastro, login inicial e recuperação de senha exigem internet. O uso offline
começa depois do primeiro acesso e da preparação dos dados e arquivos locais.
O histórico offline se limita ao que já está disponível naquele aparelho.

As alterações serão salvas primeiro no aparelho e sinalizadas como pendentes
até a confirmação do servidor. A sincronização será tentada ao abrir o app,
recuperar a conexão, voltar ao aplicativo ou tocar em “Sincronizar”. Não há
garantia de envio com o aplicativo fechado.

Em alterações conflitantes, as duas versões serão preservadas para comparação e
escolha, sem sobrescrita silenciosa. Se a autenticação expirar, o trabalho local
será mantido e um novo login será necessário antes do envio.

Dados e pendências serão separados por usuário. Sair bloqueará o acesso local;
pendências só serão retomadas após novo login na mesma conta. O banco do servidor
terá regras de acesso por usuário, inclusive nas relações entre os dados. Nenhuma
chave administrativa deverá estar no frontend ou no repositório.

**Atenção:** dados ainda não sincronizados existem apenas naquele aparelho.
Limpar os dados do navegador pode apagá-los.

## Tecnologias

- **Base atual:** JavaScript, React, Vite, CSS e GitHub Actions; CI usando Node 24.
- **Navegação planejada:** React Router.
- **Autenticação e banco planejados:** Supabase Auth e PostgreSQL, com regras de
  acesso por usuário (Row Level Security).
- **Armazenamento local planejado:** IndexedDB com a biblioteca `idb`.
- **PWA planejado:** `vite-plugin-pwa`.
- **Testes planejados:** Vitest e Playwright.
- **Publicação planejada:** Vercel, usando `frontend` como raiz do aplicativo.

Não haverá migração para TypeScript neste MVP. Telas, componentes visuais e
funções de acesso aos dados serão separados progressivamente.

## Fora do MVP

- Cronômetro automático de descanso.
- Gráficos de evolução de carga.
- Medidas corporais e acompanhamento de peso corporal.
- Recomendações automáticas de carga.
- Compartilhamento de fichas.
- Edição ou continuação da mesma sessão em aparelhos diferentes.

## Como acompanhar o desenvolvimento

Cada microtarefa terá objetivo, explicação, implementação, verificação e revisão.
Depois da entrega, faremos uma pausa para conferência antes de avançar.

O [checklist de implementação](docs/plano-mvp.md) registra a ordem das tarefas,
o que comprova cada entrega e as observações do aprendizado.

## CI/CD e qualidade de código

### Fluxo atual

O projeto usa GitHub Actions para integração contínua (CI). O workflow é executado:

- em Pull Requests destinados à branch `main`;
- após alterações enviadas diretamente à `main`;
- manualmente pela aba **Actions**, por meio de `workflow_dispatch`.

Execuções anteriores do mesmo Pull Request são canceladas quando um novo commit é
enviado. Isso evita gastar tempo verificando uma versão que já ficou desatualizada.
O workflow possui apenas permissão de leitura do repositório e limite de dez
minutos.

O job **Quality gates** usa Node 24, instala exatamente as versões registradas no
`package-lock.json`, aproveita o cache do npm e executa, nesta ordem:

1. `npm run lint` — procura problemas no código JavaScript e React;
2. `npm run audit` — bloqueia vulnerabilidades conhecidas de severidade alta ou
   crítica nas dependências;
3. `npm run build` — confirma que o frontend pode gerar uma versão de produção.

O build só é executado se os checks anteriores passarem. Qualquer uma dessas
falhas deve bloquear o merge. O Dependabot procura atualizações do npm toda
segunda-feira e abre Pull Requests limitados e revisáveis; dependências de
desenvolvimento recebem atualizações menores e correções agrupadas.

### Executar localmente

Entre na pasta do frontend antes dos comandos:

```bash
cd frontend
```

Use Node 24. Quem utiliza NVM pode selecionar a versão registrada no projeto:

```bash
nvm use
```

Para reproduzir o CI inteiro:

```bash
npm ci
npm run check
```

Também é possível executar cada verificação isoladamente:

```bash
npm run lint
npm run audit
npm run build
```

`npm ci` é usado no lugar de `npm install` durante a validação porque faz uma
instalação limpa e fiel ao lockfile. Use `npm install` apenas quando estiver
adicionando ou atualizando uma dependência e versionar junto as alterações de
`package.json` e `package-lock.json`.

### Testes e cobertura

O projeto ainda não contém regras de negócio nem suíte de testes. Por isso, não
foram criados testes artificiais, relatório de cobertura ou percentual mínimo.
Os testes unitários com Vitest serão adicionados junto à tarefa 05 do plano do
MVP, quando houver comportamento útil para verificar. Testes de integração e
Playwright serão incluídos conforme surgirem banco local, autenticação e fluxos
completos. Até lá, não há comando de testes ou cobertura a ser executado.

Quando a suíte existir, seus comandos serão adicionados aos scripts do npm e ao
job **Quality gates** antes de serem exigidos na proteção da branch.

### Decisões dos quality gates

| Verificação | Classificação atual | Motivo |
| --- | --- | --- |
| Lint | Necessário agora | ESLint já existe e detecta erros comuns de JavaScript e React com baixo custo. |
| Auditoria de dependências | Necessário agora | O aplicativo depende de pacotes externos; apenas riscos altos e críticos bloqueiam para evitar ruído excessivo. |
| Build | Necessário agora | É a garantia mínima de que o frontend pode ser publicado. |
| Atualização de dependências | Necessário agora | O Dependabot mantém o lockfile revisável sem atualização automática da aplicação. |
| Formatação automática | Recomendado depois | Ainda não existe formatter nem volume de código que justifique outra ferramenta obrigatória. |
| Testes unitários | Recomendado depois | Serão úteis quando começarem os comportamentos do MVP; hoje testariam apenas a demonstração do Vite. |
| Testes de integração e E2E | Recomendado depois | Dependem dos fluxos de autenticação, armazenamento e treino ainda não implementados. |
| Cobertura mínima | Recomendado depois | Só deve ser avaliada quando houver suíte; definir uma porcentagem agora seria arbitrário. |
| Type checking | Desnecessário agora | O MVP permanecerá em JavaScript e não há configuração de TypeScript ou JSDoc tipado. |
| Validação de arquitetura | Desnecessário agora | A aplicação ainda não possui camadas suficientes para justificar uma ferramenta dedicada. |
| Docker e migrations | Desnecessário agora | Não há Docker nem banco versionado no estado atual. Migrations ganharão validação quando forem criadas. |
| CodeQL ou analisador adicional | Recomendado depois | Neste código inicial, acrescentaria manutenção e pouco sinal além do lint e da auditoria. |
| Detecção de secrets | Recomendado na plataforma | Ativar o secret scanning do GitHub, quando disponível, evita manter outra ferramenta no workflow. |
| Smoke test | Recomendado com o deploy | Não existe ambiente publicado ou URL estável para validar neste momento. |

### Falhas comuns

- **`npm ci` informa lockfile inconsistente:** execute `npm install` após alterar
  dependências, confira os dois arquivos de pacotes e versione ambos.
- **Lint falha:** execute `npm run lint`, abra o arquivo e a linha indicados e
  corrija a regra apontada. O lint não altera os arquivos automaticamente.
- **Auditoria falha:** leia o pacote e a severidade no log, tente uma atualização
  compatível e execute `npm run audit` novamente. Não use `--force` sem revisar
  possíveis mudanças incompatíveis.
- **Build falha:** execute `npm run build` e comece pelo primeiro erro. Causas
  comuns são importações incorretas, dependências ausentes ou código inválido.
- **Só falha no GitHub:** confirme Node 24 com `node --version`, faça uma instalação
  limpa com `npm ci` e repita `npm run check`.

### Proteção recomendada para a branch principal

Nas configurações do GitHub, criar uma ruleset para `main` com:

- exigir Pull Request antes do merge;
- exigir o check **CI / Quality gates** com sucesso;
- exigir que a branch esteja atualizada antes do merge;
- bloquear force push e exclusão da branch;
- impedir bypass das regras pelos colaboradores.

Uma revisão obrigatória não é necessária enquanto houver apenas um desenvolvedor,
pois impediria trabalho individual. Ela deve passar a ser exigida quando outra
pessoa puder revisar as mudanças. Essas regras são configuração externa do
GitHub e não podem ser garantidas apenas pelos arquivos do repositório.

### Continuous Delivery/Deployment

CD não foi implementado. A Vercel está planejada, mas o repositório ainda não
define projeto, ambientes, domínio, variáveis, smoke test ou política de promoção
para produção. Criar um workflow agora exigiria inventar infraestrutura e secrets.

Quando a tarefa 39 for iniciada, será necessário definir o projeto da Vercel,
ambientes de preview e produção, `VITE_SUPABASE_URL`, a chave pública do Supabase,
URLs autorizadas de autenticação, proteção de produção, teste de fumaça e estratégia
de rollback. Valores sensíveis nunca devem ser escritos no repositório.
