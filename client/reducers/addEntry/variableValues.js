function variableValues (state = [], action = {}) {
  switch (action.type) {
    case 'INITIALISE_VARIABLES':
      let cleanArray = action.variables.filter((v) => {
        return !state.some((el) => {
          return el.id === v.id
        })
      })
      return [...state, ...cleanArray]
    case 'UPDATE_VALUE':
      return state.map((v) => {
        if (v.name === action.variableName) {
          return { ...v, value: action.variableValue, disabled: action.bool}
        }
        return v
      })
    case 'RESET_VALUES':
      return state.map((v) => {
        return { ...v, value: '', disabled: false }
      })
    default:
      return state
  }
}

export default variableValues
