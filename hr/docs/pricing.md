---
title: "Tessera Cijene — Solo, Studio i Enterprise licence"
description: "Tessera je besplatna za osobnu i nekomercijalnu upotrebu. Komercijalne licence dolaze u tri razine — Solo, Studio i Enterprise — s godišnjim trajanjem i trajnim pravom na posljednju verziju."
---

# Cijene

Tessera je **source-available**, a ne open source. Besplatna je za osobne projekte, učenje, open-source doprinos, obrazovanje, neprofitne organizacije i javne institucije prema [PolyForm Noncommercial licenci](/hr/docs/license).

Ako gradiš za plaćene klijente, pokrećeš SaaS ili koristiš Tesserou unutar profitne tvrtke, trebaš **komercijalnu licencu**.

## Što uključuje svaki AI generirani projekt

Licenca je apstrakcija. Evo što `tessera new` proizvodi — svaka razina, svaki stack:

<div class="deliverables">

<div class="deliverable-col">

**Kod**

- Skelet projekta (Laravel / Node / Go / Flutter / Static)
- Domenski modeli, migracije, factories, seederi
- Autentikacijski scaffold gdje je primjenjivo
- Admin panel (Filament za Laravel; ekvivalentni dashboardi na ostalima)
- Frontend tema — Tailwind, prilagođena paleta, mobilno responzivna
- Realistični seed sadržaj na jezicima tvog projekta — bez lorem ipsuma
- Prolazna test suite (PHPUnit / Vitest / Go testing / flutter test)

</div>

<div class="deliverable-col">

**Postavljanje i operacije**

- `SETUP.md` — vodič za deploy razumljiv i juniorima, s objašnjenjima svih env varijabli i gdje ih nabaviti
- `composer audit` / `npm audit` čisti (Sprint 2 gate)
- Git inicijaliziran s prvim commitom
- `.env.example` sa svim ključevima koje je Tessera generirala
- Produkcijska lista provjera: TLS, backupi, queue workeri, monitoring

</div>

<div class="deliverable-col">

**Revizija i sljedivost**

- `.tessera/plan.json` — verzioniran, hash-zaštićen plan izvođenja
- `.tessera/events.jsonl` — append-only trag builda, svaki AI poziv zabilježen
- `.tessera/state.json` — stanje builda za nastavak
- Tri hasha po koraku (predložak, kontekst, renderirani prompt) za replay
- Prolaz/pad svakog kontrolnog prolaza trajno zabilježen

</div>

</div>

<p class="deliverables-foot">
Pogledaj primjer s komentarima: <a href="/docs/case/bakery">hrvatska pekarnica, generirana za 9 minuta i 39 sekundi</a>.
</p>

## Komercijalne razine licence

<div class="pricing-grid">

<div class="pricing-card">
<div class="tier-name">Solo</div>
<div class="tier-tagline">Freelancer · Jednočlani studio</div>
<div class="tier-price">
  <span class="amount">€249</span>
  <span class="cadence">/ godišnje</span>
</div>
<ul class="tier-features">
<li><strong>1 ovlašteni programer</strong></li>
<li>Neograničeni klijentski projekti</li>
<li>Svi stackovi (Laravel, Node, Go, Flutter, Static)</li>
<li>1 godina ažuriranja</li>
<li><strong>Trajni fallback</strong> — zadnju verziju koristiš zauvijek</li>
<li>Email podrška, radno vrijeme</li>
</ul>
<a href="mailto:licensing@tessera-ai.net?subject=Tessera%20Solo%20Licence&body=I%20would%20like%20to%20purchase%20a%20Solo%20licence.%0A%0AName%2Fbusiness%3A%20%0AInvoice%20address%3A%20%0AVAT%20%2F%20OIB%20(if%20applicable)%3A%20" class="tier-cta">Kupi Solo</a>
</div>

<div class="pricing-card pricing-card-featured">
<div class="tier-badge">Najpopularniji</div>
<div class="tier-name">Studio</div>
<div class="tier-tagline">Agencija · Mali product tim</div>
<div class="tier-price">
  <span class="amount">€799</span>
  <span class="cadence">/ godišnje</span>
