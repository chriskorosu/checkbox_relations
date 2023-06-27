function addCheckboxRelations (data) {
  let checkboxRelations = {}

  if (data) {
    checkboxRelations = structuredClone(data)
    attachEventHandlers()
  }

  function attachEventHandlers () {
    const topLevelNodes = []
    for (const key in checkboxRelations) {
      topLevelNodes.push(key)
    }

    topLevelNodes.forEach((nodeName) => {
      const currentCheckbox = document.getElementById(nodeName)
      currentCheckbox.addEventListener('click', genericEventHandler)
    })
  }

  function genericEventHandler (event) {
    const currentCheckbox = event.target
    const currentCheckboxID = currentCheckbox.id
    const currentCheckboxState = currentCheckbox.checked

    // We iterate through all of the current checkbox's children and
    // check/toggle them as needed.
    for (const childID in checkboxRelations[currentCheckboxID].children) {
      const requiredChildState =
        checkboxRelations[currentCheckboxID].children[childID]
      if (currentCheckboxState) {
        document.getElementById(childID).checked = requiredChildState
        document.getElementById(childID).disabled = false
      }
      // Parents currently get disabled, though this may no longer be needed
      // with a custom parent.
      currentCheckbox.disabled = true
    }

    // If the current checkbox has parents, we check them all off at the start.
    // They will be toggled on sequentially later on. If we didn't do this we
    // could run into the situation where a parent that needs to be toggled
    // isn't toggled because another one of its children which is a parent of
    // the current checkbox has yet to be toggled.
    checkboxRelations[currentCheckboxID].parents.forEach((parentID) => {
      document.getElementById(parentID).checked = false
    })
    // We do the same thing with the fall-back parent.
    document.getElementById('custom').checked = false

    // We then go through each of the checkbox's parent one by one. If the
    // checkbox state matches the parent's required child state, we also go
    // through the parent's other children. If they all match, we toggle on the
    // parent. Otherwise, the parent is toggled off. We also keep track of
    // whether any parents were toggled or not.
    let parentsToggledOn = false
    checkboxRelations[currentCheckboxID].parents.forEach((parentID) => {
      const requiredChildState =
        checkboxRelations[parentID].children[currentCheckboxID]
      if (requiredChildState === currentCheckboxState) {
        let parentSatisfied = false
        for (const childID in checkboxRelations[parentID].children) {
          const childCheckBoxState = document.getElementById(childID).checked
          if (checkboxRelations[parentID].children[childID] ===
            childCheckBoxState) {
            parentSatisfied = true
          } else {
            parentSatisfied = false
            break
          }
        }
        if (parentSatisfied) {
          document.getElementById(parentID).checked = true
          document.getElementById(parentID).disabled = true
          parentsToggledOn = true
        } else {
          document.getElementById(parentID).checked = false
          document.getElementById(parentID).disabled = false
        }
      } else {
        document.getElementById(parentID).checked = false
        document.getElementById(parentID).disabled = false
      }
    })

    // If current checkbox has no parents, it must be a parent, and it must
    // have been toggled on (because toggling off is disabled).
    if (checkboxRelations[currentCheckboxID].parents.length === 0) {
      parentsToggledOn = true
    }
    // If no parents were toggled on we toggle on the fall-back parent.
    if (!parentsToggledOn) {
      document.getElementById('custom').checked = true
      document.getElementById('custom').disabled = true
    }
  }
}

export { addCheckboxRelations }
