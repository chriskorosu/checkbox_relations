function addCheckboxRelations (data) {
  let checkboxRelations = {}

  if (data) {
    checkboxRelations = structuredClone(data)
    initializeCheckboxes()
    attachEventHandlers()
  }

  // Returns an array of all the node IDs.
  function getAllNodeIDs () {
    return getAllParentIDs().concat(getAllChildIDs())
  }

  // Returns an array of all the child node IDs.
  function getAllChildIDs () {
    const allChildNodeIDs = []
    for (const childID in checkboxRelations.children) {
      allChildNodeIDs.push(childID)
    }
    return allChildNodeIDs
  }

  // Returns an array of all the parent node IDs.
  function getAllParentIDs () {
    const allParentNodeIDs = []
    for (const parentID of checkboxRelations.parents) {
      allParentNodeIDs.push(parentID)
    }
    return allParentNodeIDs
  }

  // Loads initial checkbox state from local storage if it exists. If it
  // doesn't, we call a function that creates a state using default settings.
  function initializeCheckboxes () {
    const allNodeIDs = getAllNodeIDs()
    // We check the local storage of every node. If it's null, we break the
    // loop and generate the initial state. Otherwise, we load it in.
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
    // We also check the other required local storage values.
    if (localStorage.getItem(checkboxRelations.last_parent) === null ||
      localStorage.getItem(checkboxRelations.last_fallback) === null) {
      generateInitialState()
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
    // We also set initial parent ...
    localStorage.setItem('last_parent', checkboxRelations.last_parent)
    // ... and initial fallback configuration.
    localStorage.setItem('last_fallback',
      JSON.stringify(checkboxRelations.last_fallback))
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