</div>
<ul class="tier-features">
<li><strong>Do 10 ovlaštenih programera</strong></li>
<li>Neograničeni klijentski projekti</li>
<li>Svi stackovi</li>
<li>1 godina ažuriranja</li>
<li><strong>Trajni fallback</strong> — zadnju verziju koristiš zauvijek</li>
<li>Prioritetni email + privatni GitHub issue tracker</li>
<li>Rani pristup release kandidatima</li>
</ul>
<a href="mailto:licensing@tessera-ai.net?subject=Tessera%20Studio%20Licence&body=I%20would%20like%20to%20purchase%20a%20Studio%20licence.%0A%0ACompany%3A%20%0AInvoice%20address%3A%20%0AVAT%20%2F%20OIB%3A%20%0AExpected%20number%20of%20developers%20(max%2010)%3A%20" class="tier-cta tier-cta-featured">Kupi Studio</a>
</div>

<div class="pricing-card">
<div class="tier-name">Enterprise</div>
<div class="tier-tagline">Veći timovi · Posebne potrebe</div>
<div class="tier-price">
  <span class="amount-text">Po dogovoru</span>
</div>
<ul class="tier-features">
<li>Dogovoreni broj programera</li>
<li>Prilagođeni SLA i izravni kontakt</li>
<li>Privatni stack registar (roadmap)</li>
<li>Pohrana revizijskog loga i provjera sukladnosti (roadmap)</li>
<li>White-label opcija za preprodavače</li>
<li>Opcijska radionica za uvođenje</li>
</ul>
<a href="mailto:licensing@tessera-ai.net?subject=Tessera%20Enterprise%20Inquiry&body=Tell%20us%20about%20your%20team%3A%0A%0ACompany%3A%20%0ATeam%20size%3A%20%0APrimary%20use%20case%3A%20%0ASpecific%20requirements%20(SLA%2C%20on-prem%2C%20etc.)%3A%20" class="tier-cta">Kontaktiraj nas</a>
</div>

</div>

<div class="vat-note">
Cijene su u EUR i ne uključuju PDV. Hrvatska poduzeća dobivaju račun s OIB-om. EU poduzeća izvan Hrvatske mogu koristiti mehanizam prijenosa porezne obveze uz važeći PDV ID. Računi izvan EU slijede pravila dobavljačeve domicilne države.
</div>

## Što je isto za sve plaćene razine

| Mogućnost | Solo · Studio · Enterprise |
|---|---|
| Komercijalna upotreba Tessere | ✓ |
| Svi sadašnji i budući **stackovi** | ✓ |
| **Generirani output** je tvoj, bez tantijema | ✓ |
| **Ažuriranja** dok je licenca aktivna | ✓ |
| **Trajni fallback** na zadnju objavljenu verziju | ✓ |
| Pristup izvornom kodu putem GitHub repozitorija | ✓ |
| BYOK — koristiš vlastite AI CLI alate i planove | ✓ |

Tessera **nikad ne prosljeđuje tvoje AI tokene** niti usmjerava pozive kroz našu infrastrukturu. CLI pokreće AI alate koje imaš instalirane prema tvojoj pretplati. Ne naplaćujemo, ne mjerimo niti prosljeđujemo AI upotrebu. Vidi [Usmjeravanje AI poziva](/hr/docs/ai-routing) i [Odricanje od odgovornosti](/hr/docs/disclaimer).

## Usporedba s besplatnom razinom

| | **Nekomercijalna (besplatna)** | **Komercijalna (plaćena)** |
|---|---|---|
| Osobni projekti | ✓ | ✓ |
| Učenje, OSS, škola | ✓ | ✓ |
| **Klijentski rad za naknadu** | ✗ | ✓ |
| **Interni alati profitne tvrtke** | ✗ | ✓ |
| **SaaS i prihodni proizvodi** | ✗ | ✓ |
| Ažuriranja | posljednja objavljena verzija | zajamčena za trajanje |
| Podrška | zajednica (GitHub issues) | razinom definirana |
| Revizijsko jamstvo | nema | pisano odobrenje |

