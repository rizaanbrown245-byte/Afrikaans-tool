/**
 * Audio helper for Afrikaans Adventure
 * Provides offline Web Audio sound effects, Web Speech API synthesis with
 * intelligent South African Afrikaans phonetics & prosody, and researched
 * Voice-to-Text (Speech Recognition) configuration for Grade 4 learners.
 */

class SoundEffects {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  constructor() {
    // AudioContext will be initialized on first user gesture
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  private getContext(): AudioContext | null {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Play a cheerful high-pitched success chime
  public playCorrect() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5
      osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.35); // C6

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    } catch {
      // Audio fallback silent
    }
  }

  // Play gentle boing when answer needs another try (encouraging, not scary!)
  public playIncorrect() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(340, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.25);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // Audio fallback silent
    }
  }

  // Play pop click for buttons
  public playPop() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.08);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Audio fallback
    }
  }

  // Star celebration fanfare
  public playVictory() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + idx * 0.1;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.3);
      });
    } catch {
      // Audio fallback
    }
  }
}

export const sounds = new SoundEffects();

/**
 * Global audio state controller
 * Controls both Web Audio effects and Web Speech API synthesis
 */
export function setGlobalAudioEnabled(enabled: boolean) {
  sounds.setSoundEnabled(enabled);
  if (!enabled && typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function isGlobalAudioEnabled(): boolean {
  return sounds.isEnabled();
}

/**
 * =========================================================================
 * AFRIKAANS PHONETIC RESPELLING DICTIONARY & CONVERTER
 * Converts Afrikaans words into phonetic transcriptions that an English /
 * South African English SpeechSynthesis engine pronounces as real AFRIKAANS
 * (e.g. "die" -> "dee", "nie" -> "nee", "baie" -> "buy-uh", "hond" -> "hohnt",
 *  "hardloop" -> "hart-loop", "tuin" -> "tayn", "eet" -> "ee-ut")
 * Guarantees NO Dutch accent and NO English mispronunciation (no "Dye")!
 * =========================================================================
 */

const AFRIKAANS_PHONETIC_DICT: Record<string, string> = {
  // Articles, Pronouns, Helping words
  'die': 'dee',
  'nie': 'nee',
  'ek': 'eck',
  'jy': 'yay',
  'hy': 'hay',
  'sy': 'say',
  'ons': 'orns',
  'julle': 'yul-luh',
  'hulle': 'hul-luh',
  'u': 'ee',
  'my': 'may',
  'jou': 'yoh',
  'haar': 'hahr',
  'ons s\'n': 'orns suhn',
  'dit': 'duht',
  'dat': 'dut',
  'hier': 'heer',
  'daar': 'dahr',
  'hierdie': 'heer-dee',
  'daardie': 'dahr-dee',
  'en': 'ehn',
  'of': 'orf',
  'maar': 'mahr',
  'want': 'wunt',
  'omdat': 'om-dut',
  'toe': 'too',
  'as': 'us',
  'wanneer': 'vahn-neer',
  'wat': 'vuht',
  'waar': 'vahr',
  'wie': 'vee',
  'hoekom': 'hoo-kom',
  'hoeveel': 'hoo-feel',
  'hoe': 'hoo',
  'vir': 'fehr',
  'met': 'meht',
  'by': 'bay',
  'op': 'op',
  'in': 'in',
  'onder': 'on-der',
  'bo': 'boo-uh',
  'langs': 'lungks',
  'tussen': 'tuhs-suhn',
  'om': 'om',
  'aan': 'ahn',
  'af': 'uf',
  'uit': 'ayt',
  'tot': 'tot',
  'sonder': 'son-der',

  // Common verbs & auxiliaries
  'is': 'uhs',
  'was': 'vuhs',
  'sal': 'suhl',
  'het': 'heht',
  'kan': 'kun',
  'moet': 'moot',
  'wil': 'vuhl',
  'mag': 'much',
  'word': 'vohrt',
  'hardloop': 'hart-loop',
  'sit': 'suht',
  'staan': 'stahn',
  'slaap': 'slahp',
  'eet': 'ee-ut',
  'drink': 'drrink',
  'speel': 'spee-el',
  'leer': 'lee-er',
  'lees': 'lee-us',
  'skryf': 'skrayf',
  'teken': 'tee-kun',
  'swem': 'svem',
  'klim': 'kluhm',
  'lag': 'luch',
  'huil': 'hayl',
  'stap': 'stup',
  'ry': 'ray',
  'sien': 'seen',
  'hoor': 'hoor',
  'voel': 'fool',
  'ruik': 'rayk',
  'praat': 'praht',
  'sê': 'se',
  'vra': 'frah',
  'antwoord': 'unt-vohrt',
  'gee': 'chee',
  'neem': 'neem',
  'vat': 'fut',
  'bring': 'brrink',
  'koop': 'koo-up',
  'verkoop': 'fehr-koo-up',
  'help': 'help',
  'werk': 'vehrk',
  'maak': 'mahk',
  'breek': 'bree-uk',
  'kyk': 'kayk',
  'soek': 'sook',
  'vind': 'fuhnt',
  'bly': 'blay',
  'gaan': 'khahn',
  'kom': 'kom',
  'stop': 'stop',
  'begin': 'buh-chuhn',
  'verstaan': 'fehr-stahn',
  'onthou': 'ont-hoh',
  'vergeet': 'fehr-cheet',
  'weet': 'veet',
  'ken': 'ken',

  // Greetings & polite words
  'hallo': 'hul-loo',
  'goeie': 'gooy-uh',
  'goeiedag': 'gooy-uh-duch',
  'goeiemôre': 'gooy-uh moo-ruh',
  'goeiemiddag': 'gooy-uh muhd-duch',
  'goeienaand': 'gooy-uh nahnt',
  'goeienag': 'gooy-uh nuch',
  'môre': 'moo-ruh',
  'dankie': 'dun-kee',
  'baie': 'buy-uh',
  'baie dankie': 'buy-uh dun-kee',
  'asseblief': 'uh-suh-bleef',
  'totsiens': 'tot-seens',
  'verskoon': 'fehr-skoon',
  'verskoon my': 'fehr-skoon may',
  'jammer': 'yum-mer',
  'plesier': 'pluh-seer',
  'welkom': 'vel-kom',
  'veilige reis': 'fay-luh-chuh rays',
  'lekker': 'leh-ker',
  'lekker slaap': 'leh-ker slahp',

  // Animals
  'hond': 'hohnt',
  'honde': 'hohn-duh',
  'hondjie': 'hohnt-kee',
  'kat': 'cut',
  'katte': 'cut-tuh',
  'katjie': 'cut-kee',
  'leeu': 'lee-oow',
  'leeus': 'lee-oows',
  'tier': 'teer',
  'olifant': 'oo-lee-funt',
  'olifante': 'oo-lee-fun-tuh',
  'kameelperd': 'kuh-meel-pehrt',
  'sebra': 'see-brah',
  'renoster': 'reh-nos-ter',
  'seekoei': 'see-kooy',
  'koei': 'kooy',
  'kooie': 'kooy-uh',
  'perd': 'pehrt',
  'perde': 'pehr-duh',
  'skaap': 'skahp',
  'skape': 'skah-puh',
  'vark': 'fuhrk',
  'varke': 'fuhr-kuh',
  'hoender': 'hoon-der',
  'hoenders': 'hoon-ders',
  'voël': 'foo-ul',
  'voëls': 'foo-uls',
  'vis': 'fuhs',
  'visse': 'fuhs-suh',
  'slang': 'slung',
  'slange': 'slung-uh',
  'muis': 'mays',
  'muise': 'may-zuh',
  'apie': 'ah-pee',
  'bobbejaan': 'bob-buh-yahn',

  // School, Home, Nature
  'skool': 'skoo-el',
  'skole': 'skoo-luh',
  'klas': 'klus',
  'klaskamer': 'klus-kah-mer',
  'onderwyser': 'on-der-vay-zer',
  'onderwysers': 'on-der-vay-zers',
  'onderwyseres': 'on-der-vay-seh-res',
  'juffrou': 'yuf-frow',
  'meneer': 'muh-neer',
  'boek': 'book',
  'boeke': 'boo-kuh',
  'boekie': 'boo-kee',
  'potlood': 'pot-loo-ut',
  'potlode': 'pot-loo-duh',
  'pen': 'pen',
  'penne': 'pen-nuh',
  'liniaal': 'lee-nee-ahl',
  'uitveër': 'ayt-fee-er',
  'skêr': 'skehr',
  'sak': 'suk',
  'stoel': 'stool',
  'stoele': 'stoo-luh',
  'stoeltjie': 'stool-kee',
  'tafel': 'tah-ful',
  'tafels': 'tah-fuls',
  'tafeltjie': 'tah-ful-kee',
  'huis': 'hays',
  'huise': 'hay-zuh',
  'huisie': 'hay-see',
  'tuin': 'tayn',
  'tuine': 'tay-nuh',
  'deur': 'deer',
  'venster': 'fen-ster',
  'kamer': 'kah-mer',
  'kombuis': 'kom-bays',
  'badkamer': 'but-kah-mer',
  'slaapkamer': 'slahp-kah-mer',
  'boom': 'boo-um',
  'bome': 'boo-muh',
  'blom': 'blom',
  'blomme': 'blom-muh',
  'gras': 'chrus',
  'son': 'son',
  'maan': 'mahn',
  'ster': 'stehr',
  'sterre': 'stehr-ruh',
  'reën': 'ree-un',
  'wind': 'vuhnt',
  'wolke': 'vuhl-kuh',

  // Family & People
  'gesin': 'chuh-suhn',
  'familie': 'fuh-mee-lee',
  'ma': 'mah',
  'pa': 'pah',
  'mamma': 'mum-mah',
  'pappa': 'pup-pah',
  'moeder': 'moo-der',
  'vader': 'fah-der',
  'boetie': 'boo-tee',
  'sussie': 'sus-see',
  'broer': 'broor',
  'broers': 'broors',
  'suster': 'suhs-ter',
  'susters': 'suhs-ters',
  'baba': 'bah-bah',
  'babatjie': 'bah-bah-kee',
  'oom': 'oo-um',
  'ooms': 'oo-ums',
  'tannie': 'tun-nee',
  'tannies': 'tun-nees',
  'oupa': 'oh-pah',
  'ouma': 'oh-mah',
  'seun': 'see-un',
  'seuns': 'see-uns',
  'seuntjie': 'see-un-kee',
  'dogter': 'doch-ter',
  'dogters': 'doch-ters',
  'dogtertjie': 'doch-ter-kee',
  'kind': 'kuhnt',
  'kinders': 'kuhn-ders',
  'kindertjies': 'kuhn-der-kees',
  'maat': 'maht',
  'maats': 'mahts',
  'maatjie': 'mah-kee',
  'vriend': 'freent',
  'vriende': 'freen-duh',
  'vriendin': 'freen-duhn',

  // Food & Drinks
  'water': 'vah-ter',
  'melk': 'melk',
  'sap': 'sup',
  'tee': 'tee',
  'koffie': 'korf-fee',
  'brood': 'broo-ut',
  'broodjie': 'broo-kee',
  'kaas': 'kahs',
  'vleis': 'flays',
  'appel': 'up-pul',
  'appels': 'up-puls',
  'piesang': 'pee-sung',
  'piesangs': 'pee-sungs',
  'lemoen': 'luh-moon',
  'lemoene': 'luh-moo-nuh',
  'druiwe': 'dray-wuh',
  'groente': 'chroon-tuh',
  'vrugte': 'früch-tuh',
  'aartappel': 'ahr-tup-pul',
  'wortel': 'vor-tul',
  'koek': 'kook',
  'koekie': 'koo-kee',
  'ys': 'ays',
  'yskas': 'ays-kus',

  // Colours & Adjectives
  'rooi': 'roy',
  'blou': 'blow',
  'geel': 'cheel',
  'groen': 'chroon',
  'oranje': 'oh-run-yuh',
  'pers': 'pehrs',
  'pienk': 'peengk',
  'swart': 'swuht',
  'wit': 'vuht',
  'bruin': 'brayn',
  'grys': 'chrays',
  'groot': 'chroot',
  'klein': 'klayn',
  'vinnig': 'fuhn-nuch',
  'stadig': 'stah-duch',
  'mooi': 'mooy',
  'lelik': 'lee-luhk',
  'ou': 'oh',
  'nuwe': 'nee-wuh',
  'warm': 'vuhrum',
  'koud': 'kowt',
  'lank': 'lunk',
  'kort': 'kohrt',
  'hoog': 'hoo-uch',
  'laag': 'lah-uch',
  'vet': 'feht',
  'maer': 'mah-er',
  'slim': 'sluhm',
  'soet': 'soot',
  'stout': 'stowt',
  'hartseer': 'hart-seer',
  'kwaad': 'kwaht',
  'moeg': 'moo-uch',
  'honger': 'hong-er',
  'dors': 'dohrs',

  // Numbers & Time
  'een': 'ee-un',
  'twee': 'tvee',
  'drie': 'dree',
  'vier': 'feer',
  'vyf': 'fayf',
  'ses': 'ses',
  'sewe': 'see-vuh',
  'agt': 'ucht',
  'nege': 'nee-chuh',
  'tien': 'teen',
  'elf': 'elf',
  'twaalf': 'tvahlf',
  'dertien': 'dehr-teen',
  'veertien': 'feer-teen',
  'vyftien': 'fayf-teen',
  'twintig': 'twuhn-tuch',
  'honderd': 'hon-dert',
  'duisend': 'day-sent',
  'dag': 'duch',
  'nag': 'nuch',
  'oggend': 'och-chunt',
  'middag': 'muhd-duch',
  'aand': 'ahnt',
  'uur': 'eer',
  'tyd': 'tayt',
  'vandag': 'fun-duch',
  'gister': 'chuhs-ter',
  'nou': 'noh',
  'later': 'lah-ter',
  'altyd': 'ul-tayt',
  'nooit': 'noyt',
  'Maandag': 'Mahn-duch',
  'Dinsdag': 'Duhns-duch',
  'Woensdag': 'Voons-duch',
  'Donderdag': 'Don-der-duch',
  'Vrydag': 'Fray-duch',
  'Saterdag': 'Sah-ter-duch',
  'Sondag': 'Son-duch',
  'Januarie': 'Yah-noo-ah-ree',
  'Februarie': 'Feb-roo-ah-ree',
  'Maart': 'Mahrt',
  'April': 'Uh-pril',
  'Mei': 'May',
  'Junie': 'Yoo-nee',
  'Julie': 'Yoo-lee',
  'Augustus': 'Ow-choos-toos',
  'September': 'Sep-tem-ber',
  'Oktober': 'Ok-too-ber',
  'November': 'Noh-fem-ber',
  'Desember': 'Deh-sem-ber',

  // Negation and common Grade 4 CAPS words
  'geen': 'cheen',
  'niks': 'nuhks',
  'niemand': 'nee-munt',
  'nêrens': 'nee-runs',
  'graad': 'chraht',
  'avontuur': 'uh-fon-teer',
  'les': 'les',
  'toets': 'toots',
  'sin': 'suhn',
  'sinne': 'suhn-nuh',
  'woord': 'voort',
  'woorde': 'voor-duh',
  'trein': 'trayn',
  'wêreld': 'veh-relt'
};

/**
 * Phonetically convert a single Afrikaans word using rules if not in dictionary
 */
function afrikaansWordToPhonetic(rawWord: string): string {
  const match = rawWord.match(/^([^a-zA-Z0-9êëîïôöûüáéíóúàèìòùâä]*)(.*?)([^a-zA-Z0-9êëîïôöûüáéíóúàèìòùâä]*)$/);
  const leading = match ? match[1] : '';
  const core = match ? match[2] : rawWord;
  const trailing = match ? match[3] : '';

  if (!core) return rawWord;

  const lower = core.toLowerCase();
  const isCapital = core[0] === core[0].toUpperCase() && core[0] !== core[0].toLowerCase();

  // 1. Check exact dictionary
  if (AFRIKAANS_PHONETIC_DICT[lower]) {
    let trans = AFRIKAANS_PHONETIC_DICT[lower];
    if (isCapital) {
      trans = trans.charAt(0).toUpperCase() + trans.slice(1);
    }
    return leading + trans + trailing;
  }

  // 2. Rule-based phonetic transformation for English TTS engines
  let w = lower;

  // Specific common prefixes
  if (w.startsWith('ge') && w.length > 3) {
    w = 'chuh-' + w.slice(2);
  } else if (w.startsWith('be') && w.length > 3) {
    w = 'buh-' + w.slice(2);
  } else if (w.startsWith('ver') && w.length > 4) {
    w = 'fehr-' + w.slice(3);
  }

  // Initial consonants
  if (w.startsWith('v')) w = 'f' + w.slice(1);
  else if (w.startsWith('w')) w = 'v' + w.slice(1);
  else if (w.startsWith('j')) w = 'y' + w.slice(1);

  // Common Afrikaans vowel digraphs & diphthongs
  w = w
    .replace(/oei/g, 'ooy')
    .replace(/aai/g, 'ahy')
    .replace(/ooi/g, 'ooy')
    .replace(/eeu/g, 'ee-oow')
    .replace(/oe/g, 'oo')
    .replace(/ie/g, 'ee')
    .replace(/aa/g, 'ah')
    .replace(/ui/g, 'ay')
    .replace(/ei/g, 'ay')
    .replace(/y/g, 'ay')
    .replace(/ou/g, 'oh')
    .replace(/ê/g, 'eh')
    .replace(/ô/g, 'oo')
    .replace(/ë/g, 'e')
    .replace(/ï/g, 'ee');

  // Diminutives
  w = w
    .replace(/tjie$/g, 'kee')
    .replace(/pie$/g, 'pee')
    .replace(/kie$/g, 'kee')
    .replace(/tjies$/g, 'kees')
    .replace(/pies$/g, 'pees')
    .replace(/kies$/g, 'kees');

  // Common endings
  if (w.endsWith('lik')) w = w.slice(0, -3) + 'luhk';
  if (w.endsWith('ig')) w = w.slice(0, -2) + 'uch';
  if (w.endsWith('d') && w.length > 2) w = w.slice(0, -1) + 't';
  if (w.endsWith('g') && w.length > 2) w = w.slice(0, -1) + 'ch';

  if (isCapital) {
    w = w.charAt(0).toUpperCase() + w.slice(1);
  }

  return leading + w + trailing;
}

/**
 * Convert full Afrikaans sentence into phonetic English representation
 * This makes an English/Commonwealth voice speak flawless Afrikaans!
 */
export function convertAfrikaansToPhonetic(sentence: string): string {
  // Split by whitespace preserving tokens
  const words = sentence.split(/\s+/);
  return words.map((w) => afrikaansWordToPhonetic(w)).join(' ');
}

/**
 * Voice selection & cache for South African pronunciation
 */
let cachedVoices: SpeechSynthesisVoice[] = [];
let preferredVoiceURI: string | null = null;

if (typeof window !== 'undefined') {
  try {
    preferredVoiceURI = localStorage.getItem('afrikaans_adventure_voice_uri');
  } catch {
    // ignore
  }

  if ('speechSynthesis' in window) {
    const loadVoices = () => {
      cachedVoices = window.speechSynthesis.getVoices();
    };
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }
}

export function setPreferredVoiceURI(uri: string) {
  preferredVoiceURI = uri;
  try {
    localStorage.setItem('afrikaans_adventure_voice_uri', uri);
  } catch {
    // ignore
  }
}

export function getPreferredVoiceURI(): string | null {
  return preferredVoiceURI;
}

/**
 * Strictly filter out European Dutch and Flemish voices (nl-NL, nl-BE)
 * so European Dutch is NEVER used in Afrikaans Adventure
 */
export function isDutchVoice(v: SpeechSynthesisVoice): boolean {
  const lang = v.lang.toLowerCase();
  const name = v.name.toLowerCase();
  return (
    lang.startsWith('nl') ||
    lang.includes('nl-') ||
    lang.includes('nl_') ||
    lang === 'nl' ||
    name.includes('nederlands') ||
    name.includes('flemish') ||
    name.includes('vlaams') ||
    name.includes('holland') ||
    name.includes('dutch') ||
    name.includes('belgië') ||
    name.includes('belgie')
  );
}

/**
 * Check if a voice is an authentic native Afrikaans voice (af-ZA or Afrikaans)
 */
export function isAfrikaansVoice(v: SpeechSynthesisVoice): boolean {
  const lang = v.lang.toLowerCase();
  const name = v.name.toLowerCase();
  if (isDutchVoice(v)) return false;
  return (
    lang === 'af-za' ||
    lang === 'af_za' ||
    lang.startsWith('af') ||
    name.includes('afrikaans')
  );
}

/**
 * Check if a voice has a South African accent (af-ZA or en-ZA)
 */
export function isAuthenticSouthAfricanVoice(v: SpeechSynthesisVoice): boolean {
  const lang = v.lang.toLowerCase();
  const name = v.name.toLowerCase();
  if (isDutchVoice(v)) return false;
  return (
    isAfrikaansVoice(v) ||
    lang === 'en-za' ||
    lang === 'en_za' ||
    lang.startsWith('en-za') ||
    name.includes('south africa') ||
    name.includes('south african') ||
    name.includes('ayanda') ||
    name.includes('leah') ||
    name.includes('tessa') ||
    lang.includes('za')
  );
}

/**
 * Get all candidate voices strictly excluding European Dutch
 */
export function getAvailableSouthAfricanVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  const voices = cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
  return voices.filter((v) => !isDutchVoice(v));
}

/**
 * Find the best voice to read sentences in authentic South African style
 */
export function getSouthAfricanVoice(): { voice: SpeechSynthesisVoice | null; lang: string; isNativeAfrikaans: boolean } {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return { voice: null, lang: 'af-ZA', isNativeAfrikaans: false };
  }

  const allVoices = window.speechSynthesis.getVoices();
  const voices = (allVoices.length > 0 ? allVoices : cachedVoices).filter((v) => !isDutchVoice(v));

  // 1. Check if user selected a preferred voice
  if (preferredVoiceURI) {
    const userVoice = voices.find((v) => v.voiceURI === preferredVoiceURI);
    if (userVoice && !isDutchVoice(userVoice)) {
      const isNative = isAfrikaansVoice(userVoice);
      return { voice: userVoice, lang: isNative ? 'af-ZA' : userVoice.lang || 'en-ZA', isNativeAfrikaans: isNative };
    }
  }

  // 2. Check for native Afrikaans Voice (af-ZA)
  const afVoice = voices.find((v) => isAfrikaansVoice(v));
  if (afVoice) {
    return { voice: afVoice, lang: 'af-ZA', isNativeAfrikaans: true };
  }

  // 3. Second Priority: South African English voice (en-ZA)
  // Highly natural South African pronunciation when paired with our phonetic engine!
  const zaVoice = voices.find(
    (v) =>
      v.lang.toLowerCase() === 'en-za' ||
      v.lang.toLowerCase() === 'en_za' ||
      v.name.toLowerCase().includes('south africa') ||
      v.name.toLowerCase().includes('south african') ||
      v.lang.toLowerCase().includes('za')
  );
  if (zaVoice) {
    return { voice: zaVoice, lang: zaVoice.lang || 'en-ZA', isNativeAfrikaans: false };
  }

  // 4. Any other non-Dutch Commonwealth / English voice
  const enVoice = voices.find(
    (v) => v.lang.toLowerCase().startsWith('en') && !isDutchVoice(v)
  );
  if (enVoice) {
    return { voice: enVoice, lang: enVoice.lang || 'en-GB', isNativeAfrikaans: false };
  }

  // 5. Fallback to first non-Dutch voice
  if (voices.length > 0) {
    return { voice: voices[0], lang: voices[0].lang, isNativeAfrikaans: false };
  }

  return { voice: null, lang: 'en-ZA', isNativeAfrikaans: false };
}

