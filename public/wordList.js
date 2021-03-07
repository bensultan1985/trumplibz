let adjExample = ' (e.g. pretty)'
let advExample = ' (e.g. slowly)'

let replWordList = {
    "'s": {
        pos: 'adjective',
        rule: 'addafter'
    },
    "president": {
        pos: 'adjective' + adjExample,
        rule: 'addbefore'
    },
    "meeting": {
        pos: 'adjective' + adjExample,
        rule: 'addbefore'
    },
    "complete": {
        pos: 'adverb' + advExample,
        rule: 'addbefore'
    },
    "advised": {
        pos: 'adverb' + advExample,
        rule: 'addbefore'
    },
    "voted": {
        pos: 'adverb' + advExample,
        rule: 'addbefore',
    },
    "said": {
        pos: 'adverb' + advExample,
        rule: 'addbefore'
    },
    "tweeted": {
        pos: 'adverb' + advExample,
        rule: 'addbefore'
    },
    "twitter": {
        pos: 'app name (e.g. Angry Birds)',
        rule: 'bas'
    },
    "facebook": {
        pos: 'app name (e.g. Angry Birds)',
        rule: 'bas'
    },
    "snapchat": {
        pos: 'app name (e.g. Angry Birds)',
        rule: 'bas'
    },
    "instagram": {
        pos: 'app name (e.g. Angry Birds)',
        rule: 'bas'
    },
    "tiktok": {
        pos: 'app name (e.g. Angry Birds)',
        rule: 'bas'
    },
    "trial": {
        pos: 'adjective' + adjExample,
        rule: 'addbefore'
    },
    "dangerous": {
        pos: 'adjective' + adjExample,
        rule: 'bas'
    },
    "healthcare workers": {
        pos: 'occupation (plural)',
        rule: 'bas'
    },
    "book": {
        pos: 'noun',
        rule: 'bas'
    },
    "collusion": {
        pos: 'noun',
        rule: 'bas'
    },
    "wished": {
        pos: 'verb (past tense)',
        rule: 'bas'
    },
    "people": {
        pos: 'living things',
        rule: 'bas'
    },
    "fake": {
        pos: 'adjective' + adjExample,
        rule: 'bas'
    },
    "witch": {
        pos: 'occupation (singular)',
        rule: 'bas'
    },
    "adviser": {
        pos: 'occupation (singular)',
        rule: 'bas'
    },
    "foreign aid": {
        pos: 'plural noun',
        rule: 'bas'
    },
    "white house": {
        pos: 'place',
        rule: 'bas'
    },
    "washington d.c.": {
        pos: 'place',
        rule: 'bas'
    },
    "senate": {
        pos: 'place',
        rule: 'bas'
    },
    "nancy pelosi": {
        pos: 'celebrity',
        rule: 'bas'
    },
    "mitch mcconnell": {
        pos: 'celebrity',
        rule: 'bas'
    },
    "china": {
        pos: 'place',
        rule: 'bas'
    },
    "russia": {
        pos: 'place',
        rule: 'bas'
    },
    "testify": {
        pos: 'verb',
        rule: 'bas'
    },
    "republicans": {
        pos: 'occupation (plural)',
        rule: 'bas'
    },
    "democrats": {
        pos: 'occupation (plural)',
        rule: 'bas'
    },
    "lawyer": {
        pos: 'occupation (singular)',
        rule: 'bas'
    },
    "lawyers": {
        pos: 'occupation (plural)',
        rule: 'bas'
    },
    "space": {
        pos: 'place',
        rule: 'bas'
    },
    "coal": {
        pos: 'noun',
        rule: 'bas'
    },
    "reporters": {
        pos: 'plural noun',
        rule: 'bas'
    },
    "immigration": {
        pos: 'abstract noun (ending in -tion)',
        rule: 'bas'
    },
    "extreme": {
        pos: 'adjective' + adjExample,
        rule: 'bas'
    },
    "spokesperson": {
        pos: 'occupation (singular)',
        rule: 'bas'
    },
    "states": {
        pos: 'noun (plural)',
        rule: 'bas'
    },
    "distancing": {
        pos: 'verb (ending with -ing)',
        rule: 'bas'
    },
    "lied": {
        pos: 'verb (past tense)',
        rule: 'bas'
    },
    "ignored": {
        pos: 'verb (ending with -ed)',
        rule: 'bas',
    },
    "veto": {
        pos: 'verb (present tense e.g. sing)',
        rule: 'bas'
    },
    "signed": {
        pos: 'verb (ending in -ed)',
        rule: 'bas'
    },
    "troops": {
        pos: 'verb (ending in -ed)',
        rule: 'bas'
    },
    "agree": {
        pos: 'verb (present e.g. sing)',
        rule: 'bas'
    },
    "deadly": {
        pos: 'adjective' + adjExample,
        rule: 'bas'
    },
    "americans": {
        pos: 'animal (plural)',
        rule: 'bas'
    }
}