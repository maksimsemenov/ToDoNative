import authReducer, { logIn, logOut, getUser } from './auth'

describe('Auth reducer', () => {
  it('returns initial state', () => {
    expect(authReducer()).toEqual({})
  })
  it('returns state for action with unknown type', () => {
    expect(
      authReducer({ requesting: true }, { type: 'AUTH_UNKNOWN_tYPE' })
    ).toEqual({ requesting: true })
  })
  it('sets user for logIn action', () => {
    const state = { user: { displayName: 'Han Solo' } }
    expect(
      authReducer(state, logIn({ displayName: 'Luke Skywalker' }))
    ).toEqual({ user: { displayName: 'Luke Skywalker' } })
  })
  it('clears user for logOut action', () => {
    const state = { user: { displayName: 'Han Solo' }, requesting: true }
    expect(authReducer(state, logOut())).toEqual({ requesting: true })
  })
})

describe('getUser selector', () => {
  it('returns undefined for empty state', () => {
    expect(getUser({})).toBeUndefined()
  })
  it('returns undefined for empty auth state', () => {
    expect(getUser({ uiState: { loading: true } })).toBeUndefined()
  })
  it('returns correct user', () => {
    const state = {
      auth: {
        user: { displayName: 'Han Solo' }
      }
    }
    expect(getUser(state)).toMatchSnapshot()
  })
  it('returns the same user if unrelated part of state had changed', () => {
    const state = {
      uiState: { loading: true },
      auth: {
        user: { displayName: 'Han Solo' }
      }
    }
    const nextState = {
      uiState: { loading: false },
      auth: {
        ...state.auth,
        requesting: true
      }
    }
    expect(getUser(state)).toBe(getUser(nextState))
  })
  it('returns the same undefined user if unrelated part of state had changed', () => {
    const state = {
      uiState: { loading: true },
      auth: {}
    }
    const nextState = { ...state, uiState: { loading: false } }
    expect(getUser(state)).toBe(getUser(nextState))
  })
})