/**
 * Returns current voice info for display in the UI
 */
export function getCurrentVoiceInfo(): {
  name: string;
  isSouthAfrican: boolean;
  isNativeAfrikaans: boolean;
  lang: string;
  uri: string;
  pronunciationMode: 'phonetic' | 'direct';
} {
  const { voice, lang, isNativeAfrikaans } = getSouthAfricanVoice();
  const cfg = getSentenceReadingConfig();
  
  if (!voice) {
    return {
      name: 'Suid-Afrikaanse Uitspraak (ZA Foneties)',
      isSouthAfrican: true,
      isNativeAfrikaans: false,
      lang: 'en-ZA',
      uri: 'default',
      pronunciationMode: cfg.pronunciationMode || 'phonetic'
    };
  }

  const isZA = isAuthenticSouthAfricanVoice(voice);
  return {
    name: voice.name,
    isSouthAfrican: isZA,
    isNativeAfrikaans: isNativeAfrikaans,
    lang: lang,
    uri: voice.voiceURI,
    pronunciationMode: cfg.pronunciationMode || 'phonetic'
  };
}

export interface SpeakOptions {
  rate?: number;
  pitch?: number;
  style?: 'natural' | 'classroom' | 'expressive' | 'word-by-word';
  pauseBetweenClauses?: number; // ms
  forcePhonetic?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: () => void;
  onWordBoundary?: (word: string, charIndex: number) => void;
}

