# A decidir

Pontos que dependem do Caio. Estão em ordem de prioridade: o primeiro bloco precisa de resposta **antes do merge** do PR da v2, porque merge na `main` publica em produção.

> O repositório é público: este arquivo não tem (nem deve ter) nada sensível.

## 1. Antes do merge (bloqueia o deploy)

- [ ] **Versão do Node na VPS.** O Next 16 exige Node **>= 20.9**. O build no Actions agora usa Node 22, mas quem roda o site é o Node da VPS (via PM2). Conferir com `node -v` na VPS. Se estiver abaixo, atualizar (de preferência para a 22 LTS) e reiniciar com `pm2 restart portfolio --update-env`. Se o merge acontecer com Node antigo, o site não sobe.
- [ ] **Passar o olho no site rodando local** (`npm ci && npm run build && npm start`) ou no preview do PR, em especial os textos (item 2).

## 2. Conteúdo para confirmar

Escrevi tudo em primeira pessoa, num tom sincero e leve. Revise com atenção, porque é a sua voz:

- [ ] **Textos com piada ou opinião**, para ver se soam como você: legenda da foto ("o monitor vertical é pra ler log, juro."), o "de preferência sem ninguém perceber a troca" do hero, a 404 ("Essa rota não passou no code review."), o recado no console do navegador e o "Mandarim: por enquanto, 你好 e paciência".
- [ ] **Cargo**: o hero e o card do Itaú dizem "Engenheiro de Software". Na experiência está o cargo formal, "Desenvolvedor Júnior", como já era no site antigo. Manter assim?
- [ ] **Número de membros do SDP**: o site diz "+14.500". Ainda está certo?
- [ ] **Formação**: aparece "Bacharelado em Ciência da Computação, 2022 – 2026", e a bio diz "estudei Ciência da Computação na São Judas". Se a formatura ainda não aconteceu, trocar para "estudo" ou "estou terminando".
- [ ] **Seção "O que eu ando fazendo"** (`lib/data/profile.ts`, `now`): IELTS em dezembro, francês e mandarim, simulador de IELTS, próxima edição do MeetUp, jiu-jitsu 3x por semana. Atualize sempre que mudar, junto com `nowUpdatedAt`. Se não houver uma 3ª edição do MeetUp no horizonte, ajustar esse item.
- [ ] **YouRoadmaps** aparece como "atual" (dez/2024 até hoje). Continua ativo?
- [ ] **TikTok**: mantive `@caio_andres`, que é o que estava no site no ar. Só que as suas anotações do projeto dizem `@caio_andress` (com dois "s", igual ao Instagram e ao YouTube). Confirmar qual é o certo em `lib/site.ts`.
- [ ] **WebSec Brasil**: o domínio antigo não responde mais, então o parceiro aparece sem link. Se tiver um site ou perfil novo, coloque em `lib/data/community.ts`.
- [ ] **Data da Developer Associate**: não consegui ler a data de emissão no Credly (a API pública deu erro). Se quiser mostrar datas nas certificações, adicione o campo em `lib/data/certifications.ts`.
- [ ] **Projetos que ficaram de fora** por falta de informação para descrever direito: Dev Builder, Rio Mini Games, Plataforma Carreira TI. Se quiser algum, mande 2 ou 3 linhas sobre ele e o link. Projetos feitos para clientes ficaram de fora de propósito.
- [ ] **Selo "disponível para conversas"** em cima da foto: deixar, trocar o texto ou tirar?

## 3. Escolhas que eu fiz (dá para reverter)

- **Galeria dos meetups sem autoplay.** A versão anterior trocava a foto a cada 3 segundos. Agora quem vê controla (anterior/próxima, "2 de 4"). Movimento automático atrapalha leitura e leitor de tela (WCAG 2.2.2).
- **Sem analytics e sem cookies.** O rodapé promete isso, e os testes garantem. Se um dia quiser métricas, a opção que combina com a CSP é algo auto-hospedado e sem cookie, e aí o texto do rodapé muda junto.
- **Sem Supabase nem backend.** Não foi necessário: o site é estático no conteúdo. Um formulário de contato precisaria de backend, anti-spam e mais superfície de ataque. Por isso ficaram e-mail (com botão de copiar) e redes. Se quiser formulário, dá para fazer no plano grátis do Supabase, mas é uma decisão consciente.
- **HSTS sem `preload`.** Entrar na lista de preload dos navegadores é difícil de desfazer (meses) e obriga HTTPS em todos os subdomínios para sempre. Se tiver certeza, adicionar `; preload` em `next.config.ts` e enviar em hstspreload.org.
- **Badges das certificações servidos pelo próprio site** (não pelo Credly), para não carregar nada de terceiros. O link "verificar no Credly" leva à página pública. O link antigo da Cloud Practitioner redireciona para um id novo, e já usei o novo.
- **O `CLAUDE.md` segue no `.gitignore`**, como já estava. As regras do projeto para qualquer agente estão no `AGENTS.md`, que é versionado.

## 4. Configurações do GitHub (grátis, você liga se quiser)

Mexem nas configurações do repositório público, por isso não liguei sozinho:

- [ ] **Alertas e correções do Dependabot**: `gh api -X PUT repos/caio-andres/portfolio-caio-andres/vulnerability-alerts` e `gh api -X PUT repos/caio-andres/portfolio-caio-andres/automated-security-fixes`
- [ ] **Reporte privado de vulnerabilidade** (botão "Report a vulnerability" na aba Security): `gh api -X PUT repos/caio-andres/portfolio-caio-andres/private-vulnerability-reporting`. Se ligar, vale citar no `SECURITY.md`.
- [ ] **Proteger a `main`** (exigir o CI verde antes do merge): em Settings → Rules, ou peça que eu configure.

## 5. Deploy na VPS (já era assim, vale melhorar)

O script remoto do `deploy.yml` não para quando um passo falha (não tem `set -e`). Se o upload vier truncado ou faltar a pasta `~/backups`, ele ainda reinicia o PM2 com um build misturado e marca o deploy como sucesso. Ele também extrai por cima do `.next` antigo, então arquivos velhos ficam lá. Não mexi porque não tenho como testar na VPS. Proposta, para aplicar com você olhando:

1. `set -euo pipefail` e `mkdir -p ~/backups` no começo do script.
2. Extrair em uma pasta nova (`/var/www/portfolio-caio-andres.new`), conferir se `.next/BUILD_ID` existe e só então parar o PM2, trocar as pastas com `mv` e reiniciar.
3. Manter a pasta anterior como `.old` para rollback rápido (`mv` de volta e `pm2 restart`).

## 6. Lembretes com data

- **`security.txt` vence em 22/11/2027** (`lib/security/security-txt.ts`). A partir de 30 dias antes, o E2E do CI dos PRs falha para lembrar. O deploy não trava por isso. Renovar com mais um ano.

## Onde acompanhar

- Board: https://github.com/users/caio-andres/projects/7
- Spec da mudança: `openspec/changes/portfolio-v2/`
