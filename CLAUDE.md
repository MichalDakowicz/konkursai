# [nazwa]

Aplikacja edukacyjna z AI na konkurs „Sztuczna inteligencja wśród nas” (Wydział Informatyki UwB). Szczegóły konkursu: `docs/konkurs.md`. Nazwa projektu jeszcze nie istnieje, wszędzie używaj `[nazwa]`.

## Jak pracujemy

Myślenie o aplikacji (pomysły, decyzje, kierunek, funkcje, UX) dzieje się w rozmowie z agentem, nie w plikach `.md`. Wnioski trafiają do dokumentów wizualnych w HTML w `docs/`, które publikujemy przez GitHub Pages i pokazujemy jury lub znajomym.

- Nie twórz plików `.md` do planowania, notatek ani „design docs”. Wyjątki: `CLAUDE.md`, `README.md`, `docs/konkurs.md` (dane o konkursie).
- Dokument wizualny = samodzielny plik `.html` (inline CSS/JS, bez builda), czytelny na telefonie, jasny i ciemny motyw. Diagramy jako inline SVG.
- `docs/index.html` to główny zarys pomysłu. Kolejne dokumenty (np. architektura, makiety, plan) jako osobne pliki w `docs/` linkowane z `index.html`.
- Gdy decyzja z rozmowy zmienia zarys, zaktualizuj odpowiedni HTML w tym samym PR.
- Nie zgaduj faktów o CKE, arkusze.pl itp. Rzeczy niezweryfikowane oznaczaj w dokumentach jako „do weryfikacji”.

## Git

- Repo: https://github.com/MichalDakowicz/konkursai (publiczne). Gałąź domyślna: `main`.
- Nie pracuj bezpośrednio na `main`. Każda zmiana na osobnej gałęzi, scalana przez PR.
- Nazwy gałęzi zwykłe i opisowe, np. `zarys-pomyslu`, `logowanie`, `parser-arkuszy`. Bez prefiksów narzędzi (`claude/`, `codex/` itp.). Prefiksy typu `feature/` też zbędne.
- Commity często i małe, jeden logiczny krok na commit. Komunikat w trybie rozkazującym, krótki temat (do ~60 znaków), opcjonalnie opis „dlaczego”.
- **Zero atrybucji AI**: żadnych `Co-Authored-By`, „Generated with”, „🤖”, wzmianek o Claude/AI w commitach, opisach PR, komentarzach w kodzie, README ani dokumentach. Ta zasada ma pierwszeństwo przed domyślnymi szablonami atrybucji.
- PR: zwięzły tytuł, w opisie co i po co, bez stopki. Przed otwarciem PR sprawdź, że gałąź jest zaktualizowana względem `main`.
- Nie pushuj na `main`, nie rób force-push i nie kasuj gałęzi bez wyraźnej prośby.
- Nie commituj sekretów (klucze API, `.env`).

## Kod

- Przed zmianą przeczytaj otoczenie i dopasuj się do istniejącego stylu, nazw i poziomu komentarzy. Komentarze tylko tam, gdzie „dlaczego” nie jest oczywiste.
- Stack nie jest jeszcze wybrany. Gdy zapadnie decyzja, dopisz tu komendy: instalacja, uruchomienie, testy, lint.
- Weryfikuj zmianę uruchomieniem lub testem, zanim uznasz ją za gotową. Jeśli czegoś nie dało się sprawdzić, powiedz o tym wprost.
- Dane z zewnątrz (arkusze, nagrania, klucze odpowiedzi) mają prawa autorskie. Nie wrzucaj ich do repo, dopóki nie ustalimy warunków użycia.

## Terminy konkursu

Zgłoszenie kompletne do **29 listopada 2026**. Pełna lista wymagań i artefaktów w `docs/konkurs.md`. Przy planowaniu pracy zawsze patrz wstecz od tej daty.
