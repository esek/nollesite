# 🚀 Nollesite.web

Frontendkod för nollningshemsidorna [`nollning.esek.se`](https://nollning.esek.se) och <s title="deprecated since 2022">[`e-nollning.nu`](https://e-nollning.nu)</s> samt alla alias `/\d{4}/.nollning.esek.se`.

Skriven i [Next.js](https://nextjs.org/) för att få SSR (och för att `@afroborg` var lite trött på SvelteKit).

Däremot används såklart [TailwindCSS](https://tailwindcss.com/) för att inte behöva skriva egen csskod (🤮).

## ⚡️ Quickstart

Detta är ett vanligt `Next.js`-projekt som använder sig av `yarn`, så för att starta kör du:

```bash
yarn install
```

och sedan

```bash
yarn run dev
```

## 🎨 Design

Designen är gjord av `Phøset 2022` tillsammans med [`@afroborg`](https://gitlab.com/afroborg) och [`@blennster`](https://gitlab.com/blennster) (och säkert andra som inte får cred). Målet var att hitta en lösning som kan fungera flera år framåt, med endast tweaking på t.ex. färger, bilder och innehåll.

> Vi gissar att detta kommer ändras lite varje år men skitsamma

## ⚙️ How it works?

Upplägget är enkelt - man bygger olika sektioner i [backenden (strapi)](../strapi/README.md) som sedan hämtas i varje anrop. Sedan parsas dessa sidorna beroende på namnet som de har i strapi.

T.ex:
Phøset lägger in en `text`-komponent med lite innehåll från en `WYSIWYG` i strapi.

API-anropet kommer då innehålla ett objekt som ser ut enligt följande:

```js
{
	...
	content = [
	...
	{
		__component: 'content.text',
		...
	}
]
}
```

Komponenten [`<StrapiComponents content={content} />`](src/components/common/strapi-components.tsx) gör sedan en `switch`-check och renderar ut en komponent med en färdig layout för just text.

## ⌛️ Hämta tidigare år

Sidan kan antingen hämtas direkt utan subdomänsprefix (`https://nollning.esek.se`) eller med prefix (`xxxx.nollning.esek.se`). Detta är för att vi vill kunna spara gamla sidor live efter att nollningen varit (vissa är nostalgiska)

Beroende på hur man hämtar sidan får man olika utfall:

### Utan prefix

Om inget prefix sätts, så kommer det göras en default mot nuvarande året (`new Date().getFullYear()`) och endast detta årets information kommer visas.

### Med prefix (ex. `2020.nollning.esek.se`)

[`[[...route]]`](src/pages/[[...route]].tsx) komponenten kommer då att parsa ut årtalet (i detta fallet `2020`) och göra en filtrerad sökning mot api:et för att hämta just det årets data. På så sätt kan vi se till att alltid spara information för tidigare år.

## 👻 Previewläge

Eftersom vi inte vill att alla ska kunna gå in på `nollning.esek.se` under tiden som phøset bygger hemsidan i `strapi`, finns det en `publish`-flagga som de sätter i adminpanelen. Om `publish` är `false` kommer inte sidan att läsas in utan en `?preview=true` query-parameter.

Detta är kanske inte det säkraste sättet att lösa det på men vi hoppas att sektionen inte är tillräckligt IT-kunniga för att förstå att man kan göra så.
