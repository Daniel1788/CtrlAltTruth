'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, RefreshCcw, ShieldAlert, BookOpen, Car, Calendar, Shirt, Smartphone, Earth, Loader2 } from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';

type AppState = 'select-topic' | 'analyzing' | 'results';

interface ArticleData {
  text: string;
  toxicWords: string[];
  explanation: string;
}

const TOPICS = [
  {
    id: 'ai-schools',
    title: 'AI-ul în Școli',
    icon: BookOpen,
    description: 'Analizează un articol despre introducerea inteligenței artificiale în educație.',
    data: {
      text: "Introducerea nesăbuită a inteligenței artificiale în școli este un dezastru catastrofal care așteaptă să se întâmple. Elevii leneși o vor folosi inevitabil pentru a trișa, în timp ce administratorii incompetenți irosesc milioane pe tehnologii netestate.",
      toxicWords: ["nesăbuită", "dezastru", "catastrofal", "leneși", "inevitabil", "incompetenți", "netestate"],
      explanation: "Acest articol folosește un limbaj extrem de încărcat emoțional ('nesăbuită', 'dezastru catastrofal') pentru a incita la frică. De asemenea, se bazează pe atacuri la persoană ('elevii leneși', 'administratorii incompetenți') în loc să ofere argumente factuale despre provocările integrării AI."
    }
  },
  {
    id: 'gas-cars',
    title: 'Interzicerea Mașinilor pe Benzină',
    icon: Car,
    description: 'Examinează un text despre tranziția forțată la vehiculele electrice.',
    data: {
      text: "Forțarea tuturor să cumpere mașini electrice este un abuz tiranic al guvernului. Aceste cărucioare de golf supraevaluate vor distruge complet rețeaua electrică și vor lăsa familii nevinovate blocate în frigul înghețat.",
      toxicWords: ["forțarea", "abuz", "tiranic", "cărucioare", "supraevaluate", "distruge", "complet", "nevinovate", "blocate", "înghețat"],
      explanation: "Textul folosește eroarea pantei alunecoase ('vor distruge complet rețeaua') și apelează la milă/frică ('familii nevinovate blocate în frigul înghețat'). Cuvinte precum 'tiranic' și 'forțarea' sunt folosite pentru a încadra politica drept opresiune."
    }
  },
  {
    id: '4-day-workweek',
    title: 'Săptămâna de Lucru de 4 Zile',
    icon: Calendar,
    description: 'Evaluează un comentariu despre reducerea zilelor de muncă.',
    data: {
      text: "Ideea absurdă a unei săptămâni de lucru de patru zile va distruge complet economia noastră fragilă. Angajații leneși vor profita de această scuză patetică pentru a munci mai puțin, ducând la falimentul sigur al afacerilor cinstite.",
      toxicWords: ["absurdă", "distruge", "complet", "fragilă", "leneși", "patetică", "falimentul", "sigur", "cinstite"],
      explanation: "Acest text folosește hiperbole ('va distruge complet', 'falimentul sigur') pentru a crea panică. Atacă angajații numindu-i 'leneși' și descrie inițiativa drept o 'scuză patetică', evitând o discuție obiectivă despre productivitate."
    }
  },
  {
    id: 'school-uniforms',
    title: 'Uniformele Școlare Obligatorii',
    icon: Shirt,
    description: 'Analizează un articol de opinie despre impunerea uniformelor.',
    data: {
      text: "Impunerea dictatorială a uniformelor școlare este un atac brutal asupra libertății de exprimare a copiilor noștri. Directorii obsedați de control vor să transforme elevii inocenți în niște roboți supuși, distrugându-le complet individualitatea.",
      toxicWords: ["dictatorială", "brutal", "obsedați", "inocenți", "roboți", "supuși", "distrugându-le", "complet"],
      explanation: "Autorul folosește un limbaj extrem ('dictatorială', 'atac brutal') pentru a demoniza o regulă administrativă. Expresii precum 'roboți supuși' și 'directori obsedați de control' sunt menite să provoace indignare și revoltă."
    }
  },
  {
    id: 'tiktok-ban',
    title: 'Interzicerea TikTok sub 16 ani',
    icon: Smartphone,
    description: 'Citește un text despre reglementarea rețelelor sociale pentru tineri.',
    data: {
      text: "Cenzura scandaloasă a aplicației TikTok pentru tineri este o mișcare disperată a politicienilor învechiți. Acești dinozauri deconectați de realitate încearcă cu disperare să reducă la tăcere vocile tinerilor sub pretextul ridicol al protecției.",
      toxicWords: ["scandaloasă", "disperată", "învechiți", "dinozauri", "deconectați", "disperare", "reducă", "ridicol"],
      explanation: "Textul abundă în insulte ('dinozauri', 'învechiți', 'deconectați') și folosește un ton alarmist ('cenzura scandaloasă'). Minimalizează preocupările legitime privind siguranța online numindu-le un 'pretext ridicol'."
    }
  },
  {
    id: 'meat-climate',
    title: 'Consumul de Carne și Clima',
    icon: Earth,
    description: 'Examinează un articol despre impactul dietei asupra mediului.',
    data: {
      text: "Propaganda isterică a extremiștilor de mediu vrea să ne interzică complet dreptul fundamental de a mânca carne. Acești fanatici deliranți ne vor forța să consumăm insecte dezgustătoare în timp ce ei distrug intenționat tradițiile noastre milenare.",
      toxicWords: ["propaganda", "isterică", "extremiștilor", "complet", "fanatici", "deliranți", "forța", "dezgustătoare", "distrug", "intenționat"],
      explanation: "Acest paragraf folosește un limbaj puternic polarizant și denigrator ('extremiști', 'fanatici deliranți', 'propaganda isterică'). Apelează la dezgust ('insecte dezgustătoare') și la frica de a pierde tradițiile pentru a manipula cititorul."
    }
  }
];

