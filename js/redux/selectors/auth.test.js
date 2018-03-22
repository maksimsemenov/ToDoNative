import { getUser } from './auth'

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
