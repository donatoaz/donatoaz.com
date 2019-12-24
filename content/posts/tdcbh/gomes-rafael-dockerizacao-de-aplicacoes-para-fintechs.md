---
title: Dockerizacao de aplicações para fintechs
date: 2019-06-23T15:25:41-03:00
draft: true
---

-- Rafael Gomes (Paycertify)
-- [@gomex](https://twitter.com/gomex) on twitter

*Nota do editor: Rafael Gomes gentilmente disponibilizou [sua apresentação](https://pt.slideshare.net/linux.rafa/dockerizando-aplicacoes-em-uma-fintech-o-bom-o-mau-e-o-feio-as-surpresas).*

Rafael iniciou sua apresentação dando o contexto da empresa onde trabalha: uma fintech que processa em torno de 500MM/mês, possui cerca de 20 desenvolvedores e 10+ APIs criadas e evoluídas durante os últimos 4 anos.

Rafael integrou a equipe com o desafio de trazer mais agilidade e conceitos/cultura de DevOps para a equipe.

Em seguida apresentou o seu desafio inicial: criar [ambientes conteinerizados](https://hackernoon.com/what-is-containerization-83ae53a709a6) para uma determinada aplicacao [Ruby on Rails](https://rubyonrails.org/doctrine/) utilizando [docker](https://www.docker.com/).

Rafael descreveu a arquitetura da aplicação, um tradicional [3-tier](https://en.wikipedia.org/wiki/Multitier_architecture#Three-tier_architecture) (Servidor Frontend, Servidor de Aplicação e Servidor de Banco de Dados) com a adição de um servidor redis e workers com sidekick para processamento de tarefas em background.

Eles utilizavam deploy manual no [heroku](https://devcenter.heroku.com/articles/getting-started-with-rails5): `git push heroku master`.

Em seguida fez a seguinte afirmação: `"A questão nao é qual ferramenta se utiliza, mas como nos organizamos em torno delas".`

De acordo com Rafael, `"[...] entrega = atender expectativas do cliente. Nao é atender hype, nao é fazer o que voce quer/gosta, etc."`

Em seguida mostrou um fluxograma com as atividades que ele vislumbrou e justificou que iria entregar primeiro o ambiente de desenvolvimento por ser o menor esforço para o maior valor para a equipe.

[![Fluxograma de atividades][gomes-flowchart]][gomes-flowchart]

## Entregando um ambiente de desenvolvimento automatizado e padronizado

Ele então refletiu sobre o que é "entregar valor" para os desenvolvedores:

1. Não poder demorar (N. d. E.: Builds/compiles demorados atrapalham sensivelmente o "flow" pois são elementos distratores, veja este ótimo e curto vídeo do Daniel Goleman: [![vídeo do Daniel Goleman](https://img.youtube.com/vi/Nexy76Jtu24/2.jpg)](https://www.youtube.com/watch?v=Nexy76Jtu24) )
2. Possibilidade de manter cache de gems -- agiliza o build e economiza recurso computacional
3. Possibilidade de debugar código dentro de gems
4. Armazenar histório do irbrc (interac)
5. Automatizar o primeiro uso (N. d. E.: bootstraping)
6. Precisa rodar com usuário diferente de root (segurança em todos os ambientes)

Em seguida apresentou os exemplos de Dockerfile, inicialmente sem [multistage build](https://docs.docker.com/develop/develop-images/multistage-build/) para entregar todos os itens acima com exceção do item 5.

Para resolver o item 5, usou o bom e velho GNU `make`.

```makefile
dev: ## start complete app dev environment
  docker-compose up --build

dev-first: ## start complete app dev environment
  docker-compose rm -f
  docker-compose build
  docker-compose run app bundle install --gemfile=Gemfile
  docker-compose run app yarn install
  docker-compose run app rails db:drop
  docker-compose run app rails db:create db:migrate db:seed
  docker-compose stop

rspec-test:
  docker-compose rm -f
  docker-compose build
  docker-compose run app rspec
  docker-compose stop

db-drop:
  docker-compose rm -f
  docker-compose build
  docker-compose run app rails db:drop
  docker-compose stop

qa-build:
  docker build -t app:$(GIT_COMMIT) --target prod .

heroku-tag-qa: docker-heroku-login
  docker tag app:$(GIT_COMMIT) registry.heroku.com/app/web
  docker tag worker:$(GIT_COMMIT) registry.heroku.com/app/worker
  docker push registry.heroku.com/app/web
  docker push registry.heroku.com/app/worker

heroku-release-qa:
  heroku container:release --app app web
  heroku run -a app rails db:migrate

docker-heroku-login:
  docker login --username=_ --password=$(API_KEY) registry.heroku.com
```

## Entregando as melhores práticas de um pipeline de entrega de imagens docker como artefato

Hugo descreveu seu pipeline proposto através de um diagrama de estágios do jenkins:

[![Fluxograma de CI][gomes-ci]][gomes-ci]

*Nota do Editor: Para um relato bem detalhado e interessante sobre a origem de Continuous Integration, veja a entrevista com Paul Julius no podcast DevOps on AWS Radio - ele fala muitas coisas interessantes na sua intro e a partir do minuto 17:24*

{{< soundcloud 508389981 >}}

E destacou a existência de um estágio de `Linting` da sua *infraestrutura-como-código*.

Para lintar o seu Dockerfile ele utilizou uma imagem docker customizada a partir da [projectatomic/dockerfile-lint](https://hub.docker.com/r/projectatomic/dockerfile-lint). Sua imagem é bem simples:

```Dockerfile
FROM projectatomic/dockerfile-lint:latest
LABEL maintainer "Rafael Gomes <rafael.gomes@paycertify.com>"
COPY default_rules.yaml /rules/default_rules.yaml
```

E na sua pipeline de CI um dos passos executa `sh 'dockerfile_lint -f Dockerfile -r /rules/default_rules.yaml'`.

Para mais detalhes sobre o dockerfile-lint, em especial sobre as regras e formato do arquivo yaml, veja repositório github [projectatomic/dockerfile_lint](https://github.com/projectatomic/dockerfile_lint) do projeto.

Outro passo importante do pipeline consiste dos testes automatizados, estes são realizados de forma bem simples pelo jenkins se aproveitando do makefile criado anteriormente:

```jenkins
stage('test') {
  steps {
    sh 'make dev-first'
    sh 'make rspec-test'
    sh 'make db-drop'
  }
}
```

## Usando multistage build para simplificar e unificar as imagens docker

Para entregar os demais fluxos destacados ele utilizou da feature de Multistage builds do docker.

Por exemplo, para completar o pipeline destacado acima:

```dockerfile
FROM ruby:2.5.1 as builder
# instalar deps de build time, por exemplo build-essential, imagemagik, yarn, nodejs... o que precisar

FROM builder as install
# instala as gems e pacotes node
COPY Gemfile.lock $APP_ROOT/
COPY Gemfile $APP_ROOT/
COPY package-lock.json $APP_ROOT/
COPY package.json $APP_ROOT/

RUN bundle install
RUN yarn install

FROM install as preprod
RUN mkdir /app
WORKDIR /app
COPY . /app

RUN bundle exec rake assets:precompile

FROM paycertify/ruby:2.5.1-slim as prod
# ... non-root user stuff, i suppose...
WORKDIR /app
# ...

# copia as gems instaladas anteriormente
COPY --from=preprod /usr/local/bundle/ /usr/local/bundle/
# copia o código, incluindo os assets precompilados no estágio anterior
COPY --from=preprod /app/ /app/
# copy other gems
COPY --from=preprod /gems/ /gems/

EXPOSE 3000
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
```

E assim, ficam os estágios do pipeline no jenkins:

```jenkins
stage('build') {
  steps {
    sh 'make qa-build'
  }
}
stage('build') {
  steps {
    sh 'make qa-build'
  }
}

stage('tag-push-qa') {
  when {
    branch "staging"
  }
  steps {
    script {
      sh 'make heroku-tag-qa'
    }
  }
}

stage('deploy-heroku-qa') {
  when {
    branch "staging"
  }
  steps {
    script {
      sh 'make heroku-release-qa'
    }
  }
}

```

O estágio de teste end to end foi omitido propositalmente, se quiser detalhes, confira os [slides originais da palestra](https://pt.slideshare.net/linux.rafa/dockerizando-aplicacoes-em-uma-fintech-o-bom-o-mau-e-o-feio-as-surpresas).

A sua conclusão foi que ele conseguiu atender a todos os requisitos que tinha como desafio, agilizou o processo de onboarding significativamente e automatizou o deploy para o heroku que antes era manual 🎊 🎉.

Finalmente, uma dica importante que ele deu foi: `"não utilize um usuário root no seu container, pois se algum hacker comprometer seu ambiente ele ainda vai ter o desafio de fazer um [*privilege escalation*](https://en.wikipedia.org/wiki/Privilege_escalation) para realmente violar seu sistema."`.

Em um [post](https://gomex.me/2019/02/15/how-to-deploy-ruby-and-node-app-on-heroku-using-docker---part-1/) em seu site pessoal ele mostra alguns detalhes de como utilizar um usuário não root.

De agora em diante o conteúdo é exclusivo do editor deste blog.

TLDR; leanificar seus containers é uma ótima prática que com multistage build é facilitada.



[gomes-flowchart]: /images/tdcbh-day1/gomes-flowchart.png#c "Fluxograma de atividades"
[gomes-ci]: /images/tdcbh-day1/gomes-ci.png#c "Fluxograma de CI" 