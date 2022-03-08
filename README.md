# 🥷🏻 Nollesite

Repo för Nollningshemsidorna [`nollning.esek.se`](https://nollning.esek.se) och <s title="deprecated since 2022">[`e-nollning.nu`](https://e-nollning.nu)</s> samt alla alias `*.nollning.esek.se`.

## ⚡️ Quickstart

För detta projektet krävs:

- [Docker](https://www.docker.com/)
- [NodeJS](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/) (går att installera med `npm install -g yarn`)

### Lokal dev miljö

För att starta en lokal devmiljö där du kan redigera saker i strapi och testa sidorna i webapplikationen behöver du:

1. Starta CMS:et - `cd strapi` och `yarn dev`
   - Detta kommer starta en lokal strapi instans på `http://localhost:1337`
2. Starta Web - `cd web` och `yarn dev`
   - Detta kommer starta en lokal webapplikation på `http://localhost:3000`

## 📚 Struktur

Projektet består av två delar. En backend server och en frontend applikation.

### Backend

Backenden består av ett [Strapi CMS](https://strapi.io/) som hanterar allt innehåll på sidorna. Mer information om backenden finns [här](./strapi/README.md).

### Frontend

Frontenden är en [Next.js](https://nextjs.org/) applikation som hämtar data från [backenden](#backend) och renderar sidorna serverside. Mer information om frontenden finns [här](./web/README.md).