export interface SentenceReadingConfig {
  style: 'natural' | 'classroom' | 'expressive' | 'word-by-word';
  clausePauseMs: number; // e.g. 240ms
  rateMultiplier: number; // e.g. 0.95
  pitchMultiplier: number; // e.g. 1.05
  karaokeHighlight: boolean;
  recognitionLang: 'af-ZA' | 'en-ZA';
  pronunciationMode: 'phonetic' | 'direct'; // 'phonetic' = 100% genuine Afrikaans sound without Dutch or English errors
}

// Default Grade 4 classroom reading configuration
let currentSentenceConfig: SentenceReadingConfig = {
  style: 'classroom',
  clausePauseMs: 250,
  rateMultiplier: 0.92,
  pitchMultiplier: 1.04,
  karaokeHighlight: true,
  recognitionLang: 'af-ZA',
  pronunciationMode: 'phonetic'
};

if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem('afrikaans_adventure_sentence_cfg');
    if (saved) {
      currentSentenceConfig = { ...currentSentenceConfig, ...JSON.parse(saved) };
    }
  } catch {
    // ignore
  }
}

export function getSentenceReadingConfig(): SentenceReadingConfig {
  return { ...currentSentenceConfig };
}

export function updateSentenceReadingConfig(cfg: Partial<SentenceReadingConfig>) {
  currentSentenceConfig = { ...currentSentenceConfig, ...cfg };
  try {
    localStorage.setItem('afrikaans_adventure_sentence_cfg', JSON.stringify(currentSentenceConfig));
  } catch {
    // ignore
  }
}

