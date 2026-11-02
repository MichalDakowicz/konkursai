# CKE: źródła danych (research z 2 XI 2026)

Notatka robocza. Fakty sprawdzone na stronie cke.gov.pl i w pobranych PDF-ach, o ile nie napisano "do weryfikacji".

## Wniosek

arkusze.pl niepotrzebne. CKE publikuje wszystko, czego potrzebujemy, i do tego **oficjalne mapowanie zadanie → wymagania podstawy programowej**, którego arkusze.pl nie mają. To jest fundament filaru "mapa umiejętności".

## Struktura serwisu

- Lista lat: `https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/arkusze/` → podstrony `2023-2`, `2024-2`, `2025-2`, `2026-2`.
- Archiwum starej formuły: `.../egzamin-maturalny-w-formule-2015/arkusze/` (inna podstawa programowa, nie mieszać).
- Strona sesji, np. `.../arkusze/2025-2/`, zawiera linki do plików. Wzorzec ścieżki:
  `/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/<rok>/<Przedmiot>/<poziom>/<symbol>`
- Pliki per arkusz:
  - `*-arkusz.pdf` – treść zadań
  - `*-karta.pdf` – pusta karta odpowiedzi (to NIE jest klucz)
  - `*.mp3` – nagrania do zadań ze słuchu
  - `*-transkrypcja.pdf` – transkrypcja nagrań
  - `<rok>/zasady_oceniania/<symbol>-zasady.pdf` – **klucz i zasady oceniania** (publikowane po egzaminie, np. 27 VI 2025)
  - informatyka: `Dane-NF-<sesja>.zip` z plikami danych (txt)
- Symbol arkusza koduje przedmiot i poziom, np. `MJAA-D0-100` = język angielski, poziom dwujęzyczny, `MINP-R0-100` = informatyka, rozszerzony.
- Informatory (opis egzaminu, przykładowe zadania z rozwiązaniami i wymaganiami): `.../egzamin-maturalny-w-formule-2023/informatory/`, np. `Informator_EM2024_informatyka.pdf`, `Informator_EM_2024_angielski.pdf`.

## Mapowanie na wymagania: potwierdzone

Zasady oceniania (klucz) dla **każdego zadania** podają "Wymaganie ogólne" i "Wymagania szczegółowe" z kodami podstawy programowej.

- Angielski dwujęzyczny, 2025: np. zadanie 1.2 → `II.5)` "znajduje w wypowiedzi określone informacje", 1.5 → `II.2)` "określa główną myśl fragmentu wypowiedzi", 2.6 → `II.7)` "wyciąga wnioski". Kody I–VII (znajomość środków językowych, rozumienie, tworzenie, reagowanie wypowiedzi, przetwarzanie...).
- Informatyka, 2025: np. zadanie 1.1 → `I.4)`, `I+II.3) b)`, `P.I.3)`. Uwaga na prefiksy: `P.` = zakres podstawowy, `(SP)` = szkoła podstawowa.
- Zadanie 10 (wypracowanie): oceniane w 4 kryteriach: zgodność z poleceniem, spójność i logika, zakres środków językowych, poprawność środków językowych. Maksymalne punkty za każde kryterium do odczytania z zasad oceniania (z karty odpowiedzi wynika zakres 0–5 dla treści, 0–2 dla spójności, 0–4 dla zakresu i poprawności, do weryfikacji).

Konsekwencja: mapę umiejętności można zbudować prawie bez własnej pracy eksperckiej, parsując klucze. Nie trzeba zgadywać wymagań z treści zadań.

## Angielski dwujęzyczny: fakty

- Arkusz 2025: 180 min, 60 pkt, 10 zadań, 20 stron.
- Nagrania do zad. 1–3 odtwarzane dwukrotnie. Karta odpowiedzi ma zad. zamknięte (A–D, A–E, A–F) i oceniane przez egzaminatora zadania otwarte krótkie (0/1) plus zadanie 10.
- **Jest też część ustna**, osobno od arkusza pisemnego (informator rozdz. 2.6.1, kryteria oceniania ustnych). W arkuszu jej nie ma. Do ustalenia, czy ją obsługujemy.
- Poziom dwujęzyczny: informator angielski 2024 ma rozdział 2.6 (zakres środków gramatycznych, przykładowe zestawy, kryteria).

