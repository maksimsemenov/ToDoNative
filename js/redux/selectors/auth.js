export const getUser = (state = {}) =>
  state.auth ? state.auth.user : undefined
