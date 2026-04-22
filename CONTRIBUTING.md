# Contribuie la Ctrl+Alt+Truth

În primul rând, îți mulțumim că te gândești să contribui la Ctrl+Alt+Truth! Datorită oamenilor ca tine, acest instrument devine o resursă puternică pentru combaterea dezinformării și promovarea gândirii critice.

Suntem deschiși la orice fel de contribuții, fie că este vorba despre raportarea erorilor, sugerarea de noi funcționalități, îmbunătățirea documentației sau trimiterea de pull requests (cereri de atragere a codului).

## Cod de Conduită

Prin participarea la acest proiect, te rugăm să respecți Codul nostru de Conduită. Tratează pe toată lumea cu respect și bunătate. Hărțuirea sau comportamentul abuziv de orice fel nu vor fi tolerate.

## Cum Să Începi

Înainte de a începe să contribui, te rugăm să citești [README.md](README.md) pentru a înțelege obiectivele, funcționalitățile și arhitectura tehnică a proiectului.

Pentru a rula proiectul local, vei avea nevoie de:
- Node.js (v18 sau mai nou)
- Managerul de pachete `pnpm`
- O cheie API Google Gemini
- Un proiect Supabase (pentru autentificare și baza de date)

Consultă secțiunea "Cum Să Începi" din `README.md` pentru instrucțiuni detaliate de configurare.

## Cum pot contribui?

### Raportarea Erorilor (Bugs)

Această secțiune te ghidează prin procesul de raportare a unei erori pentru Ctrl+Alt+Truth. Respectarea acestor indicații îi ajută pe mentenatori și pe membrii comunității să înțeleagă raportul tău, să reproducă problema și să găsească rapoarte similare.

- **Verifică problemele (issues) existente:** Înainte de a crea un issue nou, te rugăm să verifici dacă eroarea a fost deja raportată.
- **Folosește un titlu clar:** Descrie problema clar în titlul raportului.
- **Oferă pași detaliați:** Explică exact cum se poate reproduce eroarea.
- **Include detalii despre mediu:** Menționează browserul, sistemul de operare și versiunea de Node.js pe care le folosești.
- **Oferă context:** Include mesaje de eroare, capturi de ecran sau înregistrări ale ecranului, dacă este cazul.

### Sugerarea de Îmbunătățiri

Dacă ai o idee pentru o nouă funcționalitate sau o îmbunătățire a uneia existente, ne-ar face plăcere să o auzim!

- **Verifică problemele (issues) existente:** Caută solicitări similare de funcționalități.
- **Descrie funcționalitatea:** Explică ce este funcționalitatea și de ce ar fi utilă.
- **Oferă machete (mockups) sau exemple:** Dacă este posibil, distribuie machete vizuale sau exemple ale modului în care ar funcționa funcționalitatea.

### Pull Requests

Suntem deschiși să primim pull request-urile tale.

1. **Fa un fork la repozitoriu** și creează branch-ul tău din `main`.
2. **Dacă ai adăugat cod care ar trebui testat, adaugă teste.** (Dacă este cazul).
3. **Dacă ai modificat API-urile, actualizează documentația.**
4. **Asigură-te că testele trec cu succes.** (Dacă este cazul).
5. **Asigură-te că nu există erori de linting.** Folosim ESLint și TypeScript. Rulează `pnpm lint` înainte de a face commit.
6. **Trimite acel PR!**

## Reguli de Dezvoltare

### Tehnologii Folosite
- **Framework:** Next.js (App Router)
- **Stilizare:** Tailwind CSS
- **Limbaj:** TypeScript
- **Bază de date/Autentificare:** Supabase
- **Integrare AI:** Google Gemini API

### Convenții de Programare

- **TypeScript:** Te rugăm să folosești tipizarea statică (strong typing) oriunde este posibil. Evită utilizarea `any`.
- **Linting:** Asigură-te că propriul tău cod respectă regulile ESLint ale proiectului. Rezolvă orice avertismente sau erori înainte de a face commit.
- **Componente:** Creează componente React reutilizabile. Păstrează-le mici și concentrate pe o singură responsabilitate.
- **Stilizare:** Folosește clasele utilitare Tailwind CSS. Pentru animații complexe sau stiluri personalizate, folosește `index.css` sau configurația Tailwind.

### Mesaje de Commit

Preferăm mesaje de commit clare și descriptive. Un mesaj de commit bun ar trebui să răspundă la trei întrebări despre o modificare:
- De ce este necesară?
- Cum rezolvă problema?
- Ce efecte are modificarea?

Exemplu:
```
Repară aspectul barei de navigare pe dispozitive mobile

Bara de navigare ieșea din ecran pe dimensiuni mai mici de 320px. 
Acest commit ajustează proprietățile flexbox pentru a permite 
încadrarea (wrap) și reduce padding-ul pe ecrane mai mici.
```

## Licență

Prin contribuția la Ctrl+Alt+Truth, ești de acord ca aceste contribuții ale tale să fie licențiate conform GNU Affero General Public License v3.0 (AGPL-3.0). Consultă fișierul [LICENSE.md](LICENSE.md) pentru mai multe detalii.
