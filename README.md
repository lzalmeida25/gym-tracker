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
