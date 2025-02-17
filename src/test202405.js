export const questions = [
  {
    id: 1,
    year:"2024_05",
    type: "order",
    question:
      "Az egyik távoli GitHub repository-ba fel akar tölteni egy állományt a számítógépéről. A feltöltési jogosultságot megadták, de a helyi gépre még nincs klónozva a repository. Rendezze időrendi sorrendbe a feltöltéshez szükséges lépéseket!",
    options: [
      "A változtatások érvényesítése (commit).",
      "Az állomány hozzáadása (add).",
      "A repository klónozása a gépre (clone).",
      "A feltöltés a távoli repository-ba (push).",
    ],
    answer:[2,1,0,3],
  },
  {
    id: 2,
    year:"2024_05",
    type: "multiple_choice",
    question:
      "Válassza ki a helyes állításokat, amelyek a GitHub repository-ra vonatkoznak!",
    options: [
      "A repository-ba a már lefordított programot érdemes feltenni.",
      "A repository-ba a program forráskódját érdemes feltenni.",
      "A nyilvános repository-ban bárki olvashatja a feltöltött állományokat és mappákat, de feltölteni csak az tud, akinek engedélye van hozzá.",
      "A változtatások érvényesítése (commit) során nem írható megjegyzés.",
    ],
    answer:[1,2]
  },
  {
    id: 3,
    year:"2024_05",
    type: "matching",
    question:
      "Párosítsa a megadott kijelölőkhöz (szelektorokhoz) a megfelelő példázatot!",
    options: [
      "elem kijelölő",
      "csoportos kijelölő",
      "azonosító kijelölő",
      "osztály kijelölő",
    ],
    matches: ["th, img, span", ".red-button", "#fejlec", "td"],
    answer:[{options:0,matches:3},{options:1,matches:0},{options:2,matches:2},{options:3,matches:1}]
  },
  {
    id: 4,
    year:"2024_05",
    type: "single_choice",
    question:
      "Képet szeretne elhelyezni egy HTML5 oldalon. Jelölje meg, hogy melyik a helyes kivitelezés!",
    options: [
      '<img href="kep.png" alt="céglogó">',
      '<img href="kep.png" alt="céglogó"/>',
      '<img alt="Céglogó" kep.png </img>',
      '<img source="kep.png" alt="céglogó">',
      '<img src="kep.png" alt="céglogó">',
    ],
    answer:4
  },
  {
    id: 5,
    year:"2024_05",
    type: "matching",
    question:
      "Párosítsa a függvényeket a JavaScript nyelvben végrehajtott feladatukkal!",
    options: ["Math.sqrt", "Math.pow", "Math.round", "Math.floor"],
    matches: [
      "Lefelé kerekít a legközelebbi egészre.",
      "A legközelebbi egészre kerekít.",
      "Egy szám négyzetgyökét adja vissza.",
      "Hatványértéket ad vissza.",
    ],
    answer:[{o:0,q:2},{o:1,q:3},{o:2,q:1},{o:3,q:0},]
  },
  {
    id: 6,
    year:"2024_05",
    type: "single-choice",
    question:
      "Elemezze a mellékelt JavaScript kódot! Jelölje meg az utolsó számot, ami a konzolban kiírásra kerül!",
    img:"6.jpg",
      options: [
      "Hibás a kód, ezért egyetlen értéket sem ír ki.",
      "9",
      "1",
      "8",
      "7",
    ],
    answer: 4,
  },
  {
    id: 7,
    year:"2024_05",
    type: "single-choice",
    question:
      "Olyan függvényt szeretnénk írni, amely Ft (HUF) árfolyam értéket Euró (EUR) értékre alakít át. Jelölje meg a felsorolt elnevezések közül azt, amelyik a legalkalmasabb arra, hogy nemzetközi fejlesztői csoportmunkában is használható legyen, és egyértelműen mutassa a függvény feladatát!",
    options: [
      "átváltforintoteuróba",
      "convertHUFtoEUR",
      "dosomethingconvert",
      "convertHUFból",
    ],
    answer: 1,
  },
  {
    id: 8,
    year:"2024_05",
    type: "single-choice",
    question:
      "A programunkban szükség van több esetben lista átlagának kiszámítására és a lista legkisebb elemének meghatározására. A megoldáshoz függvényt vagy függvényeket szeretnénk írni. Jelölje meg azt a megoldást, amelyik a tiszta kód alapelveit figyelembe véve a legalkalmasabb!",
    options: [
      "Egy függvényt készít a két feladat megoldására, amely globális változóban adja vissza mindkét értéket.",
      "Külön-külön függvényeket készít az átlag kiszámítására és a minimum értékének meghatározására, és az értékeket globális változókban adja vissza.",
      "Külön-külön készít függvényt az átlag kiszámítására és a minimum értékének meghatározására. A keresett értékeket a függvények visszatérési értékként kapja meg.",
      "Egy függvényt készít, amely egy paraméterben lévő érték alapján dönti el, hogy átlagot vagy minimum értéket számít. A keresett értéket a függvény visszatérési értékként kapja meg.",
    ],
    answer:2
  },
  {
    id: 9,
    year:"2024_05",
    type: "single-choice",
    question:
      "A Tanulok táblából szeretnénk kiválasztani NÉVSORRENDBEN a 12C osztályos, 4 feletti átlagú tanulók neveit. Jelölje meg, hogy melyik a helyes lekérdezés a felsoroltak közül!",
    options: [
      'SELECT Nev FROM Tanulok WHERE Osztaly="12C" AND Atlag>4 ORDER BY Nev;',
      'SELECT Nev FROM Tanulok ORDER BY Nev WHERE Osztaly="12C" AND Atlag>4;',
      'SELECT Nev FROM Tanulok WHERE Atlag>4 ORDER BY Nev AND Osztaly="12C";',
      'SELECT Nev WHERE Osztaly="12C" AND Atlag>4 ORDER BY Nev FROM Tanulok;',
    ],
    answer:0
  },
  {
    id: 10,
    year:"2024_05",
    type: "single-choice",
    question:
      "Az elektronikus naplóban tanulók és tanárok neveit szeretnénk tárolni. Jelölje meg, hogy a felsorolt mezők közül melyek alkalmasak elsődleges kulcsnak (PRIMARY KEY)!",
    options: [
      "név",
      "oktatási azonosító",
      "anyja neve",
      "személyi igazolvány száma",
      "lakcím",
    ],
    answer:1,
  },
  {
    id: 11,
    year:"2024_05",
    type: "single-choice",
    question:
      "Jelölje meg, hogy melyik fejlesztői környezet NEM alkalmas natívan mobil alkalmazás fejlesztésére! Az a környezet nem alkalmas natívan, amelyhez külső könyvtárat kell használni.",
    options: ["React Native", "Python", "MIT App Inventor", "Android Studio"],
    answer: 1,
  },
  {
    id: 12,
    year:"2024_05",
    type: "single-choice",
    question:
      "Jelölje meg a felsoroltak közül a frontend JavaScript keretrendszernek tekintett rendszert! A helyes választ jelentő keretrendszert elsősorban frontend fejlesztésre fejlesztették ki, és arra kiegészítő modulok telepítése nélkül is alkalmas.",
    options: ["React Native", "Flutter", "Xamarin", "Vue.js", "Express.js"],
    answer: 3,
  },
  {
    id: 13,
    year:"2024_05",
    type: "matching",
    question:
      "Csoportosítsa az állításokat aszerint, hogy melyik frontend keretrendszerre jellemzők!",
    options: ["Angular", "React"],
    matches:[
        "Eredetileg a Facebook fejlesztette ki, jelenleg nyílt forráskódú projekt.Virtuális DOM-ot használ.",
        "Egyrányú adatfolyamot alkalmaz, de az eseménykezelés kétirányú is lehet, a kétirányú adatkötések segítségével.Google fejlesztette ki. A mai napig támogatja és fejleszti.TypeScript nyelvet használ, ami a JavaScript szigorúan típusos verziója."
    ],
   answer:[{o:0,m:1},{o:1,m:0}]
  },
  {
    id: 14,
    year:"2024_05",
    type: "single-choice",
    question:
      "Válassza ki azt a feladatot, mely NEM tartozik a Backend fejlesztő tevékenységeihez!",
    options: [
      "a weboldal kinézetének kialakítása",
      "csatlakozás adatbázishoz",
      "adatok tárolása, feldolgozása",
      "API-k írása",
    ],
    answer:0,
  },
  {
    id: 15,
    year:"2024_05",
    type: "single_choice",
    question: "Válassza ki, hogyan néz ki az adat JSON formátumban!",
    options: [
      '{ "nev": "Minta József", "atlag": 4.5 }',
      '{ "nev"-> "Minta József", "atlag"-> 4.5 }',
      '{ "Minta József": "nev", 4.5:"atlag" }',
      '{ "nev" <- "Minta József", "atlag" <- 4.5 }',
    ],
    answer: 0,
  },
  {
    id: 16,
    year:"2024_05",
    type: "single_choice",
    question:
      "Jelölje meg, hogy melyik objektumorientált programozási alapelvnek felel meg a következő kijelentés! Az osztály változóinak értékét csak metódusokon keresztül lehet megváltoztatni.",
    options: [
      "Inheritance (öröklés)",
      "Encapsulation (egységbezárás)",
      "Polymorphism (sokalakúság)",
    ],
    answer: 1,
  },
  {
    id: 17,
    year:"2024_05",
    type: "matching",
    question: "A Java és C# nyelvek esetén az osztály mezőinek és metódusainak láthatóságát határozzák meg az alábbi kulcsszavak. Párosítsa a kulcsszavakat a megfelelő meghatározással!",
    options: ["private", "public", "protected"],
    matches: [
      "nyilvánosan elérhető mindenki számára, aki hozzáfér az osztályhoz",
      "csak az osztályon belül érhető el. Más osztályok vagy objektumok nem férhetnek hozzá közvetlenül",
      "elérhető az osztályon belül és a közvetlen leszármazottak számára is",
    ],
    answer:[{o:0,q:1},{o:1,q:0},{o:2,q:2}]
  },
  {
    id: 18,
    year:"2024_05",
    type: "multiple_choice",
    question: "Jelölje meg a CMS (tartalomkezelő) rendszerekre igaz állítást!",
    options: [
      "A weblapra olyanok is képesek lesznek feltölteni tartalmakat, akiknek csak kevesebb informatikai képzettsége van.",
      "Nem rendelkeznek adminisztrációs felülettel.",
      "Csak a programozóknak könnyíti meg a weblap kialakítását, a felhasználók és cikkek készítőinek munkáján egyáltalán nem könnyít.",
      "Nem létezik ingyenes változattal rendelkező CMS rendszer.",
    ],
    answer: 0,
  },
  {
    id: 19,
    year:"2024_05",
    type: "single_choice",
    question:
      "Jelölje meg, hogy a UNIT tesztelésnél alkalmazott AAA minta esetén, melyik szó köthető az alábbi kijelentéshez! A tesztelés ezen szakaszában kerülhet sor a kezdőfeltételek beállítására, a teszthez szükséges input adatok előkészítésére.",
    options: ["Assert", "Arrange", "Align", "Alert", "Act"],
    answer: 1
  },
  {
    id: 20,
    year:"2024_05",
    type: "single_choice",
    question:
      "Jelölje meg, hogy melyik teszt tartozik a középső (piros kérdőjelekkel jelölt) szinthez!",
    options: [
      "Unit Tests",
      "Component Tests (Modul vagy komponens teszt)",
      "Functional Tests (UI / GUI teszt, átvételi teszt)",
      "API Tests (Rendszerteszt)",
      "Integration Test (Integrációs teszt)",
    ],
    answer: 4,
  },
];
