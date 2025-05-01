# Frost Dev Bot

A Notifier for [Frost](https://github.com/frost-social/frost) developers.

Now hosted on [@frostDevBot@honi.club](https://honi.club/@frostDevBot).

## Usage

Create a `.env` file based on `.env.example` and then execute the following commands.

### Testing

```sh
deno task test
```

### Deployment

For the **development** environment:

```sh
deno task deploy
```

For the **production** environment:

```sh
deno task deploy-prod
```

Please set the environment variables on the Deno Deploy page.
The contents are the same as the items set in `.env`.
