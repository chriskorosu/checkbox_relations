const RelationalCheckboxes = (function () {

  function RelationalCheckboxes (data) {
    if (data) {
      checkbox_relations = structuredClone(data)
      attachEventHandlers()
    }
  }

  let checkbox_relations = {}

  function attachEventHandlers () {
    const topLevelNodes = []
    for (const key in checkbox_relations) {
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