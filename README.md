# 🧙‍♀️ Nollesite

Repo för Nollningshemsidorna [`nollning.esek.se`](https://nollning.esek.se) och <s title="deprecated since 2022">[`e-nollning.nu`](https://e-nollning.nu)</s> samt alla alias `/\d{4}/.nollning.esek.se`.

## ⚡️ Quickstart

För detta projektet krävs:

- [Docker](https://www.docker.com/)
- [NodeJS](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/) (går att installera med `npm install -g yarn`)

### Lokal dev miljö

För att starta en lokal devmiljö behöver du först klona projektet. Om [Docker Desktop](https://www.docker.com/products/docker-desktop/) används, starta denna applikation. Se till att det **inte** finns några docker images som kör på port 5050 och 5432. Kör därefter `docker compose up` i root för att starta en `nollesite` container.

Följande steg förklarar hur en strapi instans skapas, där du kan redigera nollningssidor. Därefter förklaras hur man skapar en lokal webapplikation för att testa nollningssidorna.

#### ⚙ Strapi

Skapa CMS:et på följande sätt:
1. Skapa en `.env`-fil i `strapi/` och kopiera över innehållet från `.env.example`. Inga ytterligare ändringar behöver göras för att få lokala strapi-instansen att fungera. I testing används variablerna för följande syften:
   - `DB` - värdena för lokala postgres-instansen
   - `STRAPI_HOST` och `STRAPI_PORT` - adressen som servern kör på
   - `SMTP` - för att testa skicka mejl lokalt, exempelvis för att testa funktionaliteten för att ha glömt sitt lösenord
   - <s title="deprecated">`WIKI` - används för att kunna visa en sida från DDGWikin i Strapi</s>
2. `cd strapi`, `yarn install` och `yarn dev`
3. En lokal strapi instans kommer startas på http://localhost:8000
4. Skapa ett lokalt konto
5. Ett [nollningsår kan nu skapas](https://ddgwiki.esek.se/index.php/Nollningshemsidan)!

#### 🚀 Web

Skapa en lokal webapplikation för nollningssidorna på följande sätt:
1. Skapa en `.env`-fil i `web/`
   - Kopiera över innehållet från `.env.example`
   - Fyll i `.env`-filens `STRAPI_API_TOKEN`. Värdet för denna är en API Token som skapas i lokala Strapi instansen, på http://localhost:8000/dashboard/settings/api-tokens
   - Lägg till `GOOGLE_API_KEY` om kalendern ska testas. Denna nyckeln finns också i Bitwarden
2. `cd web`, `yarn install` och `yarn dev`
3. En lokal webapplikation kommer startas på http://localhost:3000

#### ❓ Felsökning

Några vanliga fel som kan uppstå när en lokal dev miljö skapas, och lösningar som har upptäckts för dessa, är följande:
- Om inte yarn-kommandon fungerar i terminalen kan [nvm](https://github.com/nvm-sh/nvm) användas för att byta version av node med `node use <version>`. Efter detta brukar yarn-kommandon fungera igen.
- Om inte en docker container har skapats när `yarn dev` används i `strapi` kan CMS:et ladda för evigt. Se då till att stänga ner strapi instansen i terminalen med <kbd>CTRL</kbd> + <kbd>C</kbd>. Sedan kan `docker compose up` köras i root. När `yarn dev` körs igen borde CMS:et startas som tänkt.
- Om ett nollningsår är skapat i CMS:et men inte dyker upp i webapplikationen - se till att nollningsåret har en svensk locale. Detta är egentligen en bugg, i issue https://github.com/esek/nollesite/issues/25.

## 📚 Struktur

Projektet består av två delar. En backend server och en frontend applikation.

### Backend

Backenden består av ett [Strapi CMS](https://strapi.io/) som hanterar allt innehåll på sidorna. Mer information om backenden finns [här](./strapi/README.md).

### Frontend

Frontenden är en [Next.js](https://nextjs.org/) applikation som hämtar data från [backenden](#backend) och renderar sidorna serverside. Mer information om frontenden finns [här](./web/README.md).
