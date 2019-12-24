---
title: "Temp"
date: 2019-06-27T14:46:11-03:00
draft: true
---

IoT things graph da aws -- block diagram design para programar iot. trabalha com conceito de modelos.

Pode construir fluxos com condicionais por exemplo.

trabalho atraves de modelos, que descrevem a capacidadade dos dispositivos e sao "composable", com varios modelos prontos: acoes, propriedades e eventos. por exemplo:

acoes
ligar uma lampada

propridades
cor/intensidade

eventos
lampada foi ligada
lampada foi desligada

pode usar mqtt e modbus se for dispositivo na borda por exemplo

skill de alexa para mandar comandos de voz para tv
ligar tv
mudar canal
aumentar volume etc

freeRTOS tb tem integracao com greengrass

caso da vizio
smartguestOS sistema custom integrado com comandos de voz alexa

super combo: greengrass + iot core + alexa

simulador alexa
smart home - como integrar dispositivos a alexa.
audio é processado e vira uma diretiva (json) o trabalho é implementar o skill service, que pode ser enviar uma mensagem mqtt a um dispositivo por exemplo.

o dispositivo responde com um json tb para ter um feedback. a alexa pode transformar o retorno em fala e responder ao usuário.

ja existem alguuns skills para casas conectadsas



avs device sdk -- para seu hardware "ser" uma alexa.

case da tecsus

medidores inteligentes, controlar consume, consumeo inteligente, atuadores inteligentes tambem.

falou do problema sazonal (de hora em hora tinha picos)


