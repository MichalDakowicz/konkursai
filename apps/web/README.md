# apps/web

Aplikacja web: React + TypeScript + Vite.

```bash
npm install        # w katalogu głównym repo
npm run dev        # http://localhost:5173
npm run typecheck
npm run build
```

## Widoki

| Ścieżka | Widok |
| --- | --- |
| `/logowanie` | Logowanie: Google, e-mail, wejście na konto demo |
| `/` | Pulpit: „Dziś warto”, powtórki, kontynuacja, mapa umiejętności, skróty |
| `/tutor` | Pełny widok rozmowy z tutorem |
| `/nauka`, `/arkusze`, `/umiejetnosci`, `/powtorki`, `/profil` | Zaślepki |

Tutor jest dostępny z każdego ekranu przez avatar w pasku nawigacji (wysuwany panel). Rozmowa jest wspólna dla panelu i `/tutor` (`TutorContext`).

Logowanie i odpowiedzi tutora są na niby (`src/auth.ts`, `src/components/TutorContext.tsx`), dane w `src/data/demo.ts`.

## Styl

Tokeny w `packages/ui` (`tokens.css` dla web, `tokens.ts` dla mobile). Zasady:

- Hierarchia przez typografię (rozmiar, kolor), nagłówki w wadze 400 z ciasnym trackingiem.
- Sekcje rozdzielają linie. Karta tylko tam, gdzie treść musi się wyróżnić (rekomendacja „Dziś warto”, okno rozmowy).
- Jeden akcent: pomarańczowy `#ff7448`, drugi kolor jasnoniebieski `#d3e1ff` dla akcji pobocznych.
- Nic nie pływa nad treścią: pasek ma tło z zanikaniem, tutor otwiera się z paska.
