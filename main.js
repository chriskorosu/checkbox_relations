const RelationalCheckboxes = (function () {

  function RelationalCheckboxes (data) {
    if (data) {
      checkboxRelations = structuredClone(data)
      attachEventHandlers()
    }
  }

  let checkboxRelations = {}

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

    for (const childID in checkboxRelations[currentCheckboxID].children) {
      const requiredChildState =
        checkboxRelations[currentCheckboxID].children[childID]
      if (currentCheckboxState) {
        document.getElementById(childID).checked = requiredChildState
        document.getElementById(childID).disabled = false
      }
      currentCheckbox.disabled = true
    }

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
        } else {
          document.getElementById(parentID).checked = false
          document.getElementById(parentID).disabled = false
        }
      } else {
        document.getElementById(parentID).checked = false
        document.getElementById(parentID).disabled = false
      }
    })
    
  }

  return RelationalCheckboxes
})()

export { RelationalCheckboxes }