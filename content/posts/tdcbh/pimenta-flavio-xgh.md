---
title: XGH, é técnico ou cultura?
date: 2019-06-17T09:54:42-03:00
draft: false
---

-- Flávio Pimenta (Sensedia)
-- [@pimentaflavio](https://twitter.com/pimentaflavio) on twitter

> "A gente está fazendo o melhor possivel no dia-a-dia, ou estamos ignorando os processos (melhores praticas) apenas para entregar rápido?"

Assim foi aberta a trilha de DevOps do primeiro The Developers Conference em Belo Horizonte (TDCBH).

`"Arrumar uma coisa prejudica outra?"` Isto pode ser um claro indício de más práticas na sua companhia, afirmou Flávio, que prosseguiu com um exemplo real ocorrido com ele e transcrito aqui (assim como todo este texto) da melhor forma que me lembro. 

> Certa vez, logo após embarcar em um avião, o comandante, pelo sistema de anúncio PA, disse que uma determinada luz no painel do avião se acendeu e que teriam de abortar a decolagem e chamar a equipe técnica de manutenção. Equipe técnica embarcou e  sugeriu o tradicional "have you tried turning it off and on again"?

![alt text][itcrowd]

Mas o problema persistiu e a solução foi trocar de aeronave.

Para trocar de aeronave, que estava exatamente ao lado tiveram de pegar um ônibus, ou seja, todo um procedimento, para re-embarcar numa aeronave a passos de distância.

E então Flávio fez o paralelo do alerta no painel com alertas no log ao subir uma aplicação. `"Imagina se o avião fosse um sistema em produção?"`. `"Quantas vezes vemos algum erro no log e dizemos:  'Ah, mas este erro é normal... desconsidera.'"`.

E deu outro exemplo do tradicional caso do deploy abandonado em produção: `"Se funcionou no dia 1, vai funcionar para sempre"`. Mas todo mundo sabe que não é bem assim. `"E aí?"`, continuou Flávio `"A solução é dar reboot atrás de reboot, reboot, reboot?" A solução é resolver os bugs em prod consolidando (dando `commit`) direto no master, sem entender exatamente o problema na hora?"`.

[![Pipeline sugerido pelo Flávio no tratamento de problemas](/images/tdcbh-day1/flavio-pipeline.jpg)][flavio-pipeline]

> "Não é simples, não é rápido e não é barato ter uma esteira de deploy/integração contínua. Mas há um tradeoff de segurança e garantia envolvido que faz desta esteira algo de valor". 

Flávio então disse algo muito interessante: **`"[...], Mas se todos nós sabemos que este é o 'mundo ideal', que então isto seja algo almejado"`**.

Mencionou a ideia do `"andon cord"` da Toyota para o time focar quando houver um cenário de erro em produção.

[![alt text][10bugs]][10bugs]

_Nota do editor: A aplicação da prática do "andon cord" no desenvolvimento de software, assim como muitas outras práticas do Toyota Production System, tem diversas evidências anedotais e algumas quase científicas de eficácia quando comparadas a outras práticas. Para mais detalhes e referências, veja o capítulo `Enable and Practice Continuous Integration` do livro The DevOps Handbook de Jezz Humble e outros._

[![Andon cord na Toyota no Japão](https://img.youtube.com/vi/r_-Pw49ecEU/3.jpg)](https://www.youtube.com/watch?v=r_-Pw49ecEU)

`"E num projeto novo?"` Flávio sugeriu que é ainda mais importante se resguardar neste caso para o projeto não nascer com cara de legado, perpetuando más práticas de Go Horse.

`"E quando o projeto já está em produção?"` Nestes casos, quando o projeto já está em cruzeiro você realmente estará `"trocando a roda com o carro andando"` 

_Nota do editor: Eu acredito que neste ponto ele quis dizer que, infelizmente esta é a realidade de muitos projetos e realmente temos de "trocar a roda com o carro andando"._

_Nota do editor: Nestes casos sugiro uma leitura sobre um padrão arquitetural de evolução de projetos chamado "The Strangler Pattern", o termo foi cunhado pelo Martin Fowler após observar como as ervas daninhas (strangler fig em inglês) fazem com outras árvores: elas começam pelo topo, aos poucos, substituindo e tomando conta do hospedeiro até o enforcar e substituir por completo, raiz à copa._

[Martin Fowler, StranglerFigApplication](https://martinfowler.com/bliki/StranglerFigApplication.html)

`"Ideia do MVP é que ele tem de ser de 'qualquer jeito', para validar um modelo."` Mas ele alertou sobre não fazer um `"puxadinho"`, afirmou que MVP é `"para fazer e jogar fora".` 

_Nota do editor: Talvez nem tanto ao céu nem tanto ao mar, mas fato é que, assim como ele afirmou, não podemos pensar em carregar o MVP como o [Castelo Andante de Howl](https://www.youtube.com/watch?v=iwROgK94zcM) para o resto da vida. Ainda neste assunto, no podcast recente da Stelligent, [DevOps on AWS Radio: AWS Serverless Adoption with Tom McLaughlin (Episode 23), min 21:37](https://soundcloud.com/user-103056681/ep-23-aws-serverless-adoption-with-tom-mclaughlin#t=21:37), Tom McLaughlin faz um comentário interessante sobre arquitetura e tecnologia em StartUps, basicamente na linha de: `"Se você está tendo problemas de escala em função da arquitetura inicialmente escolhida, parabéns, a maioria das startups não vive para chegar neste ponto."`._ 

`"Mas como não cair no GH? Sistemas de software podem ser críticos e a resolução de problemas deve obrigatoriamente levar em consideração a prática considerada da disciplina e ponderação."` Afirmou Flávio aludindo ao exemplo inicial da luz no painel do avião, que dado outro tratamento poderia ter acabado em tragédia.

_Nota do Editor: neste caso, recomendo ao leitor assistir ao ótimo video do nosso tio Bob sobre [princípios SOLID](https://www.youtube.com/watch?v=oar-T2KovwE&t=3805s), que em determinado momento faz um apelo à responsabilidade que nós engenheiros de software temos com a segurança e a vidas dos usuários. Um vídeo bem longo (2+ horas), mas incrivelmente enriquecedor._ 

Flávio então partiu para algumas bases e fundamentos para se evitar o XGH, indicou o uso de controle de versão, mas de forma relativamente superficial, neste caso talvez ele pudesse ter se aprofundado mais um pouco e ao menos listar práticas modernas como uso de telemetria, modelos de deploy (como `canarying`, `blue-gree`, `dark deploys` , arquiteturas que favorecem desacoplamento e experimentação como `feature flagging`, microsserviços, `contract-driven development`.

`"No caso de Monitoramento"` Flávio deu exemplo de alertas inúteis , que estes mais prejudicam do que auxiliam.

_Nota do Editor: a prática da cuidadosa gestão de alarmes é um assunto que já foi muito abordado na Automação Industrial, onde este problema de monitoramento já é tratado desde há muito tempo (O [Abnormal Situation Consortium] data de 1992). Para os interessados na história, vejam [Alarm Management History](https://en.wikipedia.org/wiki/Alarm_management#Alarm_management_history) na Wikipedia._

**Conclusões do apresentador**: Não seja xiita em achar que `"tal e tal prática não é necessária ou nunca funcionaria na sua empresa"`, defenda e argumente o que você considera ideal; `"o combinado não sai caro"`; invista em: `"automatização, telemetria e monitoramento"` e por fim, sempre `"discuta trade-offs com sua equipe"`.

[itcrowd]: https://www.itro.com.au/wp-content/uploads/Have-you-tried-turning-it-off-and-on-again.png "Você já tentou desligar e ligar novamente?"

[10bugs]: https://d2h1nbmw1jjnl.cloudfront.net/ckeditor/pictures/data/000/000/153/content/10bugs.jpg "10 reasons to resolve your bugs as soon as possible"

[flavio-pipeline]: /images/my-first-post/flavio-pipeline.jpg