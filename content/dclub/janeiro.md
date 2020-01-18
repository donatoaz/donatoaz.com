---
title: "Janeiro"
date: 2020-01-04T09:38:51-03:00
draft: true
---

# Apresentação

O dclub é um clube por assinatura para trens aleatórios. É impossível assinar, e mais difícil ainda desassinar.

Com sua assinatura você recebe mensalmente um conteúdo curado de gastronomia e tecnologia. Uma publicação neste blog acompanha cada edição.

# Conteúdo do Mês

- Pick tecnologia: Digispark, attiny85
- Pick gastronomia: Café Ópera, Il Barista, SP

## Pick tecnologia

### Overview

O pick deste mês é o Digispark.

Digispark é uma plataforma de desenvolvimento baseada no microcontrolador ATMEL Attiny85. Tem o tamanho de uma moeda de 1 Real e possui um conector USB *built-in*, que facilita bastante a programação. 

Outras especificações do Digispark abaixo:

- Suporte a IDE do Arduino 1.0+
- Pode ser alimentado pelo conector usb (5V) ou por pinos na placa (7V a 35V, 12V ou menos é o recomendado)
- Regulador de 500mA, 5V embarcado
- Conector USB macho *built-in*
- 6 pinos I/O - dois são usados para comunicação USB (PB3 and PB4) e um está associado a função reset, portanto se o seu programa se comunica via USB (por exemplo seu programa simula um teclado), você terá somente 3 pinos de entrada/saída (PB0, 1 e 2)
- 8k memória Flash (~6k depois do bootloader), suficiente para programas simples e para inclusão de bibliotecas
- I2C e SPI, para comunicação com sensores e periféricos
- PWM de hardware em 3 pinos (é possível usar PWM via software nos outros pinos)
- Conversor Analógico-Digital (ADC) em 4 pinos
- Power LED e LED de Teste/Status no pino X (permite um hello world rápido sem componentes externos)

![coin][coin]

![pinouts](https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/0995f7a6-730b-48d0-8612-c4408d15e84d/dc7h4n3-51e6389c-5f86-4fb2-a7ad-34f75f672003.png)

### Instalação e Configuração

