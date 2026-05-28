---
title: "Tessera Licenca — PolyForm Noncommercial i komercijalne razine"
description: "Tessera je source-available — besplatna za nekomercijalno korištenje prema PolyForm Noncommercial 1.0.0, a plaćena za komercijalnu upotrebu. Solo, Studio i Enterprise razine."
---

# Licenca

Tessera je **source-available**, a ne open source. Cijeli izvorni kod dostupan je na [GitHubu](https://github.com/drnasin/tessera-installer) — svatko ga može čitati, forkati, doprinositi. No pravo *korištenja* Tessere ovisi o tome za što je koristiš.

::: tip Ukratko
- **Osobno, učenje, OSS, neprofitno, javne institucije → besplatno.** PolyForm Noncommercial 1.0.0.
- **Klijentski rad, SaaS, interni alati profitnih tvrtki → plaćeno.** Solo / Studio / Enterprise razina — vidi [Cijene](/hr/docs/pricing).
- **Generirani kod je tvoj** u oba slučaja.
:::

## Zašto "source-available", a ne "open source"

Open Source Initiative rezervira pojam *open source* za licence koje dopuštaju komercijalnu upotrebu bez ograničenja. PolyForm Noncommercial to ne dopušta — eksplicitno isključuje komercijalnu upotrebu. Zvati ga "open sourceom" bilo bi i stvarno netočno i nepošteno prema ljudima koji zapravo održavaju OSS licence.

Zato koristimo precizan naziv: **source-available**. Možeš ga čitati, forkati, graditi na njemu osobno; za komercijalnu upotrebu plaćaš. Smatramo da je to poštena razmjena i kažemo to izravno.

## Dva puta

| | Nekomercijalna — besplatno | Komercijalna — plaćeno |
|---|---|---|
| **Osobni projekti, hobi stranice** | ✓ | ✓ |
| **Učenje, istraživanje, sveučilište** | ✓ | ✓ |
| **Doprinos open source projektima** | ✓ | ✓ |
| **Neprofitne organizacije, škole, državne institucije** | ✓ | ✓ |
| **Klijentski rad za naknadu (agencija / freelance)** | ✗ | ✓ |
| **SaaS ili prihodni proizvod** | ✗ | ✓ |
| **Interni alati profitne tvrtke** | ✗ | ✓ |
| Pristup izvornom kodu | ✓ | ✓ |
| Doprinos upstream | ✓ | ✓ |
| Generirani kod je tvoj | ✓ | ✓ |
| Ažuriranja | posljednja objavljena verzija | zajamčena za trajanje |
| Podrška | GitHub issues, zajednica | razinom definirana |
| Pisano odobrenje za revizije | ✗ | ✓ |
| Cijena | €0 | od €249 / god. |

Puni uvjeti: [PolyForm Noncommercial 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0) · [Ugovor o komercijalnoj licenci](/hr/docs/commercial-license).

## Česta pitanja

::: details Mogu li koristiti Tesserou za izradu osobnog bloga?
Da — osobna upotreba uvijek je besplatna. Nikome ništa ne duguješ.
:::

::: details Mogu li je koristiti za učenje Laravela/Filamenta?
Da — obrazovna upotreba je besplatna, uključujući bootcampove i sveučilišne kolegije.
:::

::: details Mogu li izraditi klijentov e-commerce s njom?
To je komercijalna upotreba — trebaš [plaćenu licencu](/hr/docs/pricing). Čak i jedan plaćeni klijent aktivira komercijalnu razinu.
:::

::: details Mogu li je koristiti kod svog poslodavca za interne alate?
Ako je tvoj poslodavac profitna tvrtka i alat je dio načina na koji zarađuje — da, to je komercijalno. Studio razina je uobičajeni izbor.
:::

::: details Mogu li doprinositi Tesseri bez licence?
Da — open-source doprinosi ne zahtijevaju licencu. Pull requestovi, issues, poboljšanja dokumentacije — sve besplatno i dobrodošlo.
:::

::: details Što je s generiranim kodom?
**On je tvoj**, u oba slučaja. Licenca pokriva Tessera installer — ne projekte koje stvara. Možeš prodavati, forkati, objaviti kao open source ili čuvati privatno sve što Tessera generira. Vidi [Komercijalna licenca § 5](/hr/docs/commercial-license#_5-generated-output).
:::

::: details Mogu li redistribuirati ili repaketirati Tesserou?
Ne — nijedan put ne dopušta redistribuciju Tessere kao dijela drugog proizvoda ili kao hostirane usluge. To je OEM/redistribucijski scenarij; javi nam se putem [Enterprise kontakta](/hr/docs/pricing#komercijalni-planovi).
:::

::: details Kupio sam Solo licencu, a sad imam tim od 5 ljudi. Što radim?
Nadograđuješ na Studio. Razlika se proporcionalno obračunava za preostale mjesece. Nema kazne za rast izvan razine — samo za ignoriranje tog rasta.
:::

::: details "Javlja li se" Tessera kući radi provjere licence?
Ne. Nema licencnog servera, nema telemetrije po defaultu, nema povratnog poziva. Licenca se temelji na povjerenju. Možemo te, pisanim putem, zamoliti da potvrdiš broj programera pri prijateljskoj reviziji (Komercijalna licenca § 8) — ali sam CLI to ne provjerava.
:::

## Kupovina komercijalne licence

[Vidi stranicu Cijene →](/hr/docs/pricing)

Za pitanja o licenciranju: <span id="contact-email" style="cursor:pointer; color: var(--vp-c-brand-1); text-decoration: underline;">Klikni za prikaz emaila</span>

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  const el = document.getElementById('contact-email')
  if (el) {
    el.addEventListener('click', () => {
      const u = 'licensing'; const d = 'tessera-ai.net'
      el.innerHTML = '<a href="mai' + 'lto:' + u + '@' + d + '">' + u + '@' + d + '</a>'
    })
  }
})
</script>

## Potpuni pravni tekst

- [PolyForm Noncommercial License 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0) — primjenjuje se na nekomercijalnu upotrebu.
- [Tessera Ugovor o komercijalnoj licenci](/hr/docs/commercial-license) — primjenjuje se kad kupuješ razinu.
