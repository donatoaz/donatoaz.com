---
title: Morte Ao Staging, Gestao de mudanca onde este ambiente nao faz sentido
date: 2019-06-17T13:53:06-03:00
draft: false
---

-- Ayrton Araujo (Xapo)
-- [@ayrtonfreeman](https://twitter.com/ayrtonfreeman) on twitter

Ayrton trabalha na Xapo, uma empresa de carteiras de bitcoin que opera em diversos países ao redor do plano.

A Xapo, por trabalhar com cripto-moedas, é muito visada por hackers e por isso possui 12 sub-equipes de segurança que usam desde dispositivos físicos na casa dos desenvolvedores (eles tem roteadores industrial-grade para se proteger de ataques DDoS) até técnicas de machine learning para attack sensing & prevention.

Muito em breve a Xapo irá lançar no Brasil o primeiro cartao de débito de bitcoin.

A primeira crítica que Ayrton fez em relação ao staging é que `"seu staging nunca vai ser exatamente igual a produção."`, o que faz muito sentido para empresas que tem uma escala de usuários e operações difícil de replicar controladamente.

Como uma segunda crítica ele usou o exemplo de dois desenvolvedores trabalhando em feature branches separados e fazendo a integracao com baixa frequencia, o que na maioria das vezes gera conflitos de integração.

Ayrton falou também de conflitos semânticos, os tradionais `merge conflicts`. Comentou que é muito comum pessoas desobedecerem preceitos de DRY apenas para não correr risco de alterar um arquivo que outro branch vai alterar e ter de lidar com um merge conflict. Ele afirmou que isto, vez por outra, ocorre por nao sabermos usar o git de maneira adequada. Falou também de _branching hell_, como uma teia de branches no repositório, difícil de se visualizar as conexões.

[![Don't Branch][ayrton-dont-branch]][ayrton-dont-branch]

Ayrton então fez uma citação do Jezz Humble `"Quanto maior a razao para criar um branch, menor o motivo para tal.".`

_Nota do Editor: Não consegui encontrar a referência a esta citação, mas com certeza me parece algo que o Jezz humble falaria. Em seu livro [Continuous Delivery](https://www.amazon.com/Continuous-Delivery-Deployment-Automation-Addison-Wesley/dp/0321601912), em especial no capítulo 14 Advanced Version Control ele ilustra vários cenários e formas de se trabalhar com sistemas de controle de versão que implementam o conceito de "branches"._

E então sugeriu o seguinte modelo de trabalho (n.d.e. eu chamo este modelo de _rebase-all-day_, mais a seguir.):

```
git commit -am "My stuff"
git rebase develop
git push origin develop
```

_Nota do editor: meu modelo de _rebase-all-day_ é similar e consiste no seguinte:_

1. _Configure o git para fazer `git pull --rebase` como default. Você pode fazer isto com um simples `git config --global pull.rebase true` ou adicionando o seguinte ao seu `~/.gitconfig`:_

```
[pull]
  rebase = true
```

2. _Apenas permita merges que possam ser `fast-forwarded` no seu branch principal. Você pode habilitar este comportamento fazendo um simples `git config --global merge.ff only`, de modo que se não for possível realizar um `fast-forward` você será avisado e se realmente quiser fazer o commit mesmo assim poderá força-lo com um `git merge --no-ff` ou adicionando o seguinte ao seu `~/.gitconfig`:_

```
[merge]
  ff = only
```

3. _Crie o hábito de sempre começar o dia realizando um `git pull --rebase`, desta forma você, logo cedo, integrará as alterações que outros devs fizeram no branch principal e resolverá os conflitos diariamente, sem deixá-los se acumular._

_fim da nota do editor._

`"Mas o o que fazer com features incompletas, ou não liberadas para produção?"`, questionou em seguida Ayrton.

## FEATURE FLAGS

Ayrton, então, sugeriu como uma forma de abandonar de vez o ambiente de staging fazer uso de _feature flags_. De forma simples, uma feature flag é uma forma de isolar, de forma condicional, algum comportamento ou configuração da sua aplicação.

formas simples: 

```
if (feature enabled):
  doThis()
else:
  doThat()
```

`"E o que então acontece com a revisao de codigo?"`, questionou retoricamente logo em seguida citando:

> "A day's worth of back and forth on a PR can literally save minues of pair programming." -- unattributed

`"Branches podem ser uteis em algum caso?"`, novamente Ayrton questionou. E a sua única resposta foi:

- experimentos

_Nota do Editor: Ayrton então entrou no assunto de Pipelines genericas do Jenkins, mas fiquei um pouco perdido e não achei conteúdo específico no site do Jenkins sobre isto._

Em seguida Ayrton retomou o assunto de `feature flagging` desta vez falando sobre condicionais baseadas em regulamentações geográficas. Alguns países permitem a troca de moedas, mas em outros (leia-se _Brazeel_) isso é crime. Eles já tiveram casos em que ao invés de ter de realizar um rollback, simplesmente desligaram uma _flag_ e toda uma funcionalidade do sistema foi desabilitada no Brasil.

Em seguida deu exemplos das empresas (facebook, google, netflix, spotify) que abandonaram o staging e fazem os testes direto em produção.

_Nota do editor: Outro livro do Jezz Humble trata de modelos de deploy que sustentam esta ideia de testes seguros em produção. Canarying e Dark Launches são exemplos clássicos. Veja [The DevOps Handbook](https://www.amazon.com/DevOps-Handbook-World-Class-Reliability-Organizations-ebook/dp/B01M9ASFQ3), em especial o capítulo._

[ayrton-dont-branch]: /images/tdcbh-day1/ayrton-dont-branch.jpg "Don't Branch!"