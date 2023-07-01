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
        localStorage.getItem(nodeID) === 'true'
          ? document.getElementById(nodeID).checked = true
          : document.getElementById(nodeID).checked = false
      }
    }
    // We also check the other required local storage values.
    if (localStorage.getItem('last_non_fallback_parent') === null ||
      localStorage.getItem('last_fallback_state') === null) {
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
    localStorage.setItem('last_non_fallback_parent',
      checkboxRelations.last_non_fallback_parent)
    // ... and initial fallback configuration.
    localStorage.setItem('last_fallback_state',
      JSON.stringify(checkboxRelations.last_fallback_state))
  }

  function attachEventHandlers () {
    // We add an 'input' event listener on all parent nodes.
    checkboxRelations.parents.forEach(parentID => {
      const checkbox = document.getElementById(parentID)
      checkbox.addEventListener('input', handleParentInput)
    })
    // We add an 'input' event listener on all child nodes.
    for (const childID in checkboxRelations.children) {
      const checkbox = document.getElementById(childID)
      checkbox.addEventListener('input', handleChildInput)
    }
  }

  function handleParentInput (event) {
    const targetBox = event.target
    const allParentIDs = checkboxRelations.parents
    const allChildIDs = getAllChildIDs()
    const fallbackID = allParentIDs[allParentIDs.length - 1]

    if (targetBox.checked) {
      // We store the checked state under the parent's id.
      localStorage.setItem(targetBox.id, 'true')
      // We uncheck all other checked parents.
      for (const parentID of checkboxRelations.parents) {
        const parent = document.getElementById(parentID)
        if (parentID !== targetBox.id && parent.checked) {
          parent.checked = false
          localStorage.setItem(parentID, 'false')
        }
      }
      // If target is the fallback...
      if (targetBox.id === fallbackID) {
        const fallbackValues = JSON.parse(localStorage.getItem(
          'last_fallback_state'))
        for (let i = 0; i < allChildIDs.length; i++) {
          const child = document.getElementById(allChildIDs[i])
          if (child.checked !== fallbackValues[i]) {
            child.checked = fallbackValues[i]
            localStorage.setItem(allChildIDs[i], fallbackValues[i].toString())
          }
        }
      } else { // ... else if it's not the fallback ...
        localStorage.setItem('last_non_fallback_parent', targetBox.id)
        const parentIndex = checkboxRelations.parents.indexOf(targetBox.id)
        for (let i = 0; i < allChildIDs.length; i++) {
          const child = document.getElementById(allChildIDs[i])
          const requiredChildState =
            checkboxRelations.children[child.id][parentIndex]
          if (child.checked !== requiredChildState) {
            child.checked = requiredChildState
            localStorage.setItem(allChildIDs[i], requiredChildState.toString())
          }
        }
      }
    } else { // if targetBox.unchecked
      // We store the checked state under the parent's id.
      localStorage.setItem(targetBox.id, 'false')
      // If target is the fallback...
      if (targetBox.id === fallbackID) {
        const oldChildStates = []
        const lastNonFallbackParentID =
          localStorage.getItem('last_non_fallback_parent')
        const lastNonFallbackParentIndex =
          checkboxRelations.parents.indexOf(lastNonFallbackParentID)
        const lastNonFallbackParent =
          document.getElementById(lastNonFallbackParentID)
        lastNonFallbackParent.checked = true
        localStorage.setItem(lastNonFallbackParentID, 'true')
        for (let i = 0; i < allChildIDs.length; i++) {
          const child = document.getElementById(allChildIDs[i])
          const requiredChildState =
            checkboxRelations.children[child.id][lastNonFallbackParentIndex]
          oldChildStates.push(child.checked)
          if (child.checked !== requiredChildState) {
            child.checked = requiredChildState
            localStorage.setItem(allChildIDs[i], requiredChildState.toString())
          }
        }
        const oldChildStatesString = JSON.stringify(oldChildStates)
        if (localStorage.getItem('last_fallback_state') !==
          oldChildStatesString) {
          localStorage.setItem('last_fallback_state', oldChildStatesString)
        }
      } else { // ... else if it's not the fallback ...
        for (let i = 0; i < allChildIDs.length; i++) {
          const child = document.getElementById(allChildIDs[i])
          const lastFallback = JSON.parse(localStorage.getItem(
            'last_fallback_state'))
          const requiredChildState = lastFallback[i]
          document.getElementById(fallbackID).checked = true
          localStorage.setItem(fallbackID, 'true')
          if (child.checked !== requiredChildState) {
            child.checked = requiredChildState
            localStorage.setItem(child.id, requiredChildState.toString())
            // There's no need to store parent as the last parent id since we're
            // unchecking a parent, which means we checked it at some point,
            // which means we already saved this parent id as the last one at
            // that point.
          }
        }
      }
    }
  }

  function handleChildInput (event) {
    const targetChild = event.target
    for (const parentID of checkboxRelations.parents) {
      const parentIndex = checkboxRelations.parents.indexOf(parentID)
      const parentRequiredTargetChildState =
        checkboxRelations.children[targetChild.id][parentIndex]
      const allParentIDs = getAllParentIDs()
      const fallbackID = allParentIDs[allParentIDs.length - 1]
      if (parentID === fallbackID) {
        const fallback = document.getElementById(fallbackID)
        updateStorageAllChildren()
        updateStorageFallbackState()
        if (!fallback.checked) {
          fallback.checked = true
          localStorage.setItem(fallbackID, 'true')
        }
      } else if (targetChild.checked === parentRequiredTargetChildState) {
        const lastNonFallbackParentID =
          localStorage.getItem('last_non_fallback_parent')
        const lastNonFallbackParent =
          document.getElementById(lastNonFallbackParentID)
        const currentParent = document.getElementById(parentID)
        let parentSatisfied = true
        for (const childID in checkboxRelations.children) {
          const currentChildState = document.getElementById(childID).checked
          const requiredChildState =
            checkboxRelations.children[childID][parentIndex]
          if (currentChildState !== requiredChildState) {
            parentSatisfied = false
            break
          }
        }
        if (parentSatisfied) {
          // At this point we've iterated over all children,
          // which means we've found the right parent.
          let oldParent
          lastNonFallbackParent.checked
            ? oldParent = lastNonFallbackParent
            : oldParent = document.getElementById('fallback')
          oldParent.checked = false
          localStorage.setItem(oldParent.id, 'false')
          currentParent.checked = true
          localStorage.setItem(parentID, 'true')
          localStorage.setItem('last_non_fallback_parent', parentID)
          updateStorageAllChildren()
          break
        }
      } else { // if targetChild.checked !== parentRequiredTargetChildState
        const currentParent = document.getElementById(parentID)
        if (currentParent.checked) {
          currentParent.checked = false
          localStorage.setItem(parentID, 'false')
        }
      }
    }
  }

  // Updates all children in local storage based on current node states.
  function updateStorageAllChildren () {
    const allChildIDs = getAllChildIDs()
    for (let i = 0; i < allChildIDs.length; i++) {
      const currentChild = document.getElementById(allChildIDs[i])
      const currentChildStoredState = localStorage.getItem(currentChild.id)
      if (currentChildStoredState !== currentChild.checked) {
        localStorage.setItem(currentChild.id, currentChild.checked.toString())
      }
    }
  }
  // Updates last fallback state in local storage based on current node states.
  function updateStorageFallbackState () {
    const allChildIDs = getAllChildIDs()
    const lastFallbackState =
      JSON.parse(localStorage.getItem('last_fallback_state'))
    for (let i = 0; i < allChildIDs.length; i++) {
      const currentChild = document.getElementById(allChildIDs[i])
      if (lastFallbackState[i] !== currentChild.checked) {
        lastFallbackState[i] = currentChild.checked
      }
    }
    localStorage.setItem('last_fallback_state',
      JSON.stringify(lastFallbackState))
  }
}

export { addCheckboxRelations }