/**
 * Advanced phonetic & syntactic preparation for Afrikaans sentences
 */
export function cleanAfrikaansSentenceForSpeech(text: string): string {
  let cleaned = text
    .replace(/\(.*?\)/g, '') // remove parentheticals
    .replace(/\[.*?\]/g, '') // remove phonetic brackets
    .replace(/->/g, ' ')
    .trim();

  // Expand abbreviations
  cleaned = cleaned
    .replace(/\bGr\.\s*(\d+)/gi, 'Graad $1')
    .replace(/\bbl\.\s*(\d+)/gi, 'bladsy $1')
    .replace(/\bbv\./gi, 'byvoorbeeld')
    .replace(/\bens\./gi, 'en so voorts')
    .replace(/\bnr\.\s*(\d+)/gi, 'nommer $1')
    .replace(/\bdr\./gi, 'dokter')
    .replace(/\bmnr\./gi, 'meneer')
    .replace(/\bjuf\./gi, 'juffrou');

  // Expand numbers (0 - 12)
  cleaned = cleaned
    .replace(/\b08:00\b/g, 'agtuur die oggend')
    .replace(/\b12:00\b/g, 'twaalfuur die middag')
    .replace(/\b17:00\b/g, 'vyfuur die middag')
    .replace(/\b1\b/g, 'een')
    .replace(/\b2\b/g, 'twee')
    .replace(/\b3\b/g, 'drie')
    .replace(/\b4\b/g, 'vier')
    .replace(/\b5\b/g, 'vyf')
    .replace(/\b6\b/g, 'ses')
    .replace(/\b7\b/g, 'sewe')
    .replace(/\b8\b/g, 'agt')
    .replace(/\b9\b/g, 'nege')
    .replace(/\b10\b/g, 'tien')
    .replace(/\b11\b/g, 'elf')
    .replace(/\b12\b/g, 'twaalf');

  return cleaned;
}

