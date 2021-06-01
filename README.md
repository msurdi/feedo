# Feedo

An RSS/Atom feed reader

Work in progress

## Development environment

1. Install dependencies:

    ```shell
    npm install
    ```

2. Create a `.env` based off `.env.example`.
3. Start the service in development mode

    ```shell
    npm run dev
    ```

## Sync feeds

To sync feed, please make sure you at least added one feed and execute:

```shell
npm run feed:sync
```

## Production usage

## Your computer

1. Ensure you have a recent version of node and npm
2. Install it with:

    ```shell
       npm i -g feedo
    ```

3. Run it with `feedo`, and periodically run `feedo sync` to fetch data

### Dokku

If you are using [Dokku](https://dokku.com/), create an App, and configure in the `.env` file the `DOKKU_*` variables, then
deploy it with:

```shell
    npm run deploy:dokku
```

Ensure you also setup all the necessary environment variables in dokkue, with `dokku config set ...`.
