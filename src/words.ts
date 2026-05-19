// Tier 0: individual letters (a–z)
// Tier 1: short phonetic words (3-4 letters) — all 26 letters represented
// Tier 2: common words (4-6 letters) — all 26 letters represented
// Tier 3: tricky spelling (5-8 letters) — all 26 letters represented
// Tier 4: longer complex words (7-10 letters) — all 26 letters represented
// Tier 5: very complex / easy to mistype (9+ letters) — all 26 letters represented

export const WORD_TIERS: string[][] = [
  // Tier 0: alphabet
  [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  ],

  // Tier 1: short phonetic words — a b c d e f g h i j k l m n o p q r s t u v w x y z ✓
  [
    'ant', 'bat', 'cat', 'dog', 'elf', 'fog', 'gun', 'hat', 'ink', 'jet',
    'kit', 'log', 'mug', 'net', 'oak', 'pup', 'quiz', 'run', 'sun', 'tin',
    'urn', 'van', 'win', 'vex', 'yak', 'zip',
    'bed', 'bug', 'cup', 'den', 'elm', 'fin', 'gem', 'hen', 'ivy', 'jab',
    'keg', 'lid', 'map', 'nod', 'orb', 'pen', 'rat', 'sky', 'try', 'urn',
    'vow', 'wax', 'box', 'joy', 'zoo',
    'big', 'cut', 'dry', 'fit', 'gut', 'hop', 'jug', 'key', 'mat', 'nun',
    'pot', 'cry', 'sat', 'top', 'fun', 'vet', 'web', 'fox', 'yet', 'zap',
    'bit', 'fly', 'hug', 'jam', 'kin', 'lad', 'men', 'nut', 'odd', 'pig',
    'rod', 'set', 'tub', 'hub', 'vim', 'wig', 'mix', 'yew', 'zen', 'bun',
  ],

  // Tier 2: common 4-6 letter words — a b c d e f g h i j k l m n o p q r s t u v w x y z ✓
  [
    'able', 'bold', 'calm', 'dive', 'each', 'fizz', 'glow', 'half', 'iris',
    'jolt', 'kiwi', 'leap', 'mild', 'numb', 'oath', 'push', 'quiz', 'rust',
    'silk', 'tusk', 'upon', 'vast', 'wisp', 'exact', 'yoga', 'zinc',
    'apple', 'brave', 'crisp', 'dusty', 'eagle', 'flame', 'grace', 'honey',
    'inbox', 'jumpy', 'kayak', 'lemon', 'magic', 'noble', 'olive', 'pluck',
    'queen', 'river', 'shelf', 'tiger', 'ultra', 'vivid', 'waltz', 'sixth',
    'yacht', 'zonal',
    'angel', 'bloom', 'chart', 'drink', 'event', 'fixed', 'globe', 'heart',
    'ideal', 'joust', 'knife', 'light', 'mercy', 'night', 'ocean', 'peace',
    'raise', 'skill', 'tower', 'uncle', 'valor', 'water', 'extra', 'young',
    'zebra', 'blaze', 'craft', 'depth', 'frost', 'ghost', 'grasp', 'greet',
    'grief', 'groan', 'grove', 'exist', 'excel', 'fancy', 'field', 'floor',
    'front', 'fuzzy', 'blank', 'dizzy', 'doubt', 'draft', 'dream', 'fever',
  ],

  // Tier 3: tricky spelling — a b c d e f g h i j k l m n o p q r s t u v w x y z ✓
  [
    'aerial', 'bought', 'caught', 'double', 'eighth', 'friend', 'gnarly',
    'height', 'island', 'jockey', 'kernel', 'listen', 'muscle', 'knight',
    'opaque', 'phlegm', 'queue', 'rhythm', 'should', 'taught', 'unique',
    'vacuum', 'wraith', 'exceed', 'yonder', 'zealot',
    'answer', 'bridge', 'castle', 'driven', 'enough', 'frozen', 'gentle',
    'hollow', 'inject', 'joking', 'knotty', 'layout', 'motive', 'narrow',
    'onward', 'puzzle', 'quiver', 'rustic', 'spoken', 'though', 'useful',
    'velvet', 'wisdom', 'exotic', 'yeoman', 'zephyr',
    'blight', 'chosen', 'divide', 'effect', 'fright', 'goodly', 'hidden',
    'impure', 'joyful', 'kitten', 'lively', 'muster', 'noodle', 'output',
    'plough', 'quirky', 'rescue', 'settle', 'throng', 'unveil', 'vowels',
    'wicked', 'expel', 'yellow', 'zipper', 'clamor', 'prayer', 'through',
  ],

  // Tier 4: longer complex words — a b c d e f g h i j k l m n o p q r s t u v w x y z ✓
  [
    'absolute', 'building', 'calendar', 'describe', 'exercise', 'function',
    'grateful', 'guidance', 'identify', 'jealousy', 'keyboard', 'language',
    'medicine', 'neighbor', 'obstacle', 'parallel', 'question', 'remember',
    'separate', 'tomorrow', 'universe', 'vacation', 'withdraw', 'exemplar',
    'yourself', 'zealotry',
    'beautiful', 'committee', 'different', 'envelope', 'february', 'guarantee',
    'hospitals', 'indicate', 'jettison', 'kingship', 'likewise', 'majority',
    'necessary', 'occurred', 'physical', 'quantity', 'relevant', 'shoulder',
    'together', 'umbrella', 'vengeful', 'whatever', 'exchange', 'youthful',
    'zigzagged',
    'business', 'children', 'complete', 'consider', 'continue', 'discover',
    'document', 'evidence', 'favorite', 'followed', 'grateful', 'helpless',
    'informed', 'involves', 'judgment', 'knockout', 'learning', 'national',
    'overtime', 'powerful', 'question', 'required', 'surprise', 'terrible',
    'vacation', 'villages', 'wireless', 'existing', 'youngest', 'zeroing',
  ],

  // Tier 5: very complex — a b c d e f g h i j k l m n o p q r s t u v w x y z ✓
  [
    'accommodate', 'bureaucracy', 'circumstances', 'deteriorate', 'exaggerate',
    'fluorescent', 'government', 'handkerchief', 'immediately', 'jeopardize',
    'kaleidoscope', 'lieutenant', 'maintenance', 'nevertheless', 'occasionally',
    'parliamentary', 'questionnaire', 'reconnaissance', 'simultaneous',
    'sophisticated', 'surveillance', 'unfortunately', 'vulnerability',
    'extraordinary', 'yesteryear', 'zealousness',
    'achievement', 'collaboration', 'conscientious', 'disqualified',
    'embarrassment', 'familiarize', 'hypochondriac', 'inexplicable',
    'juxtaposition', 'knowledgeable', 'miscellaneous', 'negotiation',
    'overestimate', 'pharmaceutical', 'revolutionary', 'troublesome',
    'unpredictable', 'veterinarian', 'approximately', 'acknowledgment',
    'acquaintance', 'breathtaking', 'championship', 'environmental',
    'intervention', 'millennium', 'particularly', 'qualification',
    'subsequently', 'unambiguous', 'visualization', 'wholehearted',
    'exhaustively', 'youthfulness', 'civilization',
  ],
]
