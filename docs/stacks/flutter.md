---
title: "Flutter Stack"
description: "Tessera generates Flutter apps for iOS, Android, and Web with Riverpod, Material 3, navigation, and tests. AI builds the entire mobile app from a conversation."
---

# Flutter Stack (Mobile + Web App)

Tessera's AI project generator builds cross-platform mobile apps from a single codebase — iOS, Android, and Web.

## What Gets Generated

- Flutter project with Riverpod state management
- go_router navigation
- Material 3 theme matching your design preferences
- Feature-based folder structure
- Widget and unit tests
- Platform-specific build configuration
- SETUP.md with deployment instructions for each platform

## When AI Picks This Stack

Tessera recommends Flutter when you describe:
- A mobile app (iOS, Android, or both)
- Delivery, fitness, or social apps
- POS systems or field service tools
- Cross-platform requirement with shared codebase

## Example Output

```
my-app/
├── lib/
│   ├── core/
│   │   ├── theme.dart          # Material 3 theme
│   │   ├── constants.dart      # App constants
│   │   └── extensions/         # Dart extensions
│   ├── features/
│   │   ├── auth/               # Login, register, profile
│   │   │   ├── screens/
│   │   │   ├── providers/
│   │   │   └── models/
│   │   ├── home/               # Home screen
│   │   └── products/           # Product listing (if e-commerce)
│   ├── shared/
│   │   ├── widgets/            # Reusable components
│   │   └── services/           # HTTP, storage
│   ├── router.dart             # go_router config
│   └── app.dart                # MaterialApp.router
├── test/                       # Widget + unit tests
├── pubspec.yaml                # All dependencies
├── .env.example                # API config
└── SETUP.md                    # Build & deploy guide
```

## After Generation

```bash
cd my-app
flutter pub get
flutter run              # Run on connected device/emulator
flutter test             # Run tests
flutter build apk        # Build Android
flutter build ios        # Build iOS
flutter build web        # Build web
```

## Related Stacks

Need a different approach? Tessera also supports [Laravel](/docs/stacks/laravel) for content-managed websites, [Node.js](/docs/stacks/nodejs) for JavaScript full-stack, [Go](/docs/stacks/go) for high-performance backends, and [Static](/docs/stacks/static) for landing pages.