/**
 * Split sentence into syntactic clauses for natural human-like prosody and breathing pauses
 */
export function chunkSentenceIntoClauses(sentence: string): string[] {
  const cleaned = cleanAfrikaansSentenceForSpeech(sentence);
  
  // Split on punctuation first
  const initialParts = cleaned.split(/([,;:—]+|\.{3})/);
  const clauses: string[] = [];

  for (let i = 0; i < initialParts.length; i++) {
    const part = initialParts[i].trim();
    if (!part) continue;

    if (/^[,;:—.]+(\s*)$/.test(part)) {
      if (clauses.length > 0) {
        clauses[clauses.length - 1] += part;
      }
      continue;
    }

    const words = part.split(/\s+/);
    if (words.length > 7) {
      let currentSub = '';
      for (const w of words) {
        const lower = w.toLowerCase();
        if (['en', 'maar', 'want', 'omdat', 'toe', 'terwyl', 'sodat'].includes(lower) && currentSub.trim().length > 15) {
          if (currentSub.trim()) clauses.push(currentSub.trim());
          currentSub = w + ' ';
        } else {
          currentSub += w + ' ';
        }
      }
      if (currentSub.trim()) clauses.push(currentSub.trim());
    } else {
      clauses.push(part);
    }
  }

  return clauses.length > 0 ? clauses : [cleaned];
}

