# Gym Tracker — plano e checklist do MVP

## Objetivo e andamento

Construir um aplicativo para cadastrar exercícios, montar fichas, registrar
treinos e consultar o desempenho anterior, inclusive offline. O escopo e as
regras de produto estão no [README](../README.md).

- Tarefa 01: documentação entregue; aguardando conferência do usuário.
- Tarefas 02 a 40: pendentes.
- Próxima tarefa, após a conferência: **02 — Conhecer o projeto atual**.
- Nenhuma funcionalidade do aplicativo foi implementada na tarefa 01.

Uma caixa marcada indica uma entrega concluída, não a conclusão do MVP nem a
confirmação de aprendizado pelo usuário. A conferência será registrada nas
observações antes de iniciar a próxima tarefa.

## Como trabalharemos

Uma microtarefa por vez, com explicações para iniciante:

1. **Objetivo:** identificar a pequena melhoria que será feita.
2. **Explicação:** apresentar o conceito necessário em linguagem simples.
3. **Implementação:** alterar apenas o necessário para aquela tarefa.
4. **Verificação:** mostrar o que abrir, clicar ou executar para conferir.
5. **Revisão:** resumir os arquivos alterados e o aprendizado.

Depois de cada entrega, pausar para o usuário conferir. Se uma tarefa ficar
grande, dividi-la em subtarefas antes de começar, mantendo o número original como
referência. Não há prazo fixo por tarefa: o ritmo acompanha o aprendizado.

## Decisões de implementação

### Interface e dados

- Manter JavaScript, React/Vite e CSS simples; priorizar celular e português.
- Adicionar React Router para navegação, sem misturar telas, componentes visuais
  e funções de acesso aos dados.
- Usar Supabase para conta e banco, IndexedDB com `idb` para dados locais,
  `vite-plugin-pwa` para instalação e abertura offline, e Vercel para publicação.
- Organizar cinco conjuntos de dados: exercícios, fichas, exercícios ordenados
  da ficha, sessões e séries executadas.
- Seguir as regras de validação, arquivamento, cópia da ficha ao iniciar o treino
  e histórico somente de sessões finalizadas descritas no README.
- Cada sessão pertence ao aparelho onde começou; demais aparelhos recebem o
  histórico, mas não continuam ou editam aquela sessão.

### Offline e sincronização

- Salvar a alteração local e sua pendência em uma única transação: as duas
  gravações devem funcionar juntas, ou nenhuma deve ser confirmada.
- Dar identificadores únicos a registros e operações. Reenviar a mesma operação
  não pode criar duplicações.
- Verificar a versão anterior no servidor antes de aceitar uma alteração.
  Sincronizar a ficha e sua lista de exercícios como uma unidade.
- Enviar exercícios novos antes das fichas que dependem deles. Enviar sessões
  e séries de forma consistente.
- Preservar alterações locais ainda não enviadas ao baixar dados do servidor.
- Em conflito, preservar ambas as versões e permitir uma escolha explícita.
  Enviar essa escolha com nova verificação de versão.
- Tentar sincronizar ao abrir, recuperar conexão, voltar ao app ou por botão
  manual; não depender de execução com o aplicativo fechado.
- Exibir “salvo neste aparelho”, “sincronizado”, “erro” ou “conflito” conforme o
  resultado real. Não confirmar salvamento quando o armazenamento falhar.
- Não usar cache genérico de respostas privadas da API no service worker; o
  cache do PWA será dos arquivos da interface. Dados ficam no banco local.

### Conta e segurança

- Cadastro, login inicial e recuperação de senha exigem internet. Preparar os
  arquivos e dados locais antes de oferecer abertura e trabalho offline.
- Separar dados e pendências por usuário. Sair bloqueia acesso local, mantendo
  pendências acessíveis somente após novo login na mesma conta.
- Autenticação expirada pausa os envios e solicita login, sem apagar trabalho.
- Criar migrações SQL versionadas e regras por usuário em todas as tabelas e
  relações. Nunca colocar chave administrativa no frontend ou repositório.
- Testar isolamento com duas contas. Operações no servidor devem verificar
  proprietário, identificador da operação e versão do registro.
- Avisar que limpar os dados do navegador pode apagar alterações não enviadas.

## Checklist de implementação

### Etapa A — Entender e preparar a base

- [x] **01. Registrar o escopo e o checklist.** Atualizar o README com o MVP
  acordado e criar este acompanhamento.
  **Verificação:** funcionalidades do MVP e itens futuros estão separados,
  decisões registradas e todas as 40 tarefas identificadas.
- [ ] **02. Conhecer o projeto atual.** Identificar entrada do aplicativo,
  componente principal, estilos e comandos.
  **Verificação:** o usuário consegue localizar onde alterar um texto da tela.
- [ ] **03. Substituir a demonstração do Vite.** Mostrar o nome Gym Tracker e uma
  página inicial simples, adaptada ao celular.
  **Verificação:** a tela abre sem o contador e os exemplos do Vite.
