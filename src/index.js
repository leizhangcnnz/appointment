import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Provider as BusProvider } from '@/hooks/useBus'
// redux
import { Provider } from 'react-redux'
import store from '@/redux'

// styles
import '@/assets/icons/iconfont'
import '@/styles/index.less'

const root = createRoot(
  document.getElementById('root')
)
root.render(
  <BusProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </BusProvider>
)
