---
title: "Lançamentos do Re:Invent 2019 para se observar, parte I"
date: 2019-12-24T16:41:59-03:00
draft: false
---

Já faz quase um mês desde o fim do Re:Invent 2019, mas ainda dá tempo de fazer um apanhado das novidades que foram lançadas no maior evento anual da AWS.

Antes de entrarmos na lista de fato, cabe ressaltar que o evento como um todo foi marcado por uma aparente mudança muito dramática por parte da AWS em relação ao seu público alvo principal. Não mais é a nuvem o habitat apenas das start ups e early adopters aventureiros, mas sim a casa de muitas *enterprises*, o que ficou bem claro com a participação do CTO da Goldman Sachs (um grande banco de investimentos Norte-americano). As grandes empresas venceram a inércia e estão ganhando velocidade tanto para migração de aplicações existentes quanto para desenvolvimento de novos projetos já nativos na nuvem desde o primeiro dia.

**NOTA** nem todos os itens listados aqui foram efetivamente anunciados no Re:Invent 2019, são tantos lançamentos que nas semanas anteriores ao evento a AWS já estava soltando novidades (como por exemplo a storage week, ou semana do armazenamento).

Enfim, vamos direto às novidades.

# Lambda com concorrência provisionada

Quem já trabalhou com AWS Lambda, ou qualquer outra plataforma de FaaS já teve de lidar com o conceito de *cold-starts* ou partida a frio. Este termo descreve a latência exagerada que decorre da provisão em tempo de chamada de um novo ambiente de execução de uma função. Isto normalmente ocorre em aplicações com tráfego esporádico (ou seja, que ficam longos períodos sem receber uma requisição) ou em aplicações que recebem tráfego bastante variado e por consequência observam certa elasticidade na infra-estrutura que suporta os ambientes de execução. Esta latência indesejada pode variar de 100ms a 1s, resultando em uma experiência ruim para os usuários.

Neste Re:Invent a AWS anunciou uma nova funcionalidade: **Concorrência Provisionada**, como o termo já indica, é possível provisionar uma quantidade pre-determinada de memória que é traduzida diretamente uma quantidade de executores. Estes executores provisionados estarão sempre prontos para atender requisições evitando a ocorrência de partidas a frio. Como exemplo, provisionando 4GB de mémoria garantem 16 executores. Se sua aplicação não receber mais do que 16 requests em paralelo, você não irá observar partidas a frio.

Para um *benchmark* de Lambdas com e sem concorrência provisionada veja a [postagem no blog do Danilo Poccia, da AWS](https://aws.amazon.com/blogs/aws/new-provisioned-concurrency-for-lambda-functions/).

![lambda-comparison](https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2019/11/24/aws-lambda-provisioned-concurrency-comparison-graph.png)

Atenção com a conta: apesar de oferecer 15% de desconto sobre o valor nominal de uso de uma função Lambda usual, a concorrência provisionada significa que este valor será sempre cobrado. De acordo com os [Cloudonautas](https://podcasts.google.com/?feed=aHR0cHM6Ly9wb2RjYXN0LmNsb3Vkb25hdXQuaW8vZmVlZC9hYWM&episode=YWM2ZTRhZjE4YTRiZDY4MTRkZWQ4YjE0ODViYjY4ZmU&hl=en-BR&ved=2ahUKEwjhldXqis_mAhXiHbkGHaSbD1sQjrkEegQIARAE&ep=6&at=1577217968299) se você consegue garantir mais que 60% de uso médio da quantidade provisionada você sairá no lucro.

A maior crítica deste lançamento no entanto é que é um contrassenso, em termos de serverless, ter de se preocupar com provisionamento. Porém, para aplicações onde a latência é um fator determinante, é um preço baixo a se pagar.

# Fargate para EKS

Fargate é a engine serverless de containers da AWS e antigamente era compatível apenas com ECS (Elastic Container Service). No Re:Invent foi anunciada a integração com EKS, Elastic Kubernetes Service. Esta é uma funcionalidade muito importante, pois provê a abstração da camada de virtualização de máquinas onde os clusteres Kubernetes são executados. Raramente vale a pena ter-se de preocupar com as duas camadas: VMs e Containers.

E a vantagem principal do uso do EKS é que por ser baseado quase exclusivamente em Kubernetes, sem uso direto de construções nativas da AWS, é mais fácil de se evitar um single vendor lock-in e sua aplicação é de mais fácil migração.

# Fargate Spot Pricing

Outra novidade anunciada é a possibilidade de uso de instâncias Spot com o serviço Fargate. Para aplicações que suportam interrupções o serviço garante uma *termination notice* de dois minutos, permitindo economias de quase 70% quando comparadas ao preço sob-demanda.

# ECS Cluster Auto Scaling

Para quem utiliza instâncias EC2 para executar clusteres ECS este lançamento é bem interessante. A nova funcionalidade ECS Cluster Auto Scaling simplifica o gerenciamento de elasticidade. Quando a funcionalidade de escalonamento gerenciado é utilizada a AWS cria um plano de escalonamento com uma política de *target tracking* baseada num valor de capacidade que você determina. A AWS então associa este plano de escalonamento a um Auto Scaling Group e gerencia o scale-in e scale-out de forma transparente.

# Step Functions Express Workflows

Step Functions, resumidamente, são uma implementação de máquina de estados gerenciada da AWS. Os fluxos são descritos por uma linguagem própria, chamada Amazon State Language, e as tarefas podem ser executadas por variados serviços dentro da estrutura da AWS.

Express Workflows são uma forma mais barata e efêmera de se executar fluxos de mais curta duração (até 5 minutos). A principal vantagem é a escalabilidade, permitindo até 100,000 execuções por segundo.

# Amplify Data Store

Amplify, muito resumidamente (e displicentemente...), é o Google Firebase da AWS. Pronto, falei.

O Amplify é um framework open source que simplifica o desenvolvimento de aplicações web e móveis utilizando todo o ferramental da AWS como suporte para autenticação, analytics, API (GraphQL e REST), armazenamento, notificações, pubsub, etc.

Uma das maiores dores de desenvolvedores de aplicações móveis é a sincronia entre-dispositivos. O Amplify Datastore, através do uso do AWS AppSync simplifica este trabalho provendo uma abstração construída sobre o IndexedDB (para web) e SQLite para apps nativos. A resolução de conflitos pode ser transparente (default) ou o desenvolvedor pode especificar estratégias customizadas de resolução de conflitos.

Mais detalhes no [github do AWS Amplify](https://aws-amplify.github.io/docs/js/datastore).
