import React from 'react';
import { motion } from 'motion/react';
import { FileText, Code, Cpu, ShieldCheck } from 'lucide-react';

export default function DocumentationView() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto py-10 px-4 md:px-0 flex flex-col md:flex-row gap-12"
    >
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 shrink-0">
        <div className="sticky top-24 space-y-2">
          <h3 className="font-bold text-[#1a1a1a] mb-4 uppercase tracking-wider text-sm">Cuprins</h3>
          <a href="#arhitectura" className="flex items-center gap-2 p-3 rounded-xl hover:bg-[#1a1a1a]/5 text-[#1a1a1a]/80 hover:text-[#7c1f31] font-medium transition-colors">
            <Code className="w-4 h-4" /> Arhitectura Sistemului
          </a>
          <a href="#motorul-ai" className="flex items-center gap-2 p-3 rounded-xl hover:bg-[#1a1a1a]/5 text-[#1a1a1a]/80 hover:text-[#7c1f31] font-medium transition-colors">
            <Cpu className="w-4 h-4" /> Motorul AI
          </a>
          <a href="#algoritmi" className="flex items-center gap-2 p-3 rounded-xl hover:bg-[#1a1a1a]/5 text-[#1a1a1a]/80 hover:text-[#7c1f31] font-medium transition-colors">
            <FileText className="w-4 h-4" /> Algoritmi Locali
          </a>
          <a href="#securitate" className="flex items-center gap-2 p-3 rounded-xl hover:bg-[#1a1a1a]/5 text-[#1a1a1a]/80 hover:text-[#7c1f31] font-medium transition-colors">
            <ShieldCheck className="w-4 h-4" /> Securitate & Performanță
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 prose prose-lg prose-stone max-w-none">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] mb-4">Documentație Tehnică</h1>
          <p className="text-xl text-[#7c1f31] font-medium">Ctrl+Alt+Truth - Platformă educațională anti-dezinformare</p>
        </div>

        <section id="arhitectura" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#1a1a1a] mb-6 flex items-center gap-3">
            <div className="bg-[#7c1f31]/10 p-2 rounded-lg"><Code className="w-6 h-6 text-[#7c1f31]" /></div>
            Arhitectura Sistemului
          </h2>
          <p>
            Aplicația este construită folosind <strong>Next.js (App Router)</strong> și <strong>React</strong>, adoptând o arhitectură modulară bazată pe componente. 
            Fiecare secțiune principală a aplicației (Landing, Analyzer, Swipe Game, Lecții) este izolată în propriul său View component, facilitând mentenanța și scalabilitatea.
          </p>
          <p>
            Interfața este stilizată complet cu <strong>Tailwind CSS</strong>, respectând o paletă de culori strictă (Fundal: <code>#e7edeb</code>, Accent: <code>#7c1f31</code>). 
            Aplicația este configurată ca un <strong>Progressive Web App (PWA)</strong>, incluzând un fișier <code>manifest.json</code> și meta tag-uri specifice (ex: <code>theme-color</code>), permițând instalarea nativă pe dispozitive mobile.
          </p>
        </section>

        <section id="motorul-ai" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#1a1a1a] mb-6 flex items-center gap-3">
            <div className="bg-[#7c1f31]/10 p-2 rounded-lg"><Cpu className="w-6 h-6 text-[#7c1f31]" /></div>
            Motorul AI (Gemini Flash)
          </h2>
          <p>
            Generarea textelor manipulative este realizată prin integrarea cu <strong>Google Gemini API</strong> via <code>@google/genai</code>. 
            Pentru a asigura stabilitatea în producție, am implementat un sistem robust de <strong>API Key Rotation</strong>. Aplicația citește un array de chei API din variabilele de mediu și iterează prin ele în caz de erori de tip Rate Limit (429) sau Quota Exceeded.
          </p>
          <p>
            Răspunsul AI-ului este strict controlat printr-un <strong>JSON Schema</strong> definit în prompt engineering, forțând modelul să returneze o structură exactă: textul articolului, un array de cuvinte toxice, o explicație psihologică și un obiect cu scoruri emoționale (frică, furie, urgență, validare).
          </p>
          <div className="bg-[#1a1a1a] text-white p-6 rounded-2xl my-6 font-mono text-sm overflow-x-auto">
            <p className="text-green-400 mb-2">// Graceful Degradation (Fallback)</p>
            <p>În cazul extrem în care toate cheile API eșuează sau rețeaua cade, aplicația nu se blochează. Un mecanism de fallback interceptează eroarea și returnează instantaneu un obiect JSON hardcodat, permițând utilizatorului să continue experiența neîntrerupt.</p>
          </div>
        </section>

        <section id="algoritmi" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#1a1a1a] mb-6 flex items-center gap-3">
            <div className="bg-[#7c1f31]/10 p-2 rounded-lg"><FileText className="w-6 h-6 text-[#7c1f31]" /></div>
            Algoritmi Locali (Client-Side)
          </h2>
          <p>
            Pentru a reduce dependența de server și a oferi feedback instantaneu, anumite calcule complexe sunt rulate direct în browser.
          </p>
          <h3>Stilometrie (Amprenta AI)</h3>
          <p>
            Algoritmul de stilometrie analizează "burstiness-ul" (varianța lungimii frazelor) textului generat. 
            Matematica din spate implică:
          </p>
          <ul>
            <li>Parsarea textului în fraze folosind Regex avansat.</li>
            <li>Calcularea mediei (μ) numărului de cuvinte per frază.</li>
            <li>Calcularea <strong>Deviației Standard (σ)</strong> folosind formula varianței (suma diferențelor la pătrat față de medie, împărțită la N).</li>
            <li>Calcularea Diversității Lexicale (Cuvinte Unice / Total Cuvinte * 100).</li>
          </ul>
          <p>
            Textele umane au o deviație standard mare (fraze scurte amestecate cu fraze lungi), în timp ce AI-ul tinde să producă fraze de lungimi uniforme (deviație mică).
          </p>
          <h3>Highlighter Interactiv</h3>
          <p>
            Logica de click pe cuvinte în faza de analiză folosește expresii regulate pentru a curăța punctuația (<code>/[^a-z0-9ăâîșț-]/g</code>) și a compara selecția utilizatorului cu array-ul de cuvinte toxice returnat de API, totul în timp real, fără apeluri de rețea adiționale.
          </p>
        </section>

        <section id="securitate" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#1a1a1a] mb-6 flex items-center gap-3">
            <div className="bg-[#7c1f31]/10 p-2 rounded-lg"><ShieldCheck className="w-6 h-6 text-[#7c1f31]" /></div>
            Securitate & Performanță
          </h2>
          <p>
            <strong>State Management:</strong> Aplicația folosește hook-uri native React (<code>useState</code>, <code>useEffect</code>, <code>useRef</code>) pentru a gestiona starea globală (view-ul curent) și stările locale complexe (timer-ul de 25s, fazele analizei).
          </p>
          <p>
            <strong>Prevenirea Memory Leaks:</strong> Toate animațiile bazate pe <code>setInterval</code> (precum simularea răspândirii propagandei din Landing Page sau timer-ul din Analyzer) returnează funcții de cleanup (<code>clearInterval</code>) în interiorul <code>useEffect</code>-ului. Actualizările de stare folosesc funcții callback (ex: <code>setDots(prev =&gt; ...)</code>) pentru a evita problemele de stale closures.
          </p>
          <p>
            <strong>No-Database Architecture:</strong> Aplicația nu necesită o bază de date backend. Nu colectăm date personale. Progresul și scorurile sunt gestionate exclusiv în memorie sau prin <code>localStorage</code>, asigurând confidențialitate maximă (Privacy by Design).
          </p>
        </section>
      </div>
    </motion.div>
  );
}