Pročitaj cijeli [Ugovor o komercijalnoj licenci](/hr/docs/commercial-license) prije kupovine.

## Kako funkcionira kupovina (danas)

Trenutni tijek je namjerno ručni. Fakturiramo i potvrđujemo emailom, bez platnih posrednika.

1. **Klikni gumb za kupovinu.** Tvoj email klijent otvori se s ispravnom razinom u predmetu.
2. **Odgovori s poslovnim podacima** — ime, adresa za fakturiranje, OIB / PDV ID ako je primjenjivo, broj programera.
3. **Primi fakturu.** PDF, plativo SEPA-om ili bankovnim prijenosom. EU kupci dobivaju račun s prijenosom porezne obveze ako ispunjavaju uvjete.
4. **Plati i primi aktivaciju.** Potpisana PDF kopija [Ugovora o komercijalnoj licenci](/hr/docs/commercial-license) i aktivacijski email s imenima ovlaštenih programera.

Samoposluživanje putem Stripea je na roadmapu; do tada ručni tijek osigurava da na svako pitanje o sukladnosti možemo odgovoriti prije nego što novac promijeni vlasnika.

## Česta pitanja

::: details Je li Tessera open source?
**Ne, ali izvorni kod je javno dostupan.** Tessera je *source-available*: svatko može čitati kod, forkati ga i doprinositi. No pravo **korištenja** Tessere u komercijalne svrhe uvjetovano je plaćenom licencom. Osobna i nekomercijalna upotreba je besplatna prema [PolyForm Noncommercial](https://polyformproject.org/licenses/noncommercial/1.0.0).
:::

::: details Tko je vlasnik koda koji Tessera generira?
**Ti.** [Komercijalna licenca](/hr/docs/commercial-license) odjeljak 5 kaže da nositelj licence ne polaže nikakvo autorsko pravo ni tantijeme na generirani output. Isporuči ga kako god želiš.
:::

::: details Freelancer sam koji ponekad radi pro-bono. Koja licenca mi treba?
Solo licenca pokriva sve što radiš, uključujući pro-bono — licenca je po programeru, ne po projektu. Ako je tvoja jedina komercijalna aktivnost jedan klijent godišnje, taj klijent zahtijeva plaćenu razinu.
:::

::: details Što se događa ako ne obnovim licencu?
Zadržavaš pravo korištenja verzije Tessere koju već imaš, **zauvijek**. Samo nećeš primati nove značajke, nove stackove ni buduće ispravke sve dok ne obnoviš. CLI neće prestati raditi, neće se "javiti kući" ni odbiti generirati projekte.
:::

::: details Narasli smo s 4 na 12 programera usred godine. Što sad?
Nadograđuješ na Enterprise (ili prilagođenu Studio nadoplatu). Razliku ćemo razmjerno obračunati za preostale mjesece godišnjeg trajanja. Nema kazne za rast izvan razine — samo za ignoriranje tog rasta.
:::

::: details Mogu li isprobati Tesserou prije kupovine?
Da. Koristi je nekomercijalně na osobnom projektu koliko god želiš. Softver je identičan između razina; licenca je jedina razlika.
:::

::: details Politika povrata?
**14 dana bez pitanja** za Solo razinu. Povrati za Studio i Enterprise rješavaju se od slučaja do slučaja, ali uvijek nalazimo rješenje kad je zahtjev podnesen u dobroj vjeri unutar 30 dana. Povrati nisu dostupni nakon što je licenca iskorištena za generiranje koda za plaćenog klijenta — generirani output je tvoj u svakom slučaju i upravo to je granica za koju licenca plaća.
:::

::: details Zašto Tessera nema SaaS stranicu s cijenama?
Jer Tessera ne pokreće AI na našoj infrastrukturi. Ti koristiš vlastitu Claude / Codex / Gemini pretplatu. Cijena koju plaćaš je za orkestraciju — kontrolni prolazi, biblioteka promptova, ugovorni testovi, nastavak — ne za tokene. Vidi [Usmjeravanje AI poziva](/hr/docs/ai-routing).
:::

::: details Mogu li redistribuirati Tesserou zajedno sa svojim proizvodom?
Ne — nijedna standardna razina ne dopušta redistribuciju Tessere kao dijela drugog proizvoda ili kao hostirane usluge. To je OEM/redistribucijski scenarij — javi nam se putem Enterprise kontakta i napisat ćemo poseban redistribucijski dodatak.
:::

::: details Hoće li se cijene mijenjati?
Vjerojatno, kako orkestracija postaje sposobnija. **Postojeće licence zadržavaju originalnu cijenu** pri obnovi sve dok je obnova kontinuirana. Moguće je dodavanje novih razina, ali nećeš biti prebačen na skuplji plan bez vlastite volje.
:::

<style>
.deliverables {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
  margin: 1.5rem 0 0.5rem;
  padding: 1.75rem;
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}

.deliverable-col {
  font-size: 0.93rem;
}

.deliverable-col strong {
  display: block;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.7rem;
}

.deliverable-col ul,
.deliverable-col p {
  margin: 0;
}

.deliverable-col ul {
  padding: 0;
  list-style: none;
}

.deliverable-col li {
  position: relative;
  padding: 0.32rem 0 0.32rem 1.1rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.5;
  border-top: 1px solid var(--vp-c-divider-light, rgba(128, 128, 128, 0.08));
}

.deliverable-col li:first-child {
  border-top: none;
}

.deliverable-col li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.7rem;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  opacity: 0.7;
}