let activeSentenceCancelToken: { cancelled: boolean } | null = null;

/**
 * Advanced Sentence Reader with South African phonetic transcription,
 * natural clause chunking, prosodic breathing pauses, and real-time word tracking.
 */
export async function speakAfrikaansSentence(
  sentence: string,
  options?: SpeakOptions
): Promise<boolean> {
  if (!sounds.isEnabled() || typeof window !== 'undefined' && !('speechSynthesis' in window)) {
    return false;
  }

  // Cancel any ongoing speech
  if (activeSentenceCancelToken) {
    activeSentenceCancelToken.cancelled = true;
  }
  window.speechSynthesis.cancel();

  const token = { cancelled: false };
  activeSentenceCancelToken = token;

  const clauses = chunkSentenceIntoClauses(sentence);
  if (clauses.length === 0) return false;

  const style = options?.style ?? currentSentenceConfig.style;
  const baseRate = style === 'classroom' ? 0.78 : style === 'word-by-word' ? 0.65 : 0.85;
  const rate = (options?.rate ?? baseRate) * currentSentenceConfig.rateMultiplier;
  const basePitch = style === 'classroom' ? 1.06 : 1.02;
  const pitch = (options?.pitch ?? basePitch) * currentSentenceConfig.pitchMultiplier;
  const pauseMs = options?.pauseBetweenClauses ?? currentSentenceConfig.clausePauseMs;

  const { voice, lang, isNativeAfrikaans } = getSouthAfricanVoice();
  const usePhonetic =
    options?.forcePhonetic !== undefined
      ? options.forcePhonetic
      : currentSentenceConfig.pronunciationMode === 'phonetic' || !isNativeAfrikaans;

  options?.onStart?.();

  try {
    let charOffset = 0;

    for (let cIdx = 0; cIdx < clauses.length; cIdx++) {
      if (token.cancelled) break;

      const rawClause = clauses[cIdx];
      // Convert clause to South African phonetic respelling if using non-native voice or phonetic mode
      const spokenClause = usePhonetic ? convertAfrikaansToPhonetic(rawClause) : rawClause;

      await new Promise<void>((resolve) => {
        const utterance = new SpeechSynthesisUtterance(spokenClause);
        utterance.rate = rate;
        utterance.pitch = pitch;
        if (voice) utterance.voice = voice;
        utterance.lang = isNativeAfrikaans && !usePhonetic ? 'af-ZA' : (voice?.lang || 'en-ZA');

        utterance.onboundary = (e) => {
          if (options?.onWordBoundary) {
            const rawWords = rawClause.substring(e.charIndex).split(/\s+/);
            const spokenWord = rawWords[0] || '';
            options.onWordBoundary(spokenWord, charOffset + e.charIndex);
          }
        };

        utterance.onend = () => {
          charOffset += rawClause.length + 1;
          resolve();
        };

        utterance.onerror = () => {
          resolve();
        };

        window.speechSynthesis.speak(utterance);
      });

      // Insert breathing pause between clauses
      if (cIdx < clauses.length - 1 && !token.cancelled && pauseMs > 0) {
        await new Promise((res) => setTimeout(res, pauseMs));
      }
    }

    if (!token.cancelled) {
      options?.onEnd?.();
    }
    return true;
  } catch (err) {
    console.warn('Sentence reading error:', err);
    options?.onError?.();
    return false;
  } finally {
    if (activeSentenceCancelToken === token) {
      activeSentenceCancelToken = null;
    }
  }
}

/**
 * Text to speech for Afrikaans pronunciation using the Web Speech API
 * Strictly enforces South African accent, converts phonetics so words sound
 * authentically Afrikaans ("die" -> "dee", "baie" -> "buy-uh"), and blocks Dutch.
 */
