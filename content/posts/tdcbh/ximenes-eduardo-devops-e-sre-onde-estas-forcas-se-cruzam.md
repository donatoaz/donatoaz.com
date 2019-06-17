---
title: Devops e SRE - Onde estas forças se cruzam
date: 2019-06-17T16:09:54-03:00
draft: true
---

-- Eduardo Ximenes (iFood)
-- [in/ximenesit](https://www.linkedin.com/in/ximenesit/) on LinkedIn

"SRE é repensar a forma como o trabalho operacional é realizado".

Tendem a dividir 50/50 demandas reativas e projetos para reduzir as demandas reativas (sob forma de automação).

"como?" eliminar TOIL

TOIL - modelo padrão - fila de tasks (preciso de uma maquina, preciso de um db, etc...)

o problema é que é uma fila... sem prioridade! Gera problema para o business. Não atender a demanda de mais valor (prioridade) significa insucesso. "Why are they so slow".

"Nao faz sentido liberar tudo para os devs"?????

O que é toil?
- manual
- repetitivo
- pode ser automatizado
- reativo
- pontual, sem valor duradouro
- não-escalável

Por onde começaR?

- identificar
- definir limites e níveis (exemplo 'disco 90% cheio', 'falhas na pipeline de ci/cd') (exemplo de limite: 10 ocorrências semana)
- definir ações
- refatorar apps, criar automações, etc

SLO e error budget
slo é o service level objective

slo é o complemento do error budget -- se o SLO é 99%, o error bg é 1%

nao adianta determinar alarmes atoa, novamente o mesmo que o cisneiro falou, tem de servir para algo.

TOIL, SLO e EB ajudam a mensurar saude dos sistemas alinhado aos expectativas do negocio e alem disso melhorar a qualidade das mudanças.

"Falhas acontecem, o diferencial e como nos recuperamos delas"

SRE ajuda a implementar devops -- ideia do google de `SRE implements DevOps`.




perguntas: 
nao faz sentido liberar 100% self service?
multi-account em nuvem? por time/squad?