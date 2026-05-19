// Tier 0: short, phonetically regular (3-4 letters)
// Tier 1: common words, slightly longer (4-6 letters)
// Tier 2: common words with tricky spelling (5-8 letters)
// Tier 3: longer words, irregular patterns (7-10 letters)
// Tier 4: complex, easy to mistype (9+ letters)
export const WORD_TIERS = [
    [
        'cat', 'dog', 'run', 'fun', 'hop', 'top', 'big', 'sun', 'hat', 'bat',
        'rat', 'mat', 'cup', 'pup', 'bug', 'hug', 'mug', 'log', 'fog', 'bit',
        'fit', 'hit', 'sit', 'bed', 'fed', 'led', 'ten', 'hen', 'pen', 'men',
        'fin', 'pin', 'tin', 'win', 'gun', 'bun', 'cut', 'gut', 'hut', 'nut',
        'fly', 'fry', 'sky', 'try', 'dry', 'cry', 'spy', 'shy', 'sly', 'jet',
        'net', 'set', 'wet', 'yet', 'box', 'fox', 'mix', 'fix', 'six', 'wax',
    ],
    [
        'apple', 'brave', 'chart', 'dance', 'flame', 'giant', 'happy', 'image',
        'jumpy', 'lemon', 'magic', 'night', 'olive', 'peace', 'quest', 'raise',
        'share', 'tiger', 'vivid', 'water', 'young', 'angel', 'bloom', 'clean',
        'drink', 'fresh', 'grace', 'heart', 'ideal', 'jolly', 'knife', 'light',
        'river', 'stone', 'tower', 'uncle', 'extra', 'yield', 'bring', 'carry',
        'catch', 'climb', 'close', 'count', 'cross', 'depth', 'drive', 'earth',
        'event', 'fancy', 'field', 'final', 'flame', 'floor', 'glass', 'gloom',
        'graft', 'grain', 'graph', 'grasp', 'greet', 'grief', 'grind', 'groan',
    ],
    [
        'rhythm', 'friend', 'caught', 'bought', 'taught', 'though', 'through',
        'enough', 'height', 'weight', 'eighth', 'belief', 'castle', 'listen',
        'should', 'island', 'answer', 'pretty', 'people', 'always', 'because',
        'before', 'beyond', 'bridge', 'bright', 'broken', 'budget', 'button',
        'change', 'choose', 'coffee', 'corner', 'couple', 'course', 'create',
        'decide', 'design', 'dinner', 'direct', 'double', 'driven', 'effort',
        'either', 'energy', 'engine', 'escape', 'expect', 'famous', 'finger',
        'forest', 'frozen', 'future', 'gentle', 'global', 'golden', 'govern',
        'hidden', 'honest', 'hunter', 'hybrid', 'inject', 'insect', 'invite',
    ],
    [
        'beautiful', 'necessary', 'beginning', 'knowledge', 'strength', 'calendar',
        'committee', 'different', 'exercise', 'guarantee', 'immediate', 'important',
        'interest', 'language', 'medicine', 'neighbor', 'occasion', 'parallel',
        'physical', 'probably', 'remember', 'separate', 'shoulder', 'straight',
        'surprise', 'terrible', 'tomorrow', 'together', 'yourself', 'building',
        'business', 'children', 'complete', 'consider', 'continue', 'describe',
        'discover', 'document', 'election', 'engineer', 'everyone', 'evidence',
        'favorite', 'function', 'grateful', 'grateful', 'guidance', 'harmless',
        'identify', 'industry', 'influence', 'informed', 'involves', 'likewise',
    ],
    [
        'accommodate', 'achievement', 'acquaintance', 'approximately', 'bureaucracy',
        'conscientious', 'controversial', 'embarrassment', 'exaggerate',
        'extraordinary', 'fluorescent', 'handkerchief', 'independent', 'lieutenant',
        'maintenance', 'millennium', 'mischievous', 'occasionally', 'occurrence',
        'particularly', 'questionnaire', 'reconnaissance', 'simultaneously',
        'sophisticated', 'spontaneous', 'surveillance', 'unfortunately',
        'vegetarian', 'veterinarian', 'acknowledge', 'collaborate', 'comprehension',
        'consequently', 'deteriorate', 'disqualified', 'environment', 'familiarize',
        'hypochondriac', 'inexplicable', 'miraculous', 'miscellaneous', 'negotiation',
        'overestimate', 'parliamentary', 'revolutionary', 'vulnerability', 'wilderness',
    ],
];