export default function EchoChamberEscape() {
  const [appState, setAppState] = useState<AppState>('select-topic');
  const [isLoading, setIsLoading] = useState(false);
  const [articleData, setArticleData] = useState<ArticleData | null>(null);
  const [selectedWordIndices, setSelectedWordIndices] = useState<number[]>([]);

  const cleanWord = (w: string) => w.toLowerCase().replace(/[^a-z0-9ăâîșț-]/g, '');

  const handleSelectTopic = async (topic: typeof TOPICS[0]) => {
    setIsLoading(true);
    
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API key is missing.");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const prompt = `
        Ești un expert în analiza discursului și manipulare media.
        Scrie un scurt paragraf (aproximativ 3-4 propoziții) despre subiectul: "${topic.title}".
        Context: ${topic.description}
        Paragraful trebuie să fie scris dintr-o perspectivă extrem de părtinitoare, folosind intenționat un limbaj manipulator, exagerat, toxic și încărcat emoțional pentru a influența cititorul.
        
        Apoi, identifică exact cuvintele toxice/manipulatoare folosite în text (doar cuvintele individuale, exact cum apar în text, fără semne de punctuație).
        
        La final, oferă o scurtă explicație (2-3 propoziții) despre tehnicile de manipulare folosite în text (ex: apel la frică, atac la persoană, hiperbolă).
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              text: {
                type: Type.STRING,
                description: "Textul manipulator generat.",
              },
              toxicWords: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING,
                },
                description: "Lista de cuvinte toxice sau manipulatoare din text (fără punctuație, litere mici).",
              },
              explanation: {
                type: Type.STRING,
                description: "Explicația tehnicilor de manipulare folosite.",
              },
            },
            required: ["text", "toxicWords", "explanation"],
          },
        },
      });

      const jsonStr = response.text?.trim();
      if (jsonStr) {
        const data = JSON.parse(jsonStr) as ArticleData;
        data.toxicWords = data.toxicWords.map(w => cleanWord(w));
        setArticleData(data);
      } else {
        setArticleData(topic.data); // fallback
      }
    } catch (error) {
      console.error("Error generating article:", error);
      setArticleData(topic.data); // fallback to dummy data
    } finally {
      setSelectedWordIndices([]);
      setAppState('analyzing');
      setIsLoading(false);
    }
  };

  const toggleWordSelection = (index: number) => {
    if (appState !== 'analyzing') return;
    
    setSelectedWordIndices(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleSubmitAnalysis = () => {
    if (selectedWordIndices.length === 0) {
      alert("Te rugăm să marchezi cel puțin un cuvânt înainte de a verifica.");
      return;
    }
    setAppState('results');
  };

  const handlePlayAgain = () => {
    setAppState('select-topic');
    setArticleData(null);
    setSelectedWordIndices([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-200">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 p-2 rounded-xl shadow-sm">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl md:text-2xl tracking-tight text-slate-900">Scapă din Bula de Ecou</h1>
              <p className="text-sm text-slate-500 hidden md:block">Aplicație educațională pentru detectarea manipulării media</p>
            </div>
          </div>
          {appState !== 'select-topic' && (
            <button 
              onClick={handlePlayAgain}
              className="text-sm font-medium text-orange-600 hover:text-orange-700 flex items-center gap-2 transition-colors px-4 py-2 rounded-lg hover:bg-orange-50"
            >
              <RefreshCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Alege alt subiect</span>
            </button>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        {isLoading ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex flex-col items-center justify-center py-32 space-y-6"
          >
            <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
            <p className="text-lg text-slate-600 font-medium animate-pulse">Generăm un articol manipulator...</p>
          </motion.div>
        ) : (
          <>
            {/* Phase 1: Topic Selection */}
            {appState === 'select-topic' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                className="space-y-10"
              >
                <div className="text-center space-y-4">
                  <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">Alege o Misiune</h2>
                  <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Selectează un subiect de mai jos pentru a citi un articol generat. Scopul tău este să identifici și să marchezi cuvintele încărcate emoțional, subiective sau toxice folosite pentru a manipula cititorul.
                  </p>
                </div>

                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {TOPICS.map((topic) => {
                    const Icon = topic.icon;
                    return (
                      <button
                        key={topic.id}
                        onClick={() => handleSelectTopic(topic)}
                        className="group relative flex flex-col items-start p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-orange-300 transition-all text-left"
                      >
                        <div className="bg-orange-50 p-4 rounded-xl mb-6 group-hover:bg-orange-100 transition-colors">
                          <Icon className="w-8 h-8 text-orange-600" />
                        </div>
                        <h3 className="font-bold text-xl mb-3 text-slate-900">{topic.title}</h3>
                        <p className="text-base text-slate-600 leading-relaxed">{topic.description}</p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Phase 2 & 3: Analyzing & Results */}
            {(appState === 'analyzing' || appState === 'results') && articleData && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                className="space-y-10 max-w-4xl mx-auto"
              >
                <div className="space-y-3 text-center md:text-left">
                  <div className="inline-flex items-center rounded-full border border-transparent bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-800">
                    {appState === 'analyzing' ? 'Analizează Textul' : 'Raportul de Analiză'}
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                    {appState === 'analyzing' ? 'Identifică Manipularea' : 'Cum te-ai descurcat?'}
                  </h2>
                  <p className="text-lg text-slate-600">
                    {appState === 'analyzing' 
                      ? 'Apasă pe cuvintele care ți se par exagerate, subiective sau care încearcă să te manipuleze emoțional.' 
                      : 'Compară selecțiile tale cu analiza realizată de Inteligența Artificială.'}
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-12 text-xl md:text-2xl leading-loose md:leading-loose text-slate-800">
                  <div className="flex flex-wrap gap-x-1.5 gap-y-3">
                    {articleData.text.split(' ').map((word, index) => {
                      const isSelected = selectedWordIndices.includes(index);
                      const cleanedWord = cleanWord(word);
                      const isToxic = articleData.toxicWords.includes(cleanedWord);
                      
                      let wordClasses = "px-1.5 rounded transition-colors duration-200 ";
                      
                      if (appState === 'analyzing') {
                        wordClasses += isSelected 
                          ? "bg-orange-200 text-orange-900 cursor-pointer" 
                          : "cursor-pointer hover:bg-slate-200";
                      } else if (appState === 'results') {
                        if (isSelected && isToxic) {
                          // Correctly identified
                          wordClasses += "bg-green-200 text-green-900 font-medium";
                        } else if (!isSelected && isToxic) {
                          // Missed
                          wordClasses += "bg-red-100 text-red-900 underline decoration-red-500 decoration-2 underline-offset-4";
                        } else if (isSelected && !isToxic) {
                          // Wrongly selected
                          wordClasses += "bg-slate-200 text-slate-500 line-through decoration-slate-400";
                        } else {
                          // Normal word, not selected, not toxic
                          wordClasses += "text-slate-700 opacity-80";
                        }
                      }

                      return (
                        <span 
                          key={index} 
                          onClick={() => toggleWordSelection(index)}
                          className={wordClasses}
                        >
                          {word}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {appState === 'analyzing' && (
                  <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm gap-4">
                    <div className="text-lg font-medium text-slate-600">
                      Cuvinte suspecte marcate: <span className="text-orange-600 font-bold text-xl">{selectedWordIndices.length}</span>
                    </div>
                    <button 
                      onClick={handleSubmitAnalysis}
                      className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl text-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 bg-orange-600 text-white hover:bg-orange-700 h-14 px-8 shadow-md"
                    >
                      Verifică Analiza
                    </button>
                  </div>
                )}

                {appState === 'results' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-8"
                  >
                    {/* Legend */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-6 text-base bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <div className="flex items-center gap-3">
                        <span className="w-4 h-4 rounded-full bg-green-400 shadow-sm"></span>
                        <span className="text-slate-700 font-medium">Identificat Corect</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-4 h-4 rounded-full bg-red-400 shadow-sm"></span>
                        <span className="text-slate-700 font-medium">Cuvânt Toxic Ratat</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-4 h-4 rounded-full bg-slate-300 shadow-sm"></span>
                        <span className="text-slate-700 font-medium">Selectat Greșit</span>
                      </div>
                    </div>

                    {/* Explanation Alert */}
                    <div className="relative w-full rounded-2xl border-2 border-orange-200 bg-orange-50/50 p-8 text-orange-900 shadow-sm">
                      <div className="flex flex-col md:flex-row gap-5">
                        <AlertCircle className="w-8 h-8 text-orange-600 shrink-0" />
                        <div className="space-y-3">
                          <h4 className="text-xl font-bold text-orange-900">Explicația Inteligenței Artificiale</h4>
                          <p className="text-lg text-orange-800/90 leading-relaxed">
                            {articleData.explanation}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center pt-6">
                      <button 
                        onClick={handlePlayAgain}
                        className="inline-flex items-center justify-center rounded-xl text-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 bg-white border-2 border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300 h-14 px-10 shadow-sm gap-3"
                      >
                        <RefreshCcw className="w-5 h-5" />
                        Joacă din nou / Alege alt subiect
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
