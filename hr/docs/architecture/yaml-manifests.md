---
title: YAML stack manifesti — Kako stackovi opisuju sebe
description: Razumij kako su Tessera stackovi (Laravel, Node, Static itd.) opisani u YAML-u i nauči kako napisati vlastiti.
---

# YAML stack manifesti — Kako stackovi opisuju sebe

Do Sprinta 1, svaki Tessera stack bio je velika PHP klasa s promptovima upekanim kao heredoc stringovi. Danas, svaki stack je YAML datoteka u `stacks/` uz tanku lifecycle klasu.

Ovaj vodič je za tebe ako želiš:

- Razumjeti što će `tessera new --stack=static` zapravo napraviti
- Izmijeniti postojeći prompt
- Napisati novi stack (Python/Django, Rust/Axum, bilo što)

## Što je stack manifest?

YAML datoteka koja opisuje **korake** koje će AI pokrenuti, redom, za scaffolding projekta. Svaki korak ima ime, predložak prompta, hint složenosti, opcionalne gate-ove (post-provjere), opcionalne zavisnosti i nekoliko opcija.

Datoteka se nalazi na `stacks/<name>.yaml`. Kompajler je pretvara u hash-zaštićen `plan.json`; izvršitelj šalje svaki korak kroz [adapter sustav](/hr/docs/architecture/adapter-system).

## Anatomija manifesta

Evo `stacks/static.yaml`, s komentarima. Isti oblik vrijedi za `laravel.yaml`, `node.yaml`, `go.yaml` i `flutter.yaml`.

```yaml
name: static                         # stabilni identifikator — mala slova, bez razmaka
label: "Static Site (HTML + Tailwind)"
description: "Simple landing pages, portfolios..."
manifest_version: "1"                # verzija sheme. v1 manifesti ostaju valjani u v2 čitačima.

requires:                            # runtime zavisnosti provjerene pri preflight
  - node
  - npm

steps:
  - id: scaffold                     # stabilno — koristi se kao cilj zavisnosti i ključ event_log-a
    name: "[1/3] Creating website"   # čitljivo čovjeku, NIJE dio plan_hash-a
    complexity: complex              # simple | medium | complex — pokreće odabir modela
    timeout: 1200                    # sekunde prije nego adapter ubije subprocess
    prompt: |
      You are a SENIOR frontend developer ...
      PROJECT: {{description}}
      DESIGN COLORS: {{designColors}}
      ...
    prompt_version: "1"              # povećaj kad urediš tijelo prompta
    gates:                           # post-provjere: je li AI zaista napravio posao?
      - type: exists_any
        severity: hard
        patterns:
          - index.html
          - package.json

  - id: polish
    name: "[2/3] Validating and polishing"
    complexity: medium
    timeout: 120
    skippable: true                  # ako ovo padne, plan nastavlja (ne zaustavljaj se)
    dependencies:
      - scaffold                     # polish se pokreće tek nakon što scaffold završi
    prompt: |
      Review the generated static site thoroughly ...
    prompt_version: "1"
```

To je cijela površina. Svako polje ima svrhu; prođimo kroz njih.

## Predlošci i `{{var}}` supstitucija

