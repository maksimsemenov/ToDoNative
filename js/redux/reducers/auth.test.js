import authReducer, { logIn, logOut } from './auth'

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
