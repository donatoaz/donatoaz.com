---
title: Devops e SRE - Onde estas forças se cruzam
date: 2019-06-17T16:09:54-03:00
draft: false
---

-- Eduardo Ximenes (iFood)
-- [in/ximenesit](https://www.linkedin.com/in/ximenesit/) on LinkedIn

_(Nota do editor: eu cheguei 10 minutos atrasado nesta palestra...)_

`"SRE é repensar a forma como o trabalho operacional é realizado"`, foi a primeira afirmação que ouvi de Eduardo.

Em seguida ele afirmou que as demandas do time tendem a se dividir 50%/50% em demandas reativas e em projetos internos para se reduzir estas mesmas demandas reativas (sob forma de automação).

`"Como eliminar o Toil"` questionou.

Mas antes:

_Nota do editor: como cheguei atrasado, cabe enxertar aqui uma definição de Toil:_

> In SRE, we want to spend time on long-term engineering project work instead of operational work. Because the term operational work may be misinterpreted, we use a specific word: toil. […] Toil is the kind of work tied to running a production service that tends to be manual, repetitive, automatable, tactical, devoid of enduring value, and that scales linearly as a service grows.

_ou seja, estes tipos de trabalho:_

+ Trabalhos como executar um script manualmente, mesmo que este script esteja automatizando alguma outra tarefa.
+ Trabalho que é repetido diversas vezes
+ Trabalho que poderia ser realizado por uma máquina (ou seja, onde o julgamento humano não é essensial)
+ Trabalho que `interrupt-driven` ou reativo (disparado por algum evento de exceção) como os resultantes de alarmes; em oposição a trabalho `strategy-driven` ou proativo.
+ Trabalho que não melhora seu serviço permanentemente uma vez completado.
+ Trabalho manual que escala linearmente com o tamanho do seu serviço, do volume de tráfego ou quantidade de usuários

FONTES: [Livro SRE da O'Reilly][sre-book-oreilly], [Este site](https://sharpend.io/toil-a-word-every-engineer-should-know/)

De acordo com Eduardo, o modelo padrão do Toil é de `"fila de tarefas"`: `"preciso de uma maquina, preciso de um banco de dados, preciso restaurar um backup, etc..."`. E o problema aumenta mais ainda se esta fila é sem prioridade. Isto gera problemas para o negócio. Não atender a demanda de mais valor (prioridade) significa perda de oportunidade e sobretudo, como as demandas de maior prioridade, via de regra tem mais (e mais importantes) stakeholder, o departamento de operações pode eventualmente ter a tradicional fama de _"Why are they so slow?"_.

`"E por onde começar?"` prosseguiu.

- identificar estes trabalhos do tipo Toil
- definir limites e níveis e começar a medir quando estas demandas ocorrem (exemplo de níveis _'disco 90% cheio'_, _'falha no pipeline de ci/cd'_ e exemplo de limite: _'10 ocorrências semana de disco 90% cheio'_)
- definir ações em cada caso listado acima
- refatorar apps, criar automações, para que as ações sejam executadas em um estilo não-Toil

## SLO e Error Budget (EB)

SLO, ou Service Level Objective, são acordados entre partes como forma de **medir** o desempenho de um provedor de serviço e são formalizados com objetivo de evitar desentendimentos entre as partes. Exemplos de SLO podem ser:

[![Tipos de SLO][ximenes-slo]](https://en.wikipedia.org/wiki/Service-level_objective)

SLO é o complemento do Error Budget, portanto se o SLO é 99%, o Error Budget é 1%. Estes valores tem de ser levados em consideração nos projetos de serviço. Não se iludir com `"muitos 9, do tipo switch de telecom, pois é virtualmente impossível alcançar certos níveis de SLO."`

Eduardo, assim como o [Cisneiros](/posts/tdcbh/cisneiros-cultura-observabilidade-resposta-incidentes) nao adianta determinar alarmes à toa, eles têm de servir para algo.

`"TOIL, SLO e EB ajudam a mensurar saude dos sistemas alinhado aos expectativas do negocio e alem disso melhorar a qualidade das mudanças."` complementou Eduardo.

Conclusão do palestrante: `"Falhas acontecem, o diferencial e como nos recuperamos delas."`.

[sre-book-oreilly]: https://www.amazon.com/Site-Reliability-Engineering-Production-Systems/dp/149192912X "Site Reliability Engineering"

[ximenes-slo]: /images/tdcbh-day1/ximenes-slo.png#c "SLO"