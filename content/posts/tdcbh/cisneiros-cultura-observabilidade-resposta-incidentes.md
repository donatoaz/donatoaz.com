---
title: Criando uma cultura de observabilidade e resposta a incidentes que escala
date: 2019-06-17T13:45:26-03:00
draft: false
---

-- Alexandre Cisneiro (Nubank)
-- [@cisneiros](https://twitter.com/Cisneiros) on twitter

`"O que é observabilidade?"`, assim Cisneiros abriu sua palestra. Ele, então, usou a [definição básica da teoria de controle](https://en.wikipedia.org/wiki/Observability) que resumidamente é: Observabilidade mede o quão bem se pode inferir os estados internos de um sistema a partir de medidas externas.

`"E por que a gente se importa com isto?"`, prosseguiu. `"Porque queremos tomar riscos calculados para poder crescer rapidamente com segurança. Crescer exige tomar riscos."`.

Cisneiros então contextualizou o caso do Nubank:

+ aproximadamente 250 microsserviços
+ aproximadamente 250 engenheiros (ou seja, 1:1 eng/microsserviço)
+ 1 Bilhão+ de requisições por dia

E apresentou os tipos de práticas que vem seguindo na empresa:
+ Métricas em tempo real (ou near real time);
+ Alertas para profissionais _on call_;
+ Sistema de logs agregados;
+ Tracing distribuído

Indicou em seguida que usam o [Prometheus](https://prometheus.io/) para monitorar e armazenar as métricas temporais.

Disse que mesmo com diversos times e produtos, adotaram a prática do _1 tool to rule them all_ e o Prometheus foi escolhido por ter menos acoplamento com o software observado.

Usam [Thanos](https://github.com/improbable-eng/thanos) para agregar varios prometheus (query-wise) e aumentar a disponibilidade do Prometheus.

Para data-vis utilizam o Grafana. Ou seja, o grafana realiza consultas no Thanos, que coleta as séries temporais do Prometheus.

Para a lógica de alarmes, utilizam o [Alertmanager](https://prometheus.io/docs/alerting/alertmanager/). De acordo com a documentação, o Alertmanager: 

> _takes care of deduplicating, grouping, and routing them to the correct receiver integration such as email, PagerDuty, or OpsGenie. It also takes care of silencing and inhibition of alerts._ 

No caso do Nubank, os alertas são enviados para o Slack ou via chamada telefônica direta para o operador _on call_.

Utilizam [Splunk](https://www.splunk.com/) (a única ferramenta não-OSS dessa stack) para analisar a grande massa de dados gerada. 

Como agente de envio dos logs utilizam o [Fluentd](https://www.fluentd.org/).

Para o tracing distribuído utilizam o [Jaeger](https://www.jaegertracing.io/) para tracing distribuído

![alt text][cisneiros-jaeger]

`"Ferramentas não são a solução"`, afirmou em seguida, `"é importante escolher um conjunto bom e coerente, mas é apenas o primeiro passo. O mais importante é a cultura associada."`.

## Cultura:

Cisneiros então enumerou uma série de práticas que os ajudaram a ter sucesso.

- **Instrumentar tem de ser fácil:** faça com que as coisas venham instrumentadas por padrão. Os templates de provisionamento de infra tem de incluir esta instrumentação, os _boiler-plates_ de aplicação tem de incluí-la também. Para isto, automatize o máximo possível. Documente como customizar, por exemplo aquelas métricas que apenas fazem sentido para algum tipo específico de microsserviço.
- **Defina maneiras padronizadas de medição:** use unidades de medida de maneira consistente, por exemplo latência: escolha se vai utilizar segundos ou milissegundos, porque diversas pessoas irão interagir com suas medidas; crie padrões de nomenclatura que facilitem o entendimento destas medidas; padronize funções de agregação, como exemplo: qual tipo de média (mediana, modo, média aritmética, ponderada, etc).
- **Tenha um protocolo claro de resposta a incidentes:** tenha delineado de maneira clara a responsabilidade e os canais de comunicação de cada indivíduo; deixe claro quais os papeis envolvidos na resolução de algum problema, por exemplo no caso do Nubank eles tem um responsável único chamado de _Running Point_ (que tem permissão de realizar ações destrutivas) e um comunicador (que é o ponto de comunicação com agentes externos); incentive investigações para aprendizado e melhoria, sem culpa.

_Nota do editor: Estudos recentes sobre o tópico de segurança psicológica evidenciam como ela está diretamente associada à excelência em desempenho não só na TI como na área de Saúde (veja o [re:work](https://rework.withgoogle.com/guides/understanding-team-effectiveness/steps/introduction/) study do Google, e os estudos do Dr. Westrum sobre [topologias de culturas organizacionais](https://qualitysafety.bmj.com/content/qhc/13/suppl_2/ii22.full.pdf)  para informações)._

Um dos ganhos apresentados por Cisneiros em relação aos alertas está relacionado ao volume e real utilidade dos mesmos. Anteriormente havia uma chuva de alertas, e atualmente os alertas são mais diretos, menos numerosos e já vem com chamadas para ação associados (Visualizar no Prometheus, Abrir o Playbook, Silenciar o Alarme).

[![alt text][cisneiros-alertas-antes]][cisneiros-alertas-antes]
_antes_
[![alt text][cisneiros-alertas-depois]][cisneiros-alertas-depois]
_depois_

Em seguida Cisneiros mostrou uma foto de um encontro no auditório da Nubank no qual realizam uma apresentação dos incidentes do período e como foram tratados. O evento é aberto a todos os colaboradores.

_Nota do editor: a prática de compartilhamento do conhecimento é a essência do Terceiro Caminho do DevOps. Com o crescimento das empresas e a redução das equipes, é imprescindível essa disseminação ativa de conhecimento dentro das empresas._

**Conclusão do palestrante:** Cisneiros terminou com a seguinte dica: crie culturas e procedimentos que escalem. Se o crescimento/manutenção de determinado procedimento depende de adicionar gente dedicada a operar/monitorar o próprio sistema de monitoramento: você provavelmente está indo pelo caminho errado. 

Detalhe organizacional na Nubank: Equipe de platform (suporta os squad de observalidade, squad de escalabilidade, squad de comunicação entre serviços (leia-se kafka)).

[cisneiros-jaeger]: /images/tdcbh-day1/cisneiros-jaeger.jpg "Jaeger como ferramenta de tracing distribuído"

[cisneiros-alertas-antes]: /images/tdcbh-day1/cisneiros-alertas-antes.jpg "Alertas antes da revisão"

[cisneiros-alertas-depois]: /images/tdcbh-day1/cisneiros-alertas-depois.jpg "Alertas após a revisão"