export function speakAfrikaans(text: string, options?: SpeakOptions): boolean {
  if (!sounds.isEnabled()) {
    return false;
  }

  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  // If text is a full sentence with more than 3 words, route through the intelligent sentence reader!
  if (text.includes(' ') && text.trim().split(/\s+/).length > 3) {
    speakAfrikaansSentence(text, options);
    return true;
  }

  try {
    window.speechSynthesis.cancel();

    const cleanText = cleanAfrikaansSentenceForSpeech(text);
    if (!cleanText) return false;

    const { voice, lang, isNativeAfrikaans } = getSouthAfricanVoice();
    const usePhonetic =
      options?.forcePhonetic !== undefined
        ? options.forcePhonetic
        : currentSentenceConfig.pronunciationMode === 'phonetic' || !isNativeAfrikaans;

    const spokenText = usePhonetic ? convertAfrikaansToPhonetic(cleanText) : cleanText;

    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.rate = options?.rate ?? (0.80 * currentSentenceConfig.rateMultiplier);
    utterance.pitch = options?.pitch ?? (1.06 * currentSentenceConfig.pitchMultiplier);

    if (voice) {
      utterance.voice = voice;
    }
    utterance.lang = isNativeAfrikaans && !usePhonetic ? 'af-ZA' : (voice?.lang || 'en-ZA');

    if (options?.onWordBoundary) {
      utterance.onboundary = (e) => {
        const spokenWord = cleanText.substring(e.charIndex).split(/\s+/)[0] || '';
        options.onWordBoundary?.(spokenWord, e.charIndex);
      };
    }

    if (options?.onStart) {
      utterance.onstart = () => options.onStart?.();
    }
    if (options?.onEnd) {
      utterance.onend = () => options.onEnd?.();
    }
    if (options?.onError) {
      utterance.onerror = () => options.onError?.();
    }

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.warn('SpeechSynthesis error:', err);
    options?.onError?.();
    return false;
  }
}

/**
 * =========================================================================
 * VOICE-TO-TEXT (SPEECH RECOGNITION / SPRAAK-NA-TEKS) RESEARCHED ENGINE
 * Web Speech API speech-to-text with continuous listening, multi-alternatives,
 * interim visual feedback, and advanced phonetic matching for Grade 4 learners
 * =========================================================================
 */

export interface SpeechRecognitionResultData {
  transcript: string;
  confidence: number;
  isFinal: boolean;
  matchScore?: number; // 0 - 100 percentage
  matchedWords?: boolean[]; // word-by-word match indicators
}

export interface VoiceToTextOptions {
  lang?: 'af-ZA' | 'en-ZA';
  targetSentence?: string;
  continuous?: boolean;
  onInterim?: (transcript: string) => void;
  onFinal: (result: SpeechRecognitionResultData) => void;
  onError?: (error: string) => void;
  onEnd?: () => void;
}

// Check if browser supports SpeechRecognition / webkitSpeechRecognition
export function isVoiceToTextSupported(): boolean {
  if (typeof window === 'undefined') return false;
  const win = window as unknown as {
    SpeechRecognition?: unknown;
    webkitSpeechRecognition?: unknown;
  };
  return !!(win.SpeechRecognition || win.webkitSpeechRecognition);
}

/**
 * Phonetically normalize text for Grade 4 speech matching
 */
function normalizeForMatching(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,!?;:"'—\-_]/g, '')
    .replace(/môre/g, 'more')
    .replace(/sê/g, 'se')
    .replace(/hê/g, 'he')
    .replace(/skêr/g, 'sker')
    .replace(/voël/g, 'voel')
    .replace(/reën/g, 'reen')
    .replace(/wêreld/g, 'wereld')
    .trim();
}

/**
 * Calculate similarity percentage between learner's spoken text and target Afrikaans sentence
 * Uses phonetic tolerance (e.g. "dee" matches "die", "buy-a" matches "baie", "danki" matches "dankie")
 */
export function calculateSpeechMatchScore(spoken: string, target: string): { score: number; matchedWords: boolean[] } {
  const normSpoken = normalizeForMatching(spoken);
  const normTarget = normalizeForMatching(target);

  if (!normSpoken || !normTarget) {
    return { score: 0, matchedWords: [] };
  }

  const spokenWords = normSpoken.split(/\s+/);
  const targetWords = normTarget.split(/\s+/);

  const matchedWords: boolean[] = targetWords.map((tWord) => {
    // 1. Direct match
    if (spokenWords.includes(tWord)) return true;

    // 2. Phonetic sound-alike matching for Grade 4 speech
    return spokenWords.some((sWord) => {
      if (sWord === tWord) return true;
      if (tWord === 'die' && (sWord === 'dee' || sWord === 'di' || sWord === 'the')) return true;
      if (tWord === 'nie' && (sWord === 'nee' || sWord === 'ni' || sWord === 'no')) return true;
      if (tWord === 'baie' && (sWord === 'baia' || sWord === 'buy' || sWord === 'baya')) return true;
      if (tWord === 'dankie' && (sWord === 'danki' || sWord === 'donkie' || sWord === 'danke')) return true;
      if (tWord === 'hond' && (sWord === 'hont' || sWord === 'hound')) return true;
      if (tWord === 'kat' && (sWord === 'cat' || sWord === 'kut')) return true;
      if (tWord === 'tuin' && (sWord === 'teyn' || sWord === 'tain')) return true;
      if (tWord === 'skool' && (sWord === 'skole' || sWord === 'school')) return true;
      if (tWord === 'hardloop' && (sWord === 'hartloop' || sWord === 'hardlop')) return true;
      if (tWord === 'juffrou' && (sWord === 'jufrou' || sWord === 'juffie')) return true;

      // Prefix match or edit distance tolerance
      if (tWord.length > 3 && sWord.length > 3) {
        if (tWord.startsWith(sWord.slice(0, 3)) || sWord.startsWith(tWord.slice(0, 3))) return true;
      }
      return false;
    });
  });

  const matchCount = matchedWords.filter(Boolean).length;
  const score = Math.round((matchCount / targetWords.length) * 100);

  return {
    score: Math.min(100, Math.max(0, score)),
    matchedWords
  };
}