- [ ] **04. Criar a navegação inicial.** Adicionar páginas vazias para exercícios,
  fichas e histórico.
  **Verificação:** links e botão voltar funcionam.
- [ ] **05. Preparar verificações automáticas.** Adicionar Vitest, um teste simples
  e comandos de teste; incluir lint e testes no CI existente.
  **Verificação:** testes, lint e build passam.

### Etapa B — Conta e acesso

- [ ] **06. Preparar a conexão real com o Supabase.** Instalar a biblioteca,
  configurar variáveis locais e criar um exemplo sem credenciais.
  **Verificação:** configuração funciona e sua ausência gera mensagem clara.
- [ ] **07. Criar o cadastro.** Implementar e-mail, senha e orientação de
  confirmação por e-mail.
  **Verificação:** uma conta de teste pode ser criada e confirmada.
- [ ] **08. Criar o login e proteger as páginas.** Exibir carregamento enquanto a
  sessão é verificada.
  **Verificação:** visitantes não acessam páginas pessoais.
- [ ] **09. Implementar permanência da sessão e saída.** Restaurar acesso ao
  recarregar e encerrá-lo ao sair.
  **Verificação:** os dois comportamentos são verificáveis.
- [ ] **10. Adicionar recuperação de senha.** Implementar pedido de recuperação
  e definição da nova senha.
  **Verificação:** o fluxo funciona com uma conta de teste.

### Etapa C — Salvar exercícios no aparelho

- [ ] **11. Criar o banco local.** Preparar IndexedDB, organização por usuário e
  alterações versionadas da estrutura.
  **Verificação:** um dado de teste sobrevive ao recarregamento.
- [ ] **12. Criar o cadastro local de exercícios.** Salvar nome e grupo muscular,
  validando campos vazios.
  **Verificação:** exercício aparece na lista e permanece após recarregar.
- [ ] **13. Permitir edição e arquivamento.** Modificar exercícios e esconder os
  arquivados das novas seleções.
  **Verificação:** editar não cria duplicatas e arquivar não apaga o registro.
- [ ] **14. Criar a fila local de alterações.** Gravar cada mudança e sua pendência
  na mesma transação.
  **Verificação:** não existe alteração salva sem a respectiva pendência.
- [ ] **15. Tornar o aplicativo instalável e acessível offline.** Adicionar
  manifesto, ícones e cache da interface, sem cache genérico de respostas privadas.
  **Verificação:** após o primeiro carregamento online, o app reabre e cadastra
  exercícios em modo avião.

### Etapa D — Sincronizar exercícios com segurança

- [ ] **16. Criar a tabela de exercícios no Supabase.** Registrar sua criação em
  uma migração SQL versionada.
  **Verificação:** estrutura pode ser reproduzida sem alterações manuais não
  documentadas.
- [ ] **17. Proteger os exercícios por usuário.** Aplicar regras de leitura e
  escrita e testar com duas contas.
  **Verificação:** nenhuma conta acessa ou altera dados da outra.
- [ ] **18. Implementar recebimento seguro de alterações.** Criar função de banco
  que verifica proprietário, identificador da operação e versão do registro.
  **Verificação:** repetir operação não duplica dados e versões antigas são
  rejeitadas como conflito.
- [ ] **19. Enviar pendências e baixar alterações.** Sincronizar exercícios,
  preservando alterações locais ainda não enviadas.
  **Verificação:** exercício criado offline aparece em outro aparelho após
  sincronizar.
- [ ] **20. Mostrar o estado da sincronização.** Exibir “salvo neste aparelho”,
  “sincronizado”, “erro” ou “conflito”, com tentativa manual.
  **Verificação:** falha de rede não produz indicação falsa de sucesso.
- [ ] **21. Resolver conflitos.** Comparar a versão local e a do servidor,
  permitindo escolher uma delas.
  **Verificação:** duas edições offline do mesmo exercício são tratadas sem perda
  silenciosa.
- [ ] **22. Tratar interrupções e troca de conta.** Retomar pendências após fechar,
  pausar envios sem autenticação e impedir mistura entre usuários.
  **Verificação:** interromper o envio ou trocar de conta não apaga nem envia
  dados para a pessoa errada.

### Etapa E — Montar fichas

- [ ] **23. Criar e listar fichas localmente.** Implementar nome e visualização.
  **Verificação:** ficha criada offline permanece após reabrir o aplicativo.
- [ ] **24. Adicionar e remover exercícios da ficha.** Selecionar exercícios
  cadastrados, sem duplicá-los na mesma ficha.
  **Verificação:** composição da ficha pode ser alterada.
- [ ] **25. Ordenar exercícios e arquivar fichas.** Usar botões de subir e descer,
  sem implementar arrastar nesta versão.
  **Verificação:** ordem permanece salva e fichas arquivadas não iniciam novos
  treinos.
