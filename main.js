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
    console.log(topLevelNodes)

    topLevelNodes.forEach((nodeName) => {
      const currentCheckbox = document.getElementById(nodeName)
      currentCheckbox.addEventListener('click', genericEventHandler)
    })
  }

  function genericEventHandler (event) {
    console.log('wooo: ', event.target.id)
  }

  return RelationalCheckboxes
})()

export { RelationalCheckboxes }