.deliverables-foot {
  margin: 0.6rem 0 2rem;
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
  font-style: italic;
}

.deliverables-foot a {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-underline-offset: 2px;
  font-style: normal;
  font-weight: 500;
}

@media (max-width: 900px) {
  .deliverables {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
  }
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
  margin: 2.5rem 0 1rem;
  width: calc(100% + 12rem);
  margin-left: -6rem;
  margin-right: -6rem;
}

@media (max-width: 1280px) {
  .pricing-grid {
    width: calc(100% + 4rem);
    margin-left: -2rem;
    margin-right: -2rem;
  }
}

@media (max-width: 900px) {
  .pricing-grid {
    grid-template-columns: 1fr;
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }
}

.pricing-card {
  position: relative;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 2.25rem 1.75rem 2rem;
  background: var(--vp-c-bg-soft);
  display: flex;
  flex-direction: column;
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
}

.pricing-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.pricing-card-featured {
  border-color: var(--vp-c-brand-1);
  border-width: 2px;
  padding-top: 3rem;
}

.tier-badge {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--vp-c-brand-1);
  color: white;
  padding: 0.3rem 0.95rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
  box-shadow: 0 4px 12px -4px rgba(249, 115, 22, 0.5);
}

.tier-name {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.tier-tagline {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.tier-price {
  margin-bottom: 1.5rem;
}

.tier-price .amount {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.tier-price .amount-text {
  font-size: 2rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.tier-price .cadence {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  margin-left: 0.25rem;
}

.tier-features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  flex: 1;
}

.tier-features li {
  padding: 0.4rem 0;
  font-size: 0.92rem;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-divider-light, rgba(128, 128, 128, 0.08));
}

.tier-features li:last-child {
  border-bottom: none;
}

.tier-features strong {
  color: var(--vp-c-text-1);
}

.tier-cta {
  display: block;
  text-align: center;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none !important;
  transition: background 0.2s, transform 0.1s;
  border: 1px solid var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: transparent;
}

.tier-cta:hover {
  background: var(--vp-c-brand-soft, rgba(100, 108, 255, 0.08));
  transform: translateY(-1px);
}

.tier-cta-featured {
  background: var(--vp-c-brand-1);
  color: white !important;
}

.tier-cta-featured:hover {
  background: var(--vp-c-brand-2);
  color: white !important;
}

.vat-note {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  text-align: center;
  margin-bottom: 3rem;
  font-style: italic;
}
</style>
