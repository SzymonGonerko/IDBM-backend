

# LongShortStory
- [WPROWADZENIE](#wprowadzenie)
- [USŁUGI](#usługi)
- [STRUKTURA](#struktura)
- [PRACA NAD PROJEKTEM](#praca-nad-projektem)

---

# WPROWADZENIE
**[idbm.netlify.app](https://idbm.netlify.app)**

Inspiracją do stworzenia serwisu IDBM była strona [Gucci Beauty Wishes](https://guccibeautywishes.gucci.com/), która w oryginalny sposób wprowadza użytkownika w doświadczenie przestrzennej nawigacji. Jednym z kluczowych eventów pozwalających przeprowadzić klienta przez ścieżkę użytkownika okazał się scroll. W projekcie IDBM wykorzystałem tę inspirację do przeglądania filmów. Odkryłem jak wdzięczny, prosty i intuicyjny jest to event.  

W 2023 roku projekt Gucci został wyróżniony przez portal awwwards.com, uzyskując średnią ocenę 7.63/10 i trafiając przy tym do grona najlepszych stron.

IDBM (Interactive Database Movies) to pełnoprawny projekt full-stack, który odtwarza kluczowe funkcjonalności popularnych portali filmowych. Jego celem jest nie tylko prezentacja rozbudowanej bazy filmowej, lecz także zapoznanie użytkownika z immersyjnym środowiskiem 3D oraz nielinearnym układem strony internetowej.  

Jednym z głównych założeń technicznych było stworzenie własnej bazy filmów, bez korzystania z gotowych API. Dzięki temu mogłem rozwinąć kompetencje w zakresie relacyjnych baz danych oraz swobodnie poruszać się w środowisku Microsoft Azure.  

---

# USŁUGI
Usługi IDBM mieszczą się w granicach podstawowych usług portali filmowych. Serwis udostępnia przede wszystkim:  
- bazę ponad 20 000 filmów w wersji polskiej oraz 50 000 w wersji angielskiej  
- możliwość wyszukiwania i filtrowania filmów według tytułu, reżysera i gatunku  
- dostęp do opisów filmów, dat produkcji, gatunków oraz materiałów multimedialnych w tym trailerów  

---

# STRUKTURA
Projekt początkowo rozwijany był w modelu monorepo, jednak ze względu na rosnące koszty usług Azure, ograniczenia związane z polityką YouTube oraz inne trudności techniczne zdecydowałem się na jego podział na dwa niezależne repozytoria IDBM-frontend oraz IDBM-backend. 

Takie podejście umożliwiło optymalizację kosztów, uproszczenie wdrożenia oraz zwiększenie przejrzystości kodu.  

- Główną logikę biznesowa zaimplementowałem w środowisku .NET 8.0 z wykorzystaniem Entity Framework i wdrożona w Azure PaaS wraz z bazą danych MsSQL 📈  
- Jednocześnie zasoby multimedialne (np. trailery) przechowywane są w usłudze home.pl, co pozwoliło znacząco zredukować koszty i uniknąć korzystania z dodatkowych bibliotek, takich jak YoutubeExplode z NuGet 📉  

---

# PRACA NAD PROJEKTEM
Repozytorium projektu zostało zainicjalizowane w 2023 roku. Proces jego tworzenia nie był jednak prosty – wielokrotnie wymagał zmian i refaktoryzacji. Do największych wyzwań należało:
- **Stworzenie prototypu bazy danych**. przy użyciu skryptu w Pythonie wygenerowałem finalny plik *.csv zawierający dane z różnych portali filmowych. Skrpyt walidował każdy rekord pod względem kompletności danych i popularności filmu w określonym obrębie kulturowym.
- **Zasilenie bazy danych w środowiku chmurowym Azure**. Oprócz stworzenia bazy danych należało ją opublikować w serwisie chmurowym dojąc dostęp potencjalnym użytkownikom do jej modyfikacji
- **Określenie wyglądu komponentów UI**. Projekt wykracza poza konwencjonalne komponenty strony internetowej. Właściwości charakterystyczne dla stylkowania w CSS należało odwzorować w trójwymiarowej przestrzeni – całość projektu została stworzona według mojej koncepcji,  
- Konieczność pogodzenia pracy nad projektem ze studiami,  
- Zmiany w polityce YouTube, które wymusiły przebudowę kluczowych funkcjonalności,  
- W trakcie pisania projektu dokumentacja techniczna uległa zmianie. Konieczne było przeprowadzenie migracji projektu z .NET 5.0 do .NET 8.0 i jego refaktoryzacji

Ostateczna wersja projektu została opublikowana pod adresem:  
**[idbm.netlify.app](https://idbm.netlify.app)**  

---