Baixe e instale a [IDE Arduino](https://www.arduino.cc/en/main/software).

O que permite que o Digispark se comunique com seu pc e seja programado é um tipo de software chamado de **bootloader**. Os Digispark deste kit **já vem pré-carregados com um bootloader**, porém se for necessário re-flashear o bootloader, é possível fazê-lo. [Instruções](https://www.youtube.com/watch?v=RlscDz5JCcI).

Uma vez instalada, abra a IDE do Arduino, vá em *File > Preferences*.

![step1](https://digistump.com/wiki/_media/digispark/tutorials/preferences.gif)

Em seguida cole o texto abaixo no campo *"Additional Boards Manager URLs"*

> http://digistump.com/package_digistump_index.json

![step2](https://digistump.com/wiki/_media/digispark/tutorials/entry.jpg)

Em seguida acesse o menu *Tools > Board > Boards Manager* e no combo box *Type* selecione *Contributed*. Na lista populada selecione *Digistump AVR Boards* e clique em *Install*.

![step3](https://digistump.com/wiki/_media/digispark/tutorials/digispark_install.gif)

Após completar a instalação você pode fechar a janela do *Boards Manager* e selecionar a placa *Digispark (default 16.5mhz) em *Tools > Board > Digispark (default 16.5mhz)*.

![step4](https://digistump.com/wiki/_media/digispark/tutorials/pickdigispark.gif)

### Hello World!

O *Hello World* do mundo do hardware é o famoso *blinky* (um programa que pisca um led).

Crie um novo *sketch* no Arduino IDE (*File > New*) e substitua o conteúdo pelo abaixo:

{{< highlight c >}}
void setup() {                
  // initialize the digital pin as an output.
  pinMode(1, OUTPUT); //LED on Model A   
}

// the loop routine runs over and over again forever:
void loop() {
  digitalWrite(1, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(500);             // wait for half a second
  digitalWrite(1, LOW);    // turn the LED off by making the voltage LOW
  delay(500);             // wait for half a second
}
{{</ highlight >}}

Um programa típico é composto por duas partes:

Um `setup` que é executado uma única vez. E um `loop` que é executado indefinidamente (é possível configurar interrupções que são disparadas por eventos em pinos de entrada e saída e não são nem `setup`, nem `loop`, mas este mês não vamos utilizá-las).

O que o programa acima faz é: na etapa de `setup` define o pino 1 como uma saída; na etapa de `loop` escreve o valor `HIGH` no pino 1, dorme (`delay`) por 1000ms, escreve o valor `LOW` no pino 1, dorme por 1000ms, repete.

Como o pino 1 está associado ao LED interno, você deverá ver o LED no centro da placa piscando com frequência de 1Hz.

Para o próximo passo é necessário que o Digispark esteja desconectado da porta USB de seu pc.

Para transferir o programa para o digispark clique em *Upload* (menu *Sketch > Upload* ou o botão com uma seta para a direita).

No console na parte inferior da janela contendo o código você será instruído sobre quando conectar o Digispark. Conecte-o e observe se o upload foi feito corretamente. Em caso de sucesso você irá observar o led piscando a cada 1 segundo.

![plug][plug]
![upload][upload]

### Projeto #1 - Yubikey paraguaia

A ideia deste projeto é criar um dispositivo que implemente a função de armazenamento de senha estática, semelhante a uma [Yubikey](https://en.wikipedia.org/wiki/YubiKey) (a Yubikey original tem mais funcionalidades, como *one-time passwords* e *public/private key pair generation*, que são um pouco mais complexas e exigem que o site acessado seja compatível).

Portanto o objetivo é simples: ao clicar um botão no nosso dispositivo, uma senha incrivelmente longa será digitada.

#### Material necessário:

Todos os materiais necessários, com exceção do ferro de solda estão disponíveis no kit deste mês.

- push button
- resistor de 10k
- placa de prototipação
- fios
- ferro de solda e solda

#### Debounce!

Como vocês devem lembrar das aulas do Alberto, vai ser necessário fazer um *debounce* do botão, porque há um período de instabilidade quando o botão é apertado ou solto.

![debounce1](https://i1.wp.com/i.imgur.com/7KNPedn.png)
![debounce2](https://media.geeksforgeeks.org/wp-content/uploads/20191113173218/Switch_Debounce_2.jpg)

Uma forma simples de fazer debounce é manter um timer desde a última mudança de estado, e apenas efetuar a alteração se o intervalo for maior que uma constante de *debounce*.

{{< highlight c >}}
const int buttonPin = 2;    // the number of the pushbutton pin
int buttonState;             // the current reading from the input pin
int lastButtonState = LOW;   // the previous reading from the input pin

// the following variables are unsigned longs because the time, measured in
// milliseconds, will quickly become a bigger number than can be stored in an int.
unsigned long lastDebounceTime = 0;  // the last time the output pin was toggled
unsigned long debounceDelay = 50;    // the debounce time; increase if the output flickers

void setup() {
  pinMode(buttonPin, INPUT);
}

void loop() {
  // read the state of the switch into a local variable:
  int reading = digitalRead(buttonPin);

  // check to see if you just pressed the button
  // (i.e. the input went from LOW to HIGH), and you've waited long enough
  // since the last press to ignore any noise:

  // If the switch changed, due to noise or pressing:
  if (reading != lastButtonState) {
    // reset the debouncing timer
    lastDebounceTime = millis();
  }

  if ((millis() - lastDebounceTime) > debounceDelay) {
    // whatever the reading is at, it's been there for longer than the debounce
    // delay, so take it as the actual current state:

    // if the button state has changed:
    if (reading != buttonState) {
      buttonState = reading;

      // If button is pressed, means we really pressed the button and want to do stuff
      if (buttonState == HIGH) {
        // Do stuff
      }
    }
  }

  // save the reading. Next time through the loop, it'll be the lastButtonState:
  lastButtonState = reading;
}
{{</ highlight >}}

Se quiser utilizar um implementação mais robusta (e testada) use a biblioteca [Bounce2](https://github.com/thomasfredericks/Bounce2). No github da biblioteca há uma explicação ótima sobre o porquê de fazer *debounce*.

#### Entrada flutuante

É importante lembrar também que um pino de entrada de um microcontrolador não deve ficar "flutuante", ou seja, ele deve sempre estar ou com 5V ou conectado ao comum (GND). Para resolver este problema podemos utilizar um resistor de pull-up (neste caso o pino verá 5V quando o botão não estiver acionado) ou de pull-down (o pino verá 0V quando o botão não estiver acionado).

Eu utilizei um resistor de pull-up de 10k. Como o Attiny85 possui uma impedância de entrada relativamente alta (25k a 60k), um resistor de 10k basta.

![pull][pull]

#### Transformando o Digispark em um teclado

{{< highlight c >}}
#include "DigiKeyboard.h"
{{</ highlight >}}

É tudo que você precisa para transformar seu Digispark em um teclado usb. Esta lib já é instalada por default quando você adiciona a placa pelo Arduino IDE *Boards Manager* e portanto, ao contrário do [Bounce2](https://github.com/thomasfredericks/Bounce2), não requer instalação.

A API desta lib é simples:

{{< highlight c >}}
DigiKeyboard.print("texto qualquer");
DigiKeyboard.sendKeyStroke(KEY_ENTER);
{{</ highlight >}}

A lista dos símbolos definidos na biblioteca que representam os `key strokes` pode ser vista no próprio [código fonte](https://github.com/digistump/DigisparkArduinoIntegration/blob/master/libraries/DigisparkKeyboard/DigiKeyboard.h#L63-L129) e a lista compreensiva é encontrada no [capítulo 10 do HID-usage-tables document][hid].


**NOTA**

No fonte do `DigiKeyboard.h` não é definido o código para a tecla CMD do macbook, se precisar utilizá-la, por exemplo para abrir o Spotlight:

{{< highlight c >}}
//Command key is ord 37 and as a modifier 0x00000008
#define MOD_CMD_LEFT 0x00000008
DigiKeyboard.sendKeyStroke(KEY_SPACE, MOD_CMD_LEFT);
{{</ highlight >}}

#### Código completo da yubikey paraguaia

{{< highlight c >}}
#include "DigiKeyboard.h"
#include <Bounce2.h>

#define BUTTON_PIN 0
#define LED_PIN 1

// usado para indicar que a key está bootando
int blinkDelay = 100;

Bounce debouncer = Bounce();

void setup() {
  pinMode(BUTTON_PIN, INPUT);
  debouncer.attach(BUTTON_PIN);
  debouncer.interval(50);

  pinMode(LED_PIN, OUTPUT);

  // piscando o led apenas para mostrar sinal de vida
  for(int i = 0; i < 5; i++) {
    digitalWrite(LED_PIN, HIGH);
    delay(blinkDelay);
    digitalWrite(LED_PIN, LOW);
    delay(blinkDelay);
  }
}

// the loop routine runs over and over again forever:
void loop() {
  debouncer.update();

  if ( debouncer.fell() ) {
    DigiKeyboard.print("senhasuperlongaouqualqueroutracoisa");
    DigiKeyboard.sendKeyStroke(KEY_ENTER);
   }
}
{{</ highlight >}}

#### Montagem

![yubi][yubi]

**Mehorias**

Adicionando um botão a mais: é possível montar um botão adicional (e mais um resistor) e ter 2 senhas configuradas.

Não façam o que eu fiz (ficou muito gambiarra, pois eu não tinha fios e errei da primeira vez ao usar o pino 5 que depois descobri ser o Reset, daí sempre que apertava o botão 2, resetava o trem)

![assembled1][assembled1]
![assembled2][assembled2]
![badge][badge]


É possível utilizar outra lib, chamada [CapSense](https://playground.arduino.cc/Main/CapacitiveSensor/) para transformar o botão em um sensor de toque, que com algumas linhas de código a mais fazem a yubikey paraguaia ficar mais parecida com a original. Use os pinos PB0, PB2 e PB5 (pois PB3 e PB4 são usados para USB e PB1 está conectado ao LED de teste).

<iframe width="560" height="315" src="https://www.youtube.com/embed/BHQPqQ_5ulc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Pick Gastronomia

O Pick gastrô deste mês é o café Ópera, da cafeteria Il Barista.

A origem deste café é a região montanhosa do sudeste de Minas Gerais (Matas de Minas). Este café possui aromas de cereal tostado, corpo intenso, baixa acidez e fundo achocolatado.

Para quem recebeu moído, a moagem é para métodos de percolação (filtro de papel ou de pano). Recomendo 10g por 100ml de água em temperatura de antes-da-fervura.

[coin]: /images/dclub/janeiro/digispark-coin.jpg "Size"
[plug]: /images/dclub/janeiro/digispark-plug.png "Plug"
[upload]: /images/dclub/janeiro/digispark-upload.png "Upload"
[yubi]: /images/dclub/janeiro/yubi-fake.png "Yubi"
[pull]: /images/dclub/janeiro/resistor-pull-up-down.gif "Pull"
[assembled1]: /images/dclub/janeiro/assembled1.jpeg "Assembled1"
[assembled2]: /images/dclub/janeiro/assembled2.jpeg "Assembled2"
[badge]: /images/dclub/janeiro/badge.jpeg "Badge"
[hid]: /images/dclub/janeiro/usb-hid-usage-tables.pdf "HID"