- [ ] **26. Sincronizar fichas.** Adicionar tabelas, regras de acesso e envio
  conjunto da ficha com seus exercícios; enviar exercícios novos primeiro.
  **Verificação:** ficha criada inteiramente offline aparece completa no servidor
  e conflitos seguem a escolha de versão.

### Etapa F — Executar o treino

- [ ] **27. Iniciar uma sessão pela ficha.** Copiar a estrutura e vincular a sessão
  ao aparelho de origem.
  **Verificação:** editar a ficha não altera a sessão já iniciada.
- [ ] **28. Registrar uma série.** Adicionar tipo, carga e repetições, com
  salvamento local imediato após confirmação.
  **Verificação:** série válida permanece salva e valores inválidos são recusados.
- [ ] **29. Corrigir e remover séries durante o treino.** Permitir ajustes antes
  da finalização.
  **Verificação:** lista reflete exatamente as séries registradas.
- [ ] **30. Retomar um treino interrompido.** Manter uma sessão ativa por aparelho
  e oferecer “Continuar treino”.
  **Verificação:** fechar e reabrir offline preserva as séries confirmadas.
- [ ] **31. Finalizar ou descartar uma sessão.** Confirmar descarte, exigir pelo
  menos uma série para finalizar e permitir treino parcial.
  **Verificação:** somente sessões finalizadas entram no histórico de desempenho.
- [ ] **32. Sincronizar sessões e séries.** Enviar os registros de forma
  consistente, sem permitir continuação em outro aparelho.
  **Verificação:** repetir envios não duplica séries e o histórico aparece nos
  demais aparelhos.

### Etapa G — Consultar desempenho

- [ ] **33. Listar treinos finalizados.** Mostrar data, nome da ficha e detalhes.
  **Verificação:** também é possível consultar treinos finalizados localmente,
  ainda pendentes de envio.
- [ ] **34. Exibir o último desempenho durante o treino.** Buscar a última sessão
  anterior finalizada daquele exercício e mostrar séries, cargas e repetições.
  **Verificação:** funciona offline com os dados disponíveis e há mensagem para
  primeiro treino.
- [ ] **35. Preservar a leitura do histórico.** Usar nomes e estrutura registrados
  na sessão, mesmo após mudanças ou arquivamentos.
  **Verificação:** editar ficha ou exercício não reescreve o passado.

### Etapa H — Validar e publicar

- [ ] **36. Testar o fluxo completo automaticamente.** Usar Playwright para
  cadastro de exercício, ficha, treino, finalização e consulta.
  **Verificação:** percurso principal passa de ponta a ponta.
- [ ] **37. Testar falhas offline e sincronização.** Cobrir fechamento do app,
  resposta perdida, reenvio, conflito, autenticação expirada e armazenamento
  indisponível.
  **Verificação:** não há duplicação, perda silenciosa ou confirmação falsa de
  salvamento.
- [ ] **38. Revisar a experiência no celular.** Ajustar teclado numérico, botões,
  mensagens, telas vazias e atualização do PWA sem interromper treino.
  **Verificação:** treino de teste pode ser registrado confortavelmente no
  aparelho real.
- [ ] **39. Publicar na Vercel.** Configurar `frontend` como raiz, variáveis de
  ambiente, retorno das rotas e URLs de autenticação.
  **Verificação:** login, recuperação de senha, navegação e instalação funcionam
  no endereço publicado.
- [ ] **40. Fazer um treino piloto.** Executar treino real com período sem conexão
  e conferir os dados após sincronizar.
  **Verificação:** cargas, repetições e séries estão corretas no aparelho e no
  servidor.

## Critério de conclusão do MVP

O MVP estará pronto quando todos estes comportamentos forem validados:

- Entrar na conta e acessar apenas os próprios dados.
- Criar e editar exercícios e fichas sem internet.
- Registrar e retomar um treino offline.
- Consultar desempenho anterior disponível no aparelho.
- Sincronizar sem duplicações e escolher como resolver conflitos.
- Consultar histórico em outro dispositivo.
- Usar o aplicativo publicado e instalado no celular.

Cronômetro, gráficos, medidas corporais, recomendações automáticas de carga,
compartilhamento de fichas e edição da mesma sessão em aparelhos diferentes
continuam fora desta versão.

## Registro das entregas e observações

### Tarefa 01 — 2026-09-03

- **Objetivo:** registrar o que será construído e como acompanhar o trabalho.
- **Conceito:** README apresenta o projeto e seus limites; checklist transforma
  o escopo em pequenas entregas verificáveis.
- **Entrega:** README atualizado e este plano criado com as 40 microtarefas,
  decisões de implementação e critérios de conclusão.
- **Como conferir:** ler no README as seções de funcionalidades planejadas e
  itens fora do MVP; neste arquivo, conferir que apenas a tarefa 01 está marcada.
- **Limite da alteração:** somente documentação; sem mudanças de interface,
  dependências, banco de dados, CI ou publicação.

Nas próximas entregas, registrar aqui objetivo, conceito, alteração, verificação,
resultado da conferência e dúvidas que precisem ser retomadas.
