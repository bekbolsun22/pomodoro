import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './store'
import './assets/fonts/ArialRounded/arialroundedmtbold.ttf'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   <BrowserRouter>
      <Provider store={store}>
         <React.StrictMode>
            <App />
         </React.StrictMode>
      </Provider>
   </BrowserRouter>
)
