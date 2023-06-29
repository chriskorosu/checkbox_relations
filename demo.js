// const WORDLUXE_MODE = 0
// const WORDLE_MODE = 1
// const WORDLE_HARD_MODE = 2
// const PREDICTION_BARS = 3
// const COPY_PERFECT_MATCH = 4
// const LOCK_COPIED_MATCH = 5
// const USE_REVEALED_HINT = 6
// const ALLOW_PLURALS = 7

import { addCheckboxRelations } from './main.js'

const checkboxRelations2 = {
  parents: ['parent1', 'parent2', 'parent3', 'custom'],
  children: {
    'child1': [true, false, false],
    'child2': [true, false, false],
    'child3': [true, false, false],
    'child4': [false, false, true],
    'child5': [false, false, false]
  },
  last_parent: 'parent1',
  last_fallback: [true, true, true, true, true]
}

const checkboxRelations = {
  parent1: {
    children: {
      child1: true,
      child2: true,
      child3: true,
      child4: false,
      child5: false,
      parent2: false,
      parent3: false
    },
    parents: []
  },
  parent2: {
    children: {
      child1: false,
      child2: false,
      child3: false,
      child4: false,
      child5: false,
      parent1: false,
      parent3: false
    },
    parents: []
  },
  parent3: {
    children: {
      child1: false,
      child2: false,
      child3: false,
      child4: true,
      child5: false,
      parent1: false,
      parent2: false
    },
    parents: []
  },
  child1: {
    children: {},
    parents: ['parent1', 'parent2', 'parent3']
  },
  child2: {
    children: {},
    parents: ['parent1', 'parent2', 'parent3']
  },
  child3: {
    children: {},
    parents: ['parent1', 'parent2', 'parent3']
  },
  child4: {
    children: {},
    parents: ['parent1', 'parent2', 'parent3']
  },
  child5: {
    children: {},
    parents: ['parent1', 'parent2', 'parent3']
  }
}

addCheckboxRelations(checkboxRelations2)
