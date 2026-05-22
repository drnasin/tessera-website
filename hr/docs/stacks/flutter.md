---
title: "Flutter Stack"
description: "Tessera generira Flutter aplikacije za iOS, Android i Web s Riverpod, Material 3, navigacijom i testovima. AI gradi cijelu mobilnu aplikaciju iz razgovora."
---

# Flutter Stack (Mobilna + Web aplikacija)

Tesserin AI generator projekata gradi cross-platform mobilne aplikacije iz jedne codebase — iOS, Android i Web.

## Što se generira

- Flutter projekt s Riverpod upravljanjem stanjem
- go_router navigacija
- Material 3 tema koja odgovara tvojim dizajnerskim preferencijama
- Struktura mapa temeljena na značajkama
- Widget i unit testovi
- Konfiguracija builda za svaku platformu
- SETUP.md s uputama za deploy na svaku platformu

## Kad AI bira ovaj stack

Tessera preporučuje Flutter kad opišeš:
- Mobilnu aplikaciju (iOS, Android, ili oboje)
- Aplikacije za dostavu, fitness ili društvene mreže
- POS sustave ili alate za terenski rad
- Cross-platform zahtjev s dijeljenom codebasom

## Primjer outputa

```
my-app/
├── lib/
│   ├── core/
│   │   ├── theme.dart          # Material 3 tema
│   │   ├── constants.dart      # App konstante
│   │   └── extensions/         # Dart ekstenzije
│   ├── features/
│   │   ├── auth/               # Login, registracija, profil
│   │   │   ├── screens/
│   │   │   ├── providers/
│   │   │   └── models/
│   │   ├── home/               # Početni ekran
│   │   └── products/           # Popis proizvoda (ako je e-commerce)
│   ├── shared/
│   │   ├── widgets/            # Komponente za višekratnu upotrebu
│   │   └── services/           # HTTP, storage
│   ├── router.dart             # go_router konfiguracija
│   └── app.dart                # MaterialApp.router
├── test/                       # Widget + unit testovi
├── pubspec.yaml                # Sve zavisnosti
├── .env.example                # API konfiguracija
└── SETUP.md                    # Vodič za build i deploy
```

## Nakon generiranja

```bash
cd my-app
flutter pub get
flutter run              # Pokretanje na spojenom uređaju/emulatoru
flutter test             # Pokretanje testova
flutter build apk        # Build za Android
flutter build ios        # Build za iOS
flutter build web        # Build za web
```

## Kako je build opisan

Flutter AI pipeline živi na `stacks/flutter.yaml` (4 koraka). Naredba `flutter create` ostaje u `FlutterStack.php` jer se mora pokrenuti prije manifest enginea; iOS code-signing i Android keystore rad također ostaju u PHP-u jer su previše platform-specifični za YAML. Vidi [YAML stack manifeste](/hr/docs/architecture/yaml-manifests).

```bash
tessera plan compile stacks/flutter.yaml
tessera plan show
```

## Povezani stackovi

Treba li ti drugačiji pristup? Tessera podržava i [Laravel](/hr/docs/stacks/laravel) za sadržajem upravljane web stranice, [Node.js](/hr/docs/stacks/nodejs) za JavaScript full-stack, [Go](/hr/docs/stacks/go) za visoko-performantne backende i [Static](/hr/docs/stacks/static) za landing stranice.