## Informatyka: fakty

- Tylko poziom rozszerzony, przedmiot dodatkowy.
- 210 min, 50 pkt, ok. 60% za algorytmikę i programowanie, ok. 90% to zadania otwarte lub praktyczne.
- Zadania praktyczne wymagają komputera: program, arkusz kalkulacyjny, baza danych. Oceniane są **rzeczywiste wyniki** (kwerendy, obliczenia, działanie programu). Brak pliku z realizacją = brak punktów.
- Pliki danych w zipie, np. `dron.txt`, `laziki.txt`, `pomiary.txt`.
- Punktacja: zamknięte 1 lub 2 pkt, otwarte krótkie 0–3, rozszerzone 0–5, praktyczne 0–4.

## Prawa autorskie: NIE potwierdzone

Użytkownik zakłada, że materiały CKE nie mają praw autorskich. **Tego nie udało się potwierdzić.**

- Strony z arkuszami nie zawierają żadnej noty o licencji ani warunków ponownego wykorzystania (nie ma też zapewnienia, że można je dowolnie kopiować).
- Darmowy dostęp ≠ licencja na redystrybucję. Reportaże prasowe z 2023 opisywały spór o prawa autorskie do grafik i map w arkuszach CKE, więc arkusze mogą zawierać cudze utwory (teksty, zdjęcia, mapy).
- Arkusz zawiera zastrzeżenie "Układ graficzny © CKE 2022".
- Do weryfikacji: regulamin serwisu cke.gov.pl / BIP, stopka, pytanie do CKE (`sekretariat@cke.gov.pl`), regulamin konkursu (czy zakłada wykorzystanie zewnętrznych materiałów).

### Bezpieczny wariant architektury

- Repo i demo nie zawierają kopii PDF-ów ani mp3.
- Aplikacja pobiera pliki z cke.gov.pl na żądanie (linki do oryginałów) albo użytkownik wskazuje je sam.
- Trzymamy własne dane pochodne: kody wymagań, typy zadań, metadane, własne wyjaśnienia. Treść zadań wyświetlamy z oryginału.
- Do ustalenia, jak to pogodzić z wymogiem "aplikacja działa u jury bez nas" (jury musi mieć dostęp do danych).

## Ryzyka techniczne

- Parsowanie PDF-ów kluczy: układ tabel jest nieregularny (kolumny rozbijane na wiersze). Potrzebny parser z kontrolą i ręczna korekta, potem zapis do JSON.
- Podstawa programowa zmieniła się (nazwa nagłówka "Podstawa programowa 2025" w kluczu informatyki). Kody wymagań zależą od roku, trzeba mapować wersje.
- Ścieżki plików nie są w pełni jednolite (np. `-A-`/`-B-` formy arkuszy, `.docx` dla wersji 660). Scraper musi to znosić.
- Zadania z grafiką, tabelami i kodem trzeba przepisać lub wyświetlać jako obraz z PDF.

## Sprawozdania z egzaminu: typowe błędy (dodane 2 XI 2026)

- Strona: `.../egzamin-maturalny-w-formule-2023/wyniki-sprawozdania/` -> podstrony `sprawozdanie-z-egzaminu-maturalnego-w-<rok>-r/` (2023-2026), na nich PDF per przedmiot.
- Wzorzec pliku: `.../Informacje_o_wynikach/2024/sprawozdanie/sprawozdanie_matura_2025_<przedmiot>.pdf` (angielski, francuski, niemiecki i inne języki mają przyrostek `_F23`; dla 2026 ścieżka bez `/2024/sprawozdanie`).
- Zawartość (sprawdzone próbkowo dla 2025): opis najtrudniejszych zadań i najczęstszych błędów zdających, numerowane przykłady rozwiązań uczniów. Angielski: konkretne błędne frazy w tekście. Matematyka, chemia, historia: przykłady rozwiązań w większości jako obrazy (pdftotext zwraca tylko podpisy "Przykład N").
- Do zrobienia: ekstrakcja z użyciem modelu rozumiejącego obraz, kontrola ręczna, sprawdzenie biologii, fizyki, geografii; status praw autorskich do prac uczniów.
