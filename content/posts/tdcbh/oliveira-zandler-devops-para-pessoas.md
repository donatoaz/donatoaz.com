---
title: Devops para pessoas, sem ferramentas
date: 2019-06-17T09:54:42-03:00
draft: false
---

-- Zandler Oliveira
-- [@zandler](https://twitter.com/zandler) on twitter

> "Se voce tem devops no nome do cargo, pede as contas porque nao entendeu o que signifca".

Zandler se propôs a falar sobre a experiência dele tentando implantar a cultura devops nas empresas em que trabalhou.

Afirmou que normalmente, se alguém exercia função de Sys Admin e fez um único bash script se sente no direito de listar `DevOps` como competência `"ou pior, como cargo"`.

Falou sobre a responsabilidade de se `"virar pai de um problema"`, numa clara alusão à ideia atual de os times operarem o próprio `workload` e de terem `ownership and accountability`. 

Em seguida, comentou sobre sobre não focarmos em uma ferramenta específica, mas sim `"pensar na solução que se quer prover, e então esta solução ser o _drive_ das discussões"`, então finalizando com `"Não use cegamente padrões ou acredite em balas de prata"`.

Em seguida fez uma crítica ao `"Tudo pra ontem e com arquiteturas modinha"` _(N. do e.: Neste caso eu acredito que ele quis dizer que nas empresas em que não há um envolvimento efetivo dos profissionais de operação durante o ciclo de vida de um projeto de desenvolvimento que os prazos para atividades importantíssimas ficam relegados e as vezes estes profissionais são até mesmo abandonados, com prazos surreais para realizar atividades complexas, como por exemplo entregar um cluster kubernetes)._

Em seguida falou sobre exercer diversos papeis, conforme a necessidade do negócio, sem se fixar em um nome específico de cargo, já que o objetivo é resolver problemas. Comentou que exerce o papel de `"sysadmin em um processo, security consultant em outro, etc"`.

Em seguida afirmou `"Uma dica a vocês: sejam "preguiçosos". resolvam com eficácia os pequenos problemas e tarefas repetitivas para não ter de desperdiçar tempo com eles no futuro"`. (N. do e.: Um dos motos da comunidade Perl, uma linguagem muito conhecida no meio dos sysadmins, era exatamente esta ideia da "preguiça" no mesmo sentido que o Zandler quis dizer. Para quem se interessar: [Resumo sobre as 3 virtudes do programador](http://threevirtues.com/), E este fantástico [keynote no 2o State of The Onion, 1998](https://www.perl.com/pub/1998/08/show/onion.html/), do Larry Wall, criador da linguagem Perl.

`"Como eu entrego valor da maneira 'certa'?"` Zandler fez a pergunta e logo em seguida respondeu: `"use o que já tem, e evolua incrementalmente a partir de então. Pense na visão de longo prazo"`. 

Pense em todos os seus requisitos, `"Compliance é complicado, alguns projetos exigem entregar sua aplicação juntamente com as dependencias, pois o sistema não possui acesso à internet"`.

`"Saber conversar com todo mundo sobre tudo. Os conceitos tem de te levar para frente"`.

![alt text][zandler-happypath1]
![alt text][zandler-happypath2]

Zandler deu um exemplo interessante de um workload sendo rodado no [Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) com 4 instancias 256gb ram e 16cpu que pode ser substituída por 10 de 4gb ram e 2cpu, reduzindo drasticamente o custo. E que isto foi feito após um trabalho conjunto com os desenvolvedores que permitiu que a aplicação fosse melhor distribuída.

Em seguida fez uma crítica ácida: `"Nao existe arquiteto com menos de 5 anos de experiência, ao menos não no mercado"`. Apenas a experiencia vai te dar a bagagem necessária para ser um resolvedor de problemas.

E então comentou sobre "Blame games" dentro de empresas e fez um apelo: `"Tratar as pessoas com amor, pois todo mundo tem seu contexto. Saiba qual a posição/papel de cada interlocutor para sintonizar o conteúdo de seus argumentos"`.

E comentou: `"é muito facil dizer 'eu sabia que isto ia acontecer', mas o correto é fazer o máximo para convencer todos os envolvidos antes de dar problema. Seja sincero com todos os stakeholders"`.

`"Geralmente o problema de um workload não é a infra, é o codigo"`, mas para provar isto é preciso medir. `"Nunca fale pra um desenvolvedor que o código dele é lento, mas ao invés disso, sente-se com ele de frente às métricas e deixe-o chegar a esta conclusão ou a outra melhor que, por vezes, você nem imaginava"`.

`"A tomada de decisão (n.d.e.: decisão vertical) tem de ser combatida. Saiba a diferença entre papeis e gerentes"`. Zandler deu o exemplo de `"Scrum Masters, POs, não são gerentes, são papéis exercidos dentro de um time"`.

**Conclusão do palestrante:** `"seja um facilitador"`. (n.d.e.: um líder servidor).

[zandler-happypath1]: /images/tdcbh-day1/zandler-happypath1.jpg "Caminho feliz do devops"

[zandler-happypath2]: /images/tdcbh-day1/zandler-happypath2.jpg "Caminho feliz do devops"

