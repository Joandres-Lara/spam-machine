# Bot messages

<img src="docs/brand.svg"/>

<a href="https://www.figma.com/file/304GNIThYn4jwf7jPY0B0P/Bot-messages">
 <img height="25px" src="docs/figma-logo.png"/>
</a>

[Figma mockup](https://www.figma.com/file/304GNIThYn4jwf7jPY0B0P/Bot-messages)

## Requirements

> Node.js v.14.x or higher
> NPM v.7.x or higher (workspaces support)
> Postgress v.14 or higher

## Frameworks and libraries

> Typescript (v.4.x)
> React (v.18.x)
> Next.js (v.12.x)
> TailwindCSS (v.3.x)
> Sequelize (v.6.x)
> Express (v.4.x)
> React-Query (v.3.x)

## Screenshots

<img src="docs/screenshots/login.png"/>
<img src="docs/screenshots/register.png"/>
<img src="docs/screenshots/dashboard.png"/>
<img src="docs/screenshots/add-contact.png"/>
<img src="docs/screenshots/add-message.png"/>
<img src="docs/screenshots/history-message-list.png"/>

## Install packages

```bash
 npm install
```

## Build application

Make this before run servers

```bash
 npm run build:shared
```

Migrate

```bash
 npm run db:migrate
```

Seed

```bash
 npm run db:seed
```

## Start next server

```bash
 npm run start:next-dev
```

## Start Database server

```bash
 npm run start:database-server-dev
```
