function addCheckboxRelations (data) {
  let checkboxRelations = {}

  if (data) {
    checkboxRelations = structuredClone(data)
    initializeCheckboxes()
    attachEventHandlers()
  }

  // Returns an array of all the checkbox IDs
  function getAllNodeIDs () {
    const allNodeIDs = []
    checkboxRelations.parents.forEach(parentID => {
      allNodeIDs.push(parentID)
    })
    for (const childID in checkboxRelations.children) {
      allNodeIDs.push(childID)
    }
    return allNodeIDs
  }

  function initializeCheckboxes () {
    const allNodeIDs = getAllNodeIDs()
    for (const nodeID of allNodeIDs) {
      if (localStorage.getItem(nodeID) === null) {
        generateInitialState()
        break
      } else {
        localStorage.getItem(nodeID) === 'true' ? 
          document.getElementById(nodeID).checked = true :
          document.getElementById(nodeID).checked = false
      }
    }
  }

  // Generates initial state by setting node attributes and initializing local
  // storage.
  function generateInitialState () {
    const numberOfParents = checkboxRelations.parents.length
    // We first toggle on the first parent...
    localStorage.setItem(checkboxRelations.parents[0], 'true')
    document.getElementById(checkboxRelations.parents[0]).checked = true
    // ... then toggle off all other parents ...
    for (let i = 1; i < numberOfParents; i++) {
      document.getElementById(checkboxRelations.parents[i]).checked = false
      localStorage.setItem(checkboxRelations.parents[i], 'false')
    }
    // ... then toggle the first parent's children as required.
    for (const childID in checkboxRelations.children) {
      const requiredState = checkboxRelations.children[childID][0]
      document.getElementById(childID).checked = requiredState
      localStorage.setItem(childID, requiredState.toString())
    }
  }

  function attachEventHandlers () {
    // We add an 'input' event listener on all parent nodes.
    checkboxRelations.parents.forEach(parentID => {
      const checkbox = document.getElementById(parentID)
      checkbox.addEventListener('input', handleParentInput)
    });
    // We add an 'input' event listener on all child nodes.
    for (const childID in checkboxRelations.children) {
      const checkbox = document.getElementById(childID)
      checkbox.addEventListener('input', handleChildInput)
    }
  }

  function handleParentInput (event) {
    console.log('parent handled')
  }

  function handleChildInput (event) {
    console.log('child handled')
  }
}

export { addCheckboxRelations }
