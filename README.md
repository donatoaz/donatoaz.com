# [donatoaz.com](http://donatoaz.com) blog

This project was generated with [hugo](https://gohugo.io/getting-started/quick-start/).

## Adding new content

```
hugo new posts/category/subject.md
```

## Serving in dev mode

```
hugo server -D
```

## Deploying to prod

This site is currently hosted on aws.

Fill in the `.env` file and load it with your preferred tool (I like [direnv](https://direnv.net/)).

install node.js deps, run `build` and `deploy:prod` scripts.

```
npm install
npm run build
npm run deploy:prod
```

## Accessing the site

[http://donatoaz.com](http://donatoaz.com)