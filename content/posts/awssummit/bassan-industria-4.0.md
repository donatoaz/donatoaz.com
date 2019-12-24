---
title: "Bassan Industria 4"
date: 2019-06-27T12:02:04-03:00
draft: true
---

Giovani Bassan (gvb@aws.com)

Gerenciando as Múltiuplas Opções de Protocolo

* IoT Greengrass IIoT (Industrial IoT)
* Design Pattern de Extração de IIoT

Foto dos investimentos

4.0 é usar melhor os computadores, IA, machine learning, analytics, plantas totalmente smart (autonomas), ele acha que ja é possivel tecnicamente, mas tudo é uma jormada

industria4.0.gov.br

grande economia operacional com ganho de eficiencia, muita reducao com manutencao preditiva

porque os investimentos estao aumentando em order exponencial?

pq apesar de termos muita automacao e sensorizacao, 96% dos dados nem sao utilizados, pq é dificl correlacioná-los

TI (erp, crm)
- - -
TA (mes, scada)
- - -
TO

Os dados podem ter correlações de TO direto pra TI, por exemplo um desvio numa medida operacional pode ser motivo para devolução de um pedido, ou seja a metrica de desvio na medida está correlacionada a metrica de delivery

Outra dificuldade é que as redes as vezes nem se falam, por exemplo, pode haver um FW no meio do caminho

Baixa frequencia de coleta pode também ser problema, pode ser que haja uma limitação de espaço fisico mesmo (pra colocar HDs no chao de fabrica), e as vezes voce perde a chance de armazenar com uma frequencia adequada uma variavel operacional

porque esses proboemas acontecem?

Existem muuuuitos padrões de comunicação...

décadas acumuladas, modbus por exemplo é de 1979
maquinario tem ciclo de vida muito grande, Capex grande, inviavel de atualizar com frequecnai, mesmo com retrofit.

10k+ sensores 

tipos de industria com protocolos distintos

camadas físicas distintas tambem dificultam

o que traz muito valor pra nuvem é elasticidade sem fim

O desafio com o "zoo" de protocolos: coletar os dados da operacao para TI e torna-los utilizaveis

como resolver este problema com a AWS?

Com gateways em TO rodando em rugged hardware no chao de fabrica (pode ser um pc industrial)

computacao em edge é uma solucao da aws que roda muito proximo do cliente, inclusive segurança

OPC-UA tem como cripto com x-509

o gateway pode rodar em paralelo, não está no caminho crítico (em termos de produção e segurança operacional), apenas RO (read only), sem preocupacao seria de latencia por exemplo tb

edge computation com lambda no gateway para conversão dos protocolos via serverless functions -- ou seja o lambda ta deployado no gateway fisico

crito no transporte

colocar info direto em datalake, para ter um dataset e poder treinar, por exemplo

o ceu é o limite, vc escreve seus lambdas para cada protoclo especifico

(nde pesqisar pricing model)

Agora entrou o everton zanon (Lumminy)

apresentou o caso de medir em tempo real a exposicao a risco para os trabalhadores:

PPP - person, place, protection

person: quem é a pessoa? é capacitada?
place: qual a regiao de trabalho? qual o tipo de riusco?
protection: qual o tipo de EPI? qual a vida util do EPI? 

IPS: indoor positioning system, crachá sensor que faz varredura de wifi (nao faz triangulacaop....), sensores de wifi sao distribuidos e entao um test-run é feito, que é mapeado e identificado, dai quando um funcionario entrar, pelo padrao de sensores é identificado onde esta.

para os eqptos usam rfid, com antenas posisionadas para captar info da pessoa e lugar.

desafios:

seguranca
ampla gama de dispositivos
atualizacao e config remotos (ota?)
conexao intermitente (4g) tem de ser resiliente e robusto a interferencias
monitoramento centralizado (nivel de bateria de cracha, por exemplo)

usam o greengrass 

certificado iot core para descoberta automática, faz a chamada para api que vai ser aceita pq o certificado foi instalado no dispositivo manualmente e responde com o certificado para comunicar com o gateway e o ip/hostname do gateway

automatic certificate rotation. o proprio greengrass diariamente faz a rotacao, desconecta todo mundo, que faz o mesmo acima (pede novo certificado, etc)

o greengrass fornece OTA via jobs (agendado pq tem downtime)

tem topicos de metricas e telemetria, metrica é mais para monitoracao deles, a telemetria é info de real uso em termos de aplicacao.

usam lambda para processamento de dados de telemetria

resultados obtidos

rapidez para experimento (que o dr werner falou), fizeram poc em 1 mês

deploy que era um dia, estando la fisicamente, para minutos, automatizado

fique ligado nas noviddes de IoT da AWS, pq é muito rapido

sem perda de info, pq o greengrass armazena (bufferiza) on site

seguranca ponta a ponta com cripto forte







