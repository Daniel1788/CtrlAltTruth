'use client';

import React, { useState } from 'react';
import { ShieldAlert, BookOpen, AlertTriangle, MessageSquareWarning, Fingerprint, Video, Filter, Search } from 'lucide-react';

import Navbar from '@/components/layout/Navbar';
import LandingView from '@/components/views/LandingView';
import AnalyzerView from '@/components/views/AnalyzerView';
import SwipeGameView from '@/components/views/SwipeGameView';
import LessonsView from '@/components/views/LessonsView';

import DocumentationView from '@/components/views/DocumentationView';

const TOPICS = [
  { id: 'ai-jobs', title: 'Inteligența Artificială ne fură joburile', icon: Fingerprint, description: 'Analizează un text despre impactul AI asupra pieței muncii.' },
  { id: 'crypto', title: 'Bani rapizi și siguri din Crypto', icon: MessageSquareWarning, description: 'Descoperă cum sunt promovate schemele de îmbogățire rapidă.' },
  { id: 'diets', title: 'Secretul din spatele dietelor minune', icon: AlertTriangle, description: 'Învață să recunoști manipularea în industria de wellness.' },
  { id: 'climate', title: 'Adevărul ascuns despre încălzirea globală', icon: ShieldAlert, description: 'Analizează discursul negaționist și teoriile conspirației.' },
  { id: 'tiktok', title: 'Cine controlează algoritmul TikTok?', icon: Video, description: 'Vezi cum este folosită frica legată de rețelele sociale.' },
  { id: 'economy', title: 'Dezastrul iminent al economiei globale', icon: Filter, description: 'Recunoaște panica indusă artificial despre prăbușiri financiare.' }
];

