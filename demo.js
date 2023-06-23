// const WORDLUXE_MODE = 0
// const WORDLE_MODE = 1
// const WORDLE_HARD_MODE = 2
// const PREDICTION_BARS = 3
// const COPY_PERFECT_MATCH = 4
// const LOCK_COPIED_MATCH = 5
// const USE_REVEALED_HINT = 6
// const ALLOW_PLURALS = 7

const checkbox_relations = {
  'wordluxe-mode': {
    children: {
      'prediction-bars': true,
      'copy-perfect-match': true,
      'lock-copied-match': true
    },
    parents: {}
  },
  'wordle-mode': {
    children: {
      'prediction-bars': false,
      'copy-perfect-match': false,
      'lock-copied-match': false,
      'use-revealed-hint': false,
      'allow-plurals': false
    },
    parents: {}
  },
  'wordle-hard-mode': {
    children: {
      'prediction-bars': false,
      'copy-perfect-match': false,
      'lock-copied-match': false,
      'use-revealed-hint': true,
      'allow-plurals': false
    },
    parents: {}
  },
  'prediction-bars': {
    children: {},
    parents: {
      'wordluxe-mode': true,
      'wordle-mode': false,
      'wordle-hard-mode': false
    }
  },
  'copy-perfect-match': {
    children: {},
    parents: {
      'wordluxe-mode': true,
      'wordle-mode': false,
      'wordle-hard-mode': false
    }
  },
  'lock-copied-match': {
    children: {},
    parents: {
      'wordluxe-mode': true,
      'wordle-mode': false,
      'wordle-hard-mode': false
    }
  },
  'use-revealed-hint': {
    children: {},
    parents: {
      'wordle-mode': false,
      'wordle-hard-mode': true
    }
  },
  'allow-plurals': {
    children: {},
    parents: {
      'wordle-mode': false,
      'wordle-hard-mode': false
    }
  }
}