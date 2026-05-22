---
title: "Odricanje od odgovornosti"
description: "Važne informacije o potrošnji AI tokena, kvaliteti generiranog koda, integracijama s trećim stranama i ograničenjima jamstva pri korištenju Tessere."
---

# Odricanje od odgovornosti

## Potrošnja AI tokena

Tessera poziva AI CLI alate instalirane na tvom računalu (Claude, Gemini, Codex) za generiranje koda. **Svaki poziv troši tokene iz tvog pretplatnog plana ili API kvote.**

- Tessera ne pruža, ne upravlja niti plaća za AI pristup
- Ti si odgovoran za razumijevanje ograničenja, troškova i uvjeta usluge svog plana
- Tipični build projekta koristi 5-10 AI poziva ovisno o složenosti projekta
- [Usmjeravanje ovisno o planu](/hr/docs/ai-routing#usmjeravanje-ovisno-o-planu) tijekom postavljanja pomaže Tesseri učinkovito usmjeravati zadatke prema tvojim pretplatama

## Generirani kod

Sav kod koji Tessera producira je **AI-generiran**. Dok Tessera uključuje više zaštita:

- [Kontrolni prolazi](/hr/docs/ai-routing#kontrolni-prolazi--hvatanje-done-kad-nema-ničega) (deterministički post-provjere deklarirani u YAML-u)
- PHP lint na svim generiranim datotekama
- Automatizirano generiranje i izvršavanje testova
- Auto-ispravak Filament namespacea
- Verifikacija ruta

**AI-generirani kod može i dalje sadržavati:**

- Bugove i logičke greške
- Sigurnosne ranjivosti
- Neispravnu poslovnu logiku
- Nekompatibilne zavisnosti
- Nepotpuno rukovanje rubnim slučajevima

**Ti si odgovoran** za pregled, testiranje i validaciju svog generiranog koda prije korištenja u bilo kojoj okolini — posebno produkcijskoj.

## Sigurnosni model

Tessera pokreće AI CLI alate i build naredbe kao subprocese od sebe. Ti subprocesi prolaze kroz mali ojačani sloj:

- **Izvršavanje bez shell-a.** Subprocesi se pokreću s array `argv` — nijedan shell ne interpretira naredbeni redak, tako da AI ili korisnički input ne može ubaciti metaznakove (`;`, backtickove, `$(...)`).
- **Allowlist okoline.** Okolina roditeljskog procesa se filtrira prije nego stigne do djeteta. AI vjerodajnice za jednog pružatelja (npr. `ANTHROPIC_API_KEY`) nikad ne procure u CLI-jeve drugih pružatelja ili u build alate poput composera i npm-a. Svaki AI alat vidi samo vlastite vjerodajnice plus minimum potreban za rad.
- **Baza podataka vjerodajnice.** Kod konfiguriranja MySQL/MariaDB/PostgreSQL, lozinke putuju kroz namijenjene env varijable enginea (`PGPASSWORD`, `MYSQL_PWD`) — nikad kao argv zastavice koje bi se pojavile u `ps` ili Task Manageru. Nazivi baze i korisnika validiraju se prema strogom allowlistu prije ugrađivanja u `CREATE DATABASE`. Vrijednosti iz `.env` su sigurno quoted i escaped.
- **Zaštita direktorija.** `tessera new --force` može uklanjati samo direktorije unutar trenutnog radnog direktorija i nikad ne prati symlinkove.

### AI način dozvola (samo Claude)

Zadano, Tessera pokreće Claude s `--dangerously-skip-permissions` da installer može scaffoldati bez prompta na svakom pisanju datoteke. To daje Claudeu puni pristup filesystemu i shellu za vrijeme builda — to je ono što zahtijeva non-interaktivno scaffoldanje.

Ako preferiraš odobravati svaku Claude akciju ručno, postavi `TESSERA_SAFE_AI=1`:

```bash
TESSERA_SAFE_AI=1 tessera new my-project
```

Claude će tada pauzirati i čekati tvoje odobrenje za svaku akciju. Installer glasno pada umjesto tihog zamrzavanja ako Claude pokuša nešto što zahtijeva dozvolu.

**Codex i Gemini.** `TESSERA_SAFE_AI` danas utječe samo na Claude, jer je Claude jedini AI CLI koji Tessera pokreće s zastavicom za bypass dozvole. Ostali imaju vlastite modele dozvola koje Tessera trenutno ne konfigurira:

- **Codex** se pokreće putem `codex exec` s vlastitim sandboxom (approval-on-request zadano). Tessera ne prosljeđuje `--dangerously-bypass-approvals-and-sandbox`. Hoće li Codex tražiti potvrdu ovisi o zadanim postavkama tvoje Codex verzije.
- **Gemini** se poziva bez ikakve zastavice dozvole; njegovo ponašanje je zadano Gemini CLI ponašanje na tvom sustavu.

Postavljanje `TESSERA_SAFE_AI=1` nema efekta na Codex ili Gemini. Odobravanje po akciji za te CLI-jeve može doći u budućem izdanju.

U svakom slučaju, **trebaš pregledati AI-generirani kod prije deploya** — nijedan model dozvola ne zamjenjuje to.

## Usluge trećih strana

Tessera može generirati kod koji se integrira s uslugama trećih strana uključujući ali ne ograničavajući se na:

- Pružatelje plaćanja (Stripe, CorvusPay, PayPal itd.)
- Cloud usluge (AWS, Firebase, Supabase)
- Email usluge (Mailchimp, Brevo)
- Search engine-e (Meilisearch, Algolia)

Te integracije se scaffoldaju na temelju AI interpretacije i mogu zahtijevati ručnu konfiguraciju, testiranje i validaciju. **Tessera nije povezana s niti jednom uslugom treće strane niti daje ikakva jamstva o njima.**

## Bez jamstva

OVAJ SOFTVER PRUŽA SE "KAKAV JEST", BEZ IKAKVIH JAMSTAVA BILO KOJE VRSTE, IZRIČITIH ILI PODRAZUMIJEVANIH, UKLJUČUJUĆI ALI NE OGRANIČAVAJUĆI SE NA JAMSTVA TRŽIŠNOSTI, PRIKLADNOSTI ZA ODREĐENU SVRHU I NEPOSTOJANJA POVREDE PRAVA.

NI U KAKVIM OKOLNOSTIMA AUTORI ILI NOSITELJI PRAVA NA AUTORSKA PRAVA NEĆE BITI ODGOVORNI ZA BILO KOJI ZAHTJEV, ŠTETU ILI DRUGU ODGOVORNOST, BILO U UGOVORNOJ TUŽBI, DELIKTU ILI NA DRUGI NAČIN, KOJA PROIZLAZI IZ, IZVAN ILI U VEZI S SOFTVEROM ILI KODOM KOJI ON GENERIRA.

**Koristiš na vlastitu odgovornost.**
