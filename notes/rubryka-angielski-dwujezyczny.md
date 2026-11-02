# Rubryka: angielski dwujęzyczny, wypracowanie (zad. 10, termin główny 2025)

Notatka robocza do implementacji silnika rubryk. Źródło: `MJAA-D0-100-2505-zasady.pdf` (cke.gov.pl, `.../2025/zasady_oceniania/`). Tekst PDF wydobyty `pdftotext -layout`, polskie znaki w moim wyciągu częściowo zgubione, więc wartości tabel przeliczeniowych przepisać wiernie z oryginału przed użyciem w kodzie.

## Formy
rozprawka (R), artykuł (A), list formalny (L). Warianty opisów poziomów różnią się per forma (oznaczenia R/A/L w Tabeli A).

## Kryteria
1. Zgodność z poleceniem
   - Treść: 6 elementów, skala 2-1-0 (Tabela A): 1 wstęp, 2-4 elementy tematu (3 elementy), 5 zakończenie, 6 brak fragmentów nie na temat. Max 12.
   - Forma: 4 elementy, skala 1-0 (Tabela B): cechy formy, kompozycja, segmentacja, długość (270-390 wyrazów). Jedna usterka wystarcza na 0 w podkryterium. Max 4.
   - Tabela C: (suma treści, suma formy) -> punkty, max 5. Wartości przepisać z PDF.
2. Spójność i logika, 0-2: do 2 usterek = 2, 3-5 = 1, 6+ = 0. Dłuższy niekomunikatywny fragment: max 1, więcej takich: 0. Brak oznaczonych usterek = 2.
3. Zakres środków językowych, 0-4: opisy poziomów (B2+), spełnienie częściowe = niższy poziom.
4. Poprawność środków językowych, 0-4: macierz (błędy językowe x błędy zapisu), każdy wymiar od sporadycznych do bardzo licznych, w stosunku do długości tekstu. Interpunkcja mniej ważna niż ortografia.

Max razem z tabel: 5 + 2 + 4 + 4 = 15 (do weryfikacji z punktacją zadania w arkuszu).

## Reguły kaskadowe
- < 240 wyrazów: ocena tylko w zgodności z poleceniem, reszta 0, błędów się nie oznacza.
- 0 pkt za zgodność: wszystkie pozostałe 0 (błędy oznacza się).
- 1 pkt za zgodność: pozostałe max 1 każde.
- Praca nieczytelna / całkowicie nie na temat / niekomunikatywna / odtworzona z podręcznika: 0 w każdym kryterium.
- Brak rozwinięcia: 0 w każdym kryterium.
- Wulgarne/obraźliwe: indywidualna decyzja (np. brak punktów za zakres i poprawność).

## Liczenie wyrazów
Wyrazy oddzielone spacją. Formy skrócone (don't) = 1. Wyrazy z dywizem = 1. Symbole literowe, adres e-mail/www, telefon = 1. Podpis i emotikony nie liczą się. Wyrazy w innym języku liczą się. Daty: `10.01.2024` = 1, `10 January 2024` = 3.

## Uwagi
- Arkusz podaje uczniowi 300-350 wyrazów, rubryka ma próg 240 i długość 270-390.
- Dostosowania (dysleksja itd.) zmieniają ocenę błędów zapisu. Do rozstrzygnięcia, czy obsługujemy.
- Oznaczanie błędów: język (podkreślenie prostą), zapis i spójność mają osobne oznaczenia.
