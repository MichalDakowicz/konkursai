# apps/web

Aplikacja web Sedno: React + TypeScript + Vite.

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
| `/` | Pulpit ogólny: rekomendacja z najsłabszego przedmiotu, powtórki ze wszystkich, lista przedmiotów |
| `/przedmiot/:id` | Pulpit zawężony do przedmiotu (`polski`, `matematyka`, `angielski`) z mapą umiejętności |
| `/tutor` | Pełny widok rozmowy z Pestką |
| `/profil` | Przedmioty, ponowne uruchomienie przewodnika, wylogowanie |
| `/nauka`, `/arkusze`, `/umiejetnosci`, `/powtorki` | Zaślepki |

## Pestka (tutor AI)

Pestka nie ma stałego miejsca na stronie (`TutorGuide.tsx`, stan w `TutorContext.tsx`):

- **Wskazówki:** strona wywołuje `showHints(klucz, wskazówki)`. Pestka skacze do elementu z `data-tutor="…"`, siada na jego rogu, podświetla go i pokazuje dymek. Zwykła wskazówka nie przewija strony: czeka, aż element wjedzie w ekran.
- **Przewodnik:** przy pierwszym wejściu na pulpit (`tourHints`). Ostatni krok czeka na przywołanie. Ponownie z `/profil`.
- **Przywołanie:** prawy przycisk (na telefonie przytrzymanie) w dowolnym miejscu poza polami tekstowymi. Jeśli element pod kursorem ma `data-tutor-about="…"`, Pestka wyjaśnia go w dymku.
- **Odprawienie:** krzyżyk w dymku albo Escape. Kliknięcie w avatar otwiera rozmowę w panelu bocznym (`TutorDock.tsx`).

Logowanie i odpowiedzi Pestki są na niby (`src/auth.ts`, `TutorContext.tsx`), dane w `src/data/demo.ts`.

## Styl

Tokeny w `packages/ui` (`tokens.css` dla web, `tokens.ts` dla mobile). Ikony: `lucide-react`. Zasady:

- Hierarchia przez typografię (rozmiar, kolor), nagłówki w wadze 400 z ciasnym trackingiem.
- Sekcje rozdzielają linie. Karta tylko tam, gdzie treść musi się wyróżnić (rekomendacja „Dziś warto”, okno rozmowy).
- Jeden akcent: pomarańczowy `#ff7448`, drugi kolor jasnoniebieski `#d3e1ff` dla akcji pobocznych. Każdy przedmiot ma swój kolor ikony (`--tone-*`).
- Pasek nawigacji ma tło z zanikaniem, żeby przewijana treść nie prześwitywała nad nim.
