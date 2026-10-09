import React, { useState, useEffect } from 'react';
import { Volume2, Mic, MicOff, Square, Sparkles, CheckCircle, AlertCircle, RotateCcw, Award } from 'lucide-react';
import {
  speakAfrikaansSentence,
  stopSpeaking,
  startVoiceToText,
  stopVoiceToText,
  isVoiceToTextSupported,
  SpeechRecognitionResultData,
  sounds
} from '../utils/audio';
import { useProgress } from '../context/ProgressContext';

interface SentenceAudioPlayerProps {
  sentenceAf: string;
  sentenceEn?: string;
  label?: string;
  highlightWords?: string[];
  onPracticed?: () => void;
  className?: string;
}

export const SentenceAudioPlayer: React.FC<SentenceAudioPlayerProps> = ({
  sentenceAf,
  sentenceEn,
  label,
  highlightWords = [],
  onPracticed,
  className = ''
}) => {
  const { addStars, triggerConfetti } = useProgress();

  // Audio / Speech state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSpokenWord, setCurrentSpokenWord] = useState<string>('');
  const [activeCharIndex, setActiveCharIndex] = useState<number>(-1);
  const [isSlowPace, setIsSlowPace] = useState(false);

  // Voice to text (speech recognition) state
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [voiceResult, setVoiceResult] = useState<SpeechRecognitionResultData | null>(null);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const isMicAvailable = isVoiceToTextSupported();

  useEffect(() => {
    return () => {
      stopSpeaking();
      stopVoiceToText();
    };
  }, [sentenceAf]);

  const handlePlay = async () => {
    sounds.playPop();
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      setCurrentSpokenWord('');
      setActiveCharIndex(-1);
      return;
    }

    setIsPlaying(true);
    setVoiceResult(null);

    await speakAfrikaansSentence(sentenceAf, {
      rate: isSlowPace ? 0.65 : 0.80,
      style: isSlowPace ? 'word-by-word' : 'classroom',
      onWordBoundary: (word, charIndex) => {
        setCurrentSpokenWord(word);
        setActiveCharIndex(charIndex);
      },
      onEnd: () => {
        setIsPlaying(false);
        setCurrentSpokenWord('');
        setActiveCharIndex(-1);
      },
      onError: () => {
        setIsPlaying(false);
        setCurrentSpokenWord('');
        setActiveCharIndex(-1);
      }
    });
  };

  const handleToggleListening = () => {
    sounds.playPop();
    if (isListening) {
      stopVoiceToText();
      setIsListening(false);
      return;
    }

    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
    }

    setVoiceError(null);
    setVoiceResult(null);
    setInterimTranscript('');
    setIsListening(true);

    const started = startVoiceToText({
      targetSentence: sentenceAf,
      onInterim: (text) => {
        setInterimTranscript(text);
      },
      onFinal: (res) => {
        setIsListening(false);
        setVoiceResult(res);
        setInterimTranscript('');

        if (res.matchScore && res.matchScore >= 75) {
          sounds.playVictory();
          addStars(3);
          triggerConfetti();
          onPracticed?.();
        } else if (res.transcript) {
          sounds.playCorrect();
        }
      },
      onError: (err) => {
        setIsListening(false);
        setVoiceError(err);
      },
      onEnd: () => {
        setIsListening(false);
      }
    });

    if (!started) {
      setIsListening(false);
    }
  };

  // Split sentence into words for visual highlighting
  const words = sentenceAf.split(/(\s+)/);

  return (
    <div className={`p-4 rounded-2xl border-2 transition-all ${
      isPlaying
        ? 'bg-amber-50/90 border-amber-400 ring-2 ring-amber-300/40 shadow-sm'
        : 'bg-white border-slate-200 hover:border-amber-300'
    } ${className}`}>
      {/* Top bar with label & controls */}
      <div className="flex items-center justify-between gap-2 mb-2 text-xs">
        {label ? (
          <span className="font-fun font-black uppercase text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md">
            {label}
          </span>
        ) : (
          <span className="font-fun font-bold text-slate-500">
            Sin-Voorbeeld
          </span>
        )}

        <div className="flex items-center gap-1.5 ml-auto">
          {/* Slow pace toggle */}
          <button
            onClick={() => {
              sounds.playPop();
              setIsSlowPace(!isSlowPace);
            }}
            className={`px-2 py-1 rounded-lg font-fun text-[11px] font-bold border transition-colors ${
              isSlowPace
                ? 'bg-amber-200 text-amber-950 border-amber-400'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
            title="Wissel leesspoed (Normaal / Stadiger)"
          >
            {isSlowPace ? '🐢 Stadig' : '🔊 Normaal'}
          </button>

          {/* Play / Listen button */}
          <button
            onClick={handlePlay}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-fun font-bold text-xs shadow-2xs transition-all active:scale-95 ${
              isPlaying
                ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                : 'bg-amber-500 hover:bg-amber-600 text-white'
            }`}
            title={isPlaying ? 'Stop lees' : 'Luister hoe die sin natuurlik gelees word'}
          >
            {isPlaying ? (
              <>
                <Square className="w-3.5 h-3.5 fill-white" />
                <span>Stop</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                <span>Lees Sin</span>
              </>
            )}
          </button>

          {/* Voice to text / Speech recognition button */}
          {isMicAvailable && (
            <button
              onClick={handleToggleListening}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-fun font-bold text-xs shadow-2xs transition-all active:scale-95 ${
                isListening
                  ? 'bg-emerald-500 text-white animate-pulse ring-2 ring-emerald-300'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-300'
              }`}
              title="Praat die sin hardop in die mikrofoon (Voice-to-Text)"
            >
              <Mic className={`w-3.5 h-3.5 ${isListening ? 'animate-bounce' : 'text-emerald-700'}`} />
              <span>{isListening ? 'Luister...' : 'Praat Saam'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main sentence text with karaoke word highlighting */}
      <div className="font-fun text-base sm:text-lg font-bold text-slate-900 leading-relaxed select-none">
        {words.map((chunk, idx) => {
          if (/^\s+$/.test(chunk)) {
            return <span key={idx}>{chunk}</span>;
          }

          const cleanChunk = chunk.replace(/[.,!?;:"'—]/g, '').toLowerCase();
          const isCurrentActive =
            isPlaying &&
            currentSpokenWord &&
            cleanChunk === currentSpokenWord.replace(/[.,!?;:"'—]/g, '').toLowerCase();

          const isCustomHighlighted = highlightWords.some(
            (hw) => hw.toLowerCase() === cleanChunk
          );

          return (
            <span
              key={idx}
              className={`transition-all rounded px-1 py-0.5 inline-block ${
                isCurrentActive
                  ? 'bg-amber-300 text-amber-950 font-black scale-105 shadow-2xs ring-2 ring-amber-400'
                  : isCustomHighlighted
                  ? 'bg-amber-100 text-amber-900 border-b-2 border-amber-400'
                  : 'hover:text-amber-700'
              }`}
            >
              {chunk}
            </span>
          );
        })}
      </div>

      {/* English translation */}
      {sentenceEn && (
        <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
          {sentenceEn}
        </p>
      )}

      {/* Live Voice-to-Text Listening Banner */}
      {isListening && (
        <div className="mt-3 p-3 bg-emerald-50 border-2 border-emerald-400 rounded-2xl flex items-center justify-between gap-3 text-xs animate-in fade-in duration-150">
          <div className="flex items-center gap-2 text-emerald-950 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
            <span>
              Ollie luister... Praat die sin hardop:{' '}
              <em className="text-emerald-800 font-extrabold">"{interimTranscript || '...'}"</em>
            </span>
          </div>

          <button
            onClick={() => stopVoiceToText()}
            className="text-[11px] bg-emerald-600 hover:bg-emerald-700 text-white font-black px-2.5 py-1 rounded-lg shrink-0"
          >
            Klaar Gepraat
          </button>
        </div>
      )}

      {/* Voice-to-Text Evaluation Result */}
      {voiceResult && voiceResult.transcript && (
        <div className="mt-3 p-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
              <span>🎤 Wat jy gesê het:</span>
              <span className="text-slate-900 font-extrabold italic bg-white px-2 py-0.5 rounded border border-slate-300">
                "{voiceResult.transcript}"
              </span>
            </div>

            {voiceResult.matchScore !== undefined && (
              <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                voiceResult.matchScore >= 80
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : voiceResult.matchScore >= 60
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-rose-100 text-rose-900 border border-rose-300'
              }`}>
                {voiceResult.matchScore}% Pasmaat
              </span>
            )}
          </div>

          {/* Friendly Ollie feedback */}
          <div className="text-xs font-bold flex items-center gap-2">
            {voiceResult.matchScore && voiceResult.matchScore >= 80 ? (
              <span className="text-emerald-700 flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Fantasties! Jou Afrikaanse uitspraak is uitstekend! +3 Sterre ⭐
              </span>
            ) : voiceResult.matchScore && voiceResult.matchScore >= 60 ? (
              <span className="text-amber-800 flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Baie goeie poging! Luister weer na Ollie en probeer nog een keer!
              </span>
            ) : (
              <span className="text-slate-700 flex items-center gap-1">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Goeie probeerslag! Klik op "Lees Sin" om te hoor hoe Ollie dit sê, en praat dan weer.
              </span>
            )}
          </div>
        </div>
      )}

      {/* Voice Error notice if mic failed */}
      {voiceError && (
        <div className="mt-2 text-xs text-rose-700 font-semibold bg-rose-50 p-2 rounded-xl border border-rose-200">
          ⚠️ {voiceError}
        </div>
      )}
    </div>
  );
};
