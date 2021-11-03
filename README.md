# TechStore

Techstore är en webbutik för ett företag som säljer mobiltelefoner.

Vi har valt att följa kravspecen men även gjort de delarna som hör till betyget VG. 

Vi har gjort ett par mindre förbättringar så som att vi har lagt till val för att lägga till eller minska kvantitet på produkterna på kassa-sidan.

Vi har även lagt till en symbol för att logga in som även indikerar när användaren är inloggad. 

Nedan krav är genomförda i projektet (samtliga): 
## NavBar


- [x] Hemsidan skall innehålla en fixerad navigationsbar längst upp på sidan som går hela vägen från vänster till höger.
- [x] Till vänster i navigationsbaren skall det finnas en titel (TechStore) som skall vara klickbar, ett klick på titeln tar användaren till startsidan.
- [x] Till höger i navigationsbaren skall det finnas en kundvagnsknapp som skall vara klickbar, ett klick på knappen tar användaren till kundvagnssidan.
- [x] När en produkt läggs till i kundvagnen skall detta reflekteras med att det visas en siffra intill kundvagnsknappen som reflekterar antalet produkter i kundvagnen.

## Startsida
- [x] Startsidan skall lista produkterna som finns i products.json filen.
- [x] Varje presentationsyta för produkterna skall ta upp ungefär hela höjden av skärmen och presentera all produktinformation.
- [x] Det skall även, för varje produkt, finnas en knapp för att lägga till produkterna i kundvagnen.
- [x] Produkterna som har lags till i kundvagnen skall sparas i localStorage så det är möjligt att komma åt informationen från alla sidor.

## Kundvagnsida

- [x] Kundvagnssidan skall lista produkterna som användaren har lagt till i kundvagnen.
- [x] Listan skall vara horizontell och centrerad.
- [x] Det ska gå att se flera produkter utan att behöva skrolla på sidan.
- [x] Varje produkt i listan skall visa bilden, titeln, priset och en knapp för att ta bort produkten ur kundvagnen.
- [x] Nedanför listan skall det finnas ett totalbelopp samt en knapp för att slutföra köpet.
- [x] Knappen för att slutföra köpet skall, vid klickning, visa en bekräftelse på köpet i en popup.

## Övrigt

- [x] Hemsidan skall vara responsiv, dvs den skall gå att öppna på en mobil, en surfplatta och en datorskärm.
- [x] Hemsidan skall efterlikna bilderna som finns i mockup-mappen (inklusive samtliga färger, font-typ, textstorlek osv).

## Krav för VG

- [x] Utöka produktlistan med ett urval från årets modeller så det totalt finns 10 stycken telefoner.
- [x] När man bekräftar ett köp skall kundvagnen tömmas.
- [x] Skapa en loginsida där det är möjligt att skapa ett konto samt logga in och se alla beställningarna som har gjorts. Här är design och funktionaliteten frivillig men det skall finnas en motivation kring vilka besluts som har tagits och varför i er readme fil. Använd localStorage för att spara nya användare samt gjorda beställningar.


### Länk till GitHub repo:
https://github.com/hugobengtsson/techstore