import React from 'react'
import { Provider } from 'react-redux'
import store from './js/redux/store'
import Root from './js/components/Root/Root'

const App = () => (
  <Provider store={store}>
    <Root />
  </Provider>
)

export default App
