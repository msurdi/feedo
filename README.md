# Feedo

An RSS/Atom feed reader

Work in progress

## Quick start

```shell
npm i -g feedo
export FEEDO_DATABASE_URL=/some/path/feedo.db
feedo migrate
feedo start
```

That will start the web application at [http://localhost:8080](http://localhost:8080/).
After adding some feeds, you will need to manually run the sync process (for now, see #6, #7 and #8) as:

```shell
feedo sync
```

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

## Production deployment

### Dokku

If you are using [Dokku](https://dokku.com/), create an App, and configure in the `.env` file the `DOKKU_*` variables, then
deploy it with:

```shell
    npm run deploy:dokku
```

Ensure you also setup all the necessary environment variables in dokkue, with `dokku config set ...`.
