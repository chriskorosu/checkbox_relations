import { addCheckboxRelations } from './main.js'

const checkboxRelations = {
  parents: ['parent1', 'parent2', 'parent3', 'custom'],
  children: {
    'child1': [true, false, false],
    'child2': [true, false, false],
    'child3': [true, false, false],
    'child4': [false, false, true],
    'child5': [false, false, false]
  },
  last_non_fallback_parent: 'parent1',
  last_fallback_state: [true, true, true, true, true]
}

addCheckboxRelations(checkboxRelations)
