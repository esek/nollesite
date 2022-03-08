# ⚙️ Nollesite.strapi

CMS för nollningshemsidorna i [Strapi](https://strapi.io).
När detta projektet skrevs hade `Strapi@4` typ precis kommit ut och såklart valdes det att användas trots att dokumentationen var ganska skit. Därför är det inte så customizat för just E-Sektionen (även om vi gärna vill det framöver).

## 🌏 Att bygga ett nollningsår

### Years

Ett år skapas genom att göra en ny entry i `Years`-collectionen. Här lägger man in logotyp, phøs, nollekamp, färger etc. som inte behöver ändras beroende på vilken sida man är på.

### Pages

Därefter skapar man en `Page` under `Pages`-collectionen. Viktigt här är att se till att man använder en ny `path` för att annars finns det risk att det slumpas vilken sida som faktiskt laddas om man har två med samma.

Därefter lägger man till sin `content`. Detta är en så kallad `dynamic-zone`, vilket betyder att det inte är förbestämt i vilken ordning komponenterna ska hamna. Man kan alltså bygga:

1. `Text`
2. `Images`
3. `Images`

eller

1. `Text`
2. `Text`
3. `Text`

osv.

Dessa komponenter kommer sedan redneras i frontenden med en förbestämd layout beroende på vilken komponent det är.

### Språk

Det är viktigt att man skapar sidor både på svenska och engelska för att sidan ska funka korrekt. Next.js använder sig av en `locale`-parameter när den hämtar information från Strapi och om en sida inte finns på ett visst språk kommer den att få en `404`.

## 🖌 Custom controllers

För att göra användningen lättare kan kan skriva egna controllers (api-routes). I dagsläget finns:

- [`year:findOne(year:number)`](src/api/year/controllers/year.js) - Hämtar årsinformation för ett specifikt år.
