
# User Guide

## Collection Types

Det finns i skrivande stund 2 stycken `Collection-Types`:

- Years
- Groups

### Years

Years är som namnet antyder ett nollningsår.
Här sätts all grundläggande information om hur hemsidan ska se ut; så som ''titel'', ''beskrivning'', ''logga'', osv.

### Groups

En ''group'' är en phaddergrupp. De är separerade för att endast relationer till en grupp ska finnas, och därmed alltså endast en source of truth.
Man skapar en grupp under Groups, och sen refererar man till den i året man redigerar.

## Att skapa ett nollningsår

För att skapa ett nollningsår går du in under `Content Manager` -> `Years` -> `Create new entry`.

Därefter fyller du i de nödvändiga fälten:

- `Year` - Året som nollningen är (mest troligen det nuvarande året ifall du är phøs)
- `Logo` - Eran logga för nollningen, denna kommer visas i menyn
- `Title` - Nollningens titel, denna kommer visas först på sidan och även i tabb-menyn och på Google.
- `Description` - En beskrivning av nollningen, detta kommer visas när man länkar till sidan, och även som beskrivande text i sökresultat på Google.
- `Färger`:
  - `Primary Color` - Detta är färgen som sätter bakgrunden på hela hemsidan
  - `Secondary Color` - Denna färgen används för t.ex. text och smådetaljer.
  - `Accent Color` - En gärna ganska stark accent-färg som ger hemsidan lite liv och får den att se roligare ut.

När du sparat sidan första gången får du en `Preview`-knapp nere till höger, klicka på den för att visa hemsidan.

### Content

Än så länge ser sidan ganska tråkig ut, endast en logga och en titel...

Därför kan man därefter dynamiskt lägga till `content` på sidan.

Detta görs via att klicka på "Add a component to content" knappen längst ner.

Man får då ett antal valmöjligheter:

#### Text

Ett vanligt textblock, med möjlighet till titel och beskrivning. Användbart för t.ex. ett välkomstmeddelande eller bara allmän information.

#### Images

En bild, eller ett collage av bilder. Dessa läggs sida vid sida på siten.
Lägger man till en titel så kommer denna att visas i menyn.

#### Phaddergroups

Lägger till en lista av phaddergrupper på hemsidan, med deras logga, namn och länk (förmodligen instagram).
Du skapar en phaddergrupp under "Content-Types" -> "Groups" och sedan kan du välja dem i dropdown menyn.

#### Nollekamp

Ger möjligheten att lägga till en del om nollekampen. Man kan skriva en beskrivning till den, lägga till uppdrag och även lägga in ställningen mellan phaddergrupperna.

- En `mission` är ett nollningsuppdrag, det har ett namn (t.ex. "Panta 200 burkar") och kan även ha en poängsumma. Man måste inte sätta en poängsumma, och man kan välja att inte visa det alls via att sätta `showPoints` till `false`.

- Under `standings` lägger man in phaddergrupperna och hur många poäng dessa har. Man gör en relation till en grupp via `group` och måste därför ha skapat phaddergruppen under `Groups` innan man kan ge dem poäng. Poängen för phaddergrupper kommer alltid att visas.

#### Phøset

Här lägger du till phøsbeskrivningar, bilder och namn.
Observera att ordningen här spelar roll. Först i listan kommer att ses som Øverphøs och därmed bli lite större på hemsidan. Ordningen kan ändras genom "drag&drop" i adminpanelen.

Denna borde vara rätt självklar, ett phøs har ett namn, en bild och en kort beskrivning.

#### Sponsors

Fungerar på ungefär samma sätt som phaddergrupper, man skapar en sponsor under "Sponsors" och sedan väljer man dem i dropdown-menyn för att visa dem på siten.

#### Calendar

Eftersom vi inte vill bygga ett helt eget kalendersystem, har vi valt att använda Google Calendar och hämta information därifrån.

När du lägger till en kalenderkomponent, så behöver du skriva in en `calendarUrl`.

Denna hittar man i sina inställningar på <https://calendar.google.com> -> "My calendars (nere till vänster)" -> (Tre prickarna bredvid kalendern du vill hämta) -> "Settings & Sharing".

- Scrolla ner på denna sidan och se till att `Make available to public` är ikryssad och att den är satt till "See all events".
- Därefter scrollar du ner till "Integrate calendar" och kopierar ditt "Calendar ID". Det borde se ut ungefär såhär: `9k1lh166vobpooctvffss6vvpo@group.calendar.google.com`.

Har ett event en beskrivning i Google Calendar, så kommer man kunna klicka på eventet på hemsidan för att få en popup som visar denna beskrivning.
Även plats visas om detta är satt i GCal.

Du kan lägga till ikoner på ett event genom att lägga till taggar i titeln.

De som finns i dagsläget är:

- `[OUVVE]` - Indikerar att du ska ha din ouvve på dig
- `[FOOD]` - Indikerar att mat kommer erbjudas
- `[ALCOHOL]` - Indikerar att eventet är med alkohol

### Menyn

Varje komponent har en knapp för ''showInMenu'' vilket bestämmer om titeln ska visas som en menyknapp eller inte.

Vad som visas beror på vilken komponent det är:

| **Komponent** | **Svenska**            | **Engelska**           |
|---------------|------------------------|------------------------|
| Text          | det som står i "title" | det som står i "title" |
| Images        | det som står i "title" | det som står i "title" |
| Nollekamp     | Nollekamp              | Nollekamp              |
| Contact       | Kontakt                | Contact                |
| Phaddergroups | Phaddergrupper         | Phaddergroups          |
| Phøset        | Phøset                 | The Phøs               |
| Sponsors      | Sponsorer              | Sponsors               |
| Calendar      | Kalender               | Calendar               |

### Skydda sidan

Eftersom nollningstemat ska hållas hemligt så länge som möjligt, vill vi inte att alla ska komma åt siten medans den byggs.

Därför finns det möjlighet att sätta ett `password` i adminpanelen också. Så länge detta fältet inte är tomt, kommer man behöva lägga till:

`?password=[ditt-lösenord]` i slutet av URL:en för att komma åt den.

> t.ex. om "password" är satt till "lösenord" i årets nollningssida, så kommer man åt sidan via <https://nollning.esek.se?password=lösenord>