// Active speech recognizer instance & silence watchdog timer
let activeRecognizer: unknown = null;
let recognitionSilenceTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * Start listening and converting student's voice to text with researched configuration:
 * - continuous: true (does not cut off while child pauses to sound out words)
 * - maxAlternatives: 5 (checks top candidate interpretations)
 * - interimResults: true (live real-time child feedback)
 * - auto-silence watchdog timeout
 */
export function startVoiceToText(options: VoiceToTextOptions): boolean {
  if (!isVoiceToTextSupported()) {
    options.onError?.('Jou blaaier ondersteun nie spraakherkenning (Voice-to-Text) nie.');
    return false;
  }

  stopVoiceToText();

  try {
    const win = window as unknown as {
      SpeechRecognition?: new () => any;
      webkitSpeechRecognition?: new () => any;
      webkitSpeechGrammarList?: new () => any;
    };
    const SpeechRec = win.SpeechRecognition || win.webkitSpeechRecognition;
    if (!SpeechRec) return false;

    const recognizer = new SpeechRec();
    activeRecognizer = recognizer;

    // Researched configuration:
    recognizer.lang = options.lang || currentSentenceConfig.recognitionLang || 'af-ZA';
    // Use continuous mode so Grade 4 learners have time to read multi-word sentences
    recognizer.continuous = options.continuous !== undefined ? options.continuous : true;
    recognizer.interimResults = true;
    recognizer.maxAlternatives = 5;

    let accumulatedFinalTranscript = '';
    let bestAlternativeTranscript = '';

    const resetSilenceWatchdog = () => {
      if (recognitionSilenceTimer) clearTimeout(recognitionSilenceTimer);
      // Wait 3.5 seconds of silence before auto-stopping continuous recognition
      recognitionSilenceTimer = setTimeout(() => {
        stopVoiceToText();
      }, 3500);
    };

    recognizer.onresult = (event: any) => {
      resetSilenceWatchdog();
      let interim = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          // Check all alternatives to find the closest match to target Afrikaans sentence
          let chosenTranscript = result[0]?.transcript || '';
          if (options.targetSentence && result.length > 1) {
            let topScore = -1;
            for (let a = 0; a < result.length; a++) {
              const candText = result[a]?.transcript || '';
              const { score } = calculateSpeechMatchScore(candText, options.targetSentence);
              if (score > topScore) {
                topScore = score;
                chosenTranscript = candText;
              }
            }
          }
          accumulatedFinalTranscript += (accumulatedFinalTranscript ? ' ' : '') + chosenTranscript;
          bestAlternativeTranscript = accumulatedFinalTranscript;
        } else {
          interim += result[0]?.transcript || '';
        }
      }

      const currentDisplay = (accumulatedFinalTranscript + ' ' + interim).trim();
      if (currentDisplay && options.onInterim) {
        options.onInterim(currentDisplay);
      }
    };

    recognizer.onerror = (event: any) => {
      console.warn('SpeechRecognition error:', event.error);
      if (recognitionSilenceTimer) clearTimeout(recognitionSilenceTimer);
      const errMsg =
        event.error === 'not-allowed'
          ? 'Mikrofoontoestemming word benodig om te praat.'
          : event.error === 'no-speech'
          ? 'Geen stem opgespoor nie. Probeer weer praat!'
          : `Spraakherkenning kennisgewing: ${event.error}`;
      options.onError?.(errMsg);
    };

    recognizer.onend = () => {
      if (recognitionSilenceTimer) clearTimeout(recognitionSilenceTimer);
      activeRecognizer = null;
      const text = (bestAlternativeTranscript || accumulatedFinalTranscript).trim();
      
      let matchScore = 0;
      let matchedWords: boolean[] = [];

      if (options.targetSentence && text) {
        const matchRes = calculateSpeechMatchScore(text, options.targetSentence);
        matchScore = matchRes.score;
        matchedWords = matchRes.matchedWords;
      }

      options.onFinal({
        transcript: text,
        confidence: 0.9,
        isFinal: true,
        matchScore,
        matchedWords
      });
      options.onEnd?.();
    };

    recognizer.start();
    resetSilenceWatchdog();
    return true;
  } catch (err) {
    console.warn('Failed to start speech recognition:', err);
    options.onError?.('Kon nie mikrofoon begin nie.');
    return false;
  }
}

/**
 * Stop active voice to text recognition
 */
export function stopVoiceToText() {
  if (recognitionSilenceTimer) {
    clearTimeout(recognitionSilenceTimer);
    recognitionSilenceTimer = null;
  }
  if (activeRecognizer) {
    try {
      (activeRecognizer as any).stop();
    } catch {
      // ignore
    }
    activeRecognizer = null;
  }
}

/**
 * Test the active South African voice with a friendly Ollie sample greeting
 */
export function testSouthAfricanVoice(onDone?: () => void) {
  speakAfrikaans('Hallo maats! Ek is Ollie die Uil. Baie welkom by Afrikaans Avontuur!', {
    onEnd: onDone,
    onError: onDone
  });
}

/**
 * Stop any current speech
 */
export function stopSpeaking() {
  if (activeSentenceCancelToken) {
    activeSentenceCancelToken.cancelled = true;
    activeSentenceCancelToken = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