Tijela prompta su **predlošci**, ne literalni stringovi. Sve u `\{\{dvostrukim_zagradama\}\}` supstituira se pri renderiranju iz [`RenderContext`-a](/hr/docs/architecture/build-trace#rendercontext).

Dostupne varijable uključuju `description`, `designStyle`, `designColors`, `langs`, `nodeVersion`, `systemContext`, `memoryContext`, `country`, `shop`, `payments` i više. Kompajler hašira predložak **s placeholderima netaknutima**, pa isti `plan_hash` može renderirati uz različite kontekste i producirati različite promptove — s namjerom.

### Pouzdane vs. nepouzdane varijable

Postoje dvije klase varijabli:

- **Pouzdane** (`systemContext`, `memoryContext`, `nodeVersion`, `goVersion`, `flutterVersion`, `stackVersions`, `langs`) — Tessera ih postavlja s hosta. Inline su sirove.
- **Nepouzdane** (sve ostalo, posebno `description` i `userRequirements`) — dolaze od korisnika. Tessera ih omotava graničnicima:

```
<<<USER_DATA name="description">>>
A bakery website with online ordering
<<<END_USER_DATA>>>
```

Ovo je **zaštita od prompt injekcije**, ne potpuna obrana. Zlonamjerni opis projekta ne može trivijalno pobjeći iz omotača da bi izdao nove instrukcije. AI alati koji poštuju konvenciju graničnika tretiraju sadržaj kao podatke, ne naredbe.

Ako predložak referencira varijablu koja ne postoji u kontekstu, renderiranje javlja grešku. Bolje glasno pasti nego isporučiti halucinirani build.

## Gate-ovi — hvatanje "gotovo!" kad ništa ne postoji

AI će rado reći "Kreirao sam tvoju stranicu!" kad nije stvorio ništa. Gate-ovi su post-izvršne provjere koje to hvataju.

```yaml
gates:
  - type: exists_any
    severity: hard
    patterns:
      - index.html
      - package.json
```

Ovo kaže: nakon što korak završi, **barem jedan** od ovih puteva mora postojati; inače je korak pao.

### Vrste gate-ova

| Vrsta | Značenje |
|---|---|
| `exists_any` | Jedan od uzoraka odgovara barem jednoj datoteci. |
| `exists_all` | Svaki uzorak odgovara barem jednoj datoteci. |
| `non_empty_any` | Jedan od uzoraka odgovara barem jednoj datoteci sa sadržajem (≥ 1 bajt). |
| `non_empty_all` | Svaki uzorak odgovara barem jednoj datoteci sa sadržajem. |

Uzorci mogu biti konkretni putevi ili `*`/`?` glob-ovi. `**` namjerno nije podržan u v1 (nema iznenađujuće rekurzije).

### Ozbiljnost

| Ozbiljnost | Što se događa pri padu |
|---|---|
| `hard` | Korak se označava kao pao; plan staje (osim ako je `skippable: true`). |
| `soft` | Korak se označava kao završen; pad se bilježi u events.jsonl kao upozorenje. |

Content gate-ovi su bitni iz još jednog razloga: kad AI subproces istekne (timeout) ili završi s ne-nultim exitom, a svi hard gate-ovi prođu, engine i dalje može promovirati korak u uspjeh (gate-pass override, rođen u [wine-shop buildu](/hr/docs/case/wine-shop)). Samo content-validating gate-ovi (`non_empty_*`) kvalificiraju se za taj override — gate-ovi koji provjeravaju samo postojanje (`exists_*`) ne mogu maskirati timeout ili pali exit, pa stale ostatak ili 0-bajtni djelomični zapis nikad ne vrijedi kao dokaz posla. Run koji završi kroz override javlja `ready_with_warnings` umjesto `ready`.

Budući sprintovi dodaju `contains`, `min_size` i `command_passes` (npr. "korak prolazi samo ako `php -l` uspije na svakoj promijenjenoj datoteci").

## Preskočivi koraci — graceful degradation

Stvarnost: AI pozivi za obogaćivanje (prolaz poliranja, generator SETUP.md-a) ponekad dosežu rate limite ili privremeno padaju. Ne želiš da to prekine 25-minutni build koji je već producirao radnu stranicu.

```yaml
- id: polish
  skippable: true
  ...
```

Kad je `skippable: true`, pad bilježi `step.skip` u events.jsonl i plan nastavlja. Temeljni korak scaffoldinga **nije** preskočiv; sve nizvodno od njega može biti.

Kao opće pravilo: sve što *poboljšava* output je preskočivo. Sve što *producira* output nije.

## Zavisnosti — redoslijed izvršavanja

```yaml
- id: polish
  dependencies:
    - scaffold
```

Koraci se izvršavaju topološkim redom: korak se pokreće tek nakon što svaki korak na njegovom popisu `dependencies` završi (ili bude preskočen). Kompajler odbacuje cikluse pri kompajliranju.

Ako ne nabroji zavisnosti, koraci se izvršavaju redom u YAML-u. Navedi ih svejedno kad postoji stvarno ograničenje redoslijeda — dokumentira namjeru i štiti od slučajnog preuređivanja.

## `prompt_version` — kad povećati

Napisao si `prompt_version: "1"` i isporučio. Sad želiš:

- **Ispraviti tipfelera u tijelu prompta** → povećaj na `"2"`. Fingerprint prompta se mijenja; `tessera plan diff` to označi. Recenzenti znaju pogledati.
- **Preformulirati radi jasnoće (bez promjene ponašanja)** → povećaj na `"2"`. Isti razlog. Vidljivost > taština.
- **Prisiliti ponovni render bez uređivanja tijela** (rijetko; npr. nadogradio si AI model i želiš svježi output) → povećaj na `"2"`. Tijelo je identično ali hash se mijenja, pa se preskakuju cached odgovori.
- **Preimenovati `name` polje koraka čitljivo čovjeku** → ne povećavaj. `name` nije dio hasha.

## Kako dodati vlastiti stack

Pisanje novog stacka — recimo, "Python/Django" — zahtijeva dvije datoteke:

### 1. `stacks/django.yaml`

```yaml
name: django
label: "Django (Python)"
description: "Server-rendered Python web app with Django + Postgres."
manifest_version: "1"

requires:
  - python
  - pip

steps:
  - id: scaffold
    name: "[1/2] Creating Django project"
    complexity: complex
    timeout: 1200
    prompt: |
      You are a senior Django developer ...
      PROJECT: {{description}}
      LANGUAGES: {{langs}}
      ...
    prompt_version: "1"
    gates:
      - type: exists_any
        severity: hard
        patterns:
          - manage.py

  - id: setup_md
    name: "[2/2] SETUP.md"
    complexity: simple
    timeout: 120
    skippable: true
    dependencies: [scaffold]
    prompt: |
      Read the project at {{description}} and write SETUP.md ...
    prompt_version: "1"
```

### 2. `src/Stacks/DjangoStack.php`

Tanka lifecycle klasa, modelirana na `StaticStack`:

```php
final class DjangoStack implements StackInterface
{
    public function name(): string { return 'django'; }
    public function label(): string { return 'Django'; }
    public function description(): string { return '...'; }

    public function preflight(): array { /* provjeri je li python instaliran */ }

    public function scaffold(string $directory, array $requirements, ToolRouter $router, SystemInfo $system, Memory $memory): bool
    {
        return (new YamlStackRunner)->run(
            directory: $directory,
            stackName: 'django',
            requirements: $requirements,
            router: $router,
            system: $system,
            memory: $memory,
        );
    }

    public function postSetup(string $directory): bool { /* pip install -r */ }
    public function completionInfo(string $directory): array { /* "run: python manage.py runserver" */ }
}
```

Registriraj ga s `StackRegistry`. To je sve — YAML upravlja svim što je vezano za AI; PHP klasa obrađuje samo preflight, post-instalaciju i poruke o završetku (stvari previše specifične za YAML u v1).

## Vidi također

- [`tessera plan`](/hr/docs/cli/plan) — pregledaj što tvoj YAML kompajlira
- [Trag builda i eventi](/hr/docs/architecture/build-trace) — što se bilježi kad se koraci izvršavaju
- [Adapter sustav](/hr/docs/architecture/adapter-system) — kako promptovi stižu do AI alata
