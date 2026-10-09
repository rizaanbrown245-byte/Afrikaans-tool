import React, { useState, useEffect } from 'react';
import {
  X,
  Volume2,
  Check,
  Sparkles,
  ShieldCheck,
  Play,
  RefreshCw,
  VolumeX,
  Mic,
  MicOff,
  Sliders,
  BookOpen,
  Square,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import {
  getAvailableSouthAfricanVoices,
  getCurrentVoiceInfo,
  setPreferredVoiceURI,
  getPreferredVoiceURI,
  testSouthAfricanVoice,
  stopSpeaking,
  isAuthenticSouthAfricanVoice,
  isAfrikaansVoice,
  getSentenceReadingConfig,
  updateSentenceReadingConfig,
  SentenceReadingConfig,
  speakAfrikaansSentence,
  isVoiceToTextSupported,
  startVoiceToText,
  stopVoiceToText,
  SpeechRecognitionResultData,
  sounds
} from '../utils/audio';

interface VoiceSettingsModalProps {
  onClose: () => void;
}

export const VoiceSettingsModal: React.FC<VoiceSettingsModalProps> = ({ onClose }) => {
  const { progress, toggleSound } = useProgress();
  const [activeTab, setActiveTab] = useState<'voice' | 'sentence' | 'voicetotext'>('sentence');

  // Voices state
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [currentVoice, setCurrentVoice] = useState(getCurrentVoiceInfo());
  const [selectedUri, setSelectedUri] = useState<string>(getPreferredVoiceURI() || '');
  const [isTesting, setIsTesting] = useState(false);

  // Sentence reading config state
  const [sentenceConfig, setSentenceConfig] = useState<SentenceReadingConfig>(getSentenceReadingConfig());
  const [isTestingSentence, setIsTestingSentence] = useState(false);
  const [testSpokenWord, setTestSpokenWord] = useState('');

  // Voice to text (speech recognition) state
  const [isListeningTest, setIsListeningTest] = useState(false);
  const [interimTestText, setInterimTestText] = useState('');
  const [voiceTestResult, setVoiceTestResult] = useState<SpeechRecognitionResultData | null>(null);
  const [micError, setMicError] = useState<string | null>(null);
  const isMicAvailable = isVoiceToTextSupported();

  const sampleSentence = 'Die vriendelike hond hardloop elke oggend vinnig in die groen tuin.';

  useEffect(() => {
    const updateVoices = () => {
      const avail = getAvailableSouthAfricanVoices();
      setVoices(avail);
      setCurrentVoice(getCurrentVoiceInfo());
    };

    updateVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    return () => {
      stopSpeaking();
      stopVoiceToText();
    };
  }, []);

  const handleSelectVoice = (uri: string) => {
    sounds.playPop();
    setSelectedUri(uri);
    setPreferredVoiceURI(uri);
    setCurrentVoice(getCurrentVoiceInfo());
  };

  const handleResetToDefaultZA = () => {
    sounds.playPop();
    setSelectedUri('');
    setPreferredVoiceURI('');
    setCurrentVoice(getCurrentVoiceInfo());
  };

  const handleTestVoice = () => {
    sounds.playPop();
    setIsTesting(true);
    testSouthAfricanVoice(() => {
      setIsTesting(false);
    });
  };

  const handleConfigChange = (cfg: Partial<SentenceReadingConfig>) => {
    sounds.playPop();
    const updated = { ...sentenceConfig, ...cfg };
    setSentenceConfig(updated);
    updateSentenceReadingConfig(updated);
  };

  const handleTestSentenceReading = async () => {
    sounds.playPop();
    if (isTestingSentence) {
      stopSpeaking();
      setIsTestingSentence(false);
      setTestSpokenWord('');
      return;
    }

    setIsTestingSentence(true);
    await speakAfrikaansSentence(sampleSentence, {
      style: sentenceConfig.style,
      pauseBetweenClauses: sentenceConfig.clausePauseMs,
      onWordBoundary: (word) => {
        setTestSpokenWord(word);
      },
      onEnd: () => {
        setIsTestingSentence(false);
        setTestSpokenWord('');
      },
      onError: () => {
        setIsTestingSentence(false);
        setTestSpokenWord('');
      }
    });
  };

  const handleStartMicTest = () => {
    sounds.playPop();
    if (isListeningTest) {
      stopVoiceToText();
      setIsListeningTest(false);
      return;
    }

    stopSpeaking();
    setIsTestingSentence(false);
    setMicError(null);
    setVoiceTestResult(null);
    setInterimTestText('');
    setIsListeningTest(true);

    const started = startVoiceToText({
      lang: sentenceConfig.recognitionLang,
      targetSentence: 'Goeiemôre juffrou!',
      onInterim: (text) => {
        setInterimTestText(text);
      },
      onFinal: (res) => {
        setIsListeningTest(false);
        setVoiceTestResult(res);
        setInterimTestText('');
        if (res.matchScore && res.matchScore >= 70) {
          sounds.playVictory();
        } else {
          sounds.playCorrect();
        }
      },
      onError: (err) => {
        setIsListeningTest(false);
        setMicError(err);
      },
      onEnd: () => {
        setIsListeningTest(false);
      }
    });

    if (!started) {
      setIsListeningTest(false);
    }
  };

  const southAfricanVoices = voices.filter((v) => isAuthenticSouthAfricanVoice(v));
  const otherVoices = voices.filter((v) => !isAuthenticSouthAfricanVoice(v));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-3xl border-3 border-amber-300 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-4 sm:p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">🇿🇦</span>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                Ollie se Spraak-Laboratorium
              </span>
              <h2 className="font-fun text-xl sm:text-2xl font-black text-white">
                Spraak & Sin-Lees Konfigurasie
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-3 pt-2 gap-1 overflow-x-auto no-scrollbar">
          <button
            onClick={() => { setActiveTab('sentence'); sounds.playPop(); }}
            className={`px-3 py-2 rounded-t-xl font-fun font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'sentence'
                ? 'bg-white text-emerald-950 border-t-2 border-x-2 border-slate-200 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sliders className="w-4 h-4 text-emerald-600" />
            <span>Sinne-Lees Styl & Pouses</span>
          </button>

          <button
            onClick={() => { setActiveTab('voicetotext'); sounds.playPop(); }}
            className={`px-3 py-2 rounded-t-xl font-fun font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'voicetotext'
                ? 'bg-white text-emerald-950 border-t-2 border-x-2 border-slate-200 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mic className="w-4 h-4 text-emerald-600" />
            <span>Spraak-na-Teks (Mikrofoon)</span>
          </button>

          <button
            onClick={() => { setActiveTab('voice'); sounds.playPop(); }}
            className={`px-3 py-2 rounded-t-xl font-fun font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'voice'
                ? 'bg-white text-emerald-950 border-t-2 border-x-2 border-slate-200 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Volume2 className="w-4 h-4 text-emerald-600" />
            <span>Stem-keuse (🇿🇦 ZA)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* TAB 1: SENTENCE READING STYLE & PROSODY */}
          {activeTab === 'sentence' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🦉</span>
                  <h3 className="font-fun font-black text-amber-950 text-sm sm:text-base">
                    Hoe Ollie Sinne Lees (Prosodie & Klousule-Pouses)
                  </h3>
                </div>
                <p className="text-xs text-amber-900 leading-relaxed font-semibold">
                  Afrikaanse sinne word in natuurlike klousules verdeel met klein asemhaling-pouses by leestekens en voegwoorde (en, maar, want, omdat) sodat leerders elke sinsdeel mooi verstaan.
                </p>
              </div>

              {/* Pronunciation Mode Selection (Phonetic vs Direct) */}
              <div className="bg-emerald-50/80 border-2 border-emerald-300 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🇿🇦</span>
                    <h4 className="font-fun font-black text-sm text-emerald-950">
                      Afrikaanse Uitspraak-Metode
                    </h4>
                  </div>
                  <span className="text-[10px] font-black uppercase bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">
                    Geen Nederlands
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => handleConfigChange({ pronunciationMode: 'phonetic' })}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      sentenceConfig.pronunciationMode === 'phonetic'
                        ? 'bg-white border-emerald-500 ring-2 ring-emerald-300/50 shadow-2xs'
                        : 'bg-white/60 border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-fun font-black text-xs text-emerald-950">
                        🌟 Suid-Afrikaans Foneties (Aanbeveel)
                      </span>
                      {sentenceConfig.pronunciationMode === 'phonetic' && (
                        <Check className="w-4 h-4 text-emerald-600" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium leading-tight">
                      Omskep woorde outomaties sodat die stem suiwer Afrikaans klink ("die" klink soos "dee", "nie" soos "nee", "baie" soos "buy-uh", "hond" soos "hohnt"). Geen Nederlandse aksent!
                    </p>
                  </button>

                  <button
                    onClick={() => handleConfigChange({ pronunciationMode: 'direct' })}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      sentenceConfig.pronunciationMode === 'direct'
                        ? 'bg-white border-emerald-500 ring-2 ring-emerald-300/50 shadow-2xs'
                        : 'bg-white/60 border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-fun font-black text-xs text-slate-800">
                        🗣️ Direkte Afrikaanse Teks
                      </span>
                      {sentenceConfig.pronunciationMode === 'direct' && (
                        <Check className="w-4 h-4 text-emerald-600" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium leading-tight">
                      Stuur rou Afrikaanse teks direk na die stem-enjin. Gebruik slegs as jou toestel 'n inheemse af-ZA stem het.
                    </p>
                  </button>
                </div>
              </div>

              {/* Reading style selection */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-600">
                  Kies Lees-Styl vir Graad 4:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    {
                      id: 'classroom',
                      title: 'Klaskamer (Aanbeveel)',
                      desc: 'Rustige tempo, duidelike pouses tussen sinsdele vir Graad 4 leerders.',
                      badge: 'Graad 4 Standaard'
                    },
                    {
                      id: 'natural',
                      title: 'Natuurlik & Vloeiend',
                      desc: 'Vloeiende prosodie met sagte leesteken-pouses.',
                      badge: 'Geselsend'
                    },
                    {
                      id: 'word-by-word',
                      title: 'Woord-vir-Woord',
                      desc: 'Baie stadig, ideaal vir leerders wat nog sukkel.',
                      badge: 'Beginner'
                    }
                  ].map((st) => (
                    <button
                      key={st.id}
                      onClick={() => handleConfigChange({ style: st.id as any })}
                      className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                        sentenceConfig.style === st.id
                          ? 'bg-emerald-50 border-emerald-500 shadow-2xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-fun font-black text-xs text-slate-900">
                            {st.title}
                          </span>
                          {sentenceConfig.style === st.id && (
                            <Check className="w-4 h-4 text-emerald-600" />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-600 font-medium leading-snug">
                          {st.desc}
                        </p>
                      </div>
                      <span className="mt-2 text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 w-fit">
                        {st.badge}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pause length slider */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-fun font-bold text-sm text-slate-900">
                      Pouseer-Lengte Tussen Sinsdele
                    </span>
                    <p className="text-xs text-slate-500">
                      Klein asemhaling-pouse by kommas en voegwoorde
                    </p>
                  </div>
                  <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-lg border border-emerald-300">
                    {sentenceConfig.clausePauseMs} ms ({sentenceConfig.clausePauseMs <= 180 ? 'Kort' : sentenceConfig.clausePauseMs <= 300 ? 'Normaal' : 'Rustig'})
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  {[
                    { label: 'Kort (160ms)', val: 160 },
                    { label: 'Normaal (260ms)', val: 260 },
                    { label: 'Langer Pouse (380ms)', val: 380 }
                  ].map((p) => (
                    <button
                      key={p.val}
                      onClick={() => handleConfigChange({ clausePauseMs: p.val })}
                      className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition-colors ${
                        sentenceConfig.clausePauseMs === p.val
                          ? 'bg-emerald-500 text-white border-emerald-600'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live interactive sentence tester */}
              <div className="bg-white border-2 border-emerald-300 rounded-2xl p-4 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-fun font-black text-xs uppercase text-emerald-900">
                    Toets Sin-Voorbeeld Intyds:
                  </span>
                  <button
                    onClick={handleTestSentenceReading}
                    disabled={!progress.soundEnabled}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-fun font-black text-xs shadow-2xs transition-all ${
                      isTestingSentence
                        ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                        : 'bg-emerald-500 hover:bg-emerald-600 text-white active:scale-95'
                    }`}
                  >
                    {isTestingSentence ? (
                      <>
                        <Square className="w-3.5 h-3.5 fill-white" />
                        <span>Stop</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Hoor Sin 🔊</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Sentence with karaoke word highlighting */}
                <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200 font-fun text-sm font-bold text-slate-900 leading-relaxed">
                  {sampleSentence.split(/(\s+)/).map((w, idx) => {
                    const clean = w.replace(/[.,!?;:"'—]/g, '').toLowerCase();
                    const activeClean = testSpokenWord.replace(/[.,!?;:"'—]/g, '').toLowerCase();
                    const isSpoken = isTestingSentence && activeClean && clean === activeClean;

                    return (
                      <span
                        key={idx}
                        className={`transition-all rounded px-0.5 py-0.2 inline-block ${
                          isSpoken
                            ? 'bg-amber-300 text-amber-950 font-black scale-105 shadow-2xs ring-2 ring-amber-400'
                            : ''
                        }`}
                      >
                        {w}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VOICE-TO-TEXT (SPEECH RECOGNITION / PRAAT-NA-TEKS) */}
          {activeTab === 'voicetotext' && (
            <div className="space-y-4">
              <div className="bg-sky-50 border-2 border-sky-300 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mic className="w-5 h-5 text-sky-700" />
                    <h3 className="font-fun font-black text-sky-950 text-sm sm:text-base">
                      Spraak-na-Teks (Voice-to-Text Mikrofoon)
                    </h3>
                  </div>

                  <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                    isMicAvailable
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-rose-100 text-rose-900 border border-rose-300'
                  }`}>
                    {isMicAvailable ? 'Ondersteun ✓' : 'Nie beskikbaar nie'}
                  </span>
                </div>

                <p className="text-xs text-sky-900 font-semibold leading-relaxed">
                  Leerders kan hardop in die mikrofoon praat om hul Afrikaanse uitspraak en praatvaardigheid ("Luister en Praat") te oefen. Die stelsel skakel stem intyds om na teks en meet akkuraatheid.
                </p>
              </div>

              {/* Recognition language selector */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <label className="text-xs font-black uppercase text-slate-600 block">
                  Herkenningstaal-konfigurasie:
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleConfigChange({ recognitionLang: 'af-ZA' })}
                    className={`p-3 rounded-xl border-2 text-left font-fun transition-colors ${
                      sentenceConfig.recognitionLang === 'af-ZA'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                        : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-black text-xs">Afrikaans (af-ZA) 🇿🇦</span>
                      {sentenceConfig.recognitionLang === 'af-ZA' && <Check className="w-4 h-4 text-emerald-600" />}
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Standaard Afrikaanse spraakherkenning vir inheemse uitspraak.
                    </p>
                  </button>

                  <button
                    onClick={() => handleConfigChange({ recognitionLang: 'en-ZA' })}
                    className={`p-3 rounded-xl border-2 text-left font-fun transition-colors ${
                      sentenceConfig.recognitionLang === 'en-ZA'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                        : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-black text-xs">Suid-Afrikaans (en-ZA)</span>
                      {sentenceConfig.recognitionLang === 'en-ZA' && <Check className="w-4 h-4 text-emerald-600" />}
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Bied ekstra toleransie vir leerders met Engelse huistaal.
                    </p>
                  </button>
                </div>
              </div>

              {/* Interactive mic tester */}
              <div className="bg-white border-2 border-sky-300 rounded-2xl p-4 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-fun font-black text-xs uppercase text-sky-900 block">
                      Toets Mikrofoon & Spraak-na-Teks:
                    </span>
                    <span className="text-xs text-slate-500">
                      Probeer sê: <strong className="text-slate-800">"Goeiemôre juffrou!"</strong>
                    </span>
                  </div>

                  <button
                    onClick={handleStartMicTest}
                    disabled={!isMicAvailable}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-fun font-black text-xs shadow-2xs transition-all ${
                      isListeningTest
                        ? 'bg-emerald-600 text-white animate-pulse'
                        : 'bg-emerald-500 hover:bg-emerald-600 text-white active:scale-95'
                    }`}
                  >
                    <Mic className={`w-4 h-4 ${isListeningTest ? 'animate-bounce' : ''}`} />
                    <span>{isListeningTest ? 'Ollie Luister...' : 'Praat Nou 🎙️'}</span>
                  </button>
                </div>

                {/* Live speech feedback */}
                {isListeningTest && (
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-300 text-xs flex items-center gap-2 text-emerald-950 font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                    <span>
                      Luister intyds: <em>"{interimTestText || 'Praat nou in jou mikrofoon...'}"</em>
                    </span>
                  </div>
                )}

                {/* Final speech result */}
                {voiceTestResult && voiceTestResult.transcript && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700">
                        🎤 Herkende teks: <strong className="text-slate-900">"{voiceTestResult.transcript}"</strong>
                      </span>
                      {voiceTestResult.matchScore !== undefined && (
                        <span className="bg-emerald-100 text-emerald-900 font-black px-2 py-0.5 rounded-full">
                          {voiceTestResult.matchScore}% Pasmaat
                        </span>
                      )}
                    </div>
                    {voiceTestResult.matchScore && voiceTestResult.matchScore >= 70 ? (
                      <p className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Uitstekend! Mikrofoon en spraak-na-teks werk 100%!
                      </p>
                    ) : (
                      <p className="text-slate-600 font-semibold">
                        Goeie probeerslag! Mikrofoon is aktief en werk na wense.
                      </p>
                    )}
                  </div>
                )}

                {micError && (
                  <div className="p-2.5 bg-rose-50 border border-rose-300 rounded-xl text-xs text-rose-800 font-semibold">
                    ⚠️ {micError}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: VOICE SELECTION & MASTER SOUND */}
          {activeTab === 'voice' && (
            <div className="space-y-4">
              {/* Active Accent Status Banner */}
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-fun text-sm font-black text-emerald-950">
                      Suid-Afrikaanse Stem Aktief 🇿🇦
                    </span>
                    <span className="text-[10px] bg-emerald-200 text-emerald-900 font-extrabold px-2 py-0.5 rounded-full uppercase">
                      Geen Nederlandse Aksent
                    </span>
                  </div>
                  <p className="text-xs text-emerald-800 font-semibold leading-relaxed">
                    Alle Nederlandse en Vlaamse stemme is geblokkeer. Woorde word uitgespreek met 'n outentieke Suid-Afrikaanse stem vir Graad 4 leerders.
                  </p>
                  <div className="pt-1 text-xs text-slate-700 font-bold flex items-center gap-1.5">
                    <span>Huidige stem:</span>
                    <span className="text-emerald-900 bg-emerald-100/80 px-2 py-0.5 rounded-md border border-emerald-300">
                      {currentVoice.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Test Voice Button */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex items-center justify-between gap-3">
                <div>
                  <h4 className="font-fun font-bold text-sm text-amber-950">
                    Toets Ollie se Stem
                  </h4>
                  <p className="text-xs text-amber-800">
                    Hoor hoe Ollie groet in Suid-Afrikaanse Afrikaans
                  </p>
                </div>

                <button
                  onClick={handleTestVoice}
                  disabled={isTesting || !progress.soundEnabled}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs sm:text-sm shadow-sm transition-all ${
                    isTesting
                      ? 'bg-amber-600 text-white animate-pulse'
                      : 'bg-amber-500 hover:bg-amber-600 text-white hover:scale-105 active:scale-95'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{isTesting ? 'Praat nou...' : 'Toets Stem 🔊'}</span>
                </button>
              </div>

              {/* Master Sound On/Off Toggle */}
              <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                <div>
                  <span className="font-fun font-bold text-sm text-slate-900">
                    Klank & Spraak Algeheel
                  </span>
                  <p className="text-xs text-slate-500">
                    Skakel alle klankeffekte en uitspraak aan of af
                  </p>
                </div>

                <button
                  onClick={toggleSound}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-fun text-xs font-black transition-colors ${
                    progress.soundEnabled
                      ? 'bg-emerald-500 text-white border-emerald-600'
                      : 'bg-rose-100 text-rose-800 border-rose-300'
                  }`}
                >
                  {progress.soundEnabled ? (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Aan</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>Af</span>
                    </>
                  )}
                </button>
              </div>

              {/* Available Voices List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-slate-500">
                    Beskikbare Stemme op Jou Toestel
                  </span>
                  {selectedUri && (
                    <button
                      onClick={handleResetToDefaultZA}
                      className="text-xs text-emerald-700 hover:underline flex items-center gap-1 font-bold"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Herstel na Standaard ZA</span>
                    </button>
                  )}
                </div>

                {southAfricanVoices.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-black text-emerald-800">
                      Aanbeveel: Suid-Afrikaanse Stemme 🇿🇦
                    </span>
                    {southAfricanVoices.map((v) => {
                      const isSelected = selectedUri === v.voiceURI || (!selectedUri && currentVoice.uri === v.voiceURI);
                      return (
                        <button
                          key={v.voiceURI}
                          onClick={() => handleSelectVoice(v.voiceURI)}
                          className={`w-full text-left p-2.5 rounded-xl border text-xs flex items-center justify-between transition-colors ${
                            isSelected
                              ? 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black'
                              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span>🇿🇦</span>
                            <span className="truncate">{v.name}</span>
                            <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded font-bold">
                              {v.lang}
                            </span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Other Commonwealth / English voices (still non-Dutch) */}
                {otherVoices.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-black text-slate-600">
                      Ander Nie-Nederlandse Stemme (Engels)
                    </span>
                    <div className="max-h-36 overflow-y-auto space-y-1 pr-1">
                      {otherVoices.slice(0, 8).map((v) => {
                        const isSelected = selectedUri === v.voiceURI;
                        return (
                          <button
                            key={v.voiceURI}
                            onClick={() => handleSelectVoice(v.voiceURI)}
                            className={`w-full text-left p-2 rounded-xl border text-xs flex items-center justify-between transition-colors ${
                              isSelected
                                ? 'bg-amber-100 border-amber-500 text-amber-950 font-bold'
                                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                            }`}
                          >
                            <span className="truncate">{v.name} ({v.lang})</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-3 sm:p-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-semibold">
            Instellings word outomaties gestoor
          </span>
          <button
            onClick={onClose}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-fun font-black px-6 py-2 rounded-xl text-sm shadow-sm"
          >
            Stoor & Klaar ✓
          </button>
        </div>
      </div>
    </div>
  );
};
