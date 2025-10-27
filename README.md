# 🧙‍♀️ Nollesite

Repo för Nollningshemsidorna [`nollning.esek.se`](https://nollning.esek.se) och <s title="deprecated since 2022">[`e-nollning.nu`](https://e-nollning.nu)</s> samt alla alias `/\d{4}/.nollning.esek.se`.

## 📚 Struktur

Projektet består av två delar. En backend server och en frontend applikation.

### Backend

Backenden består av ett [Strapi CMS](https://strapi.io/) som hanterar allt innehåll på sidorna. Mer information om backenden finns [här](./strapi/README.md).

### Frontend

Frontenden är en [Next.js](https://nextjs.org/) applikation som hämtar data från [backenden](#backend) och renderar sidorna serverside. Mer information om frontenden finns [här](./web/README.md).

## ⚡️ Quickstart

För detta projektet krävs:

- [Docker](https://www.docker.com/)
- [NodeJS](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

### 🐘 Postgres

Skapa en lokal postgres instans. Det finns en docker-compose fil i root som kan användas för detta:

```bash
# ./
docker compose up
```

### ⚙️ Strapi

1. Kopiera `.env.example` till `.env` i [`/strapi`](./strapi)

   ```bash
   # ./strapi
   cp .env.example .env
   ```

   Uppdatera värden i `.env` enligt instruktionerna i [filen](./strapi/.env.example).

2. Installera dependencies:

   ```bash
   # ./strapi
   yarn install
   ```

3. Starta en lokal strapi instans:

   ```bash
   # ./strapi
   yarn dev
   ```

En lokal strapi instans kommer startas på <http://localhost:8000>

4. Skapa ett lokalt konto
   Du kan i strapi-mappen köra `yarn admin:create` för att få ett lokalt adminkonto till adminsidan.

5. Ett [nollningsår kan nu skapas](https://ddgwiki.esek.se/index.php/Nollningshemsidan)!

### 🚀 Web

1. Kopiera `.env.example` till `.env` i [`/web`](./web)

   ```bash
   # ./web
   cp .env.example .env
   ```

   Uppdatera värden i `.env` enligt instruktionerna i [filen](./web/.env.example).

2. Installera dependencies:

   ```bash
   # ./web
   yarn install
   ```

3. Starta en lokal strapi instans:

   ```bash
   # ./web
   yarn dev
   ```

En lokal instans kommer startas på <http://localhost:3000>.

## User guide

Se [user guide](./docs/user-guide.md) för information om hur man skapar ett nollningsår och lägger till innehåll.
