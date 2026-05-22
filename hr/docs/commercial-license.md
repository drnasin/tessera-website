---
title: "Ugovor o komercijalnoj licenci"
description: "Potpuni uvjeti Tessera komercijalne licence — što dobivaš, što možeš raditi s tim, trajanje, podrška i jamstvo."
---

# Tessera Ugovor o komercijalnoj licenci

**Verzija 1.0 — na snazi od 2026-04-27**

Ovaj dokument je pravni ugovor prema kojemu je **Tessera Installer** (ovdje nazvan "Softver") licenciran za **komercijalnu upotrebu**. Za besplatnu nekomercijalnu upotrebu, vidi [PolyForm Noncommercial License 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0).

Potpisana PDF kopija ovog ugovora dostavlja se uz svaku komercijalnu kupovinu. PDF verzija i ova stranica se drže sinkroniziranim; u slučaju bilo kakve nesukladnosti, potpisani PDF ima prednost.

---

## 1. Definicije

- **"Softver"** — Tessera Installer command-line alat objavljen na [github.com/drnasin/tessera-installer](https://github.com/drnasin/tessera-installer), uključujući njegov izvorni kod, dokumentaciju i prompt materijale.
- **"Davatelj licence"** — Ante Drnasin, jedini nositelj autorskih prava Softvera, koji posluje kao samostalni poduzetnik po hrvatskom pravu.
- **"Primatelj licence"** — fizička ili pravna osoba identificirana u evidenciji kupovine (račun i aktivacijski email) kao kupac licence.
- **"Ovlašteni developer"** — zaposlenik, izvođač ili vlasnik Primatelja licence koji stvarno pokreće Softver na razvojnoj mašini. Broj ovlaštenih developera utvrđuje se razinom licence.
- **"Generirani output"** — bilo koji izvorni kod, konfiguracija, promptovi, dokumentacija ili drugi artefakt produciran pokretanjem Softvera, bez obzira koji AI model ga je producirao.
- **"Razina"** — jedna od razina licence definiranih na [stranici Cijene](/hr/docs/pricing): Solo, Studio ili Enterprise.

## 2. Dodjela licence

Pod uvjetom plaćanja primjenjive naknade i kontinuiranog usklađivanja s ovim ugovorom, Davatelj licence dodjeljuje Primatelju licence **svjetsku, neekskluzivnu, neprenosivu** licencu **bez prava podlicenciranja** za:

1. **Instaliranje i pokretanje** Softvera na bilo kojem broju mašina, **pod uvjetom da Softver koriste samo Ovlašteni developeri** prema razini.
2. **Komercijalnu upotrebu Softvera**, uključujući plaćeni klijentski rad, interne poslovne alate, SaaS proizvode i druge aktivnosti koje generiraju prihod.
3. **Modificiranje** izvornog koda Softvera za vlastitu upotrebu Primatelja licence. Modificirane kopije ostaju vezane ovim ugovorom i ne smiju se redistribuirati.
4. **Primanje Generiranog outputa** bez naknade ili daljnje obveze prema Davatelju licence — vidi Odjeljak 5.
5. **Primanje ažuriranja** Softvera prema pravilima iz Odjeljka 6.

## 3. Ograničenja

Primatelj licence ne smije:

1. Distribuirati, podlicencirati, prodavati, iznajmljivati, davati u zakup ili hostati Softver (u cijelosti ili u modificiranom obliku) **kao uslugu ili proizvod** trećim stranama — na primjer, izlažući ga kao hostirani "izgradi za mene" API ili prepakujući ga kao konkurentski installer.
2. Uklanjati, zamagljivati ili mijenjati obavijesti o autorskim pravima, atribucije ili ovaj tekst licence u Softveru.
3. Dopustiti više pojedinaca da koriste Softver nego što razina dozvoljava. Ako tim naraste, Primatelj licence mora nadograditi razinu prije nego što dodatni developeri pokrenu Softver.
4. Koristiti Softver za izgradnju proizvoda čija je **primarna svrha** natjecanje s Tesserom kao AI generatorom projekata. Korištenje Tessere za izgradnju bilo kojeg drugog komercijalnog proizvoda, uključujući druge developer alate, je dopušteno.
5. Pogrešno prikazivati ulogu Davatelja licence — Generirani output ne smije tvrditi da ga je autor, odobrio, podržava ili jamči Davatelj licence osim ako nije izričito dogovoreno pisanim putem.

## 4. Razine i broj ovlaštenih developera

Razina i broj ovlaštenih developera navedeni su na računu i aktivacijskom emailu i odgovaraju [stranici Cijene](/hr/docs/pricing) u trenutku kupovine.

| Razina | Ovlašteni developeri | Tipična upotreba |
|---|---|---|
| Solo | 1 | Freelancer, jednočlani studio |
| Studio | do 10 | Agencija, mali product tim |
| Enterprise | pregovorano | Veće organizacije, prilagođeni uvjeti |

"Developer mašina" je svako računalo na kojemu se Softver pokreće za stvarni (ne-testni) projekt. CI mašine i jednokratni evaluacijski containeri koje koristi Ovlašteni developer ne računaju se kao dodatni developeri.

## 5. Generirani output

Generirani output produciran Softverom pripada Primatelju licence. **Davatelj licence ne zahtijeva autorska prava, naknadu ni pravo odbijanja nad Generiranim outputom.**

To je namjerno i apsolutno. Možeš:

- Isporučiti Generirani output klijentima bez atribucije Tesseri.
- Modificirati, forknuti, prodati ili objaviti kao open source.
- Zadržati privatnim.

Generirani output stvaraju AI modeli trećih strana djelujući na promptove i kontekst Primatelja licence. Davatelj licence ne jamči da je Generirani output ispravan, siguran, prikladan za svrhu ili slobodan od zahtjeva trećih strana. Vidi Odjeljak 9 (Jamstvo) i [Odricanje od odgovornosti](/hr/docs/disclaimer).

## 6. Trajanje, obnova i ažuriranja

### 6.1 Trajanje

Licenca se prodaje kao **godišnje razdoblje** od 12 mjeseci od datuma aktivacije.

### 6.2 Trajna rezerva

Kad godišnje razdoblje završi, Primatelj licence zadržava **trajno pravo** nastavka korištenja verzije Softvera koja je bila aktualna u trenutku završetka termina. Nema daljnjih ažuriranja, ispravaka ili izdanja.

To znači: **nikad ne gubiš pristup radnom alatu jer si prestao plaćati.** Gubiš samo pristup *novim* izdanjima.

### 6.3 Obnova

Obnova od 12 mjeseci može se kupiti po tada aktualnoj cijeni. Obnova vraća pravo primanja ažuriranja i resetira trajnu rezervu na najnoviju objavljenu verziju.

### 6.4 Ažuriranja

Tijekom aktivnog termina, Primatelj licence ima pravo na sva izdanja Softvera — uključujući ispravke bugova, sigurnosne zakrpe, nove stackove i nove značajke — distribuirane putem Composera i stranice GitHub izdanja. Nema posebnog "update kanala" niti plaćenog SKU-a.

## 7. Podrška

Razina podrške utvrđuje se razinom:

| Razina | Kanal podrške | Cilj odgovora |
|---|---|---|
| Solo | Email, radno vrijeme | Prema mogućnostima, obično unutar 5 radnih dana |
| Studio | Email + privatni GitHub issue tracker | Prema mogućnostima, obično unutar 2 radna dana |
| Enterprise | Direktni kontakt, prilagođeni SLA | Prema dogovorenom obrascu narudžbe |

Podrška pokriva sam Softver: instalacija, pokretanje, build flow, greške koje Tessera baca. **Ne pokriva:**

- Bugove, sigurnosne probleme ili iznenađenja u ponašanju Generiranog outputa.
- Probleme uzrokovane AI CLI alatima korisnika (Claude Code, Codex, Gemini), ograničenjima AI plana ili ispadima AI pružatelja.
- Prilagođeni razvojni rad, code review Primateljevih projekata ili obuku.

Ovi se mogu kupiti zasebno pod konzultantskim angažmanom; pitaj putem emaila za podršku.

## 8. Revizija

Davatelj licence može u bilo koje vrijeme i o svom trošku zatražiti pisanu potvrdu broja ovlaštenih developera koji trenutno koriste Softver. Primatelj licence mora odgovoriti u roku od 30 dana. Davatelj licence neće zahtijevati pristup izvornom kodu, infrastrukturi ili internim sustavima — samo pošten broj.

Ako revizija otkrije više developera nego što razina dozvoljava, Primatelj licence ima 30 dana za nadogradnju razine i plaćanje razlike. Nema retroaktivnih naknada, nema kaznenih kamata — pod uvjetom da je odgovor pravodoban i pošten.

## 9. Odricanje od jamstva

SOFTVER SE PRUŽA "KAKAV JEST", BEZ IKAKVIH JAMSTAVA BILO KOJE VRSTE, IZRIČITIH ILI PODRAZUMIJEVANIH, UKLJUČUJUĆI ALI NE OGRANIČAVAJUĆI SE NA JAMSTVA TRŽIŠNOSTI, PRIKLADNOSTI ZA ODREĐENU SVRHU I NEPOSTOJANJA POVREDE PRAVA. OVO ODRICANJE PRIMJENJUJE SE U CIJELOSTI NA BILO KOJI GENERIRANI OUTPUT.

Konkretno, Davatelj licence ne jamči:

- Da će Softver raditi bez grešaka na svakoj podržanoj platformi.
- Da će AI modeli koje Softver poziva producirati ispravan, siguran, potpun ili neuvredljiv output.
- Da će usluge trećih strana scaffoldane Generiranim outputom (platni sustavi, cloud API-ji, email pružatelji itd.) funkcionirati prema očekivanjima ili ostati dostupne.
- Da je Softver slobodan od ranjivosti, iako je izgrađen i pregledan s razumnom pažnjom.

## 10. Ograničenje odgovornosti

U maksimalnoj mjeri dozvoljenoj zakonom:

1. Ukupna odgovornost Davatelja licence prema ovom ugovoru, u zbroju, ograničena je na **iznos koji je Primatelj licence stvarno platio za licencu u 12 mjeseci koji prethode zahtjevu**.
2. Davatelj licence nije odgovoran za posredne, slučajne, posebne, posljedične, primjerne ili kaznene štete, uključujući gubitak dobiti, gubitak podataka, gubitak goodwilla ili prekid poslovanja — čak i ako je Davatelj licence bio upozoren na mogućnost takvih šteta.
3. Davatelj licence nije odgovoran za bilo kakve štete nastale iz Generiranog outputa ili iz bilo koje usluge treće strane s kojom Softver komunicira.

Ova ograničenja primjenjuju se čak i ako pravni lijek ne ispuni svoju bitnu svrhu.

## 11. Raskid

Ova licenca automatski prestaje ako Primatelj licence:

- Materijalno krši Odjeljak 3 (Ograničenja) i ne ispravi to u roku od 30 dana od pisane obavijesti.
- Pokrene sudski spor tvrdeći da Softver krši patent ili autorsko pravo u vlasništvu Primatelja licence.

Po raskidu, Primatelj licence mora prestati koristiti Softver. Odjeljak 5 (Generirani output) preživljava raskid — posao već isporučen klijentima ne mora se povući. Odjeljci 9, 10 i 12 također preživljavaju.

Godišnje razdoblje nije povratljivo pri raskidu zbog kršenja. Ako Davatelj licence raskine bez razloga (što Davatelj licence trenutno ne predviđa ali zadržava pravo u iznimnim okolnostima), neiskorišteni dio godišnje naknade vraća se razmjerno.

## 12. Mjerodavno pravo i sporovi

Ovaj ugovor uređen je zakonima **Republike Hrvatske**, bez obzira na odredbe o sukobu prava.

Stranke će prvo pokušati riješiti svaki spor dobrom vjerom pregovaranjem. Ako pregovaranje ne uspije nakon 30 dana, spor se podnosi **nadležnom sudu grada Splita, Republika Hrvatska** kao isključivoj nadležnosti. Ova odredba o nadležnosti je radi jasnoće i ne odriče se nikakvih obveznih prava zaštite potrošača korisnika sa sjedištem u EU.

## 13. Prijenos

Primatelj licence ne može prenijeti ovaj ugovor, ni po sili zakona ni na drugi način, bez prethodnog pisanog pristanka Davatelja licence. Kao usluga, u slučaju interne reorganizacije, promjene naziva tvrtke ili akvizicije od strane subjekta koji nije konkurent Tessere, Davatelj licence će obično dati pristanak bez naknade — ali se pristanak mora tražiti pisanim putem.

## 14. Cjeloviti ugovor

Ovaj dokument, zajedno s računom i aktivacijskim emailom koji identificira razinu i ovlaštene developere, čini **cjeloviti ugovor** između Davatelja licence i Primatelja licence u pogledu Softvera. Zamjenjuje sve prethodne rasprave i prijedloge, pisane ili usmene.

Izmjene moraju biti pisane i potpisane od obiju strana. Click-through uvjeti ili jednostrana ažuriranja ne mijenjaju kupljenu licencu — primjenjuje se samo verzija ovog ugovora koja je bila aktualna u trenutku kupovine, sve dok Primatelj licence dobrovoljno ne obnovi prema novijoj verziji.

## 15. Kontakt

| Svrha | Kanal |
|---|---|
| Kupovina licence | [Stranica Cijene](/hr/docs/pricing) |
| Pitanja o licenciranju | <span id="lic-email-hr" style="cursor:pointer; color: var(--vp-c-brand-1); text-decoration: underline;">Klikni za prikaz emaila</span> |
| Podrška (nakon kupovine) | Email adresa na računu |
| Prijava sigurnosnog problema | [github.com/drnasin/tessera-installer/security](https://github.com/drnasin/tessera-installer/security) |

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  const el = document.getElementById('lic-email-hr')
  if (el) {
    el.addEventListener('click', () => {
      const u = 'licensing'; const d = 'tessera-ai.net'
      el.innerHTML = '<a href="mai' + 'lto:' + u + '@' + d + '">' + u + '@' + d + '</a>'
    })
  }
})
</script>

---

::: tip Tražiš nekomercijalne uvjete?
Ova stranica pokriva **komercijalnu** licencu. Ako je tvoja upotreba osobna, obrazovna, open source, neprofitna ili vladina, vidi [PolyForm Noncommercial License 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0) — kupovina nije potrebna.
:::