const LESSONS = [
  {
    id: 1,
    level: "Nivelul 1",
    title: "Anatomia Limbajului Polarizant",
    icon: AlertTriangle,
    content: (
      <>
        <p>Limbajul polarizant este principala armă a dezinformării moderne. Scopul său nu este să informeze, ci să împartă lumea în două tabere ireconciliabile: "Noi" (cei buni, victimele) și "Ei" (cei răi, asupritorii).</p>
        <h3>Cum funcționează?</h3>
        <ul>
          <li><strong>Declanșarea fricii și furiei:</strong> Emoțiile negative puternice scurtcircuitează cortexul prefrontal (partea creierului responsabilă cu gândirea logică). Când ești furios, ești mult mai predispus să dai "Share" fără să verifici sursa.</li>
          <li><strong>Adjective extreme:</strong> Cuvinte precum "catastrofal", "apocaliptic", "trădare", "șocant" sunt folosite pentru a hiperboliza evenimente banale.</li>
          <li><strong>Sintaxa Clickbait:</strong> Titluri care ascund informația esențială ("Nu o să-ți vină să crezi ce a făcut...") pentru a exploata curiozitatea naturală a creierului (curiosity gap).</li>
        </ul>
        <h3>Exemplu practic</h3>
        <p><em>Neutru:</em> "Guvernul a propus o nouă taxă de 1% pentru companiile mari."</p>
        <p><em>Polarizant:</em> "JAF LA DRUMUL MARE! Guvernul ne FURĂ ultimii bani pentru a hrăni corporațiile străine! Ieșiți în stradă!"</p>
        <p>Observă cum a doua variantă nu adaugă informații noi, ci doar emoție pură și un apel la acțiune nejustificat.</p>
      </>
    )
  },
  {
    id: 2,
    level: "Nivelul 2",
    title: "Fabricarea Consensului & Ferma de Troli",
    icon: MessageSquareWarning,
    content: (
      <>
        <p>Creierul uman este programat evolutiv să urmeze mulțimea (social proof). Dacă vedem că 10.000 de oameni susțin o idee, subconștientul nostru tinde să o valideze, chiar dacă ideea este falsă. Această vulnerabilitate este exploatată masiv în mediul online.</p>
        <h3>Tehnici de manipulare a consensului</h3>
        <ul>
          <li><strong>Astroturfing:</strong> Crearea iluziei unei mișcări "de la firul ierbii" (grassroots). O campanie finanțată de un grup de interese folosește mii de conturi false pentru a face să pară că cetățenii obișnuiți protestează spontan împotriva unei legi.</li>
          <li><strong>Fermele de Troli și Boți:</strong> Rețele automatizate care dau like, share și comentează la comandă. Scopul lor este să "păcălească" algoritmul rețelei sociale să creadă că un subiect este viral, împingându-l astfel în feed-urile oamenilor reali.</li>
          <li><strong>Efectul de Bandwagon:</strong> Oamenii reali încep să adopte opinia falsă doar pentru că pare a fi opinia majorității, consolidând astfel minciuna inițială.</li>
        </ul>
        <h3>Cum să te protejezi?</h3>
        <p>Nu evalua veridicitatea unei informații pe baza numărului de aprecieri. Caută sursa primară. Dacă mii de comentarii folosesc exact aceleași fraze sau cuvinte cheie, este foarte probabil să asiști la un atac coordonat de boți.</p>
      </>
    )
  },
  {
    id: 3,
    level: "Nivelul 3",
    title: "Amprenta AI: Perplexitate și Burstiness",
    icon: Fingerprint,
    content: (
      <>
        <p>Odată cu apariția modelelor de limbaj (LLM) precum ChatGPT, generarea de Fake News a devenit gratuită și instantanee. Totuși, textele generate de AI au o "amprentă" matematică invizibilă cu ochiul liber, dar detectabilă.</p>
        <h3>Cei doi indicatori principali</h3>
        <ul>
          <li><strong>Perplexitatea (Perplexity):</strong> Măsoară cât de "previzibil" este un text. AI-ul alege mereu cel mai probabil următor cuvânt. Prin urmare, textele AI au o perplexitate foarte scăzută (sunt banale, previzibile). Oamenii folosesc cuvinte neașteptate, metafore ciudate sau argou, având o perplexitate mare.</li>
          <li><strong>Varianța (Burstiness):</strong> Se referă la variația lungimii și structurii propozițiilor. Un om scrie o propoziție lungă și complexă. Apoi una scurtă. Apoi un fragment. AI-ul tinde să scrie propoziții de lungimi extrem de similare, cu o structură gramaticală perfectă, dar monotonă.</li>
        </ul>
        <h3>Aplicație în viața reală</h3>
        <p>Dacă citești un articol lung, perfect gramatical, dar care pare "lipsit de suflet", monoton și folosește excesiv cuvinte de tranziție ("În primul rând", "În concluzie", "Este important de menționat"), există o șansă uriașă să fie generat sintetic pentru a umple o pagină de propagandă.</p>
      </>
    )
  },
  {
    id: 4,
    level: "Nivelul 4",
    title: "Deepfakes și Manipularea Vizuală",
    icon: Video,
    content: (
      <>
        <p>Dacă o imagine face cât o mie de cuvinte, un video fals face cât un milion de minciuni. Tehnologia Deepfake folosește rețele neuronale (GANs) pentru a înlocui fața sau vocea unei persoane cu o precizie înfricoșătoare.</p>
        <h3>Tipuri de manipulare vizuală</h3>
        <ul>
          <li><strong>Deepfakes Audio-Video:</strong> Generarea unui discurs complet fals al unui președinte sau politician, clonându-i perfect vocea și mișcările buzelor.</li>
          <li><strong>Cheapfakes (Shallowfakes):</strong> Manipulări ieftine, dar eficiente. De exemplu, încetinirea unui video cu un politician pentru a-l face să pară beat sau senil, sau tăierea unui clip din context (ex: arătând doar momentul în care cineva țipă, fără a arăta provocarea).</li>
          <li><strong>Imagini generate de AI (Midjourney, DALL-E):</strong> Crearea de imagini fotorealiste cu evenimente care nu au avut loc niciodată (ex: arestarea unei persoane publice, dezastre naturale false).</li>
        </ul>
        <h3>Cum le detectăm?</h3>
        <p>La imaginile AI, caută erori la detalii fine: degete asimetrice, text ilizibil pe fundal, umbre care nu se aliniază cu sursa de lumină. La video, fii atent la clipitul nenatural, desincronizarea subtilă a buzelor cu sunetul și marginile neclare în jurul feței.</p>
      </>
    )
  },
  {
    id: 5,
    level: "Nivelul 5",
    title: "Algoritmii și Bula de Ecou",
    icon: Filter,
    content: (
      <>
        <p>Platformele de social media nu sunt neutre. Ele sunt optimizate pentru un singur lucru: <strong>Engagement (Timpul petrecut pe platformă)</strong>. Algoritmii au descoperit rapid că furia și indignarea țin oamenii lipiți de ecrane mai mult decât bucuria sau calmul.</p>
        <h3>Cum se formează Bula de Ecou (Echo Chamber)?</h3>
        <ul>
          <li><strong>Biasul de Confirmare:</strong> Algoritmul îți analizează click-urile și îți servește doar informații care îți confirmă credințele deja existente. Dacă dai click pe o știre anti-vaccin, vei primi alte 100 de știri similare.</li>
          <li><strong>Izolarea Informațională:</strong> Treptat, algoritmul ascunde complet opiniile contrare. Ajungi să crezi că "toată lumea gândește ca tine", pentru că feed-ul tău îți arată doar oameni care gândesc la fel.</li>
          <li><strong>Radicalizarea:</strong> Pentru a te menține interesat, algoritmul trebuie să îți ofere conținut din ce în ce mai extrem. O simplă curiozitate despre un subiect controversat te poate duce, în câteva săptămâni, în grupuri radicale.</li>
        </ul>
        <h3>Soluția?</h3>
        <p>Diversifică-ți sursele intenționat. Urmărește jurnaliști sau publicații cu care nu ești de acord. Curăță-ți istoricul și nu lăsa algoritmul să decidă ce este "realitatea" pentru tine.</p>
      </>
    )
  },
  {
    id: 6,
    level: "Nivelul 6",
    title: "Igiena Informațională: Citirea Laterala",
    icon: Search,
    content: (
      <>
        <p>Cea mai mare greșeală pe care o facem când evaluăm o știre este să o "citim vertical" (să stăm pe pagina respectivă, să ne uităm la design, la secțiunea "Despre noi"). Site-urile de Fake News au adesea design-uri premium și secțiuni "Despre noi" foarte convingătoare.</p>
        <h3>Regula de Aur: Citirea Laterală (Lateral Reading)</h3>
        <p>Fact-checkerii profesioniști nu evaluează niciodată un site stând pe el. Ei deschid imediat tab-uri noi în browser (pe orizontală/lateral) și caută ce spun <em>alții</em> despre acea sursă.</p>
        <ul>
          <li><strong>Pasul 1: Părăsește site-ul.</strong> Nu încerca să îți dai seama dacă e adevărat doar citind articolul.</li>
          <li><strong>Pasul 2: Caută sursa.</strong> Caută pe Google numele site-ului sau al autorului alături de cuvântul "wiki" sau "scam" sau "bias". Vezi cine îi finanțează.</li>
          <li><strong>Pasul 3: Verifică afirmația.</strong> Copiază o frază cheie din articol și caut-o pe Google. Vezi dacă agențiile de presă majore (Reuters, AP, AFP) au raportat același lucru. Dacă o știre "șocantă" apare doar pe un blog obscur, este 99% falsă.</li>
        </ul>
        <p>Durează doar 30 de secunde să deschizi un tab nou și să verifici o sursă. Acele 30 de secunde te pot salva de la a fi manipulat.</p>
      </>
    )
  }
];

type AppState = 'landing' | 'analyzer' | 'swipegame' | 'lessons' | 'documentation';

export default function CtrlAltTruth() {
  const [currentView, setCurrentView] = useState<AppState>('landing');
  const [activeLesson, setActiveLesson] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#e7edeb] font-sans selection:bg-[#7c1f31]/20">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      <main className="max-w-6xl mx-auto px-6">
        {currentView === 'landing' && (
          <LandingView onNavigate={setCurrentView} />
        )}

        {currentView === 'analyzer' && (
          <div className="py-12 md:py-20">
            <AnalyzerView topics={TOPICS} />
          </div>
        )}

        {currentView === 'swipegame' && (
          <div className="py-12 md:py-20">
            <SwipeGameView />
          </div>
        )}

        {currentView === 'lessons' && (
          <LessonsView 
            lessons={LESSONS} 
            activeLesson={activeLesson} 
            setActiveLesson={setActiveLesson} 
          />
        )}
        {currentView === 'documentation' && (
          <DocumentationView />
        )}
      </main>
    </div>
  );
}
