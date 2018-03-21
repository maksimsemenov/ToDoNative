export const createReducer = (initilState, handlers) => (
  state = initilState,
  action
) => {
  if (handlers && action && typeof handlers[action.type] === 'function') {
    return handlers[action.type](state, action)
  } else {
    return state
  }
}
