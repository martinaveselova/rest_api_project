Projektový úkol: Vytvoření RESTful API pro správu skladových zásob

Cíle projektu:
•	Seznámení s Node.js a TypeScriptem: Praktické použití těchto technologií při vývoji API.
•	Validace vstupů: Implementace ověřování dat přijímaných od uživatele nebo jiných systémů.
•	Práce s databází: Ukládání a načítání dat ze skladového systému v relační nebo nerelační databázi.
•	Volání externího API: Integrace s API třetí strany pro rozšíření funkcionality, jako je sledování zásilek nebo kalkulace přepravních nákladů.
•	Pochopení firemních principů: Seznámení se se základními postupy a standardy používanými ve vaší firmě.

Krok 1: Nastavení vývojového prostředí
•	Inicializace projektu: Vytvořte nový Node.js projekt s TypeScriptem. 
•	Základní struktura: Nastavte strukturu složek a souborů podle best practices.
•	Instalace závislostí: Nainstalujte potřebné balíčky (Express.js, TypeORM/Kysely nebo Mongoose, atd.). 

Krok 2: Implementace základních API endpointů
•	Vytvoření RESTful API: Implementujte následující endpointy pro správu skladových zásob:
•	GET /items: Získání seznamu všech položek na skladě. 
•	GET /items/:id: Získání detailu konkrétní položky. 
•	POST /items: Přidání nové položky do skladu. 
•	PUT /items/:id: Aktualizace informací o existující položce.
•	DELETE /items/:id: Odstranění položky ze skladu.

Krok 3: Validace vstupních dat
•	Implementace validace: Použijte knihovnu jako Joi nebo class-validator k ověření dat (např. kontrola, zda je množství položky kladné číslo, zda jsou povinná pole vyplněna).
•	Chybové zprávy: Zajistěte, aby API vracelo srozumitelné chybové zprávy při neúspěšné validaci.

Krok 4: Integrace databáze
•	Volba databáze: Vyberte si mezi relační (PostgreSQL, MySQL) nebo nerelační (MongoDB) databází.
•	ORM/ODM nastavení: Nastavte TypeORM nebo Mongoose pro komunikaci s databází.
•	Operace s daty: Implementujte ukládání, načítání, aktualizaci a mazání položek v databázi.

Krok 5: Rozšíření funkcionality
•	Správa objednávek:
•	POST /orders: Vytvoření nové objednávky.
•	GET /orders/:id: Získání detailu konkrétní objednávky.
•	Aktualizace skladových zásob: Při vytvoření objednávky aktualizujte množství položek na skladě.
•	Sledování zásilek:
•	GET /orders/:id/tracking: Získání informací o stavu doručení objednávky.

Krok 6: Volání externího API
•	Integrace s přepravním API:
•	Při vytvoření objednávky proveďte volání externího API přepravní společnosti pro vytvoření zásilky nebo kalkulaci přepravních nákladů.
•	Příklad: Použijte API společnosti, jako je DHL, UPS nebo simulované API pro účely tohoto projektu.
•	Zpracování odpovědi: Správně zpracujte odpověď z externího API a uložte důležité informace (např. sledovací číslo zásilky) do systému.

Krok 7: Dokumentace API
•	Swagger/OpenAPI: Vytvořte dokumentaci svého API pomocí Swaggeru nebo jiného nástroje.
•	Popis endpointů: Uveďte detailní informace o každém endpointu, včetně vstupů, výstupů a možných chybových stavů.

Krok 8: Jednotkové testy
•	Nastavení testovacího prostředí: Použijte framework jako Jest nebo Mocha.
•	Psání testů: Napište jednotkové testy pro klíčové části aplikace, zejména pro validaci a logiku API.

Krok 9: Bezpečnostní aspekty (volitelné, pro pokročilé)
•	Autentizace a autorizace: Implementujte základní autentizační mechanismus (např. JWT), aby pouze autorizovaní uživatelé mohli manipulovat se skladovými zásobami.
•	Ochrana dat: Zajistěte, aby API bylo odolné vůči běžným útokům a aby byla chráněna citlivá data (např. informace o zákaznících).

Pokyny pro účastníky:
•	Čistý a udržovatelný kód: Dbejte na srozumitelnost a strukturu kódu.
•	Dokumentace: Komentujte kód a udržujte aktuální dokumentaci.
•	Verzovací systém: Použijte Git a pravidelně commitujte změny.
•	Iniciativa: Nebojte se přidat vlastní vylepšení nebo rozšíření funkcionality, jako je např. notifikace při nízkém stavu zásob.

Poznámky:
•	Časový rámec: Projekt můžete vypracovat ve svém volném čase. Kvalita je důležitější než rychlost.
•	Podpora: Pokud narazíte na problémy, zkuste nejprve najít řešení sami. Pokud budete potřebovat pomoc, neváhejte se obrátit na mentora.
