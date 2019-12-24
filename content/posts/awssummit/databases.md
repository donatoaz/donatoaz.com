---
title: "Databases"
date: 2019-06-27T14:32:21-03:00
draft: true
---

"Purpose built databases in aws" (construido para fim especifoco) right tool for the right job - ler este blog post do dr voegels

Apresentou as categorias 

falou de trava no banco para relacionais, crms, erps, sao use cases tradicionais, finanças tb (coisas que não podem ter race condition)

falou de chave valor, baixa latencia e alto throughput

document oriented -- tipo o documentdb que é o mongo managed da aws

in memory, do tipo chave-valor tipo redis para cache (tb tem o memcached), otimizado para busca por geolocalização

graph based, que é um tipo novo, para casos bem específico, dados gravados de maneira a otimizar consultas (idealmente posicionados)

search based, tipo elastic search, full text saerch

timeseries, timeseriesdb do aws, para séries temporais, por exemplo telemetrias ou variáveis de processo

ledgers (registro) quantum db QLDB (quantum ledger db) da aws por exemplo, um usecase que o dr voegesl disse que resolve 90% dos problemas de quem acha que precisa de blockchain

---

## onde achar na aws

prime day, 20MM transacoes por segundo no dynamodb FUUUU

documentdb baseado no mongo 3.4

dif basica entre redis e memcached: redis é nano second e o memcached pode ser ainda mais rápido por ser multithreaded, avaliar caso de uso. memcached nao tem geolocation por exemplo.



mostrou uma timeline de dbs e disse que com o excesso de opcao veio a dificuldade de escolha.

400k clientes usam rds

falou de solucoes hibridas
caso duolingo
31bi exercicios completados no dynamo
user data no aurora

aws-samples/