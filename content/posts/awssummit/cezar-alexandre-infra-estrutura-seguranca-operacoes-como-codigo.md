---
title: "Cezar Alexandre Infra Estrutura Seguranca Operacoes Como Codigo"
date: 2019-06-27T13:13:14-03:00
draft: true
---

Alexandre Cezar (Palo Alto Networks)

Como automatizar a criacao de toda a infra de acordo com regras de compliance e segurança

automatizar criacao de firewalls, integrada com as ferramentas de devops das enterprises

automacao de segurança, por exemplo com cloudformation ou terraform

reagir a eventos em tempo real, por exemplo reconfigurar num segurity group, ou gerar alertas pager para incident response.

ideia no fim das contas é a tradicional de devops: shorten deployment cycles. Se voce nao tem seguranca automatizada, isto é severamente afetado. E mais, se voce nao sabe isso em tempo real, voce nao tem como garantir consistencia a todo momento.

tornar DevOps em DevSecOps:

para isto as definições de infra (de vpc a fw) tem de estar em código e isto é o conceito de infra como codigo segura. Só assim, vc vai poder ser: rapido, reproduziel, repetitivo e escalavel. Ele falou de clientes que criarm/destroem 1000 vpcs por dia.

voce precisa se proteger contra ataques que voce desconhece, sua aplicacao so esta segura em D0, em D1 nao tem como garantir, e para reagir (executar mudancas), de forma acima (RRRE) so com automacao.

voce vai ter bugs na sua infraestrutura -- aliás, nao é o fato de que virou codigo que faz isso acontecer, bugs alias, em sua essencia, eram físicos (insetos dentro das valvulas)


A paloalto oferee um framework que é "vendor agnostic" voce pode usar terraform (como um provider customizado) ou cloudformation por exemplo, para automatizar criacao de diversas paradas.

resposta a incidentes automatizada tb esta contemplada, por exemplo auto block de ips baseado em regras.

DAG (dynamic address group) mostrou o fluxo para automaticamente bloquear acesso malicioso (foto)

shift left, detectar problemas antes de subir para prod. Prisma Cloud, Linteia seu Dockerfile e pode inclusive ser parte da sua esteira e bloquear o build antes de subir pro container registry

A mesma ideia de shift left da pra lintar seu cloudformation ou terraform via scanner gratuito da palo alto (prisma public cloud)

lembrete que ele deixou/: pensem em DevSecOps, nao apenas em DevOps, a seguranca tem de estar junta desde a concepção e implementação.

live.paloaltonetworks.com e github

